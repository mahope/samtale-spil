"use client";

import { useState } from "react";
import Link from "next/link";
import { CardFace } from "@/components/deck/DeckParts";
import { track } from "@/utils/track";
import type { Question } from "@/types";

type Depth = "all" | Question["depth"];
export interface GenDeck {
  id: string;
  name: string;
  slug: string;
  group: string;
  familyFriendly: boolean;
  questions: Question[];
}

const selectClass = "mt-1 block min-h-11 w-full rounded-xl bg-flade px-3 font-semibold ring-1 ring-streg";

export function IntlGenerator({ decks, groups, start }: { decks: GenDeck[]; groups: { id: string; title: string }[]; start: Question }) {
  const [group, setGroup] = useState("all");
  const [depth, setDepth] = useState<Depth>("all");
  const [kids, setKids] = useState(false);
  const [card, setCard] = useState<Question>(start);
  const pool = decks
    .filter((d) => (group === "all" || d.group === group) && (!kids || d.familyFriendly))
    .flatMap((d) => d.questions)
    .filter((q) => depth === "all" || q.depth === depth);
  const deck = decks.find((d) => d.id === card.categoryId);

  const next = () => {
    if (pool.length === 0) return;
    let pick = pool[Math.floor(Math.random() * pool.length)];
    if (pool.length > 1) while (pick.id === card.id) pick = pool[Math.floor(Math.random() * pool.length)];
    setCard(pick);
    track("Generator", { gruppe: group, dybde: depth, familie: kids ? "ja" : "nej" });
  };

  return (
    <section aria-label="Question generator" className="mt-8 grid gap-8 md:grid-cols-[1fr_auto] md:items-start">
      <form onSubmit={(e) => { e.preventDefault(); next(); }} className="space-y-4">
        <label className="block font-semibold">
          Who are you with?
          <select value={group} onChange={(e) => setGroup(e.target.value)} className={selectClass}>
            <option value="all">All decks</option>
            {groups.map((g) => <option key={g.id} value={g.id}>{g.title}</option>)}
          </select>
        </label>
        <label className="block font-semibold">
          How deep?
          <select value={depth} onChange={(e) => setDepth(e.target.value as Depth)} className={selectClass}>
            <option value="all">Any depth</option>
            <option value="let">Light</option>
            <option value="medium">Medium</option>
            <option value="dyb">Deep</option>
          </select>
        </label>
        <label className="flex min-h-11 items-center gap-3 font-semibold">
          <input type="checkbox" checked={kids} onChange={(e) => setKids(e.target.checked)} className="h-5 w-5 accent-[var(--bord)]" />
          Kid-friendly only
        </label>
        <button type="submit" disabled={pool.length === 0} className="min-h-12 w-full rounded-full bg-bord px-6 text-lg font-bold text-white disabled:opacity-50 dark:bg-kridt dark:text-kridt-blaek">
          New question
        </button>
        <p className="text-sm text-blaek-2" aria-live="polite">
          {pool.length === 0 ? "No cards match. Try another depth, or remove a filter." : `${pool.length.toLocaleString("en-US")} cards match.`}
        </p>
      </form>
      <div className="w-full max-w-[21rem] justify-self-center sm:max-w-[23rem]">
        <div aria-live="polite">
          <CardFace categoryId={card.categoryId} categoryName={deck?.name ?? ""} question={card} className="aspect-[5/7]" />
        </div>
        {deck && <Link href={`/play/${deck.slug}/`} className="mt-3 inline-block font-semibold underline">Keep playing {deck.name}</Link>}
      </div>
    </section>
  );
}
