import { readFileSync } from "node:fs";
import path from "node:path";
import sitemap from "@/app/sitemap";
import { SITE_URL } from "@/config/site";
import { printDecks } from "@/data/printDecks";
import { describe, expect, it } from "vitest";
import { ARBEJDSPLADS_DECK, ARBEJDSPLADS_MINUTTER, arbejdspladsTrin } from "@/data/arbejdsplads";
import { getQuestionById } from "@/data/categories";

describe("/til-arbejdspladsen/", () => {
  const ids = arbejdspladsTrin.flatMap((t) => t.questionIds);

  it("adds up to 30 minutes with three rounds of 8 minutes and four questions each", () => {
    expect(arbejdspladsTrin.reduce((sum, t) => sum + t.minutter, 0)).toBe(ARBEJDSPLADS_MINUTTER);
    const runder = arbejdspladsTrin.filter((t) => t.questionIds.length > 0);
    expect(runder).toHaveLength(3);
    for (const r of runder) {
      expect(r.minutter).toBe(8);
      expect(r.questionIds).toHaveLength(4);
    }
  });

  it("uses existing light or medium cards from the colleague deck, none twice", () => {
    expect(new Set(ids).size).toBe(ids.length);
    for (const id of ids) {
      const found = getQuestionById(id);
      expect(found, id).not.toBeNull();
      expect(found!.category.id).toBe(ARBEJDSPLADS_DECK);
      expect(found!.question.depth, id).not.toBe("dyb");
    }
  });
});

describe("/til-arbejdspladsen/ links", () => {
  const src = (p: string) => readFileSync(path.join(process.cwd(), p), "utf8");

  it("is in the sitemap", () => {
    expect(sitemap().map((e) => e.url)).toContain(`${SITE_URL}/til-arbejdspladsen/`);
  });

  it("is linked from the footer and the colleague deck page", () => {
    expect(src("src/components/site/SiteFooter.tsx")).toContain("/til-arbejdspladsen/");
    expect(src("src/app/spoergsmaal/[slug]/CategoryLanding.tsx")).toContain("/til-arbejdspladsen/");
  });

  it("points at an existing print PDF for the deck", () => {
    expect(printDecks.map((d) => d.fil)).toContain(`snakkespil-${ARBEJDSPLADS_DECK}`);
    expect(src("src/app/til-arbejdspladsen/page.tsx")).toContain("snakkespil-${ARBEJDSPLADS_DECK}.pdf");
  });
});
