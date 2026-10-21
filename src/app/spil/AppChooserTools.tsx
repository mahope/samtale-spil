"use client";

import { SearchOverlay } from "@/components/SearchOverlay";
import { IconSoeg, IconTerning } from "@/components/app/icons";
import { tap } from "@/lib/platform";
import { useChooserTools } from "./ChooserTools";

/** The app's Spil tab: a search field under the large title, and two quick choices as chips. */
export function AppChooserTools() {
  const { isSearchOpen, setIsSearchOpen, kunFamilie, setKunFamilie, pickRandom } = useChooserTools();
  const chip =
    "app-press inline-flex min-h-9 items-center gap-1.5 rounded-full px-3.5 text-[15px] font-semibold android:min-h-8 android:rounded-lg android:px-3 android:text-sm android:font-medium";
  return (
    <div className="px-4">
      <button
        type="button"
        data-ripple
        onClick={() => setIsSearchOpen(true)}
        className="app-press flex h-9 w-full items-center gap-1.5 rounded-[10px] bg-flade-2 px-2 text-[17px] text-blaek-2 android:h-14 android:gap-4 android:rounded-full android:px-5 android:text-base"
      >
        <IconSoeg className="h-[1.1rem] w-[1.1rem] android:h-6 android:w-6" />
        Søg i spørgsmål
      </button>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          data-ripple
          onClick={() => {
            tap();
            pickRandom();
          }}
          className={`${chip} bg-flade ring-1 ring-streg android:bg-transparent android:ring-blaek-2/50`}
        >
          <IconTerning className="h-[1.1rem] w-[1.1rem]" />
          Vælg for os
        </button>
        <button
          type="button"
          data-ripple
          aria-pressed={kunFamilie ?? false}
          onClick={() => {
            tap();
            setKunFamilie(!kunFamilie);
          }}
          className={`${chip} ${
            kunFamilie
              ? "bg-bord text-white dark:bg-kridt dark:text-kridt-blaek android:bg-[color-mix(in_srgb,var(--kridt)_45%,transparent)] android:text-blaek android:dark:bg-bord-lys android:dark:text-blaek"
              : "bg-flade ring-1 ring-streg android:bg-transparent android:ring-blaek-2/50"
          }`}
        >
          {kunFamilie && (
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.6} aria-hidden="true">
              <path d="m5 12.5 4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
          Kun familievenlige
        </button>
      </div>
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
}
