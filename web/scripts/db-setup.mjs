/*
 * barter_offers хүснэгтийг үүсгэнэ (идемпотент — дахин ажиллуулж болно).
 *
 *   npm run db:setup
 */
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import pg from "pg";

const here = path.dirname(fileURLToPath(import.meta.url));

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL тохируулаагүй байна. web/.env.local файлдаа нэмнэ үү.");
  process.exit(1);
}

const sql = await readFile(path.join(here, "barter-offers.sql"), "utf8");

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  connectionTimeoutMillis: 10_000,
  ssl:
    process.env.DATABASE_SSL === "relaxed"
      ? { rejectUnauthorized: false }
      : process.env.DATABASE_SSL === "require"
        ? true
        : undefined,
});

try {
  await pool.query(sql);

  const { rows } = await pool.query(`
    SELECT column_name, data_type, is_nullable
    FROM information_schema.columns
    WHERE table_name = 'barter_offers'
    ORDER BY ordinal_position`);

  const db = new URL(process.env.DATABASE_URL).pathname.slice(1);
  console.log(`barter_offers бэлэн (${db}):`);
  for (const c of rows) {
    console.log(
      `  ${c.column_name.padEnd(12)} ${c.data_type}${c.is_nullable === "NO" ? " NOT NULL" : ""}`,
    );
  }
} finally {
  await pool.end();
}
