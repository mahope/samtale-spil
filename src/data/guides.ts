/**
 * Guides under /guide/ (issue #47): short, sourced articles that turn a piece of
 * relationship research into an exercise with cards. Never therapy, tests or promises.
 * Content lives in ./guides-indhold.ts; sources must be in docs/forskning.md.
 */
export interface GuideAfsnit {
  h2: string;
  /** Paragraphs */
  tekst: string[];
  /** Optional bullet list after the paragraphs */
  punkter?: string[];
}

export interface GuideKilde {
  /** e.g. "Huang m.fl. 2017" */
  kort: string;
  /** Full reference: authors, year, title, journal */
  fuld: string;
  /** Honest caveat about what the study does and does not show */
  forbehold?: string;
}

export interface Guide {
  slug: string;
  /** <= 60 characters, no "test" or "terapi" */
  seoTitle: string;
  /** 120-160 characters */
  metaDescription: string;
  h1: string;
  intro: string;
  afsnit: GuideAfsnit[];
  /** Exercise questions shown as a list in the HTML */
  spoergsmaal: string[];
  kilder: GuideKilde[];
  /** Deck ids to play next */
  bunker: string[];
}

export { guides } from "./guides-indhold";
