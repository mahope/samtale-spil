import type { MetadataRoute } from "next";
import { categories } from "@/data/categories";
import { categoryTexts } from "@/data/categoryTexts";
import { curatedPages } from "@/data/curatedPages";
import { legeSider } from "@/data/lege";
import { SITE_URL } from "@/config/site";

export const dynamic = "force-static";

// Only content pages. Play screens (/spil/<id>/ etc.) are app state and carry noindex.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: `${SITE_URL}/`, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/spil/`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/spoergsmaal/`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    ...categories
      .filter((c) => categoryTexts[c.id])
      .map((c) => ({
        url: `${SITE_URL}/spoergsmaal/${c.id}/`,
        lastModified,
        changeFrequency: "monthly" as const,
        priority: 0.8,
      })),
    ...curatedPages.map((p) => ({
      url: `${SITE_URL}/spoergsmaal/${p.slug}/`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    { url: `${SITE_URL}/lege/`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    ...legeSider.map((s) => ({
      url: `${SITE_URL}/lege/${s.slug}/`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    { url: `${SITE_URL}/saadan-spiller-i/`, lastModified, changeFrequency: "yearly", priority: 0.5 },
    { url: `${SITE_URL}/om/`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/privatliv/`, lastModified, changeFrequency: "yearly", priority: 0.2 },
  ];
}
