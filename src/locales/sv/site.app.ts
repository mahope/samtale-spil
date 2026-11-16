import { site as base } from "./site";

/**
 * Site settings for Pratspel in the app (the *.intlapp.tsx tree), which next.config.ts aliases
 * "@/locale/site" to. Swedish exists in the app only, so site.ts already has favorites on.
 */
export const site: typeof base = { ...base, favorites: true };
