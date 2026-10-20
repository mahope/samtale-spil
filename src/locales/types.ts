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
