import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // web/ нь эцэг репод байгаа тул Next өөрөө root-ыг таамаглахгүй байг.
  outputFileTracingRoot: __dirname,

  /*
   * Build-ын ажилчдын тоо. Next нь nproc-оор шийддэг ч shared hosting дээр
   * (Hostinger/CloudLinux LVE) машин 64 цөм харуулаад процессын тоог хатуу
   * хязгаарладаг тул "spawn ... EAGAIN" алдаа өгдөг. Тэнд NEXT_BUILD_CPUS=1
   * гэж өгнө; тохируулаагүй бол Next өөрөө шийднэ (локалд хурдан хэвээр).
   */
  ...(process.env.NEXT_BUILD_CPUS
    ? {
        experimental: { cpus: Number(process.env.NEXT_BUILD_CPUS) },
        /*
         * TS шалгагч нь build дотроос ТУСДАА процесс асаадаг ба яг тэнд
         * EAGAIN өгдөг. Шалгалтыг орхигдуулаагүй — deploy.sh нь build-ын
         * ӨМНӨ `npm run typecheck`-ийг нэг процессоор ажиллуулна.
         */
        typescript: { ignoreBuildErrors: true },
      }
    : {}),
  // Танилцуулга сайт нь бүхэлдээ статик — `next build` үед бэлэн HTML болно.
  // (Зөвхөн /api/contact нь server дээр ажиллана.)
};

export default nextConfig;
