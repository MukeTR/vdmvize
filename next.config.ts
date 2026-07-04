import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Statik export — sunucu gerektirmez; Hostinger gibi paylaşımlı hosting'te çalışır.
  output: "export",
  // Klasör/index.html yapısı (Apache/Hostinger ile en uyumlusu).
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
