import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";

// The English half of the app resolves @/locale/* to src/locales/en (next.config.ts); the tests default to Danish
vi.mock("@/locale/decks", () => import("@/locales/en/decks"));
vi.mock("@/locale/games", () => import("@/locales/en/games"));

const { englishReminderCard } = await import("@/intl/app/reminders");
const { dailyPool } = await import("@/intl/daily");
const { DailyCard } = await import("@/app/daily-question/DailyCard");
const { danishDateKey, vaelgForDato } = await import("@/lib/dagDato");

const pool = dailyPool.map(({ q }) => ({ id: q.id, text: q.text }));
const dayMs = 86_400_000;

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  window.history.replaceState(null, "", "/");
});

describe("the English reminder opens the card it carried", () => {
  it("puts the card id in the address", () => {
    const at = new Date("2026-12-24T18:00:00Z");
    const card = englishReminderCard(at, "dag", pool);
    const id = vaelgForDato(danishDateKey(at), dailyPool).q.id;
    expect(card.url).toBe(`/daily-question/?card=${id}`);
  });

  it("shows that card when the notification is opened on a later day", () => {
    const at = new Date("2026-12-24T18:00:00Z");
    // A day later the card of the day is another one
    let later = new Date(at.getTime() + dayMs);
    while (vaelgForDato(danishDateKey(later), dailyPool).q.id === vaelgForDato(danishDateKey(at), dailyPool).q.id) {
      later = new Date(later.getTime() + dayMs);
    }
    const card = englishReminderCard(at, "dag", pool);
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(later);
    window.history.replaceState(null, "", card.url);

    render(<DailyCard buildKey={danishDateKey(later)} pool={dailyPool} app />);
    const today = screen.getByRole("region", { name: "Today's card" });
    expect(today.textContent).toContain(card.body);
    expect(today.textContent).not.toContain(vaelgForDato(danishDateKey(later), dailyPool).q.text);
  });

  it("falls back to the card of the day for an unknown id, and the website ignores ?card=", () => {
    const now = new Date("2026-12-24T18:00:00Z");
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(now);
    const ofTheDay = vaelgForDato(danishDateKey(now), dailyPool).q.text;
    const other = dailyPool.find((p) => p.q.text !== ofTheDay)!.q;

    window.history.replaceState(null, "", "/daily-question/?card=no-such-card");
    render(<DailyCard buildKey={danishDateKey(now)} pool={dailyPool} app />);
    expect(screen.getByRole("region", { name: "Today's card" }).textContent).toContain(ofTheDay);
    cleanup();

    window.history.replaceState(null, "", `/daily-question/?card=${other.id}`);
    render(<DailyCard buildKey={danishDateKey(now)} pool={dailyPool} />);
    expect(screen.getByRole("region", { name: "Today's card" }).textContent).toContain(ofTheDay);
  });
});
