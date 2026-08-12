/**
 * Сайтын бүх текст нэг дор. Хуудасны агуулгыг өөрчлөхөд зөвхөн энэ файлыг засна.
 */

export const site = {
  name: "Даамал",
  latinName: "daamal",
  domain: "daamal.org",
  email: "info@daamal.org",
  location: "Улаанбаатар, Монгол",
  tagline: "Barter Developer · daamal.org",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://daamal.org",
  title: "Даамал — Санхүү & бүртгэлийн системийг бартераар",
  description:
    "Санхүү болон бүртгэлийн системийг бүх салбарт, хүссэн хэлбэрээр захиалгаар хөгжүүлнэ — мөнгөн төлбөргүй, бартераар. Аккаунтинг, тайлагнал, аналитик, интеграц.",
  keywords: [
    "бартер",
    "санхүүгийн систем",
    "бүртгэлийн систем",
    "аккаунтинг",
    "ERP Монгол",
    "barter developer",
    "бартер хөгжүүлэгч",
    "даамал",
    "захиалгат систем",
  ],
} as const;

export const nav = [
  { href: "#services", label: "Үйлчилгээ" },
  { href: "#barter", label: "Бартер" },
  { href: "#industries", label: "Салбарууд" },
  { href: "#contact", label: "Холбоо барих" },
] as const;

export const hero = {
  /*
   * Мөр бүр block. Фонт нь текстийн баганы өргөнөөс (cqi) тооцогддог тул
   * мөрөнд ~21 тэмдэгт багтана — үүнээс урт бол өөрөө мөр таслана.
   * Мөрийн тоо чөлөөтэй — Hero нь энэ массивыг шууд давтана.
   */
  lines: ["Бизнесээ автоматжуул.", "Бартер сонсъё"],
  /** Аль мөр нь цэнхэр italic-ээр онцлогдох (0-оос эхэлнэ). */
  accentLine: 1,
  lead: "Санхүү, бүртгэл, тайлангийн гар ажиллагааг таны бизнест тохирсон системд шилжүүлж автоматжуулна. Төлбөрийг нь бартераар төлж болно — юу санал болгохоо хэлээрэй.",
  stats: [
    { value: "12+", label: "Салбар" },
    { value: "100%", label: "Тохируулга" },
    { value: "Бартер", label: "Төлбөр" },
  ],
  primaryCta: { href: "#barter", label: "Яаж ажилладаг вэ" },
  secondaryCta: { href: "#services", label: "Үйлчилгээ" },
} as const;

export const marqueeItems = [
  "// Санхүүгийн систем",
  "// Бүртгэл",
  "// Бартер",
  "// Аналитик",
  "// API",
  "// Хувийн тохиргоо",
] as const;

export const servicesIntro = {
  label: "Үйлчилгээ",
  /* Гарчиг 2 мөр: эхний мөрийн голд цэнхэр налуу үг, доор нь бүдэг налуу мөр. */
  title: {
    before: "Системийг",
    accent: "захиалгаар",
    after: "бүтээнэ,",
    muted: "төлбөрийг нь бартераар барагдуулж болно",
  },
} as const;

export type ServiceKey = "finance" | "registry" | "analytics" | "integration";

export const services: {
  n: string;
  key: ServiceKey;
  title: string;
  desc: string;
}[] = [
  {
    n: "01",
    key: "finance",
    title: "Санхүүгийн систем",
    desc: "Аккаунтинг, татвар, төсөв, урьдчилсан тооцоо — бүхэл бүтэн санхүүгийн үйл ажиллагааг нэг платформд.",
  },
  {
    n: "02",
    key: "registry",
    title: "Бүртгэлийн платформ",
    desc: "Бараа материал, хүний нөөц, борлуулалт, агуулах — таны бизнесийн бүтцэд яг таарсан.",
  },
  {
    n: "03",
    key: "analytics",
    title: "Тайлагнал & Аналитик",
    desc: "Бодит цагийн dashboard, BI тайлан, хяналтын самбар — шийдвэр гаргалтыг өгөгдөлд тулгуурлуулна.",
  },
  {
    n: "04",
    key: "integration",
    title: "Интеграц & API",
    desc: "Банк, татварын газар, нийгмийн даатгал, ERP болон гуравдагч талын системүүдтэй нэгдсэн холболт.",
  },
];

