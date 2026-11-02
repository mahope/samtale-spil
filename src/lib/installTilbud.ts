/**
 * Logic for the small "install the app" card on the web game screen (issue #96).
 * Pure functions plus thin storage helpers, so it can be tested without a browser.
 * No cookies: the dismissal lives in localStorage under a samtale-spil- key.
 */

export const INSTALL_DISMISSED_KEY = "samtale-spil-install-dismissed";
/** Cards drawn in one session before the offer shows */
export const INSTALL_AFTER_CARDS = 3;
export const INSTALL_SNOOZE_DAYS = 30;
const DAY_MS = 24 * 60 * 60 * 1000;

export type InstallKind = "android" | "ios";

/** True while a dismissal is younger than the snooze. A broken or future value counts as not dismissed. */
export function isSnoozed(dismissedAt: number | null, now: number): boolean {
  if (dismissedAt === null || !Number.isFinite(dismissedAt)) return false;
  if (dismissedAt > now) return false;
  return now - dismissedAt < INSTALL_SNOOZE_DAYS * DAY_MS;
}

export function readDismissedAt(storage: Pick<Storage, "getItem">): number | null {
  try {
    const raw = storage.getItem(INSTALL_DISMISSED_KEY);
    if (raw === null) return null;
    const n = Number(raw);
    return Number.isFinite(n) ? n : null;
  } catch {
    return null;
  }
}

export function writeDismissedAt(storage: Pick<Storage, "setItem">, now: number): void {
  try {
    storage.setItem(INSTALL_DISMISSED_KEY, String(now));
  } catch {
    // private mode: the card simply comes back next session
  }
}

/** iPhone/iPad in Safari (iPadOS reports itself as a Mac with touch). Other iOS browsers cannot add to the home screen the same way. */
export function isIosSafari(ua: string, maxTouchPoints: number): boolean {
  const ios = /iPhone|iPad|iPod/.test(ua) || (/Macintosh/.test(ua) && maxTouchPoints > 1);
  if (!ios) return false;
  return !/CriOS|FxiOS|EdgiOS|OPiOS|GSA\//.test(ua);
}

export interface InstallContext {
  cardsThisSession: number;
  standalone: boolean;
  native: boolean;
  appShell: boolean;
  dismissedAt: number | null;
  now: number;
  /** a deferred beforeinstallprompt event is available (Android/Chrome) */
  hasPrompt: boolean;
  ios: boolean;
}

/** Which variant of the offer to show, or null for none. */
export function installOffer(c: InstallContext): InstallKind | null {
  if (c.standalone || c.native || c.appShell) return null;
  if (c.cardsThisSession < INSTALL_AFTER_CARDS) return null;
  if (isSnoozed(c.dismissedAt, c.now)) return null;
  if (c.hasPrompt) return "android";
  if (c.ios) return "ios";
  return null;
}
