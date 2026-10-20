import { describe, it, expect } from "vitest";
import { decks, contrastRatio, getDeck } from "@/data/decks";
import { categories } from "@/data/categories";

describe("decks", () => {
  it("has a deck for every category", () => {
    for (const category of categories) {
      expect(decks[category.id], category.id).toBeDefined();
    }
  });

  it("keeps deck text readable (WCAG AA 4.5:1)", () => {
    for (const [id, deck] of Object.entries(decks)) {
      expect(contrastRatio(deck.bg, deck.ink), id).toBeGreaterThanOrEqual(4.5);
    }
  });

  it("computes known contrast ratios", () => {
    expect(contrastRatio("#ffffff", "#000000")).toBeCloseTo(21, 0);
    expect(contrastRatio("#ffffff", "#ffffff")).toBeCloseTo(1, 5);
  });

  it("falls back for unknown ids", () => {
    expect(getDeck("findes-ikke").mark).toBe("?");
  });
});
