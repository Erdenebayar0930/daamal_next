/*
 * barter_offers хүснэгтийг үүсгэнэ (идемпотент — дахин ажиллуулж болно).
 *
 *   npm run db:setup
 */
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import mysql from "mysql2/promise";

const here = path.dirname(fileURLToPath(import.meta.url));
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } = process.env;

if (!DB_NAME || !DB_USER) {
  console.error("DB_NAME / DB_USER тохируулаагүй байна. .env.local файлдаа нэмнэ үү.");
  process.exit(1);
}

const sql = await readFile(path.join(here, "barter-offers.sql"), "utf8");

const conn = await mysql.createConnection({
  host: DB_HOST || "localhost",
  port: Number(DB_PORT ?? 3306),
  user: DB_USER,
  password: DB_PASSWORD ?? "",
  database: DB_NAME,
  charset: "utf8mb4_unicode_ci",
  // Файлд олон мэдэгдэл байвал зэрэг явуулна
  multipleStatements: true,
});

try {
  await conn.query(sql);

  const [rows] = await conn.query(
    `SELECT column_name, column_type, is_nullable
       FROM information_schema.columns
      WHERE table_schema = ? AND table_name = 'barter_offers'
      ORDER BY ordinal_position`,
    [DB_NAME],
  );

  if (!rows.length) {
    console.error("barter_offers хүснэгт үүссэнгүй.");
    process.exit(1);
  }

  console.log(`barter_offers бэлэн (${DB_NAME}):`);
  for (const c of rows) {
    const name = c.COLUMN_NAME ?? c.column_name;
    const type = c.COLUMN_TYPE ?? c.column_type;
    const nullable = (c.IS_NULLABLE ?? c.is_nullable) === "NO" ? " NOT NULL" : "";
    console.log(`  ${String(name).padEnd(12)} ${type}${nullable}`);
  }
} finally {
  await conn.end();
}
