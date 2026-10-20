import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";
import fontkit from "@pdf-lib/fontkit";
import { printDecks } from "@/data/printDecks";
import { decks } from "@/data/decks";
import { adultQuestions } from "@/data/questions/voksne";

const fonts = path.join(process.cwd(), "assets", "fonts");
const bold = fontkit.create(readFileSync(path.join(fonts, "bricolage-grotesque-latin-700-normal.woff")));
const heavy = fontkit.create(readFileSync(path.join(fonts, "bricolage-grotesque-latin-800-normal.woff")));

const missing = (font: typeof bold, text: string) =>
  [...text].filter((ch) => !/\s/.test(ch) && !font.hasGlyphForCodePoint(ch.codePointAt(0)!));

describe("print PDFs", () => {
  it("have unique file names and known deck colours", () => {
    const files = printDecks.map((d) => d.fil);
    expect(new Set(files).size).toBe(files.length);
    for (const d of printDecks) expect(decks[d.deckId], d.fil).toBeDefined();
  });

  it("never include the 18+ deck", () => {
    const adult = new Set(adultQuestions.map((q) => q.text));
    for (const d of printDecks) {
      expect(d.deckId).not.toBe("voksne");
      for (const c of d.cards) expect(adult.has(c.text), c.text).toBe(false);
    }
  });

  it("only use characters the embedded font can draw (a missing one prints as an empty box)", () => {
    for (const d of printDecks) {
      expect(missing(bold, d.title), d.fil).toEqual([]);
      expect(missing(heavy, decks[d.deckId].mark), d.fil).toEqual([]);
      for (const c of d.cards) {
        expect(missing(bold, c.text), `${d.fil}: ${c.text}`).toEqual([]);
        if (c.label) expect(missing(heavy, c.label), c.label).toEqual([]);
      }
    }
  });
});
