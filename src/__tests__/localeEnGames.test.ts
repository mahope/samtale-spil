import { describe, it, expect } from "vitest";
import { legeSider } from "@/data/lege";
import { localeGames } from "@/locales/en/games";
import { localeGuides } from "@/locales/en/guides";
import { guides } from "@/data/guides";
import { localeDecks } from "@/locales/en/decks";
import { DAILY_DECKS } from "@/lib/dagensKort";

describe("Goodtalk games and guides", () => {
  it("translate every card of every Danish /lege/ page", () => {
    for (const side of legeSider) {
      const page = localeGames[side.slug];
      expect(page, side.slug).toBeDefined();
      expect(Object.keys(page.kort).sort(), side.slug).toEqual(side.kort.map((k) => k.id).sort());
      expect(page.lege.length, side.slug).toBe(side.lege.length);
    }
  });

  it("have unique English slugs and short titles", () => {
    const slugs = Object.values(localeGames).map((g) => g.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const g of Object.values(localeGames)) expect(g.seoTitle.length, g.slug).toBeLessThanOrEqual(60);
  });

  it("have one English guide per Danish guide, with the same decks", () => {
    expect(localeGuides.length).toBe(guides.length);
    for (const g of localeGuides) for (const id of g.bunker) expect(localeDecks[id], `${g.slug}: ${id}`).toBeDefined();
  });

  it("translate every deck of the daily question, so both sites share the card of the day", () => {
    for (const id of DAILY_DECKS) expect(localeDecks[id], id).toBeDefined();
  });
});
