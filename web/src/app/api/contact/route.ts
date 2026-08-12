import { NextResponse } from "next/server";
import { insertOffer, markEmailed, saveFallback, type Offer } from "@/lib/offers";
import { sendOfferMail } from "@/lib/mail";

/**
 * Бартерын саналыг хүлээн авах endpoint.
 *
 * 1. Postgres-ийн `barter_offers`-т хадгална (сан хүрэхгүй бол JSONL нөөцөд).
 * 2. Мэдэгдлийн имэйл илгээнэ (SMTP_* тохируулсан үед).
 * 3. Нэмэлт: CONTACT_WEBHOOK_URL байвал Slack/Discord руу мөн шиднэ.
 *
 * Санал хаа нэгтээ бичигдсэн эсвэл мэдэгдэл хүрсэн бол амжилттай гэж хариулна —
 * бүгд бүтэлгүйтсэн үед л хэрэглэгчид алдаа буцаана.
 */

const MAX = { name: 200, email: 200, industry: 200, offer: 4000 } as const;

type Payload = {
  name: string;
  email: string;
  industry: string;
  offer: string;
};

/** Нэг IP-аас хэт олон удаа илгээхийг хязгаарлана (process-ийн хугацаанд). */
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const LIMIT = 5;

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > LIMIT;
}

function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(req: Request) {
  let raw: Record<string, unknown>;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Хүсэлт танигдсангүй." }, { status: 400 });
  }

  // Honeypot — бөглөгдсөн бол bot. Bot-д амжилттай гэж хариулж, юу ч хийхгүй.
  if (clean(raw.company_url, 100)) {
    return NextResponse.json({ ok: true });
  }

  const data: Payload = {
    name: clean(raw.name, MAX.name),
    email: clean(raw.email, MAX.email),
    industry: clean(raw.industry, MAX.industry),
    offer: clean(raw.offer, MAX.offer),
  };

  if (!data.name || !data.email || !data.offer) {
    return NextResponse.json(
      { ok: false, error: "Нэр, имэйл, бартерын саналыг бөглөнө үү." },
      { status: 422 },
    );
  }

  if (!EMAIL_RE.test(data.email)) {
    return NextResponse.json(
      { ok: false, error: "Имэйл хаяг зөв эсэхийг шалгана уу." },
      { status: 422 },
    );
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Хэт олон хүсэлт. 10 минутын дараа дахин оролдоно уу." },
      { status: 429 },
    );
  }

  const record: Offer = {
    at: new Date().toISOString(),
    ...data,
    ip,
    userAgent: req.headers.get("user-agent")?.slice(0, 300) ?? "",
  };

  // --- 1. Хадгалалт: Postgres, амжилтгүй бол дискэн дэх нөөц ---
  let offerId: string | null = null;
  let saved = false;

  try {
    offerId = await insertOffer(record);
    saved = true;
  } catch (err) {
    console.error("[contact] Postgres-д бичиж чадсангүй:", err);
    try {
      const file = await saveFallback(record);
      saved = true;
      console.warn(`[contact] санал нөөц файлд хадгалагдлаа: ${file}`);
    } catch (fallbackErr) {
      console.error("[contact] нөөц файлд ч бичиж чадсангүй:", fallbackErr);
    }
  }

  // --- 2. Мэдэгдлийн имэйл ---
  let emailed = false;
  try {
    emailed = await sendOfferMail(record);
    if (emailed && offerId) {
      // Тэмдэглэл амжилтгүй болох нь саналд нөлөөлөхгүй — зөвхөн лог.
      await markEmailed(offerId).catch((err) =>
        console.error("[contact] emailed_at тэмдэглэж чадсангүй:", err),
      );
    }
  } catch (err) {
    console.error("[contact] имэйл илгээж чадсангүй:", err);
  }

  // --- 3. Нэмэлт webhook ---
  const webhook = process.env.CONTACT_WEBHOOK_URL;
  let notified: boolean | null = null;

  if (webhook) {
    const text = [
      "*Шинэ бартерын санал — daamal.org*",
      `Нэр: ${data.name}`,
      `Имэйл: ${data.email}`,
      `Салбар: ${data.industry || "—"}`,
      "",
      data.offer,
    ].join("\n");

    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      if (!res.ok) throw new Error(`webhook ${res.status}`);
      notified = true;
    } catch (err) {
      notified = false;
      console.error("[contact] webhook дамжуулж чадсангүй:", err);
    }
  }

  // Санал хаа нэгтээ бичигдсэн ЭСВЭЛ хүн рүү хүрсэн бол хүлээн авагдсанд тооцно.
  // Бүгд бүтэлгүйтсэн үед л алдаа буцаана — дахин илгээж давхардуулах хэрэггүй.
  if (!saved && !emailed && notified !== true) {
    return NextResponse.json(
      { ok: false, error: "Илгээхэд алдаа гарлаа. info@daamal.org руу бичээрэй." },
      { status: 502 },
    );
  }

  console.info(
    `[contact] санал хүлээн авлаа: ${data.email} ` +
      `(db: ${offerId ?? "үгүй"}, имэйл: ${emailed}, webhook: ${notified ?? "тохируулаагүй"})`,
  );

  return NextResponse.json({ ok: true });
}

export async function GET() {
  return NextResponse.json({ ok: false, error: "POST хэрэглэнэ." }, { status: 405 });
}
