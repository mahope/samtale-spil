"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { CardFace } from "@/components/deck/DeckParts";
import { dagensKortForDato, danishDateKey, tidligereDatoer } from "@/lib/dagensKort";
import { ShareButton } from "@/components/ShareButton";

const noSubscribe = () => () => {};

const datoTekst = (key: string) =>
  new Date(`${key}T12:00:00Z`).toLocaleDateString("da-DK", { weekday: "long", day: "numeric", month: "long", timeZone: "UTC" });

/** Today's card and the past week. The server renders the build day; in the browser it follows the Danish date. */
export function DagensKortVisning({ buildKey }: { buildKey: string }) {
  const key = useSyncExternalStore(noSubscribe, () => danishDateKey(new Date()), () => buildKey);
  const { q, c } = dagensKortForDato(key);
  return (
    <>
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

      <h2 className="mt-14 text-2xl font-bold sm:text-3xl">De seneste dage</h2>
      <ol className="mt-5 divide-y divide-streg border-y border-streg">
        {tidligereDatoer(key, 7).map((dag) => {
          const tidligere = dagensKortForDato(dag);
          return (
            <li key={dag} data-kort className="flex flex-col gap-1 py-3.5 sm:flex-row sm:gap-6">
              <span className="w-44 shrink-0 text-sm font-semibold text-blaek-2 first-letter:uppercase">{datoTekst(dag)}</span>
              <span>
                {tidligere.q.text}{" "}
                <Link href={`/spoergsmaal/${tidligere.c.id}/`} className="text-sm text-blaek-2 underline">
                  {tidligere.c.name}
                </Link>
              </span>
            </li>
          );
        })}
      </ol>
    </>
  );
}
