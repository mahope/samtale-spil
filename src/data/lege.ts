/**
 * Party and season games under /lege/ (issue #42): game descriptions plus a small
 * deck of cards per page. Content lives in ./lege-indhold.ts.
 */
import type { CardType, Question } from "@/types";
export interface Leg {
  navn: string;
  antal: string;
  tid: string;
  alder: string;
  saadan: string[];
  variant?: string;
}

export interface LegeKort {
  id: string;
  text: string;
  type: CardType;
}

export interface LegeSide {
  slug: string;
  seoTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  lege: Leg[];
  kort: LegeKort[];
  faq: { q: string; a: string }[];
  relaterede: string[];
}

export { legeSider } from "./lege-indhold";

/** Which deck's colours each page plays on */
const DECK_BY_PAGE: Record<string, string> = {
  julelege: "hoejtider",
  "julefrokost-lege": "kollegaer",
  nytaarslege: "droemme",
  "selskabslege-ved-bordet": "sjove",
};

export function legeDeck(slug: string): string {
  return DECK_BY_PAGE[slug] ?? "blandet";
}

/** A /lege/ card as a playable card in that page's deck colours */
export function legeKortSomKort(slug: string, k: LegeKort): Question {
  return { id: k.id, categoryId: legeDeck(slug), text: k.text, depth: "let", type: k.type };
}
