"use client";

import { useState } from "react";
import Link from "next/link";
import { CardFace } from "@/components/deck/DeckParts";
import { categories } from "@/data/categories";
import { deckGroups } from "@/data/deckGroups";
import { FAMILY_FRIENDLY_DECKS } from "@/data/cardTypes";
import { track } from "@/utils/track";
import type { Question } from "@/types";

type Dybde = "alle" | Question["depth"];

const byDeck = new Map(categories.map((c) => [c.id, c]));

function matching(gruppe: string, dybde: Dybde, kunFamilie: boolean): Question[] {
  const decks = gruppe === "alle" ? categories.map((c) => c.id) : deckGroups.find((g) => g.id === gruppe)?.decks ?? [];
  return decks
    .filter((id) => !kunFamilie || FAMILY_FRIENDLY_DECKS.has(id))
    .flatMap((id) => byDeck.get(id)?.questions ?? [])
    .filter((q) => dybde === "alle" || q.depth === dybde);
}

const selectClass = "mt-1 block min-h-11 w-full rounded-xl bg-flade px-3 font-semibold ring-1 ring-streg";

/** Pick a question by who you are with and how deep you want to go. New card on every click. */
export function Generator({ start }: { start: Question }) {
  const [gruppe, setGruppe] = useState("alle");
  const [dybde, setDybde] = useState<Dybde>("alle");
  const [kunFamilie, setKunFamilie] = useState(false);
  const [kort, setKort] = useState<Question>(start);
  const pool = matching(gruppe, dybde, kunFamilie);

  const nyt = () => {
    if (pool.length === 0) return;
    let next = pool[Math.floor(Math.random() * pool.length)];
    if (pool.length > 1) while (next.id === kort.id) next = pool[Math.floor(Math.random() * pool.length)];
    setKort(next);
    track("Generator", { gruppe, dybde, familie: kunFamilie ? "ja" : "nej" });
  };

  const deck = byDeck.get(kort.categoryId);
  return (
    <section aria-label="Spørgsmålsgenerator" className="mt-8 grid gap-8 md:grid-cols-[1fr_auto] md:items-start">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          nyt();
        }}
        className="space-y-4"
      >
        <label className="block font-semibold">
          Hvem er I sammen med?
          <select value={gruppe} onChange={(e) => setGruppe(e.target.value)} className={selectClass}>
            <option value="alle">Alle bunker</option>
            {deckGroups.map((g) => (
              <option key={g.id} value={g.id}>
                {g.title}
              </option>
            ))}
          </select>
        </label>
        <label className="block font-semibold">
          Hvor dybt?
          <select value={dybde} onChange={(e) => setDybde(e.target.value as Dybde)} className={selectClass}>
            <option value="alle">Alle dybder</option>
            <option value="let">Let</option>
            <option value="medium">Medium</option>
            <option value="dyb">Dyb</option>
          </select>
        </label>
        <label className="flex min-h-11 items-center gap-3 font-semibold">
          <input type="checkbox" checked={kunFamilie} onChange={(e) => setKunFamilie(e.target.checked)} className="h-5 w-5 accent-[var(--bord)]" />
          Kun familievenlige
        </label>
        <button
          type="submit"
          disabled={pool.length === 0}
          className="min-h-12 w-full rounded-full bg-bord px-6 text-lg font-bold text-white disabled:opacity-50 dark:bg-kridt dark:text-kridt-blaek"
        >
          Nyt spørgsmål
        </button>
        <p className="text-sm text-blaek-2" aria-live="polite">
          {pool.length === 0 ? "Ingen kort passer til valget. Prøv en anden dybde." : `${pool.length.toLocaleString("da-DK")} kort passer til valget.`}
        </p>
      </form>

      <div className="w-full max-w-[21rem] justify-self-center sm:max-w-[23rem]">
        <div aria-live="polite">
          <CardFace categoryId={kort.categoryId} categoryName={deck?.name ?? ""} question={kort} className="aspect-[5/7]" />
        </div>
        {deck && (
          <Link href={`/spil/${deck.id}/?question=${kort.id}`} className="mt-3 inline-block font-semibold underline">
            Spil videre med {deck.name}
          </Link>
        )}
      </div>
    </section>
  );
}
