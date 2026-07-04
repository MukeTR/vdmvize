import type { MetadataRoute } from "next";
import { servicesDetail } from "@/lib/content";
import { articles } from "@/lib/articles";

export const dynamic = "force-static";

const base = "https://www.vdmturizm.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/hakkimizda`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/hizmetler`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/kurumsal`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/haberler`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = servicesDetail.map((s) => ({
    url: `${base}/hizmetler/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const articleRoutes: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${base}/${a.kind === "blog" ? "blog" : "haberler"}/${a.slug}`,
    lastModified: new Date(a.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...serviceRoutes, ...articleRoutes];
}
