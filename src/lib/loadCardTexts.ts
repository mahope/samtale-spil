/**
 * Only in the app: favourites saved in its English half are shown in Danish (useCardTexts).
 * Null on the website, which drops the import from its build. Danish half only: the English
 * half loads src/intl/app/cardTexts.ts instead.
 */
export const loadCardTexts = process.env.APP_BASE_PATH ? () => import("@/lib/cardTexts").then((m) => m.cardTexts) : null;
