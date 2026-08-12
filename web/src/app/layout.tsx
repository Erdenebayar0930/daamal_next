import type { Metadata, Viewport } from "next";
import { Playfair, Geologica, JetBrains_Mono } from "next/font/google";
import { site } from "@/lib/content";
import "./globals.css";

/*
 * Монгол кирилл бүрэн гарахын тулд "cyrillic" + "cyrillic-ext" хоёуланг ачаална:
 * Ү/ү (U+04AE–04AF) нь cyrillic дотор, харин Ө/ө (U+04E8–04E9) нь cyrillic-ext
 * дотор байдаг. Зөвхөн "cyrillic" бол Ө/ө fallback фонтоор унаж, үсэг зөрнө.
 */

/* Display serif — Playfair Display-д cyrillic-ext байхгүй тул Playfair (variable). */
const display = Playfair({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-display",
  fallback: ["Georgia", "Times New Roman", "serif"],
});

const body = Geologica({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  display: "swap",
  variable: "--font-body",
  fallback: ["Inter", "system-ui", "sans-serif"],
});

const mono = JetBrains_Mono({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  display: "swap",
  variable: "--font-mono",
  fallback: ["ui-monospace", "Courier New", "monospace"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  keywords: [...site.keywords],
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "mn_MN",
    url: site.url,
    siteName: site.name,
    title: site.title,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "business",
};

export const viewport: Viewport = {
  themeColor: "#04080f",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="mn" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Үндсэн агуулга руу
        </a>
        {children}
        <script
          type="application/ld+json"
          // Structured data — хайлтын системд байгууллагыг танихад.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: site.name,
              alternateName: site.latinName,
              url: site.url,
              email: site.email,
              description: site.description,
              address: {
                "@type": "PostalAddress",
                addressLocality: "Улаанбаатар",
                addressCountry: "MN",
              },
            }),
          }}
        />
      </body>
    </html>
  );
}
