/*
 * Build-ын бүрхүүл: орчноосоо хамааран зөв builder-ыг сонгоно.
 *
 * Локалд Turbopack (~4 сек). Харин Hostinger shared hosting дээр Turbopack нь
 * машины 64 цөмд тааруулж thread/процесс асаагаад CloudLinux LVE-ийн хязгаарт
 * (зэрэг ~16-32 процесс) мөргөж "spawn node EAGAIN" гэж унадаг. Тэнд webpack
 * builder тогтвортой ажиллана.
 *
 * Сонголтыг NEXT_BUILD_CPUS хувьсагч шийднэ — Hostinger-ийн Deployments дээр
 * "Build command" нь dropdown бөгөөд `npm run build`-аас өөрийг сонгох
 * боломжгүй тул ялгааг энд, кодын талд хийж байна.
 */
import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const nextBin = require.resolve("next/dist/bin/next");

const useWebpack = Boolean(process.env.NEXT_BUILD_CPUS);
const args = [nextBin, "build"];
if (useWebpack) args.push("--webpack");

console.log(`[build] ${useWebpack ? "webpack" : "turbopack"} builder`);

const result = spawnSync(process.execPath, args, { stdio: "inherit" });
process.exit(result.status ?? 1);
