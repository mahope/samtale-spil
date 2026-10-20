import { describe, it, expect } from "vitest";
import { dagensKort, dagensKortForDato, danishDateKey, tidligereDatoer, DAILY_DECKS } from "@/lib/dagensKort";
import { categories } from "@/data/categories";

describe("dagens kort", () => {
  it("uses the Danish date, whatever the clock's time zone", () => {
    // 23:30 UTC on 1 Feb is already 2 Feb in Copenhagen
    expect(danishDateKey(new Date("2026-02-01T23:30:00Z"))).toBe("2026-02-02");
    expect(danishDateKey(new Date("2026-07-01T21:59:00Z"))).toBe("2026-07-01");
  });

  it("gives the same card all day and a new one the next day", () => {
    const morning = dagensKort(new Date("2026-03-10T06:00:00+01:00"));
    const evening = dagensKort(new Date("2026-03-10T22:00:00+01:00"));
    const tomorrow = dagensKort(new Date("2026-03-11T06:00:00+01:00"));
    expect(evening.q.id).toBe(morning.q.id);
    expect(tomorrow.q.id).not.toBe(morning.q.id);
  });

  it("only picks light and medium cards from the daily decks", () => {
    for (let i = 0; i < 60; i++) {
      const { q, c } = dagensKortForDato(danishDateKey(new Date(Date.UTC(2026, 0, 1 + i, 12))));
      expect(DAILY_DECKS).toContain(c.id);
      expect(q.depth).not.toBe("dyb");
    }
  });

  it("lists the previous days newest first", () => {
    expect(tidligereDatoer(new Date("2026-03-10T12:00:00Z"), 3)).toEqual(["2026-03-09", "2026-03-08", "2026-03-07"]);
  });

  it("names decks that exist", () => {
    const ids = new Set(categories.map((c) => c.id));
    for (const id of DAILY_DECKS) expect(ids.has(id), id).toBe(true);
  });
});
