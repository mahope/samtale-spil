import { describe, it, expect } from "vitest";
import { jokerAt } from "@/lib/joker";
import { AAR_KORT, AAR_TILBAGEBLIK, AAR_GAET_TILBAGE, AAR_FREMTID, AAR_GAET_FREM } from "@/data/aaretDerGik";
import { categories } from "@/data/categories";
import { decks } from "@/data/decks";

describe("joker", () => {
  it("comes on every tenth turn, only when switched on", () => {
    const turns = Array.from({ length: 30 }, (_, i) => i).filter((t) => jokerAt(t, "venner", true));
    expect(turns).toEqual([9, 19, 29]);
    expect(jokerAt(9, "venner", false)).toBeNull();
  });

  it("keeps the deck's colours and is marked as a joker", () => {
    const j = jokerAt(9, "familie", true)!;
    expect(j.categoryId).toBe("familie");
    expect(j.type).toBe("joker");
  });
});

describe("Året der gik", () => {
  it("has four rounds with enough cards for a run", () => {
    for (const round of [AAR_TILBAGEBLIK, AAR_GAET_TILBAGE, AAR_FREMTID, AAR_GAET_FREM]) expect(round.length).toBeGreaterThanOrEqual(3);
  });

  it("uses ids no deck uses, and has its own colours", () => {
    const ids = new Set(categories.flatMap((c) => c.questions.map((q) => q.id)));
    const own = AAR_KORT.map((q) => q.id);
    expect(new Set(own).size).toBe(own.length);
    for (const id of own) expect(ids.has(id), id).toBe(false);
    expect(decks.aaret).toBeDefined();
  });
});
