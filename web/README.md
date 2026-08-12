# Даамал — танилцуулга вэбсайт

`daamal.org`-ийн маркетинг/танилцуулга сайт. Эцэг репо (`daamal_next`) дахь
дашбоард аппликейшнээс **бүрэн тусдаа** Next.js төсөл — өөрийн `package.json`,
өөрийн `node_modules`, өөрийн порт.

Загварыг [sift-said-23790841.figma.site](https://sift-said-23790841.figma.site/)
макетаас гаргаж, production-д тохирсон болгож дахин бичсэн.

---

## Ажиллуулах

```bash
cd web
npm install
npm run dev        # http://localhost:3100
```

| Скрипт              | Тайлбар                          |
| ------------------- | -------------------------------- |
| `npm run dev`       | Хөгжүүлэлтийн сервер (порт 3100) |
| `npm run build`     | Production build                 |
| `npm start`         | Build-ыг ажиллуулах (порт 3100)  |
| `npm run lint`      | ESLint                           |
| `npm run typecheck` | `tsc --noEmit`                   |
| `npm run db:setup`  | `barter_offers` хүснэгт үүсгэх   |
| `npm run offers`    | Ирсэн саналуудыг хэвлэх          |

> Порт 3100 гэж сонгосон нь эцэг апп 3000/3001 хэрэглэдэг тул зөрчилдөхгүйн тулд.

## Тохиргоо

`.env.example`-ыг `.env.local` болгож хуулаад:

| Хувьсагч                   | Хэрэглээ                                                              |
| -------------------------- | --------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`     | Canonical URL, `sitemap.xml`, OG зурагт хэрэглэгдэнэ                  |
| `DATABASE_URL`             | **Postgres** — ирсэн санал энд хадгалагдана (эцэг аппын сан)          |
| `DATABASE_SSL`             | `require` / `relaxed` / хоосон (локал)                                |
| `SMTP_HOST/PORT/USER/PASS` | Мэдэгдлийн имэйл илгээх SMTP                                          |
| `CONTACT_EMAIL_TO`         | Хүлээн авагч. Үндсэн нь `erdenebayar0930@gmail.com`                   |
| `SMTP_FROM`                | Илгээгчийн харагдах нэр. Заавал биш                                   |
| `CONTACT_STORE_PATH`       | Сан хүрэхгүй үеийн **нөөц** JSONL файл. Үндсэн нь `data/offers.jsonl` |
| `CONTACT_WEBHOOK_URL`      | Нэмэлт Slack/Discord/Google Chat webhook. Заавал биш                  |

## Ирсэн санал

Холбоо барих формоор ирсэн санал бүр Postgres-ийн **`barter_offers`**
хүснэгтэд бичигдээд, `CONTACT_EMAIL_TO` хаяг руу мэдэгдлийн имэйл явна.

Эхлээд хүснэгтээ үүсгэнэ (идемпотент — олон удаа ажиллуулж болно):

```bash
npm run db:setup
```

Уншихдаа:

```bash
npm run offers                 # сүүлийн 50
npm run offers -- --all        # бүгд
npm run offers -- --json       # түүхий JSON (jq руу дамжуулахад)
npm run offers -- --file       # шууд нөөц файлаас
```

**Имэйл.** Gmail-ээр илгээх бол `SMTP_PASS` нь энгийн нууц үг биш,
[App password](https://myaccount.google.com/apppasswords) байх ёстой (2FA
идэвхтэй байх шаардлагатай). Захианы `Reply-To` нь санал илгээсэн хүний хаяг
тул шууд "Reply" дарж хариулж болно. Имэйл амжилттай явсан үед мөрийн
`emailed_at` баганад хугацаа тэмдэглэгдэнэ — юу яваагүйг хожим олоход хэрэгтэй.

**Алдаа гарвал.** Postgres хүрэхгүй бол санал `data/offers.jsonl` нөөц файлд
буух ба лог руу анхааруулга бичигдэнэ (`npm run offers -- --file` уншина).
Хадгалалт, имэйл, webhook гурвуулан бүтэлгүйтсэн үед л хэрэглэгчид `502`
буцаана — өөрөөр хэлбэл санал чимээгүй алдагдахгүй. `data/` нь `.gitignore`-т.

> **Vercel дээр байршуулах бол.** `DATABASE_URL` тухайн орчноос хүрдэг байх
> ёстой (локал Postgres хүрэхгүй). Нөөц файлын механизм тэнд ажиллахгүй —
> serverless-ийн файлын систем түр зуурынх.

> **`drizzle-kit push`-д анхаар.** `barter_offers` нь эцэг аппын
> `src/lib/db/schema.ts`-д тодорхойлогдоогүй. Хэрэв хэзээ нэгэн цагт тэнд
> `npm run db:push` ажиллуулбал drizzle энэ хүснэгтийг "илүүц" гэж үзэж
> устгахыг санал болгож магадгүй — тэр үед татгалзана уу.

## Бүтэц

```
web/
├── src/
│   ├── app/
│   │   ├── layout.tsx           # фонт, SEO metadata, JSON-LD
│   │   ├── page.tsx             # секцүүдийг эвлүүлнэ
│   │   ├── globals.css          # design token + бүх стиль
│   │   ├── icon.svg             # favicon
│   │   ├── opengraph-image.tsx  # 1200×630 OG зураг (автоматаар үүснэ)
│   │   ├── robots.ts / sitemap.ts
│   │   └── api/contact/route.ts # формын endpoint
│   ├── components/              # Navbar, Hero, Ticker, Services, Barter, ...
│   └── lib/content.ts           # ★ БҮХ ТЕКСТ нэг дор
└── next.config.ts
```

**Текст солих** — `src/lib/content.ts` дотор бүх гарчиг, тайлбар, салбарын
жагсаалт, холбоо барих мэдээлэл байна. Компонент рүү орох шаардлагагүй.

**Өнгө / фонт солих** — `src/app/globals.css`-ийн `:root` дахь token-ууд.

## Design system

| Token       | Утга                     | Хэрэглээ               |
| ----------- | ------------------------ | ---------------------- |
| `--ground`  | `#04080f`                | үндсэн дэвсгэр         |
| `--surface` | `#080e1a`                | сэлгэсэн секц          |
| `--blue`    | `#3b82f6`                | брэнд, accent italic   |
| `--cyan`    | `#22d3ee`                | 2-дугаар accent, label |
| `--ink`     | `#e8eef8`                | гол текст              |
| `--muted`   | `rgba(160,175,210,0.72)` | body текст             |
| `--line`    | `rgba(59,130,246,0.14)`  | бүх хүрээ, зураас      |

Фонтууд `next/font`-оор self-host болно (гадны хүсэлт байхгүй):

- **Playfair** — гарчиг, тоон үзүүлэлт. Макет дээр Fraunces байсан ч түүнд **Кирилл
  байхгүй** тул Georgia-д fallback болж, төхөөрөмж тус бүр өөр харагдах эрсдэлтэй.
  Playfair нь ижил зантай, Кирилл + italic-тай тул бүх платформд адил гарна.
  (Playfair **Display** биш — тэр гэр бүлд `cyrillic-ext` байхгүй тул Ө/ө зурдаггүй.)
- **Geologica** — body (Кирилл ✓)
- **JetBrains Mono** — label, terminal (Кирилл ✓)

> **Монгол кирилл — subset-ийн анхаарах зүйл.** Гурван фонт бүрд
> `subsets: ["latin", "cyrillic", "cyrillic-ext"]` заана. Ү/ү (U+04AE–04AF) нь
> `cyrillic` дотор боловч **Ө/ө (U+04E8–04E9) нь `cyrillic-ext`** дотор байдаг.
> Зөвхөн `cyrillic` бол "Өөрийн", "мөнгөн", "хөгжүүлнэ" гэх мэт үгийн Ө/ө
> fallback фонтоор унаж, үсэг зөрж харагдана.

## Макетаас нэмсэн зүйлс

- Бодит SEO: `lang="mn"`, canonical, OG/Twitter, `sitemap.xml`, `robots.txt`,
  Organization JSON-LD, OG зураг. (Макет `noindex, nofollow` байсан.)
- Ажилладаг холбоо барих форм — валидац, honeypot, IP-ийн rate limit,
  амжилт/алдааны мессеж.
- Мобайл меню Esc-ээр хаагдах, дэлгэц өргөсөхөд автоматаар хаагдах.
- Ticker жинхэнэ эргэлддэг болсон (макет дээр хөдөлгөөнгүй байсан), hover үед зогсоно.
- `prefers-reduced-motion`, focus-visible, skip-link, print stylesheet.
- Бүх текст `content.ts`-д гарсан.

## Deploy

Бүх хуудас статик, зөвхөн `/api/contact` серверт ажиллана.

- **Vercel** — root directory-г `web` болгож заана. `DATABASE_URL` болон
  `SMTP_*`-ыг орчны хувьсагчид нэмнэ (дээрх "Ирсэн санал" хэсгийг үзнэ үү).
- **Өөр хостинг** — `npm run build && npm start` (Node 20+). Нөөц файл ажиллах
  тул `data/` хавтсыг deploy бүрт дарж бичихгүй байнгын дискэнд байрлуулна.
