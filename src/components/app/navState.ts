"use client";

/**
 * What the app shell remembers about navigation within one session: the stack of screens the
 * user pushed (so a back button can say where it goes and use history.back()), the titles of
 * those screens, and whether the next navigation is a step back (for the slide direction).
 * Module state on purpose: it lives as long as the web view and needs no re-render.
 */
const stack: string[] = [];
const titles = new Map<string, string>();
let popping = false;
let still = false;

export const normalizePath = (path: string) => (path.endsWith("/") ? path : `${path}/`);

/** Called by AppShell when the pathname changes */
export function recordNavigation(path: string) {
  const p = normalizePath(path);
  const at = stack.lastIndexOf(p);
  if (popping && at >= 0) stack.length = at + 1;
  else if (stack[stack.length - 1] !== p) stack.push(p);
  popping = false;
  still = false;
}

/**
 * The screen below this one, if the user came from inside the app. Works both before and after
 * AppShell has recorded this screen (screens render before the shell's effect runs).
 */
export function previousScreen(path: string): { path: string; title?: string } | null {
  const p = normalizePath(path);
  const at = stack.lastIndexOf(p);
  const top = stack.length - 1;
  let prev: string | undefined;
  if (popping && at >= 0) prev = stack[at - 1];
  else if (at >= 0 && at === top) prev = stack[top - 1];
  else if (stack[top] !== p) prev = stack[top];
  return prev ? { path: prev, title: titles.get(prev) } : null;
}

export function rememberTitle(path: string, title: string) {
  titles.set(normalizePath(path), title);
}

/** Mark the coming navigation as a step back (back button, edge swipe, browser back) */
export function markPop() {
  popping = true;
}

export function isPopping() {
  return popping;
}

/** The edge swipe has already moved the screen away, so the next screen should not slide in */
export function markStill() {
  still = true;
}

export function isStill() {
  return still;
}

export function currentPlatform(): "ios" | "android" | "web" {
  if (typeof document === "undefined") return "web";
  const p = document.documentElement.dataset.platform;
  return p === "ios" || p === "android" ? p : "web";
}
