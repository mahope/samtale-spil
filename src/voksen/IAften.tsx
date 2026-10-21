"use client";

import { useState } from "react";
import Link from "next/link";
import { CardFace } from "@/components/deck/DeckParts";
import { tap } from "@/lib/platform";
import type { Question } from "@/types";

export interface AftenDeck {
  id: string;
  name: string;
  questions: Question[];
}

function draw(decks: AftenDeck[], not?: string) {
  const all = decks.flatMap((d) => d.questions.map((q) => ({ q, deck: d })));
  const pool = all.length > 1 ? all.filter((x) => x.q.id !== not) : all;
  return pool[Math.floor(Math.random() * pool.length)];
}

/** One card or dare at random from every deck, and a new one at a tap. Browser only (IAftenLoader). */
export function IAften({ decks }: { decks: AftenDeck[] }) {
  const [pick, setPick] = useState(() => draw(decks));
  return (
    <section aria-label="Aftenens kort" className="mt-6">
      <div className="mx-auto max-w-[21rem]" data-kort aria-live="polite">
        <CardFace categoryId={pick.deck.id} categoryName={pick.deck.name} question={pick.q} className="aspect-[5/7]" />
      </div>
      <div className="mx-auto mt-5 flex max-w-[21rem] flex-col gap-3">
        <button
          type="button"
          data-ripple
          onClick={() => {
            tap();
            setPick(draw(decks, pick.q.id));
          }}
          className="app-press relative flex min-h-12 items-center justify-center overflow-hidden rounded-full bg-bord px-6 font-bold text-white dark:bg-kridt dark:text-kridt-blaek android:rounded-2xl"
        >
          Træk et andet kort
        </button>
        <Link
          href={`/spil/${pick.deck.id}/`}
          data-ripple
          className="app-press relative flex min-h-12 items-center justify-center overflow-hidden rounded-full bg-flade px-6 font-semibold ring-1 ring-streg android:rounded-2xl"
        >
          Spil videre med {pick.deck.name}
        </Link>
      </div>
    </section>
  );
}
