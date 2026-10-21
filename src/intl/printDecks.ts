import { CARD_TYPE_LABEL } from "@/data/cardTypes";
import { intlDecks } from "@/intl/data";
import { intlGames } from "@/intl/games";
import type { PrintDeck } from "@/data/printDecks";

const label = (type?: string) => (type && type !== "spoergsmaal" ? CARD_TYPE_LABEL[type as keyof typeof CARD_TYPE_LABEL] : undefined);

/** Print-yourself PDFs for an international site (issue #73) */
export const intlPrintDecks: PrintDeck[] = [
  ...intlDecks.map((d) => ({
    fil: `goodtalk-${d.slug}`,
    title: d.name,
    deckId: d.id,
    cards: d.questions.map((q) => ({ text: q.text, label: label(q.type) })),
    href: `/questions/${d.slug}/`,
  })),
  ...intlGames.map((g) => ({
    fil: `goodtalk-${g.slug}`,
    title: g.h1.split(":")[0],
    deckId: g.deckId,
    cards: g.cards.map((c) => ({ text: c.text, label: label(c.type) })),
    href: `/games/${g.slug}/`,
  })),
];
