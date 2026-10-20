import { describe, it, expect } from "vitest";
import { categories } from "@/data/categories";
import { legeSider, legeKortSomKort } from "@/data/lege";
import { CARD_TYPE_LABEL, FAMILY_FRIENDLY_DECKS, WORK_SAFE_DECKS } from "@/data/cardTypes";

const TYPES = new Set(["spoergsmaal", ...Object.keys(CARD_TYPE_LABEL)]);
const allCards = categories.flatMap((c) => c.questions);

// "fuld af" (full of) is fine; "fuld" on its own means drunk
const ALCOHOL = /\b(fuld(?! af)|beruset|øl|vin|vodka|shots?|alkohol\w*|druk\w*|bajer\w*)\b/i;
const ADULT = /\b(sex\w*|seksu\w*|nøgen\w*|frække?)\b/i;

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
