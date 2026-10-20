import { describe, it, expect } from "vitest";
import { curatedPages } from "@/data/curatedPages";
import { categories } from "@/data/categories";

const ids = new Set(categories.flatMap((c) => c.questions.map((q) => q.id)));

// Sections headed "Idéer …" or "Sådan …" hold ideas and tips, not questions
const questionCount = (p: (typeof curatedPages)[number]) =>
  p.sections
    .filter((s) => !/^(Idéer|Sådan)/.test(s.heading))
    .reduce((n, s) => n + (s.questionIds?.length ?? 0) + (s.items?.length ?? 0), 0);

describe("curated pages", () => {
  it("have unique slugs that do not clash with a deck", () => {
    const slugs = curatedPages.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) expect(categories.some((c) => c.id === slug), slug).toBe(false);
  });

  it("only reference cards that exist (the 18+ deck is not in categories)", () => {
    for (const p of curatedPages) {
      for (const s of p.sections) for (const id of s.questionIds ?? []) expect(ids.has(id), `${p.slug}: ${id}`).toBe(true);
    }
  });

  it("promise the number of questions the page actually shows", () => {
    for (const p of curatedPages) {
      const n = p.seoTitle.match(/\d+/)?.[0];
      // "36 spørgsmål til at forelske sig" names Aron's method; the number is in the slug
      if (n && !p.slug.startsWith(n)) expect(questionCount(p), p.slug).toBe(Number(n));
    }
  });

  it("keep titles and descriptions within search-result length", () => {
    for (const p of curatedPages) {
      expect(p.seoTitle.length, p.slug).toBeLessThanOrEqual(60);
      expect(p.metaDescription.length, p.slug).toBeLessThanOrEqual(160);
    }
  });
});
