import { describe, it, expect, vi } from "vitest";

// The English half of the app resolves @/locale/* to src/locales/en (next.config.ts); the tests default to Danish
vi.mock("@/locale/decks", () => import("@/locales/en/decks"));
vi.mock("@/locale/games", () => import("@/locales/en/games"));

const { englishReminderCard } = await import("@/intl/app/reminders");
const { GET } = await import("@/app/reminder-cards.json/route.intlapp");
const pool = await GET().json();
const { cardTexts: english } = await import("@/intl/app/cardTexts");
const { cardTexts: danish } = await import("@/lib/cardTexts");
const { dagensKort } = await import("@/lib/dagensKort");

describe("reminders in the app's two languages", () => {
  it("carry the same card in English as the Danish reminder that day", () => {
    const start = new Date("2026-11-10T12:00:00Z");
    for (let i = 0; i < 120; i++) {
      const at = new Date(start.getTime() + i * 86_400_000);
      const card = englishReminderCard(at, "dag", pool);
      const { q } = dagensKort(at);
      expect(card.body, at.toISOString()).toBe(english.get(q.id));
    }
  });

  it("are titled and opened in English", () => {
    const at = new Date("2026-12-24T18:00:00Z");
    expect(englishReminderCard(at, "dag", pool).title).toBe("Question of the day");
    expect(englishReminderCard(at, "uge", pool).title).toBe("Card of the week");
    expect(englishReminderCard(at, "dag", pool).url).toBe("/daily-question/");
  });
});

describe("the English reminder cards (/en/reminder-cards.json)", () => {
  it("are English, light or medium cards from the daily decks", () => {
    expect(pool.length).toBeGreaterThan(100);
    for (const c of pool) expect(english.get(c.id), c.id).toBe(c.text);
    expect(pool.some((c: { text: string }) => /[æøå]/i.test(c.text))).toBe(false);
  });
});

describe("card texts for favourites saved in the other language", () => {
  it("have a Danish and an English text for the same card id", () => {
    expect(danish.get("par-1")).toBe("Hvad er det første du lagde mærke til ved mig?");
    expect(english.get("par-1")).toBe("What's the first thing you noticed about me?");
    expect(english.get("aar-1")).toMatch(/past year/);
  });

  it("cover every English card in the Danish map, so switching back always finds the Danish text", () => {
    const missing = [...english.keys()].filter((id) => !danish.has(id));
    expect(missing).toEqual([]);
  });

  it("have no 18+ cards in either language", () => {
    for (const map of [danish, english]) expect([...map.keys()].filter((id) => /^(adult|hot)-/.test(id))).toEqual([]);
  });
});
