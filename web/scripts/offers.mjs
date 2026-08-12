/*
 * Ирсэн бартерын саналуудыг MariaDB-ээс уншиж хэвлэнэ.
 * Сан хүрэхгүй бол дискэн дэх нөөц файлаас (JSONL) уншина.
 *
 *   npm run offers                 # сүүлийн 50
 *   npm run offers -- --all        # бүгд
 *   npm run offers -- --json       # түүхий JSON (jq руу дамжуулахад)
 *   npm run offers -- --file       # шууд нөөц файлаас
 */
import { readFile } from "node:fs/promises";
import path from "node:path";
import mysql from "mysql2/promise";

const args = process.argv.slice(2);
const asJson = args.includes("--json");
const all = args.includes("--all");
const fileOnly = args.includes("--file");

function print(offers, source, broken = 0) {
  if (asJson) {
    console.log(JSON.stringify(offers, null, 2));
    return;
  }
  for (const [i, o] of offers.entries()) {
    console.log(`\n${"─".repeat(60)}\n#${i + 1}  ${new Date(o.at).toLocaleString("mn-MN")}`);
    console.log(`Нэр    : ${o.name}`);
    console.log(`Имэйл  : ${o.email}`);
    console.log(`Салбар : ${o.industry || "—"}`);
    console.log(`IP     : ${o.ip}`);
    if (o.emailedAt)
      console.log(`Мэдэгд.: явсан (${new Date(o.emailedAt).toLocaleString("mn-MN")})`);
    else if (o.emailedAt === null) console.log(`Мэдэгд.: яваагүй`);
    console.log(`Санал  : ${o.offer}`);
  }
  console.log(`\n${"─".repeat(60)}`);
  console.log(`Нийт ${offers.length} санал — ${source}`);
  if (broken) console.log(`Уншиж чадаагүй ${broken} мөр алгассан.`);
}

async function fromFile() {
  const file = path.resolve(process.cwd(), process.env.CONTACT_STORE_PATH || "data/offers.jsonl");
  let text;
  try {
    text = await readFile(file, "utf8");
  } catch (err) {
    if (err.code === "ENOENT") {
      console.log(`Нөөц файл ч алга (${file}).`);
      return;
    }
    throw err;
  }
  let broken = 0;
  const offers = [];
  for (const line of text.split("\n").filter((l) => l.trim())) {
    try {
      offers.push(JSON.parse(line));
    } catch {
      broken++;
    }
  }
  print(offers, `${file} (нөөц)`, broken);
}

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } = process.env;

if (fileOnly || !DB_NAME || !DB_USER) {
  if (!fileOnly) console.log("Сангийн тохиргоо алга — нөөц файлаас уншиж байна.\n");
  await fromFile();
  process.exit(0);
}

let conn;
try {
  conn = await mysql.createConnection({
    host: DB_HOST || "localhost",
    port: Number(DB_PORT ?? 3306),
    user: DB_USER,
    password: DB_PASSWORD ?? "",
    database: DB_NAME,
    charset: "utf8mb4_unicode_ci",
  });

  const [rows] = await conn.query(
    `SELECT name, email, industry, \`offer\`, ip, emailed_at, created_at
       FROM barter_offers
      ORDER BY created_at DESC, id DESC
      ${all ? "" : "LIMIT 50"}`,
  );

  print(
    rows.map((r) => ({
      at: r.created_at,
      name: r.name,
      email: r.email,
      industry: r.industry,
      offer: r.offer,
      ip: r.ip,
      emailedAt: r.emailed_at,
    })),
    `mysql:${DB_NAME}/barter_offers${all ? "" : " (сүүлийн 50 — бүгдийг --all)"}`,
  );
} catch (err) {
  console.error(`Сангаас уншиж чадсангүй (${err.code || err.message}). Нөөц файл руу шилжлээ.\n`);
  await fromFile();
} finally {
  if (conn) await conn.end();
}
