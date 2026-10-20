import { categories } from "@/data/categories";
import { legeSider, legeDeck } from "@/data/lege";
import { AAR_KORT } from "@/data/aaretDerGik";
import { CARD_TYPE_LABEL } from "@/data/cardTypes";
import type { PrintCard } from "@/lib/printPdf";

/** Every deck and mini deck that has a print-yourself PDF under /print/ (issue #45). No 18+. */
export interface PrintDeck {
  /** File name without .pdf */
  fil: string;
  title: string;
  /** Colours from decks.ts */
  deckId: string;
  cards: PrintCard[];
  /** Where the deck lives on the site */
  href: string;
}

const label = (type?: string) => (type && type !== "spoergsmaal" ? CARD_TYPE_LABEL[type as keyof typeof CARD_TYPE_LABEL] : undefined);

export const printDecks: PrintDeck[] = [
  ...categories.map((c) => ({
    fil: `snakkespil-${c.id}`,
    title: c.name,
    deckId: c.id,
    cards: c.questions.map((q) => ({ text: q.text, label: label(q.type) })),
    href: `/spoergsmaal/${c.id}/`,
  })),
  {
    fil: "snakkespil-aaret-der-gik",
    title: "Året der gik",
    deckId: "aaret",
    cards: AAR_KORT.map((q) => ({ text: q.text })),
    href: "/spil/aaret-der-gik/",
  },
  ...legeSider.map((s) => ({
    fil: `snakkespil-${s.slug}`,
    title: s.h1.split(":")[0],
    deckId: legeDeck(s.slug),
    cards: s.kort.map((k) => ({ text: k.text, label: label(k.type) })),
    href: `/lege/${s.slug}/`,
  })),
];
