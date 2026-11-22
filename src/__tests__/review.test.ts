import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { reviewUrl } from "@/config/review";
import { DAY_MS, REVIEW_STATE_KEY } from "@/lib/reviewPrompt";

const native = vi.hoisted(() => ({ on: false }));
const requestReview = vi.hoisted(() => vi.fn());

vi.mock("@/lib/platform", () => ({ isNative: () => native.on }));
vi.mock("@capacitor/app", () => ({ App: { getInfo: async () => ({ version: "2.1.2", build: "57" }) } }));
vi.mock("@capacitor-community/in-app-review", () => ({ InAppReview: { requestReview } }));

import { noteAppOpen, noteError, noteGameCompleted, REVIEW_DELAY_MS } from "@/lib/review";

const NOW = new Date(2026, 5, 1, 12, 0, 0).getTime();

/** A player who qualifies: first opened 30 days ago, 3 days of use */
const qualifying = () =>
  localStorage.setItem(
    REVIEW_STATE_KEY,
    JSON.stringify({ firstOpenAt: NOW - 30 * DAY_MS, days: ["2026-05-01", "2026-05-10", "2026-05-20"], games: 0, lastRequestAt: null, lastRequestVersion: null })
  );

const settle = async () => {
  await vi.advanceTimersByTimeAsync(REVIEW_DELAY_MS + 50);
};

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(NOW);
  localStorage.clear();
  noteError(0); // lastErrorAt is module state: reset it so tests do not depend on order
  requestReview.mockReset();
  requestReview.mockResolvedValue(undefined);
  native.on = true;
});

afterEach(() => {
  vi.useRealTimers();
});

describe("review integration", () => {
  it("does nothing on the web: no state, no dialog", async () => {
    native.on = false;
    qualifying();
    const before = localStorage.getItem(REVIEW_STATE_KEY);
    noteAppOpen();
    noteGameCompleted();
    await settle();
    expect(requestReview).not.toHaveBeenCalled();
    expect(localStorage.getItem(REVIEW_STATE_KEY)).toBe(before);
  });

  it("asks once at a finished game for a qualifying player, after the delay, and records it", async () => {
    qualifying();
    noteGameCompleted();
    expect(requestReview).not.toHaveBeenCalled();
    await settle();
    expect(requestReview).toHaveBeenCalledTimes(1);
    const saved = JSON.parse(localStorage.getItem(REVIEW_STATE_KEY)!);
    expect(saved.lastRequestVersion).toBe("2.1.2");
    // a second finished game on the same version never asks again
    noteGameCompleted();
    await settle();
    expect(requestReview).toHaveBeenCalledTimes(1);
  });

  it("does not ask on the first open, even after a finished game", async () => {
    noteAppOpen();
    noteGameCompleted();
    await settle();
    expect(requestReview).not.toHaveBeenCalled();
  });

  it("does not ask right after an error", async () => {
    qualifying();
    noteError(NOW - 1000);
    noteGameCompleted();
    await settle();
    expect(requestReview).not.toHaveBeenCalled();
  });

  it("never asks in the 18+ app", async () => {
    vi.stubEnv("APP_VARIANT", "voksen");
    qualifying();
    noteGameCompleted();
    await settle();
    vi.unstubAllEnvs();
    expect(requestReview).not.toHaveBeenCalled();
  });

  it("swallows a failing plugin", async () => {
    qualifying();
    requestReview.mockRejectedValue(new Error("not available"));
    const unhandled = vi.fn();
    process.on("unhandledRejection", unhandled);
    expect(() => noteGameCompleted()).not.toThrow();
    await settle();
    process.off("unhandledRejection", unhandled);
    expect(requestReview).toHaveBeenCalledTimes(1);
    expect(unhandled).not.toHaveBeenCalled();
  });

  it("survives broken stored state", async () => {
    localStorage.setItem(REVIEW_STATE_KEY, "{not json");
    expect(() => {
      noteAppOpen();
      noteGameCompleted();
    }).not.toThrow();
    await settle();
    expect(requestReview).not.toHaveBeenCalled();
  });
});

describe("reviewUrl", () => {
  it("is null on iOS while the App Store id is empty (it ships empty) and on the web", () => {
    expect(reviewUrl("ios", true)).toBeNull();
    expect(reviewUrl("web", true)).toBeNull();
  });

  it("opens Play's page on Android only once the Android store is live", () => {
    expect(reviewUrl("android", false)).toBeNull();
    expect(reviewUrl("android", true)).toContain("id=dk.snakkespil.app");
  });
});
