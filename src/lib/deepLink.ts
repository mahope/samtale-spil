/** Paths on snakkespil.dk that the Snakkespil app (dk.snakkespil.app) opens. Keep in sync with
 * public/.well-known/apple-app-site-association and the Android intent filter (a test checks both). */
export const DEEP_LINK_PATHS = [
  "/",
  "/spil/*",
  "/multiplayer/*",
  "/dagens-spoergsmaal/*",
  "/favoritter/*",
  "/mere/*",
  "/indstillinger/*",
  "/mine-spoergsmaal/*",
  "/statistik/*",
  "/saadan-spiller-i/*",
  "/lege/*",
  "/om/*",
  "/privatliv/*",
];

export const DEEP_LINK_HOST = "snakkespil.dk";

/** The in-app route for an opened link, or "/" for anything the app does not have */
export function deepLinkRoute(url: string): string {
  try {
    const u = new URL(url);
    if (u.protocol !== "https:" || u.hostname !== DEEP_LINK_HOST) return "/";
    const known = DEEP_LINK_PATHS.some((p) =>
      p.endsWith("/*") ? u.pathname.startsWith(p.slice(0, -1)) : u.pathname === p,
    );
    return known ? u.pathname + u.search : "/";
  } catch {
    return "/";
  }
}
