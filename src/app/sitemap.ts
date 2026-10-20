import type { MetadataRoute } from "next";
import { categories } from "@/data/categories";
import { SITE_URL } from "@/config/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: `${SITE_URL}/`, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/spil/`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    ...categories.map((category) => ({
      url: `${SITE_URL}/spil/${category.id}/`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: `${SITE_URL}/spil/shuffle-all/`, lastModified, changeFrequency: "monthly", priority: 0.6 },
  ];
}
