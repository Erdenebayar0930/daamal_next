import { Pool } from "pg";

/**
 * Postgres холболт — эцэг апп (daamal_next) хэрэглэдэг тэр л сан.
 *
 * Pool-ыг ЗАЛХУУ (lazy) үүсгэнэ: build үед route-ын модуль ачаалагдахад
 * DATABASE_URL байхгүй байж болох тул тэр үед унах ёсгүй. Мөн dev дэх hot
 * reload болон serverless орчинд холболт хуримтлахаас сэргийлж global-д кэшлэнэ.
 *
 * (Эцэг аппын src/lib/db/index.ts-тэй ижил конвенц — SSL, pool max адилхан.)
 */

const globalForDb = globalThis as unknown as { __daamalWebPool?: Pool };

export function getPool(): Pool {
  if (globalForDb.__daamalWebPool) return globalForDb.__daamalWebPool;

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL тохируулаагүй байна. web/.env.local файлдаа нэмнэ үү.");
  }

  const pool = new Pool({
    connectionString,
    max: Number(process.env.DATABASE_POOL_MAX ?? 5),
    idleTimeoutMillis: 10_000,
    connectionTimeoutMillis: 10_000,
    // DATABASE_SSL: "require" — сертификат шалгана
    //               "relaxed" — өөрийн гарын үсэгтэйг зөвшөөрнө
    //               бусад/хоосон — SSL хэрэглэхгүй (локал сервер)
    ssl:
      process.env.DATABASE_SSL === "relaxed"
        ? { rejectUnauthorized: false }
        : process.env.DATABASE_SSL === "require"
          ? true
          : undefined,
  });

  // Pool-ын идэвхгүй холболт унасан ч процесс унахаас сэргийлнэ.
  pool.on("error", (err) => console.error("[db] pool алдаа:", err));

  globalForDb.__daamalWebPool = pool;
  return pool;
}
