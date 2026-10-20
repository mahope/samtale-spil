import { localeDecks as en } from "@/locales/en/decks";

/**
 * hreflang links between snakkespil.dk and goodtalkcards.com (issue #30). Both sites import
 * this in server metadata only, so the English card texts never reach a Danish client bundle.
 */
const SITES = { da: "https://snakkespil.dk", en: "https://goodtalkcards.com" };
const enSlug: Record<string, string> = Object.fromEntries(Object.entries(en).map(([id, d]) => [id, d.slug]));

export const homeLanguages = { da: `${SITES.da}/`, en: `${SITES.en}/` };

/** The same deck on both sites, or undefined when it only exists in Danish */
export function deckLanguages(deckId: string): Record<string, string> | undefined {
  const slug = enSlug[deckId];
  if (!slug) return undefined;
  return { da: `${SITES.da}/spoergsmaal/${deckId}/`, en: `${SITES.en}/questions/${slug}/` };
}
