"use client";

import { useState } from "react";
import Link from "next/link";
import { ui } from "@/locale/ui";
import { AnimatePresence, motion } from "motion/react";
import { categories, getCategory } from "@/data/categories";
import { useFavorites } from "@/hooks/useLocalStorage";
import { QuestionCard } from "@/components/QuestionCard";
import { PlayScreen, dealMotion } from "@/components/PlayScreen";
import { track } from "@/utils/track";
import type { Question } from "@/types";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { JOKER_KEY, jokerAt } from "@/lib/joker";

export interface SequenceStep {
  depth: Question["depth"];
  /** Shown above the card, e.g. "Trin 1: lette spørgsmål" */
  label: string;
  /** Draw from these cards instead of the decks (depth is then ignored) */
  from?: Question[];
  /** Replaces the default hint under the card */
  hint?: string;
}

// Every run ends on a light or grateful card (docs/forskning.md 2.5)
const CLOSING: SequenceStep = {
  depth: "let",
  label: "Til sidst: et let kort at slutte af med",
  from: (getCategory("tak")?.questions ?? []).filter((q) => q.depth === "let"),
};

function pick<T>(items: T[], n: number): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a.slice(0, n);
}

/**
 * A fixed run of cards in order, e.g. four light, four medium and four deep.
 * Questions are drawn once per run from the given decks.
 */
export function SequenceGame({
  mode,
  title,
  deckId,
  decks,
  steps,
  doneTitle,
  doneText,
  sharePath,
}: {
  /** For tracking, e.g. "trappen" */
  mode: string;
  title: string;
  /** Visual deck for the table (decks.ts) */
  deckId: string;
  /** Category ids to draw from */
  decks: string[];
  steps: SequenceStep[];
  doneTitle: string;
  doneText: string;
  /** Public page to share cards from, when they do not belong to a deck */
  sharePath?: string;
}) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const [jokerOn] = useLocalStorage<boolean>(JOKER_KEY, true);
  const allSteps = [...steps, CLOSING];
  const [round, setRound] = useState(0);
  const [index, setIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // One draw per run; questions are not repeated within a run
  const draw = () => {
    const pool = categories.filter((c) => decks.includes(c.id)).flatMap((c) => c.questions);
    const used = new Set<string>();
    return allSteps.map((step) => {
      const from = step.from ?? pool.filter((q) => q.depth === step.depth);
      const choice = pick(from.filter((q) => !used.has(q.id)), 1)[0];
      if (choice) used.add(choice.id);
      return choice;
    });
  };
  const [cards, setCards] = useState(draw);

  const done = index >= allSteps.length;
  const drawn = cards[index];
  const card = (drawn && jokerAt(index, drawn.categoryId, jokerOn ?? true)) ?? drawn;

  const [isTransitioning, setIsTransitioning] = useState(false);
  const next = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => setIsTransitioning(false), 450);
    if (index === 0 && round === 0) track("Spil startet", { tilstand: mode });
    if (index + 1 >= allSteps.length) track("Spil gennemført", { tilstand: mode });
    setIsFlipped(false);
    setIndex((i) => i + 1);
  };

  const restart = () => {
    setCards(draw());
    setRound((r) => r + 1);
    setIndex(0);
    setIsFlipped(false);
  };

  if (done || !card) {
    return (
      <div className="filt flex min-h-dvh items-center justify-center px-6">
        <main id="main-content" className="max-w-sm text-center">
          <h1 ref={(el) => el?.focus()} tabIndex={-1} className="text-4xl font-extrabold outline-none" style={{ fontStretch: "88%" }}>
            {doneTitle}
          </h1>
          <p className="mt-4 text-lg text-white/85">{doneText}</p>
          <div className="mt-8 flex flex-col gap-3">
            <button type="button" onClick={restart} className="min-h-14 rounded-full bg-kridt px-6 text-lg font-bold text-kridt-blaek">
              En runde til
            </button>
            <Link href={ui.play.backHref} className="inline-flex min-h-12 items-center justify-center rounded-full font-semibold text-white underline underline-offset-4">
              Vælg et andet spil
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <PlayScreen
      deckId={deckId}
      title={title}
      answered={index}
      total={allSteps.length}
      onReset={restart}
      aboveProgress={<p className="mb-2 text-center text-sm font-semibold text-white/85">{card.type === "joker" ? "Joker" : allSteps[index].label}</p>}
      onNext={next}
      isTransitioning={isTransitioning}
      nextLabel={index + 1 >= allSteps.length ? "Afslut" : "Næste kort"}
      hint={allSteps[index].hint ?? "Svar begge to, og spørg gerne videre"}
    >
      <AnimatePresence mode="wait">
        <motion.div key={`${round}-${card.id}`} {...dealMotion} className="w-full">
          <QuestionCard
            question={card}
            categoryName={card.type === "joker" ? "Joker" : getCategory(card.categoryId)?.name ?? title}
            isFlipped={isFlipped}
            onFlip={() => setIsFlipped((f) => !f)}
            isFavorite={isFavorite(card.id)}
            onToggleFavorite={() => toggleFavorite(card)}
            sharePath={getCategory(card.categoryId) ? undefined : sharePath}
          />
        </motion.div>
      </AnimatePresence>
    </PlayScreen>
  );
}
