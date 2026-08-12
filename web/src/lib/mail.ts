import nodemailer, { type Transporter } from "nodemailer";
import type { Offer } from "./offers";

/**
 * Шинэ санал ирэхэд мэдэгдлийн имэйл илгээнэ (SMTP).
 *
 * .env.local:
 *   SMTP_HOST=smtp.gmail.com
 *   SMTP_PORT=587
 *   SMTP_USER=<илгээгч хаяг>
 *   SMTP_PASS=<Gmail бол App password — энгийн нууц үг ажиллахгүй>
 *   SMTP_FROM="Даамал <тухайн хаяг>"     # заавал биш, үндсэн нь SMTP_USER
 *   CONTACT_EMAIL_TO=erdenebayar0930@gmail.com
 *
 * SMTP тохируулаагүй бол имэйл алгасана — санал Postgres-д аль хэдийн
 * хадгалагдсан тул хүсэлт бүтэлгүйтэх шалтгаан болохгүй.
 */

const DEFAULT_TO = "erdenebayar0930@gmail.com";

let cached: Transporter | null | undefined;

function getTransport(): Transporter | null {
  if (cached !== undefined) return cached;

  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    cached = null;
    return cached;
  }

  const port = Number(process.env.SMTP_PORT ?? 587);

  cached = nodemailer.createTransport({
    host,
    port,
    // 465 бол шууд TLS, бусад порт дээр STARTTLS-ээр өргөжинө
    secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : port === 465,
    auth: { user, pass },
  });

  return cached;
}

/** Имэйл идэвхтэй эсэх — route дотор шалгахад. */
export function mailConfigured() {
  return getTransport() !== null;
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function sendOfferMail(offer: Offer) {
  const transport = getTransport();
  if (!transport) return false;

  const to = process.env.CONTACT_EMAIL_TO || DEFAULT_TO;
  const from = process.env.SMTP_FROM || `Даамал <${process.env.SMTP_USER}>`;

  const rows: [string, string][] = [
    ["Нэр", offer.name],
    ["Имэйл", offer.email],
    ["Салбар", offer.industry || "—"],
    ["Хугацаа", new Date(offer.at).toLocaleString("mn-MN")],
    ["IP", offer.ip],
  ];

  const text = [...rows.map(([k, v]) => `${k}: ${v}`), "", "Бартерын санал:", offer.offer].join(
    "\n",
  );

  const html = `
    <div style="font-family:system-ui,sans-serif;line-height:1.6;color:#111">
      <h2 style="margin:0 0 16px">Шинэ бартерын санал — daamal.org</h2>
      <table style="border-collapse:collapse;margin-bottom:20px">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="padding:4px 16px 4px 0;color:#666">${k}</td>` +
              `<td style="padding:4px 0"><b>${escapeHtml(v)}</b></td></tr>`,
          )
          .join("")}
      </table>
      <div style="padding:16px;background:#f5f7fa;border-left:3px solid #3b82f6;white-space:pre-wrap">${escapeHtml(
        offer.offer,
      )}</div>
    </div>`;

  await transport.sendMail({
    from,
    to,
    // Хариу бичихэд шууд саналтай хүн рүү очно
    replyTo: `${offer.name} <${offer.email}>`,
    subject: `Шинэ бартерын санал — ${offer.name}`,
    text,
    html,
  });

  return true;
}
