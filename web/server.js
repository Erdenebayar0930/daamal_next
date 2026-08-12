/*
 * Passenger-ийн эхлэх файл (Hostinger hPanel → Node.js → "Application startup file").
 *
 * Passenger нь PORT хувьсагчаар сонсох хаягийг өгнө — заримдаа дугаар, заримдаа
 * unix socket-ийн зам байдаг тул тоо руу ХӨРВҮҮЛЭХГҮЙ дамжуулна.
 *
 * Локал хөгжүүлэлтэд энэ файл хэрэггүй — `npm run dev` / `npm start` хангалттай.
 */
const http = require("http");
const next = require("next");

const dir = __dirname;
const port = process.env.PORT || 3100;

// Custom server ашиглах үед Next нь .env файлуудыг ӨӨРӨӨ уншдаггүй —
// DB_*, SMTP_* хувьсагч алга болохоос сэргийлж гараар ачаална.
try {
  require("@next/env").loadEnvConfig(dir);
} catch (err) {
  console.warn("[server] .env ачаалж чадсангүй:", err.message);
}

const app = next({ dev: false, dir });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    http
      .createServer((req, res) => handle(req, res))
      .listen(port, () => console.log(`daamal-web ажиллаж байна: ${port}`));
  })
  .catch((err) => {
    console.error("[server] эхлүүлж чадсангүй:", err);
    process.exit(1);
  });
