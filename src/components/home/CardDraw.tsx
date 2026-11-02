"use client";

import { useCallback, useEffect, useState, type ComponentType } from "react";
import Link from "next/link";
import { CardFace, DeckBack } from "@/components/deck/DeckParts";
import { track } from "@/utils/track";

export interface DrawCard {
  id: string;
  categoryId: string;
  categoryName: string;
  text: string;
  depth: "let" | "medium" | "dyb";
}

/**
 * The hero: a small pile of cards on the felt. Drawing deals a new card on top.
 * The first card is fixed so server and client render the same markup.
 */
export function CardDraw({ cards }: { cards: DrawCard[] }) {
  const [index, setIndex] = useState(0);
  // The motion library is fetched once the page is idle, not as part of the first load
  const [Stack, setStack] = useState<ComponentType<{ card: DrawCard }> | null>(null);
  const load = useCallback(() => {
    import("./CardStack").then((m) => setStack(() => m.default)).catch(() => {});
  }, []);
  useEffect(() => {
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(load, { timeout: 3000 });
      return () => window.cancelIdleCallback(id);
    }
    const t = setTimeout(load, 1500);
    return () => clearTimeout(t);
  }, [load]);
  const card = cards[index % cards.length];

  const draw = () => {
    let next = index;
    while (cards.length > 1 && next === index) next = Math.floor(Math.random() * cards.length);
    setIndex(next);
    track("Kort trukket", { kilde: "forside" });
  };

  return (
    <div className="mx-auto w-full max-w-[17rem] sm:max-w-[22rem]">
      <div className="relative aspect-[5/7]">
        {/* the pile underneath */}
        <DeckBack categoryId="sjove" className="absolute inset-0 rotate-[-7deg] rounded-[1.25rem] shadow-kort" />
        <DeckBack categoryId="parforhold" className="absolute inset-0 rotate-[4deg] rounded-[1.25rem] shadow-kort" />
        {Stack ? (
          <Stack card={card} />
        ) : (
          // Same markup the animated card ends in, so the swap below is invisible
          <div className="absolute inset-0" style={{ transform: "rotate(-1deg)" }}>
            <CardFace categoryId={card.categoryId} categoryName={card.categoryName} question={card} className="h-full" />
          </div>
        )}
      </div>
      <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onPointerEnter={load}
          onFocus={load}
          onClick={() => {
            // On a slow connection the idle load may not have finished: start it now so the next draw animates
            load();
            draw();
          }}
          className="min-h-12 rounded-full bg-kridt px-6 text-base font-bold text-kridt-blaek shadow-[0_2px_0_rgb(0_0_0/0.25)] transition-transform active:translate-y-px"
        >
          Træk et nyt kort
        </button>
        <Link
          href={`/spil/${card.categoryId}/`}
          className="inline-flex min-h-12 items-center rounded-full px-4 text-base font-semibold text-white underline decoration-white/40 underline-offset-4 hover:decoration-white"
        >
          Spil {card.categoryName.toLowerCase()}
        </Link>
      </div>
      <p className="sr-only" aria-live="polite">
        {card.categoryName}: {card.text}
      </p>
    </div>
  );
}