export const barter = {
  headline: ["Мөнгө биш,", "үнэ цэнэ", "солилцоно"],
  body: [
    "Таны бизнесд тохирсон систем хэрэгтэй ч мөнгөн урсгал хязгаарлагдмал байж болно. Бид энэ асуудлыг өөрөөр шийднэ — таны бараа, үйлчилгээ, эсвэл хамтын ажиллагааг хариуд нь авч, тохируулсан системийг бүтээнэ.",
    "Нөхцлийг хоёр тал тохиролцоно. Нэг хэмжигдэхүүн байхгүй.",
  ],
  terminal: {
    title: "daamal — barter.sh",
    lines: [
      { cmd: "daamal init ", arg: "--mode=barter", tone: "blue" as const },
      { cmd: "set payment ", arg: '"бараа | үйлчилгээ"', tone: "green" as const },
      { cmd: "build system ", arg: "--industry=any", tone: "blue" as const },
    ],
    comment: "# ✓ Хоёр тал ашигтай гэрээ",
  },
  steps: [
    {
      n: "01",
      title: "Хэрэгцээгээ тодорхойл",
      body: "Систем, функц, хамрах хүрээ, хугацааг нарийвчлан ярилцана.",
    },
    {
      n: "02",
      title: "Бартерын санал гарга",
      body: "Бараа, үйлчилгээ, эсвэл хамтын ажиллагаа — та юу санал болгох вэ?",
    },
    {
      n: "03",
      title: "Гэрээ байгуул",
      body: "Хоёр талд шударга, ашигтай нөхцлийг бичгээр баталгаажуулна.",
    },
    {
      n: "04",
      title: "Систем хүлээн ав",
      body: "Бэлэн систем + сургалт + техник дэмжлэг хугацаандаа хүлээн авна.",
    },
  ],
} as const;

export const industries = [
  "Худалдаа & Жижиглэн",
  "Барилга & Дэд бүтэц",
  "Үйлдвэрлэл",
  "Эрүүл мэнд",
  "Боловсрол",
  "Зочид буудал & Аялал",
  "Уул уурхай",
  "Хөдөө аж ахуй",
  "Логистик",
  "Санхүүгийн байгууллага",
  "НҮБ & ТББ",
  "Гоо сайхан & Ресторан",
] as const;

const contactDetails: { k: string; v: string; href?: string }[] = [
  { k: "Website", v: site.domain, href: `https://${site.domain}` },
  { k: "Email", v: site.email, href: `mailto:${site.email}` },
  { k: "Location", v: site.location },
];

export const contact = {
  headline: ["Ярилцъя,", "бартераа", "тохиролцъё"],
  details: contactDetails,
  fields: [
    { id: "name", label: "Нэр", type: "text", ph: "Таны нэр", required: true },
    {
      id: "email",
      label: "Имэйл",
      type: "email",
      ph: "email@company.mn",
      required: true,
    },
    {
      id: "industry",
      label: "Салбар",
      type: "text",
      ph: "Худалдаа, Барилга, Эрүүл мэнд...",
      required: false,
    },
  ],
  messageField: {
    id: "offer",
    label: "Бартерын санал",
    ph: "Ямар систем, бартерт юу санал болгох вэ...",
  },
  submit: "Санал илгээх",
  submitting: "Илгээж байна...",
  success: "Санал хүлээн авлаа. Бид 1–2 хоногт холбогдоно.",
  error: "Илгээхэд алдаа гарлаа. Дахин оролдоно уу, эсвэл info@daamal.org руу бичээрэй.",
} as const;

/** Server component дотор дуудагдана — hydration зөрөх эрсдэлгүй. */
export function footerCopy() {
  return `© ${new Date().getFullYear()} DAAMAL.ORG — BARTER DEVELOPER`;
}
