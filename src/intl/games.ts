import { legeSider, legeDeck } from "@/data/lege";
import { localeGames } from "@/locale/games";
import type { LocaleGamePage } from "@/locales/types";
import type { Question } from "@/types";

/** Party and season games on an international site: the Danish pages' games and card ids, the locale's words (issue #73) */
export interface IntlGame extends Omit<LocaleGamePage, "kort"> {
  /** Colours come from the Danish page's deck */
  deckId: string;
  cards: Question[];
}

export const intlGames: IntlGame[] = legeSider
  .filter((s) => localeGames[s.slug])
  .map((s) => {
    const { kort, ...page } = localeGames[s.slug];
    const deckId = legeDeck(s.slug);
    return {
      ...page,
      deckId,
      cards: s.kort.filter((k) => kort[k.id]).map((k) => ({ id: k.id, categoryId: deckId, text: kort[k.id], depth: "let" as const, type: k.type })),
    };
  });

export const intlGameBySlug = new Map(intlGames.map((g) => [g.slug, g]));
