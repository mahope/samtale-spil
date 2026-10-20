import { describe, it, expect } from "vitest";
import { categories } from "@/data/categories";
import { categoryTexts } from "@/data/categoryTexts";

describe("category landing texts", () => {
  it("covers every category", () => {
    for (const c of categories) {
      expect(categoryTexts[c.id], c.id).toBeDefined();
    }
  });

  it("states the real number of questions in the title", () => {
    for (const c of categories) {
      const n = categoryTexts[c.id].seoTitle.match(/\d+/)?.[0];
      if (n) expect(Number(n), c.id).toBe(c.questions.length);
    }
  });

  it("keeps titles and descriptions within search result limits", () => {
    for (const [id, t] of Object.entries(categoryTexts)) {
      expect(t.seoTitle.length, id).toBeLessThanOrEqual(60);
      expect(t.metaDescription.length, id).toBeLessThanOrEqual(160);
    }
  });
});
