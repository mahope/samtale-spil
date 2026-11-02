import { describe, it, expect } from "vitest";
import { NOT_FOUND_SHORTCUT_IDS, notFoundShortcuts } from "@/config/notFoundShortcuts";
import { categories } from "@/data/categories";

describe("404 shortcuts", () => {
  it("has six shortcuts, all pointing at existing decks", () => {
    expect(NOT_FOUND_SHORTCUT_IDS).toHaveLength(6);
    const ids = new Set(categories.map((c) => c.id));
    for (const id of NOT_FOUND_SHORTCUT_IDS) expect(ids.has(id)).toBe(true);
  });

  it("labels come from the deck names", () => {
    for (const s of notFoundShortcuts()) {
      expect(categories.find((c) => c.id === s.id)?.name).toBe(s.label);
    }
  });
});
