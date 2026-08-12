import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import type { ResultSetHeader } from "mysql2";
import { getPool } from "./db";

/**
 * Бартерын саналыг MariaDB-ийн `barter_offers` хүснэгтэд хадгална.
 *
 * Хүснэгтийг үүсгэх: `npm run db:setup` (scripts/barter-offers.sql).
 *
 * Хэрэв сан унтарсан/хүрэхгүй бол санал алдагдуулахгүйн тулд диск дээрх
 * JSONL файлд буулгана (CONTACT_STORE_PATH, үндсэн нь data/offers.jsonl).
 * Тэр файлыг `npm run offers -- --file` уншина.
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

/** MariaDB руу бичнэ. Амжилттай бол мөрийн id-г буцаана. */
export async function insertOffer(record: Offer): Promise<number> {
  const [result] = await getPool().execute<ResultSetHeader>(
    `INSERT INTO barter_offers (name, email, industry, \`offer\`, ip, user_agent, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      record.name,
      record.email,
      record.industry,
      record.offer,
      record.ip,
      record.userAgent,
      // MySQL нь ISO-гийн "Z"-г ойлгодоггүй — DATETIME хэлбэрт хөрвүүлнэ (UTC)
      record.at.slice(0, 19).replace("T", " "),
    ],
  );
  return result.insertId;
}

/** Имэйл явсныг тэмдэглэнэ. Амжилтгүй болвол зүгээр л алгасна. */
export async function markEmailed(id: number) {
  await getPool().execute(`UPDATE barter_offers SET emailed_at = UTC_TIMESTAMP() WHERE id = ?`, [
    id,
  ]);
}

/** Сан хүрэхгүй үеийн нөөц — нэг мөр = нэг санал (JSONL). */
export async function saveFallback(record: Offer) {
  const file = fallbackPath();
  await mkdir(path.dirname(file), { recursive: true });
  // 'a' горим нь O_APPEND — зэрэг ирсэн хүсэлтүүд бие биенээ дарахгүй.
  await appendFile(file, JSON.stringify(record) + "\n", "utf8");
  return file;
}
