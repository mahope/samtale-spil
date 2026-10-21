"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { QuestionCard } from "@/components/QuestionCard";
import { PlayScreen, dealMotion } from "@/components/PlayScreen";
import { track } from "@/utils/track";
import type { Question } from "@/types";

export interface YearStep {
  label: string;
  hint?: string;
  from: Question[];
}

function pick<T>(items: T[]): T | undefined {
  return items[Math.floor(Math.random() * items.length)];
}

/** A fixed run of cards drawn from per-step pools, ending on a closing card (Goodtalk, issue #77) */
export function YearInReview({ steps }: { steps: YearStep[] }) {
  const draw = () => {
    const used = new Set<string>();
    return steps.map((s) => {
      const c = pick(s.from.filter((q) => !used.has(q.id)));
      if (c) used.add(c.id);
      return c!;
    });
  };
  const [cards, setCards] = useState(draw);
  const [index, setIndex] = useState(0);
  const [round, setRound] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  if (index >= steps.length) {
    return (
      <div className="filt flex min-h-dvh items-center justify-center px-6 text-white">
        <main id="main-content" className="max-w-sm text-center">
          <h1 ref={(el) => el?.focus()} tabIndex={-1} className="text-4xl font-extrabold outline-none" style={{ fontStretch: "88%" }}>
            Thanks for the talk
          </h1>
          <p className="mt-4 text-lg text-white/85">Write a few of the answers down, and bring them out again a year from now.</p>
          <div className="mt-8 flex flex-col gap-3">
            <button
              type="button"
              onClick={() => {
                setCards(draw());
                setIndex(0);
                setRound((r) => r + 1);
                setIsFlipped(false);
              }}
              className="min-h-14 rounded-full bg-kridt px-6 text-lg font-bold text-kridt-blaek"
            >
              One more round
            </button>
            <Link href="/play/" className="inline-flex min-h-12 items-center justify-center rounded-full font-semibold text-white underline underline-offset-4">
              Pick another deck
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const card = cards[index];
  return (
    <PlayScreen
      deckId="aaret"
      title="Year in review"
      answered={index}
      total={steps.length}
      onReset={() => {
        setCards(draw());
        setIndex(0);
        setIsFlipped(false);
      }}
      aboveProgress={<p className="mb-2 text-center text-sm font-semibold text-white/85">{steps[index].label}</p>}
      onNext={() => {
        if (index === 0 && round === 0) track("Spil startet", { tilstand: "aaret-der-gik" });
        if (index + 1 >= steps.length) track("Spil gennemført", { tilstand: "aaret-der-gik" });
        setIsFlipped(false);
        setIndex((i) => i + 1);
      }}
      nextLabel={index + 1 >= steps.length ? "Finish" : "Next card"}
      hint={steps[index].hint ?? "Everyone answers, and feel free to ask more"}
    >
      <AnimatePresence mode="wait">
        <motion.div key={`${round}-${card.id}-${index}`} {...dealMotion} className="w-full">
          <QuestionCard
            question={card}
            categoryName="Year in review"
            isFlipped={isFlipped}
            onFlip={() => setIsFlipped((f) => !f)}
            isFavorite={false}
            onToggleFavorite={() => {}}
            sharePath="/play/year-in-review/"
          />
        </motion.div>
      </AnimatePresence>
    </PlayScreen>
  );
}
