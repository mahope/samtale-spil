/**
 * Plausible custom events. Cookieless; props never contain question text typed by
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

export function track(event: string, props: Props = {}): void {
  if (typeof window === "undefined") return;
  const plausible = (window as unknown as { plausible?: PlausibleFn }).plausible;
  if (typeof plausible !== "function") return;
  try {
    plausible(event, { props: { ...props, platform: platform() } });
  } catch {
    // analytics must never break the game
  }
}
