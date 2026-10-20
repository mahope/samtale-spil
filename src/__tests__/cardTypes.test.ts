import { describe, it, expect } from "vitest";
import { categories } from "@/data/categories";
import { legeSider, legeKortSomKort } from "@/data/lege";
import { CARD_TYPE_LABEL, FAMILY_FRIENDLY_DECKS, WORK_SAFE_DECKS } from "@/data/cardTypes";

const TYPES = new Set(["spoergsmaal", ...Object.keys(CARD_TYPE_LABEL)]);
const allCards = categories.flatMap((c) => c.questions);

// Word boundaries that understand æøå (\b in JS is ASCII only). "fuld af" (full of) is fine.
const word = (alternatives: string) => new RegExp(`(?<!\\p{L})(?:${alternatives})(?!\\p{L})`, "iu");
const ALCOHOL = word("fuld(?! af)|beruset|øl|fadøl|vin|vodka|snaps|shots?|drinks?|skål|promille|alkohol\\p{L}*|druk(?!ne)\\p{L}*|bajer\\p{L}*");
const ADULT = word("sex\\p{L}*|seksu\\p{L}*|nøgen\\p{L}*|frække?");

describe("card types", () => {
  it("only uses known card types", () => {
    for (const q of allCards) expect(TYPES.has(q.type ?? "spoergsmaal"), q.id).toBe(true);
    for (const s of legeSider) for (const k of s.kort) expect(TYPES.has(k.type), k.id).toBe(true);
  });

  it("keeps the type when a /lege/ card is played", () => {
    const side = legeSider.find((s) => s.kort.some((k) => k.type !== "spoergsmaal"))!;
    const k = side.kort.find((k) => k.type !== "spoergsmaal")!;
    expect(legeKortSomKort(side.slug, k).type).toBe(k.type);
  });

  it("has pointing and task cards to play", () => {
    const types = new Set(legeSider.flatMap((s) => s.kort.map((k) => k.type)));
    expect(types.has("opgave")).toBe(true);
    expect(types.has("peg")).toBe(true);
  });
});

describe("word filters", () => {
  it("catch Danish words with æøå and skip harmless look-alikes", () => {
    expect(ALCOHOL.test("En kold øl i solen")).toBe(true);
    expect(ALCOHOL.test("Hvad gjorde du fuld?")).toBe(true);
    expect(ALCOHOL.test("En dag fuld af eventyr")).toBe(false);
    expect(ALCOHOL.test("Hvem var tæt på at drukne?")).toBe(false);
    expect(ALCOHOL.test("Hvad har du i køleskabet?")).toBe(false);
  });
});

describe("deck flags", () => {
  it("only names decks that exist", () => {
    const ids = new Set(categories.map((c) => c.id));
    for (const id of [...FAMILY_FRIENDLY_DECKS, ...WORK_SAFE_DECKS]) expect(ids.has(id), id).toBe(true);
  });

  it("never mentions alcohol on any card outside the 18+ deck", () => {
    for (const q of allCards) expect(ALCOHOL.test(q.text), `${q.id}: ${q.text}`).toBe(false);
    for (const s of legeSider) for (const k of s.kort) expect(ALCOHOL.test(k.text), `${k.id}: ${k.text}`).toBe(false);
  });

  it("keeps family-friendly and work-safe decks free of sex and nudity", () => {
    for (const q of allCards) {
      if (FAMILY_FRIENDLY_DECKS.has(q.categoryId) || WORK_SAFE_DECKS.has(q.categoryId)) {
        expect(ADULT.test(q.text), `${q.id}: ${q.text}`).toBe(false);
      }
    }
  });
});
