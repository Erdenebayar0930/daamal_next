import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { getPool } from "./db";

/**
 * Бартерын саналыг Postgres-ийн `barter_offers` хүснэгтэд хадгална
 * (эцэг апп хэрэглэдэг тэр л сан — DATABASE_URL).
 *
 * Хүснэгтийг үүсгэх: `npm run db:setup` (scripts/barter-offers.sql).
 *
 * Хэрэв сан унтарсан/хүрэхгүй бол санал алдагдуулахгүйн тулд диск дээрх
 * JSONL файлд буулгана (CONTACT_STORE_PATH, үндсэн нь data/offers.jsonl).
 * Тэр файлыг `npm run offers` уншина.
 */

export type Offer = {
  /** ISO 8601, UTC */
  at: string;
  name: string;
  email: string;
  industry: string;
  offer: string;
  ip: string;
  userAgent: string;
};

const DEFAULT_STORE = "data/offers.jsonl";

export function fallbackPath() {
  return path.resolve(process.cwd(), process.env.CONTACT_STORE_PATH || DEFAULT_STORE);
}

/** Postgres-д бичнэ. Амжилттай бол мөрийн id-г буцаана. */
export async function insertOffer(record: Offer): Promise<string> {
  const { rows } = await getPool().query<{ id: string }>(
    `INSERT INTO barter_offers (name, email, industry, "offer", ip, user_agent, created_at)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING id`,
    [
      record.name,
      record.email,
      record.industry,
      record.offer,
      record.ip,
      record.userAgent,
      record.at,
    ],
  );
  return rows[0].id;
}

/** Имэйл явсныг тэмдэглэнэ. Амжилтгүй болвол зүгээр л алгасна. */
export async function markEmailed(id: string) {
  await getPool().query(`UPDATE barter_offers SET emailed_at = now() WHERE id = $1`, [id]);
}

/** Сан хүрэхгүй үеийн нөөц — нэг мөр = нэг санал (JSONL). */
export async function saveFallback(record: Offer) {
  const file = fallbackPath();
  await mkdir(path.dirname(file), { recursive: true });
  // 'a' горим нь O_APPEND — зэрэг ирсэн хүсэлтүүд бие биенээ дарахгүй.
  await appendFile(file, JSON.stringify(record) + "\n", "utf8");
  return file;
}
