"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { DeckBack } from "@/components/deck/DeckParts";
import { getDeck } from "@/data/decks";
import { tap } from "@/lib/platform";
import { ui } from "@/locale/ui";

interface PlayScreenProps {
  /** Deck id from src/data/decks.ts, used for the header swatch and progress colour */
  deckId: string;
  title: string;
  backHref?: string;
  /** Filter, timer and similar controls, shown to the right in the header */
  actions?: ReactNode;
  answered: number;
  total: number;
  onReset: () => void;
  /** Shown above the progress bar, e.g. the active depth filter */
  aboveProgress?: ReactNode;
  /** Shown between progress and card, e.g. the timer */
  beforeCard?: ReactNode;
  /** The card itself (normally an animated QuestionCard) */
  children: ReactNode;
  onNext: () => void;
  isTransitioning?: boolean;
  nextLabel?: string;
  hint?: ReactNode;
}

/**
 * The table the game is played on: felt background, a compact header, how far into
 * the pile you are, the card, and one big button for the next card.
 */
export function PlayScreen({
  deckId,
  title,
  backHref = ui.play.backHref,
  actions,
  answered,
  total,
  onReset,
  aboveProgress,
  beforeCard,
  children,
  onNext,
  isTransitioning = false,
  nextLabel = ui.play.next,
  hint = ui.play.hint,
}: PlayScreenProps) {
  const deck = getDeck(deckId);
  const progress = total > 0 ? Math.min((answered / total) * 100, 100) : 0;
  const barColor = deck.bg === "#1d4a38" || deck.bg === "#f2f4f1" ? "#f4c04e" : deck.bg;

  return (
    <div className="filt min-h-dvh">
      <main id="main-content" className="mx-auto flex min-h-dvh max-w-xl flex-col items-center px-4 pb-safe pt-safe sm:px-6">
        <header className="mb-4 flex w-full max-w-[23rem] items-center justify-between gap-2 pt-2">
          <Link
            href={backHref}
            className="-ml-2 inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-lg text-white/90 hover:text-white"
            aria-label={ui.play.back}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
            </svg>
          </Link>
          <div className="flex min-w-0 flex-1 items-center justify-center gap-2">
            <DeckBack categoryId={deckId} className="h-7 w-5 shrink-0 rounded-[4px] ring-1 ring-white/30" />
            <h1 className="font-display truncate text-lg font-bold text-white">{title}</h1>
          </div>
          <div className="flex shrink-0 items-center gap-1">{actions}</div>
        </header>

        <div className="w-full max-w-[23rem]" role="region" aria-label={ui.play.progressRegion}>
          {aboveProgress}
          <div
            className="h-1.5 overflow-hidden rounded-full bg-white/15"
            role="progressbar"
            aria-valuenow={answered}
            aria-valuemin={0}
            aria-valuemax={total}
            aria-label={ui.play.progressLabel(answered, total)}
          >
            <div className="h-full rounded-full transition-[width] duration-500" style={{ width: `${progress}%`, background: barColor }} />
          </div>
          <div className="mt-2 flex items-center justify-between text-sm text-white/75">
            <span aria-live="polite" className="tabular-nums">
              {ui.play.progress(Math.min(answered, total).toLocaleString(ui.numberLocale), total.toLocaleString(ui.numberLocale))}
            </span>
            <button
              type="button"
              onClick={onReset}
              className="min-h-11 rounded px-2 underline decoration-white/40 underline-offset-4 hover:text-white"
            >
              {ui.play.reshuffle}
            </button>
          </div>
        </div>

        {beforeCard}

        <div className="flex w-full flex-1 items-center justify-center py-6">{children}</div>

        <div className="w-full max-w-[23rem] pb-6">
          <button
            type="button"
            onClick={() => {
              tap("fast");
              onNext();
            }}
            disabled={isTransitioning}
            className="min-h-14 w-full touch-manipulation select-none rounded-full bg-kridt px-6 text-lg font-bold text-kridt-blaek shadow-[0_3px_0_rgb(0_0_0/0.3)] transition-transform active:translate-y-0.5 disabled:opacity-60"
            aria-busy={isTransitioning}
          >
            {nextLabel}
          </button>
          {hint && <p className="mt-3 text-center text-sm text-white/70">{hint}</p>}
        </div>
      </main>
    </div>
  );
}

/** Loading state for play screens: the empty table */
export function PlayScreenLoading({ label = ui.play.loading }: { label?: string }) {
  return (
    <div className="filt flex min-h-dvh items-center justify-center px-6" role="status" aria-live="polite">
      <div className="aspect-[5/7] w-full max-w-sm animate-pulse rounded-[1.25rem] bg-white/10" />
      <span className="sr-only">{label}</span>
    </div>
  );
}

/** Motion settings for dealing a new card onto the table */
export const dealMotion = {
  initial: { opacity: 0, x: 70, rotate: 6 },
  animate: { opacity: 1, x: 0, rotate: 0 },
  exit: { opacity: 0, x: -90, rotate: -8 },
  transition: { type: "spring" as const, stiffness: 260, damping: 28 },
};
