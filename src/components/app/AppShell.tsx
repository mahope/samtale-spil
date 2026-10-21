"use client";

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { TabBar, type TabSpec } from "./TabBar";
import { currentPlatform, isPopping, isStill, markPop, normalizePath, recordNavigation } from "./navState";

type Direction = "none" | "push" | "pop" | "tab";

/** Where the user had scrolled to on each screen, so a tab comes back where it was left */
const scrollPositions = new Map<string, number>();

/**
 * The app around every screen: a tab bar (hidden on the full-screen game table), the slide
 * between screens, and Material ripples on Android. Screens draw their own navigation bar
 * with AppScreen. Generic: Snakkespil passes its tabs from layout.app.tsx.
 */
export function AppShell({ tabs, fullscreen, children }: { tabs: TabSpec[]; fullscreen: string[]; children: ReactNode }) {
  const pathname = normalizePath(usePathname() ?? "/");
  const roots = tabs.map((t) => t.href);
  const isFullscreen = fullscreen.some((p) => pathname.startsWith(p));

  const depth = (path: string) => (roots.includes(path) ? 0 : path.split("/").filter(Boolean).length);
  const [nav, setNav] = useState<{ path: string; dir: Direction; tab: string }>(() => ({
    path: pathname,
    dir: "none",
    tab: tabFor(pathname, tabs, null),
  }));
  if (nav.path !== pathname) {
    const from = depth(nav.path);
    const to = depth(pathname);
    const dir: Direction = isStill() ? "none" : isPopping() || to < from ? "pop" : to === 0 && from === 0 ? "tab" : "push";
    setNav({ path: pathname, dir, tab: tabFor(pathname, tabs, nav.tab) });
  }

  useEffect(() => {
    recordNavigation(pathname);
    if (nav.dir !== "tab" && nav.dir !== "pop") return;
    const y = scrollPositions.get(pathname);
    if (!y) return;
    // After the router has scrolled the new screen to the top
    const frame = requestAnimationFrame(() => window.scrollTo(0, y));
    return () => cancelAnimationFrame(frame);
  }, [pathname, nav.dir]);

  // Games on the felt get a felt strip under the status bar (app-shell.css, NativeBoot)
  const screenRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const el = screenRef.current;
    if (!el || !isFullscreen) return;
    const update = () => el.classList.toggle("app-felt", !!el.querySelector(":scope > .filt, :scope > main.filt"));
    update();
    const observer = new MutationObserver(update);
    observer.observe(el, { childList: true });
    return () => observer.disconnect();
  }, [pathname, isFullscreen]);

  useEffect(() => {
    // Remember the scroll position before every navigation, and spot steps back
    const save = () => scrollPositions.set(normalizePath(window.location.pathname), window.scrollY);
    const onPop = () => {
      save();
      markPop();
    };
    // A Material ripple from the touch point on rows, tiles and tabs (Android only)
    const ripple = (e: PointerEvent) => {
      if (currentPlatform() !== "android") return;
      const host = (e.target as Element | null)?.closest?.("[data-ripple]") as HTMLElement | null;
      if (!host) return;
      const rect = host.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 2;
      const dot = document.createElement("span");
      dot.className = "app-ripple";
      dot.style.width = dot.style.height = `${size}px`;
      dot.style.left = `${e.clientX - rect.left - size / 2}px`;
      dot.style.top = `${e.clientY - rect.top - size / 2}px`;
      host.appendChild(dot);
      dot.addEventListener("animationend", () => dot.remove());
    };
    document.addEventListener("click", save, true);
    window.addEventListener("popstate", onPop);
    document.addEventListener("pointerdown", ripple);
    return () => {
      document.removeEventListener("click", save, true);
      window.removeEventListener("popstate", onPop);
      document.removeEventListener("pointerdown", ripple);
    };
  }, []);

  return (
    <>
      <div key={pathname} ref={screenRef} className={`app-screen app-${nav.dir}${isFullscreen ? "" : " app-has-tabbar"}`}>
        {children}
      </div>
      {!isFullscreen && <TabBar tabs={tabs} active={nav.tab} pathname={pathname} />}
    </>
  );
}

/**
 * The tab a screen belongs to: a tab root is its own tab; other screens stay on the tab the
 * user came from (like a pushed screen on iOS), or fall back to the tab that owns the path.
 */
function tabFor(path: string, tabs: TabSpec[], current: string | null): string {
  const root = tabs.find((t) => t.href === path);
  if (root) return root.href;
  if (current) return current;
  const owner = tabs.find((t) => t.owns?.some((p) => path.startsWith(p)));
  return (owner ?? tabs[0]).href;
}
