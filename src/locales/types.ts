import type { Leg } from "@/data/lege";

/** A /lege/ page in another language: same games and card ids, its own words (issue #73) */
export interface LocaleGamePage {
  slug: string;
  seoTitle: string;
  metaDescription: string;
  /** "Name: subtitle" */
  h1: string;
  intro: string;
  lege: Leg[];
  /** Danish card id -> text */
  kort: Record<string, string>;
  faq: { q: string; a: string }[];
}

/** One deck as an international site shows it: the Danish deck's structure, its own words (issue #30) */
export interface LocaleDeck {
  /** URL slug under /questions/ and /play/ */
  slug: string;
  name: string;
  /** <= 90 characters */
  description: string;
  /** 1-2 letters on the card back */
  mark: string;
  /** <= 60 characters; the number is the card count */
  seoTitle: string;
  metaDescription: string;
  intro: string;
  fitsFor: string;
  tips: string[];
  /** Danish card id -> text in this language */
  cards: Record<string, string>;
}
