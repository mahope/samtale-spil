import { SITE_URL } from "@/config/site";
import { intlDecks } from "@/intl/data";
import { intlGames } from "@/intl/games";
import { localeGuides } from "@/locale/guides";

// Metadata files (sitemap.ts) are not picked up with the intl page extensions, so the
// international sites serve their sitemap from a static route handler instead.
export const dynamic = "force-static";

const PAGES = [
  "/",
  "/play/",
  "/questions/",
  ...intlDecks.map((d) => `/questions/${d.slug}/`),
  "/games/",
  ...intlGames.map((g) => `/games/${g.slug}/`),
  "/guide/",
  ...localeGuides.map((g) => `/guide/${g.slug}/`),
  "/daily-question/",
  "/question-generator/",
  "/print/",
  "/stats/",
  "/how-to-play/",
  "/app/",
  "/about/",
  "/privacy/",
];

export function GET() {
  const today = new Date().toISOString().slice(0, 10);
  const urls = PAGES.map((p) => `  <url><loc>${SITE_URL}${p}</loc><lastmod>${today}</lastmod></url>`).join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}
