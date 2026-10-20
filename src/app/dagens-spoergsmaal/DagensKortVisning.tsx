"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { CardFace } from "@/components/deck/DeckParts";
import { dagensKortForDato, danishDateKey } from "@/lib/dagensKort";
import { ShareButton } from "@/components/ShareButton";

const noSubscribe = () => () => {};

/** Today's card. The server renders the build day; in the browser it follows the Danish date. */
export function DagensKortVisning({ buildKey }: { buildKey: string }) {
  const key = useSyncExternalStore(noSubscribe, () => danishDateKey(new Date()), () => buildKey);
  const { q, c } = dagensKortForDato(key);
  return (
    <section aria-label="Dagens kort" className="mt-8">
      <div className="mx-auto max-w-[21rem] sm:mx-0 sm:max-w-[23rem]" data-kort>
        <CardFace categoryId={c.id} categoryName={c.name} question={q} className="aspect-[5/7]" />
      </div>
      <div className="mt-4 flex flex-wrap gap-3">
        <Link
          href={`/spil/${c.id}/?question=${q.id}`}
          className="inline-flex min-h-12 items-center rounded-full bg-bord px-6 font-bold text-white dark:bg-kridt dark:text-kridt-blaek"
        >
          Spil videre med {c.name}
        </Link>
        <span className="rounded-full bg-flade ring-1 ring-streg">
          <ShareButton text={q.text} categoryName="Dagens spørgsmål" path="/dagens-spoergsmaal/" />
        </span>
      </div>
    </section>
  );
}
