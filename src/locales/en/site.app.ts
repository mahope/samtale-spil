import { site as web } from "./site";

/**
 * Site settings for the Goodtalk app (the *.intlapp.tsx tree). next.config.ts aliases "@/locale/site"
 * here for that build only. The app has a Favorites tab, so the cards need their heart; the
 * English website has no favorites page and keeps it off.
 */
export const site: typeof web = { ...web, favorites: true };
