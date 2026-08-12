import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // web/ нь эцэг репод байгаа тул Next өөрөө root-ыг таамаглахгүй байг.
  outputFileTracingRoot: __dirname,
  // Танилцуулга сайт нь бүхэлдээ статик — `next build` үед бэлэн HTML болно.
  // (Зөвхөн /api/contact нь server дээр ажиллана.)
};

export default nextConfig;
