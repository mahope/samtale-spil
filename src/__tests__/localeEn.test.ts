import { describe, it, expect } from "vitest";
import { categories } from "@/data/categories";
import { localeDecks } from "@/locales/en/decks";
import { deckMarks } from "@/locales/en/marks";
import { ui as da } from "@/locales/da/ui";
import { ui as en } from "@/locales/en/ui";
import { FAMILY_FRIENDLY_DECKS, WORK_SAFE_DECKS } from "@/data/cardTypes";

const byId = new Map(categories.map((c) => [c.id, c]));
const entries = Object.entries(localeDecks);
const word = (alternatives: string) => new RegExp(`(?<!\\p{L})(?:${alternatives})(?!\\p{L})`, "iu");
const ALCOHOL = word("beers?|wine|drunk|tipsy|hangover|shots?|vodka|booze|alcohol\\p{L}*|cocktails?|bar crawl|cheers");
const ADULT = word("sex\\p{L}*|naked|nude|horny|orgasm\\p{L}*");

describe("Goodtalk (English) decks", () => {
  it("translate every card of the Danish deck, and nothing else", () => {
    for (const [id, deck] of entries) {
      const source = byId.get(id);
      expect(source, id).toBeDefined();
      expect(Object.keys(deck.cards).sort(), id).toEqual(source!.questions.map((q) => q.id).sort());
    }
  });

  it("have unique slugs and marks, and a mark for every deck", () => {
    const slugs = entries.map(([, d]) => d.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    const marks = entries.map(([id]) => deckMarks[id]);
    expect(marks.every(Boolean)).toBe(true);
    expect(new Set(marks).size).toBe(marks.length);
    for (const [id, d] of entries) expect(deckMarks[id], id).toBe(d.mark);
  });

  it("promise the right number of cards and keep search snippets short", () => {
    for (const [id, d] of entries) {
      const n = d.seoTitle.match(/\d+/)?.[0];
      if (n) expect(Number(n), id).toBe(Object.keys(d.cards).length);
      expect(d.seoTitle.length, id).toBeLessThanOrEqual(60);
      expect(d.metaDescription.length, id).toBeLessThanOrEqual(160);
      expect(d.description.length, id).toBeLessThanOrEqual(90);
    }
  });

  it("contain no Danish letters, em dashes or alcohol", () => {
    for (const [id, d] of entries) {
      for (const [cardId, text] of Object.entries(d.cards)) {
        expect(/[æøåÆØÅ—]/.test(text), `${cardId}: ${text}`).toBe(false);
        expect(ALCOHOL.test(text), `${cardId}: ${text}`).toBe(false);
        if (FAMILY_FRIENDLY_DECKS.has(id) || WORK_SAFE_DECKS.has(id)) expect(ADULT.test(text), `${cardId}: ${text}`).toBe(false);
      }
    }
  });
});

describe("UI words", () => {
  it("exist in English for every Danish key", () => {
    const keys = (o: object, prefix = ""): string[] =>
      Object.entries(o).flatMap(([k, v]) => (v && typeof v === "object" && !Array.isArray(v) ? keys(v, `${prefix}${k}.`) : [`${prefix}${k}`]));
    expect(keys(en).sort()).toEqual(keys(da).sort());
  });
});
