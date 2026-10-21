import { describe, it, expect } from "vitest";
import { deckLanguages } from "@/locales/alternates";
import { localeDecks } from "@/locales/en/decks";
import { categoryTexts } from "@/data/categoryTexts";

describe("hreflang between snakkespil.dk and goodtalkcards.com", () => {
  it("only links decks whose page exists on both sites", () => {
    for (const [id, deck] of Object.entries(localeDecks)) {
      const langs = deckLanguages(id);
      if (!langs) continue;
      expect(categoryTexts[id], id).toBeDefined();
      expect(langs.da).toBe(`https://snakkespil.dk/spoergsmaal/${id}/`);
      expect(langs.en).toBe(`https://goodtalkcards.com/questions/${deck.slug}/`);
    }
  });

  it("links every English deck that has a Danish landing page", () => {
    const linked = Object.keys(localeDecks).filter((id) => deckLanguages(id));
    expect(linked.length).toBe(Object.keys(localeDecks).filter((id) => categoryTexts[id]).length);
    expect(linked.length).toBeGreaterThanOrEqual(20);
  });

  it("does not link decks that only exist in Danish", () => {
    expect(deckLanguages("efterskolen")).toBeUndefined();
  });
});
