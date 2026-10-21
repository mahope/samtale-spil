import { describe, it, expect } from "vitest";
import { categories } from "@/data/categories";
import { adultQuestions } from "@/data/questions/voksne";
import { udfordringer } from "@/data/questions/udfordringer";
import { AAR_KORT } from "@/data/aaretDerGik";
import { legeSider } from "@/data/lege";
import { decks } from "@/data/decks";
import { voksenDecks } from "@/voksen/decks";

describe("18+ app (issue #57)", () => {
  it("keeps every card id unique across all decks, also the app-only ones", () => {
    const ids = [
      ...categories.flatMap((c) => c.questions.map((q) => q.id)),
      ...adultQuestions.map((q) => q.id),
      ...udfordringer.map((q) => q.id),
      ...AAR_KORT.map((q) => q.id),
      ...legeSider.flatMap((s) => s.kort.map((k) => k.id)),
    ];
    const seen = new Set<string>();
    const dupes = ids.filter((id) => (seen.has(id) ? true : (seen.add(id), false)));
    expect(dupes).toEqual([]);
  });

  it("has dares with fresh ids and the opgave card type", () => {
    expect(udfordringer.length).toBeGreaterThanOrEqual(50);
    udfordringer.forEach((q, i) => {
      expect(q.id).toBe(`hot-${i + 1}`);
      expect(q.type).toBe("opgave");
      expect(q.categoryId).toBe("udfordringer");
    });
    expect(new Set(udfordringer.map((q) => q.text)).size).toBe(udfordringer.length);
  });

  it("stays below the store limit: no explicit words in the dares", () => {
    const explicit = /\b(sex|samleje|orgasme|nøgen|nøgne|bryst|kønsdel|penis|vagina|porno|klæd .* af)\b/i;
    for (const q of udfordringer) expect(q.text, q.id).not.toMatch(explicit);
  });

  it("only has adult and couple decks, each with colours", () => {
    expect(voksenDecks.map((d) => d.id)).toEqual(["udfordringer", "voksne", "intimitet", "parforhold", "kend-din-partner", "foerste-date"]);
    for (const d of voksenDecks) {
      expect(decks[d.id], d.id).toBeDefined();
      expect(d.questions.length, d.id).toBeGreaterThan(20);
    }
  });
});
