import { describe, it, expect } from "vitest";
import { curatedPages } from "@/data/curatedPages";
import { categories } from "@/data/categories";
import { getTemasideQuestion, temasideQuestions } from "@/data/questions/temasider";

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
      for (const s of p.sections) for (const id of s.questionIds ?? []) expect(ids.has(id) || Boolean(getTemasideQuestion(id)), `${p.slug}: ${id}`).toBe(true);
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

describe("theme pages with their own questions (issue #97)", () => {
  const norm = (t: string) => t.toLowerCase().replace(/[^\p{L}\p{N} ]/gu, "").replace(/\s+/g, " ").trim();
  const ALCOHOL = /(?<!\p{L})(?:fuld(?! af)|beruset|øl|fadøl|vin|vodka|snaps|shots?|drinks?|drik\p{L}*|skål|promille|alkohol\p{L}*|druk(?!ne)\p{L}*|bajer\p{L}*|champagne|cocktail\p{L}*)(?!\p{L})/iu;
  const pages = ["bryllupsdag", "langdistance", "livshistorie"].map((s) => curatedPages.find((p) => p.slug === s)!);

  it("exist, with 40 to 60 questions each", () => {
    for (const p of pages) {
      expect(p, "page missing").toBeDefined();
      expect(questionCount(p), p.slug).toBeGreaterThanOrEqual(40);
      expect(questionCount(p), p.slug).toBeLessThanOrEqual(60);
    }
  });

  it("use new unique ids that no deck has, and every id on a page resolves", () => {
    const own = temasideQuestions.map((q) => q.id);
    expect(new Set(own).size).toBe(own.length);
    for (const id of own) expect(ids.has(id), id).toBe(false);
    for (const p of pages) for (const s of p.sections) for (const id of s.questionIds ?? []) expect(getTemasideQuestion(id), id).toBeDefined();
  });

  it("have no alcohol and no duplicates of existing questions", () => {
    const existing = new Set(categories.flatMap((c) => c.questions.map((q) => norm(q.text))));
    const seen = new Set<string>();
    for (const q of temasideQuestions) {
      expect(ALCOHOL.test(q.text), q.id).toBe(false);
      expect(existing.has(norm(q.text)), q.id).toBe(false);
      expect(seen.has(norm(q.text)), q.id).toBe(false);
      seen.add(norm(q.text));
    }
  });

  it("link only to pages that exist", () => {
    const known = new Set([...categories.map((c) => `/spoergsmaal/${c.id}/`), ...curatedPages.map((p) => `/spoergsmaal/${p.slug}/`), "/guide/aktiv-lytning/"]);
    for (const p of curatedPages) for (const l of p.links ?? []) expect(known.has(l.href), `${p.slug}: ${l.href}`).toBe(true);
  });
});
