import { site as base } from "./site";

/**
 * Site settings for Charlando in the app (the *.intlapp.tsx tree), which next.config.ts aliases
 * "@/locale/site" to. Spanish exists in the app only, so site.ts already has favorites on.
 */
export const site: typeof base = { ...base, favorites: true };
