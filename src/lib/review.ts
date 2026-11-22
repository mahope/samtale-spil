"use client";

/**
 * The system rating dialog (StoreKit / Play In-App Review) at a finished game. Native builds
 * only: on the web every function here does nothing. Every call is wrapped: a failed or
 * unavailable dialog must never reach the player. The decision lives in ./reviewPrompt.ts.
 *
 * Note: Apple and Google decide whether the dialog actually shows (quota, already rated), and
 * neither tells the app. We record that we asked, not that anything appeared.
 */
import { isNative } from "@/lib/platform";
import {
  REVIEW_STATE_KEY,
  normalizeReviewState,
  recordGame,
  recordOpen,
  recordRequest,
  shouldRequestReview,
  type ReviewState,
} from "@/lib/reviewPrompt";

/** The celebration of a finished game plays first; the dialog comes after it */
export const REVIEW_DELAY_MS = 2500;

let lastErrorAt: number | null = null;
let pending: ReturnType<typeof setTimeout> | null = null;

function load(): ReviewState {
  try {
    const raw = window.localStorage.getItem(REVIEW_STATE_KEY);
    return normalizeReviewState(raw ? JSON.parse(raw) : null);
  } catch {
    return normalizeReviewState(null);
  }
}

function save(state: ReviewState) {
  try {
    window.localStorage.setItem(REVIEW_STATE_KEY, JSON.stringify(state));
  } catch {
    // not remembered: worst case we ask a little later, never earlier
  }
}

async function appVersionNumber(): Promise<string | null> {
  const { App } = await import("@capacitor/app");
  return (await App.getInfo()).version || null;
}

/** The app opened or came back to the front: counts the first open and the day of use */
export function noteAppOpen(now: number = Date.now()): void {
  if (!isNative()) return;
  try {
    save(recordOpen(load(), now));
  } catch {
    // never reaches the player
  }
}

/** An error screen was shown: no request for a while */
export function noteError(now: number = Date.now()): void {
  lastErrorAt = now;
  if (pending) {
    clearTimeout(pending);
    pending = null;
  }
}

/**
 * A game was played to the end. Counts it and, if the rules allow, asks once the celebration
 * has played. Call only at a real finish, never mid-game.
 */
export function noteGameCompleted(now: number = Date.now()): void {
  if (!isNative() || process.env.APP_VARIANT === "voksen") return; // the 18+ app never asks
  try {
    const state = recordGame(recordOpen(load(), now));
    save(state);
    if (pending) clearTimeout(pending);
    pending = setTimeout(() => {
      pending = null;
      void requestIfAllowed();
    }, REVIEW_DELAY_MS);
  } catch {
    // never reaches the player
  }
}

async function requestIfAllowed(): Promise<void> {
  try {
    const version = await appVersionNumber();
    const now = Date.now();
    const current = load();
    const verdict = shouldRequestReview(current, { now, version, lastErrorAt });
    if (!verdict.ask || !version) return;
    // Record first: if the plugin throws we still do not ask again on this version
    save(recordRequest(current, now, version));
    const { InAppReview } = await import("@capacitor-community/in-app-review");
    await InAppReview.requestReview();
  } catch {
    // unavailable, rate limited or failed: the player sees nothing
  }
}
