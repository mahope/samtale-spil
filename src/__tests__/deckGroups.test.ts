import { describe, it, expect } from "vitest";
import { deckGroups } from "@/data/deckGroups";
import { categories } from "@/data/categories";

describe("deckGroups", () => {
  it("puts every category in exactly one group", () => {
    const grouped = deckGroups.flatMap((g) => g.decks);
    for (const c of categories) {
      expect(grouped.filter((id) => id === c.id), c.id).toHaveLength(1);
    }
  });

  it("only names categories that exist", () => {
    const ids = new Set(categories.map((c) => c.id));
    for (const id of deckGroups.flatMap((g) => g.decks)) {
      expect(ids.has(id), id).toBe(true);
    }
  });
});
