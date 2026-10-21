"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { CardFace } from "@/components/deck/DeckParts";
import { ShareButton } from "@/components/ShareButton";
import { danishDateKey, tidligereDatoer, vaelgForDato } from "@/lib/dagDato";
import type { Question } from "@/types";

export interface DailyPick {
  q: Question;
  deck: { name: string; slug: string };
}

const noSubscribe = () => () => {};
const dayText = (key: string) =>
  new Date(`${key}T12:00:00Z`).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", timeZone: "UTC" });

/**
 * Today's card (the same card id as Snakkespil shows that day) and the past week.
 * In the app (app) the past cards open their deck, because the app has no /questions/ pages.
 */
export function DailyCard({ buildKey, pool, app = false }: { buildKey: string; pool: DailyPick[]; app?: boolean }) {
  const key = useSyncExternalStore(noSubscribe, () => danishDateKey(new Date()), () => buildKey);
  const { q, deck } = vaelgForDato(key, pool);
  return (
    <>
      <section aria-label="Today's card" className="mt-8">
        <div className="mx-auto max-w-[21rem] sm:mx-0 sm:max-w-[23rem]" data-kort>
          <CardFace categoryId={q.categoryId} categoryName={deck.name} question={q} className="aspect-[5/7]" />
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href={`/play/${deck.slug}/`} className="inline-flex min-h-12 items-center rounded-full bg-bord px-6 font-bold text-white dark:bg-kridt dark:text-kridt-blaek">
            Keep playing {deck.name}
          </Link>
          <span className="rounded-full bg-flade ring-1 ring-streg">
            <ShareButton text={q.text} categoryName="Question of the day" path="/daily-question/" />
          </span>
        </div>
      </section>
      <h2 className="mt-14 text-2xl font-bold sm:text-3xl">The past week</h2>
      <ol className="mt-5 divide-y divide-streg border-y border-streg">
        {tidligereDatoer(key, 7).map((day) => {
          const past = vaelgForDato(day, pool);
          return (
            <li key={day} data-kort className="flex flex-col gap-1 py-3.5 sm:flex-row sm:gap-6">
              <span className="w-48 shrink-0 text-sm font-semibold text-blaek-2">{dayText(day)}</span>
              <span>
                {past.q.text}{" "}
                <Link href={app ? `/play/${past.deck.slug}/` : `/questions/${past.deck.slug}/`} className="text-sm text-blaek-2 underline">{past.deck.name}</Link>
              </span>
            </li>
          );
        })}
      </ol>
    </>
  );
}
