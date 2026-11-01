/**
 * Custom events, sent to Plausible and Umami side by side (transition period; keep both
 * receiving the same events). Cookieless; props never contain question text typed by
 * the player, only ids, category and depth. Event names are Danish, so the
 * Plausible dashboard reads naturally; goals must exist in Plausible to show up.
 */

type Props = Record<string, string | number | boolean>;

type PlausibleFn = (event: string, options?: { props?: Props }) => void;

export function platform(): "ios" | "android" | "web" {
  if (typeof window === "undefined") return "web";
  const cap = (window as unknown as { Capacitor?: { getPlatform?: () => string } }).Capacitor;
  const p = cap?.getPlatform?.();
  return p === "ios" || p === "android" ? p : "web";
}

declare global {
  interface Window {
    umami?: { track: (event: string, data?: Record<string, unknown>) => void };
  }
}

/** Umami has no queue before its script loads: retry for up to 15 s instead of dropping the event. */
export function umamiTrack(event: string, data?: Record<string, unknown>, waited = 0): void {
  if (typeof window === "undefined") return;
  try {
    if (window.umami) window.umami.track(event, data);
    else if (waited < 15000) setTimeout(() => umamiTrack(event, data, waited + 500), 500);
  } catch {
    // analytics must never break the game
  }
}

export function track(event: string, props: Props = {}): void {
  if (typeof window === "undefined") return;
  try {
    const all = { ...props, platform: platform() };
    umamiTrack(event, all);
    const plausible = (window as unknown as { plausible?: PlausibleFn }).plausible;
    if (typeof plausible === "function") plausible(event, { props: all });
  } catch {
    // analytics must never break the game
  }
}
