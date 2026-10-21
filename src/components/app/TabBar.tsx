"use client";

import Link from "next/link";
import { tap } from "@/lib/platform";
import { TAB_ICONS, type TabIcon } from "./icons";

export interface TabSpec {
  href: string;
  label: string;
  icon: TabIcon;
  /** Path prefixes that belong to this tab when a screen is opened directly (a link, a notification) */
  owns?: string[];
}

/**
 * Bottom navigation. iOS: a translucent 49pt tab bar with a hairline, icon over a 10pt label.
 * Android: a Material 3 navigation bar, 80dp, with the active icon in a pill.
 */
export function TabBar({ tabs, active, pathname }: { tabs: TabSpec[]; active: string; pathname: string }) {
  return (
    <nav
      aria-label="Faner"
      className="app-tabbar fixed inset-x-0 bottom-0 z-40 select-none border-t-[0.5px] border-streg bg-papir/80 pb-[var(--app-inset-bottom)] backdrop-blur-xl backdrop-saturate-150 android:border-t-0 android:bg-flade-2 android:backdrop-blur-none"
    >
      <ul className="mx-auto flex h-[49px] max-w-xl android:h-20">
        {tabs.map((t) => {
          const isActive = t.href === active;
          const Icon = TAB_ICONS[t.icon];
          return (
            <li key={t.href} className="flex-1">
              <Link
                href={t.href}
                aria-current={isActive && pathname === t.href ? "page" : undefined}
                onClick={(e) => {
                  tap();
                  // Tapping the tab you are on scrolls back to the top, like the system apps
                  if (pathname === t.href) {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
                className={`app-press flex h-full flex-col items-center justify-center gap-px pt-1 text-[10px] font-medium leading-none tracking-[0.01em] android:gap-1 android:pt-0 android:text-xs android:tracking-normal ${
                  isActive
                    ? "text-bord dark:text-kridt android:text-blaek android:dark:text-blaek"
                    : "text-[#7b8a83] dark:text-[#8d9c95] android:text-blaek-2"
                }`}
              >
                <span
                  className={`flex items-center justify-center android:h-8 android:w-16 android:rounded-full android:transition-colors ${
                    isActive ? "app-tab-pill" : ""
                  }`}
                >
                  <Icon className="h-[26px] w-[26px] android:h-6 android:w-6" filled={isActive} />
                </span>
                <span className={isActive ? "android:font-bold" : ""}>{t.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
