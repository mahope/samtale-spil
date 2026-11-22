/**
 * When to ask for an App Store / Play rating. Pure: the clock and the app version are passed in,
 * nothing here touches the device. The integration (src/lib/review.ts) stores the state, calls
 * the system dialog and swallows every error.
 *
 * The rules (anb:051, Apple guideline 5.6.1: no pre-screening of happy and unhappy users):
 * - only at a positive moment, a finished game (the caller says so by calling this then)
 * - at least 3 different days of use OR 5 finished games
 * - at least 7 days since the first launch
 * - at least 90 days since the last request
 * - at most once per app version
 * - never right after an error
 */

export const REVIEW_STATE_KEY = "samtale-spil-review";

export const MIN_DAYS_OF_USE = 3;
export const MIN_GAMES = 5;
export const MIN_DAYS_SINCE_FIRST_OPEN = 7;
export const MIN_DAYS_BETWEEN_REQUESTS = 90;
/** An error this recently blocks a request */
export const ERROR_COOLDOWN_MS = 10 * 60 * 1000;

export const DAY_MS = 24 * 60 * 60 * 1000;

export interface ReviewState {
  /** Epoch ms of the first launch, null until it has been recorded */
  firstOpenAt: number | null;
  /** Local calendar days (YYYY-MM-DD) the app was opened, newest last, capped at MAX_DAYS_KEPT */
  days: string[];
  /** Finished games, capped at MIN_GAMES (only the threshold matters) */
  games: number;
  /** Epoch ms of the last request, null if never asked */
  lastRequestAt: number | null;
  /** App version the last request was made on */
  lastRequestVersion: string | null;
}

export const EMPTY_REVIEW_STATE: ReviewState = {
  firstOpenAt: null,
  days: [],
  games: 0,
  lastRequestAt: null,
  lastRequestVersion: null,
};

const MAX_DAYS_KEPT = 10;

/** Local calendar day, YYYY-MM-DD */
export function dayKey(at: number): string {
  const d = new Date(at);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

const isTime = (v: unknown): v is number => typeof v === "number" && Number.isFinite(v) && v >= 0;

/** Fills in anything missing or malformed in stored data; never throws */
export function normalizeReviewState(parsed: unknown): ReviewState {
  if (!parsed || typeof parsed !== "object") return { ...EMPTY_REVIEW_STATE, days: [] };
  const p = parsed as Record<string, unknown>;
  const days = Array.isArray(p.days)
    ? p.days.filter((d): d is string => typeof d === "string" && /^\d{4}-\d{2}-\d{2}$/.test(d)).slice(-MAX_DAYS_KEPT)
    : [];
  const games = typeof p.games === "number" && Number.isInteger(p.games) && p.games > 0 ? Math.min(p.games, MIN_GAMES) : 0;
  return {
    firstOpenAt: isTime(p.firstOpenAt) ? p.firstOpenAt : null,
    days,
    games,
    lastRequestAt: isTime(p.lastRequestAt) ? p.lastRequestAt : null,
    lastRequestVersion: typeof p.lastRequestVersion === "string" && p.lastRequestVersion ? p.lastRequestVersion : null,
  };
}

/** The app was opened (or came back to the front) at `now` */
export function recordOpen(state: ReviewState, now: number): ReviewState {
  const key = dayKey(now);
  const days = state.days.includes(key) ? state.days : [...state.days, key].slice(-MAX_DAYS_KEPT);
  return { ...state, firstOpenAt: state.firstOpenAt ?? now, days };
}

/** A game was played to the end */
export function recordGame(state: ReviewState): ReviewState {
  return { ...state, games: Math.min(state.games + 1, MIN_GAMES) };
}

/** A request was made now, on this version */
export function recordRequest(state: ReviewState, now: number, version: string): ReviewState {
  return { ...state, lastRequestAt: now, lastRequestVersion: version };
}

export interface ReviewContext {
  /** Epoch ms, injected */
  now: number;
  /** App version, e.g. "2.1.2"; null when unknown, which never asks */
  version: string | null;
  /** Epoch ms of the last error shown to the player in this session, or null */
  lastErrorAt: number | null;
}

export type ReviewVerdict =
  | { ask: true }
  | {
      ask: false;
      reason: "no-version" | "first-open" | "too-soon" | "not-enough-use" | "recent-request" | "same-version" | "recent-error";
    };

/** Call at a finished-game moment, after recordOpen/recordGame. */
export function shouldRequestReview(state: ReviewState, ctx: ReviewContext): ReviewVerdict {
  if (!ctx.version) return { ask: false, reason: "no-version" };
  if (state.firstOpenAt === null) return { ask: false, reason: "first-open" };
  if (ctx.lastErrorAt !== null && ctx.now - ctx.lastErrorAt < ERROR_COOLDOWN_MS) return { ask: false, reason: "recent-error" };
  if (ctx.now - state.firstOpenAt < MIN_DAYS_SINCE_FIRST_OPEN * DAY_MS) return { ask: false, reason: "too-soon" };
  if (state.days.length < MIN_DAYS_OF_USE && state.games < MIN_GAMES) return { ask: false, reason: "not-enough-use" };
  if (state.lastRequestVersion === ctx.version) return { ask: false, reason: "same-version" };
  if (state.lastRequestAt !== null && ctx.now - state.lastRequestAt < MIN_DAYS_BETWEEN_REQUESTS * DAY_MS) {
    return { ask: false, reason: "recent-request" };
  }
  return { ask: true };
}
