"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { tap } from "@/lib/platform";
import { ui } from "@/locale/ui";
import { IconChevronVenstre, IconPilVenstre } from "./icons";
import { currentPlatform, markPop, markStill, previousScreen, rememberTitle } from "./navState";

interface AppScreenProps {
  title: string;
  /** Where back goes when the screen was opened directly; without it the screen is a tab root */
  back?: { href: string; label: string };
  /** Shown to the right in the navigation bar */
  actions?: ReactNode;
  /** data-route on <main>; NativeBoot looks for "forside" */
  route?: string;
  children: ReactNode;
}

/**
 * One screen of the app: a navigation bar and the content under it.
 * Tab roots get a large title that folds into the bar when you scroll (iOS large title,
 * Material medium top app bar). Pushed screens get a compact bar with a back button, and on
 * iOS they can be swiped away from the left edge.
 */
export function AppScreen({ title, back, actions, route, children }: AppScreenProps) {
  const router = useRouter();
  const pathname = usePathname() ?? "/";
  const isRoot = !back;
  // Screens render before the shell records them, so this is the screen we came from
  const [prev] = useState(() => (back ? previousScreen(pathname) : null));
  const backLabel = prev?.title ?? back?.label ?? "";
  const [scrolled, setScrolled] = useState(false);
  const largeRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => rememberTitle(pathname, title), [pathname, title]);

  // The bar fills in (and the small title appears) once the content scrolls under it
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const large = largeRef.current;
      const limit = large ? large.offsetTop + large.offsetHeight - 52 : 1;
      setScrolled(window.scrollY > Math.max(limit, 1));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const goBack = () => {
    if (!back) return;
    tap();
    markPop();
    if (prev) router.back();
    else router.replace(back.href);
  };

  // iOS: drag the screen away from the left edge to go back
  const goBackRef = useRef(goBack);
  useEffect(() => {
    goBackRef.current = goBack;
  });
  useEffect(() => {
    if (!back) return;
    const page = pageRef.current;
    if (!page) return;
    let startX = 0;
    let startY = 0;
    let startT = 0;
    let dx = 0;
    let state: "idle" | "maybe" | "drag" = "idle";

    const reset = () => {
      page.style.transition = "transform 0.22s cubic-bezier(0.2, 0.8, 0.2, 1)";
      page.style.transform = "";
      page.classList.remove("app-dragging");
      state = "idle";
    };
    const onStart = (e: TouchEvent) => {
      if (currentPlatform() !== "ios" || e.touches.length !== 1) return;
      const t = e.touches[0];
      if (t.clientX > 24) return;
      startX = t.clientX;
      startY = t.clientY;
      startT = e.timeStamp;
      dx = 0;
      state = "maybe";
    };
    const onMove = (e: TouchEvent) => {
      if (state === "idle") return;
      const t = e.touches[0];
      dx = Math.max(0, t.clientX - startX);
      const dy = Math.abs(t.clientY - startY);
      if (state === "maybe") {
        if (dy > 10 && dy > dx) return reset();
        if (dx < 8) return;
        state = "drag";
        page.style.transition = "none";
        page.classList.add("app-dragging");
      }
      e.preventDefault();
      page.style.transform = `translateX(${dx}px)`;
    };
    const onEnd = (e: TouchEvent) => {
      if (state !== "drag") return reset();
      const fast = dx / Math.max(e.timeStamp - startT, 1) > 0.5;
      if (dx > window.innerWidth * 0.35 || (fast && dx > 40)) {
        page.style.transition = "transform 0.2s ease-out";
        page.style.transform = "translateX(100%)";
        state = "idle";
        markStill();
        window.setTimeout(() => goBackRef.current(), 180);
      } else reset();
    };
    document.addEventListener("touchstart", onStart, { passive: true });
    document.addEventListener("touchmove", onMove, { passive: false });
    document.addEventListener("touchend", onEnd);
    document.addEventListener("touchcancel", reset);
    return () => {
      document.removeEventListener("touchstart", onStart);
      document.removeEventListener("touchmove", onMove);
      document.removeEventListener("touchend", onEnd);
      document.removeEventListener("touchcancel", reset);
    };
  }, [back]);

  const TitleTag = isRoot ? "div" : "h1";

  return (
    <div ref={pageRef} className="app-page min-h-dvh bg-papir">
      <header className="app-navbar sticky top-0 z-30 select-none pt-[var(--app-inset-top)]" data-scrolled={scrolled ? "" : undefined}>
        <div className="relative flex h-11 items-center gap-1 px-2 android:h-16 android:px-1">
          {back && (
            <button
              type="button"
              onClick={goBack}
              data-ripple
              className="app-press relative z-10 -ml-0.5 flex min-h-11 min-w-11 max-w-[45%] items-center text-bord dark:text-kridt android:ml-0 android:h-12 android:w-12 android:max-w-none android:justify-center android:overflow-hidden android:rounded-full android:text-blaek android:dark:text-blaek"
              aria-label={ui.shell.backTo(backLabel)}
            >
              <IconChevronVenstre className="h-[1.4rem] w-[1.4rem] shrink-0 android:hidden" />
              <IconPilVenstre className="hidden h-6 w-6 android:block" />
              <span className="truncate text-[17px] leading-none android:hidden" aria-hidden="true">
                {backLabel}
              </span>
            </button>
          )}
          <TitleTag
            className={`app-bar-title font-display pointer-events-none absolute inset-x-[25%] truncate text-center text-[17px] font-semibold leading-none tracking-[-0.01em] android:static android:inset-x-auto android:flex-1 android:px-3 android:text-left android:text-[22px] android:font-medium ${
              isRoot ? "app-bar-title-fold" : ""
            }`}
            aria-hidden={isRoot ? true : undefined}
          >
            {title}
          </TitleTag>
          {actions && <div className="relative z-10 ml-auto flex items-center">{actions}</div>}
        </div>
      </header>

      {isRoot && (
        <div ref={largeRef} className="px-4 pb-2 pt-0.5 android:px-4 android:pb-4 android:pt-2">
          <h1
            className="font-display text-[34px] font-bold leading-[1.1] tracking-[-0.02em] android:text-[28px] android:font-semibold android:tracking-[-0.01em]"
            style={{ fontStretch: "90%" }}
          >
            {title}
          </h1>
        </div>
      )}

      <main id="main-content" data-route={route} className="pb-8">
        {children}
      </main>
    </div>
  );
}
