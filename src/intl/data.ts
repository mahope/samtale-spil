import { categories } from "@/data/categories";
import { deckGroups } from "@/data/deckGroups";
import { localeDecks } from "@/locale/decks";
import type { LocaleDeck } from "@/locales/types";
import type { Question } from "@/types";

/**
 * Decks for an international site or app language: the Danish deck's ids, depths and types with the
 * locale's words (src/locales/<locale>/decks). Only decks that have a translation are shown.
 * App-only languages give AppLocaleDeck, without the website's SEO texts; only *.intl.tsx pages
 * read those, and next.config.ts never builds them for an app-only language.
 */
export interface IntlDeck extends Omit<LocaleDeck, "cards"> {
  /** Danish deck id: colours, card ids and favourites are shared across sites */
  id: string;
  questions: Question[];
}

export const intlDecks: IntlDeck[] = categories
  .filter((c) => localeDecks[c.id])
  .map((c) => {
    const { cards, ...meta } = localeDecks[c.id];
    return {
      ...meta,
      id: c.id,
      questions: c.questions.filter((q) => cards[q.id]).map((q) => ({ ...q, text: cards[q.id] })),
    };
  });

export const intlDeckBySlug = new Map(intlDecks.map((d) => [d.slug, d]));
export const intlDeckById = new Map(intlDecks.map((d) => [d.id, d]));

export const INTL_CARD_COUNT = intlDecks.reduce((n, d) => n + d.questions.length, 0);

/** The site's groups, keeping only groups that have at least one translated deck */
export function intlGroups() {
  return deckGroups
    .map((g) => ({ ...g, decks: g.decks.map((id) => intlDeckById.get(id)).filter((d): d is IntlDeck => Boolean(d)) }))
    .filter((g) => g.decks.length > 0);
}
