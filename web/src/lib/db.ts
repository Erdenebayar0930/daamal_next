import mysql, { type Pool } from "mysql2/promise";

/**
 * MariaDB/MySQL холболт — Hostinger shared hosting дээрх сан.
 *
 * Pool-ыг ЗАЛХУУ (lazy) үүсгэнэ: build үед route-ын модуль ачаалагдахад
 * тохиргоо байхгүй байж болох тул тэр үед унах ёсгүй. Passenger аппыг дахин
 * ачаалахад холболт хуримтлахаас сэргийлж global-д кэшлэнэ.
 *
 * Тохиргоог DB_* хувьсагчаар өгнө (hPanel яг ийм хэлбэрээр харуулдаг).
 * Нууц үгэнд тусгай тэмдэгт орвол URL-encode хийх шаардлагагүй нь давуу тал.
 */

const globalForDb = globalThis as unknown as { __daamalWebPool?: Pool };

export function getPool(): Pool {
  if (globalForDb.__daamalWebPool) return globalForDb.__daamalWebPool;

  const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } = process.env;

  if (!DB_NAME || !DB_USER) {
    throw new Error("DB_NAME / DB_USER тохируулаагүй байна. .env.local файлдаа нэмнэ үү.");
  }

  const pool = mysql.createPool({
    /*
     * "localhost" БИШ, 127.0.0.1 гэж үзнэ: mysql2 нь localhost-ыг IPv6 ::1
     * болгож хөрвүүлдэг ба Hostinger-ийн эрх зөвхөн 'user'@'localhost'-д
     * олгогддог тул ::1 хаяг таарахгүй ("Access denied ... @'::1'").
     */
    host: DB_HOST || "127.0.0.1",
    port: Number(DB_PORT ?? 3306),
    user: DB_USER,
    password: DB_PASSWORD ?? "",
    database: DB_NAME,
    waitForConnections: true,
    // Shared hosting дээр нэг хэрэглэгчийн холболтын тоо хязгаартай — багаар барина
    connectionLimit: Number(process.env.DB_POOL_MAX ?? 3),
    connectTimeout: 10_000,
    // Кирилл бүрэн орохын тулд заавал utf8mb4
    charset: "utf8mb4_unicode_ci",
  });

  globalForDb.__daamalWebPool = pool;
  return pool;
}
