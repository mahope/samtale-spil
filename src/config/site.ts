import { categories } from "@/data/categories";
import { adultQuestions } from "@/data/questions/voksne";

import { site } from "@/locale/site";
import { ui } from "@/locale/ui";

export const SITE_URL = site.url;
export const SITE_NAME = site.name;

/** Next.js merges openGraph shallowly: pages that set openGraph spread this first. */
export const OG_BASE = {
  siteName: SITE_NAME,
  locale: site.ogLocale,
  type: "website" as const,
  // International sites serve their image from /og.png; Danish pages get theirs from opengraph-image.tsx
  ...(site.lang !== "da" && { images: [{ url: "/og.png", width: 1200, height: 630 }] }),
};

/**
 * Flip to true when the apps are live in App Store and Google Play. Until then the website says
 * "coming soon" instead of linking to store pages that do not open yet.
 */
export const APPS_LIVE = false;

/** Store links to show on the website: null for a store that is not live (yet) */
export const APP_STORE_LINKS: { ios: string | null; android: string | null } = APPS_LIVE
  ? site.apps
  : { ios: null, android: null };

/** The app's own build (APP_BUILD=1) should not advertise the app or link to /app/ */
export const SHOW_APP_PROMO = process.env.APP_BUILD !== "1";

/** Totals derived from the question data, so copy never drifts from reality. */
export const CATEGORY_COUNT = categories.length;
export const QUESTION_COUNT =
  categories.reduce((sum, c) => sum + c.questions.length, 0) + adultQuestions.length;

/** Rounded down to the nearest hundred, for copy like "1.000+ spørgsmål". */
export const QUESTION_COUNT_LABEL = `${(Math.floor(QUESTION_COUNT / 100) * 100).toLocaleString(ui.numberLocale)}+`;

/** Metadata for screens that are app state, not content: kept out of search results. */
export function appScreenMetadata(title: string, description?: string) {
  return {
    title,
    ...(description ? { description } : {}),
    robots: { index: false, follow: true },
  };
}
