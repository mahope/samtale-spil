import { describe, expect, it } from "vitest";
import {
  DAY_MS,
  EMPTY_REVIEW_STATE,
  normalizeReviewState,
  recordGame,
  recordOpen,
  recordRequest,
  shouldRequestReview,
  type ReviewState,
} from "@/lib/reviewPrompt";

const T0 = new Date(2026, 0, 1, 12, 0, 0).getTime();
const V = "2.1.2";

/** A player who qualifies on use (3 days) with first open `ageDays` ago */
const state = (over: Partial<ReviewState> = {}, ageDays = 30): ReviewState => ({
  ...EMPTY_REVIEW_STATE,
  firstOpenAt: T0 - ageDays * DAY_MS,
  days: ["2026-01-01", "2025-12-30", "2025-12-28"],
  games: 0,
  ...over,
});
const ctx = (over: Partial<{ now: number; version: string | null; lastErrorAt: number | null }> = {}) => ({
  now: T0,
  version: V,
  lastErrorAt: null,
  ...over,
});

describe("shouldRequestReview", () => {
  it("asks when every condition holds", () => {
    expect(shouldRequestReview(state(), ctx())).toEqual({ ask: true });
  });

  it("never asks on the first open", () => {
    expect(shouldRequestReview(EMPTY_REVIEW_STATE, ctx())).toEqual({ ask: false, reason: "first-open" });
    const justOpened = recordOpen(EMPTY_REVIEW_STATE, T0);
    expect(shouldRequestReview(recordGame(justOpened), ctx()).ask).toBe(false);
  });

  it("needs 7 full days since the first open: 6 days no, 7 days yes", () => {
    expect(shouldRequestReview(state({}, 6), ctx())).toEqual({ ask: false, reason: "too-soon" });
    expect(shouldRequestReview(state({ firstOpenAt: T0 - 7 * DAY_MS + 1 }), ctx()).ask).toBe(false);
    expect(shouldRequestReview(state({}, 7), ctx())).toEqual({ ask: true });
  });

  it("needs 90 days since the last request: 89 days no, 90 days yes", () => {
    const old = (days: number) => state({ lastRequestAt: T0 - days * DAY_MS, lastRequestVersion: "2.0.0" });
    expect(shouldRequestReview(old(89), ctx())).toEqual({ ask: false, reason: "recent-request" });
    expect(shouldRequestReview(old(90), ctx())).toEqual({ ask: true });
  });

  it("asks at most once per app version, even long after the last request", () => {
    const s = state({ lastRequestAt: T0 - 400 * DAY_MS, lastRequestVersion: V });
    expect(shouldRequestReview(s, ctx())).toEqual({ ask: false, reason: "same-version" });
    expect(shouldRequestReview(s, ctx({ version: "2.1.3" }))).toEqual({ ask: true });
  });

  it("does not ask twice on one version once the first request is recorded", () => {
    const first = recordRequest(state(), T0, V);
    expect(shouldRequestReview(first, ctx({ now: T0 + 200 * DAY_MS })).ask).toBe(false);
  });

  it("needs 3 different days or 5 finished games", () => {
    const twoDays = state({ days: ["2026-01-01", "2025-12-30"], games: 4 });
    expect(shouldRequestReview(twoDays, ctx())).toEqual({ ask: false, reason: "not-enough-use" });
    expect(shouldRequestReview({ ...twoDays, games: 5 }, ctx())).toEqual({ ask: true });
    expect(shouldRequestReview({ ...twoDays, days: [...twoDays.days, "2025-12-29"] }, ctx())).toEqual({ ask: true });
  });

  it("does not ask without a known version", () => {
    expect(shouldRequestReview(state(), ctx({ version: null }))).toEqual({ ask: false, reason: "no-version" });
  });

  it("does not ask right after an error, but does once the cooldown has passed", () => {
    expect(shouldRequestReview(state(), ctx({ lastErrorAt: T0 - 60_000 }))).toEqual({ ask: false, reason: "recent-error" });
    expect(shouldRequestReview(state(), ctx({ lastErrorAt: T0 - 11 * 60_000 }))).toEqual({ ask: true });
  });
});

describe("state updates", () => {
  it("records the first open once and counts a day once", () => {
    const a = recordOpen(EMPTY_REVIEW_STATE, T0);
    const b = recordOpen(a, T0 + 1000);
    const c = recordOpen(b, T0 + DAY_MS);
    expect(c.firstOpenAt).toBe(T0);
    expect(b.days).toHaveLength(1);
    expect(c.days).toHaveLength(2);
  });

  it("caps the game count and the list of days", () => {
    let s: ReviewState = EMPTY_REVIEW_STATE;
    for (let i = 0; i < 20; i++) s = recordGame(s);
    expect(s.games).toBe(5);
    for (let i = 0; i < 30; i++) s = recordOpen(s, T0 + i * DAY_MS);
    expect(s.days.length).toBeLessThanOrEqual(10);
  });

  it("normalizes broken stored data", () => {
    expect(normalizeReviewState(null)).toEqual(EMPTY_REVIEW_STATE);
    expect(normalizeReviewState("x")).toEqual(EMPTY_REVIEW_STATE);
    expect(normalizeReviewState({ firstOpenAt: "nu", days: [1, "2026-01-01", "x"], games: -3, lastRequestAt: NaN })).toEqual({
      ...EMPTY_REVIEW_STATE,
      days: ["2026-01-01"],
    });
  });
});
