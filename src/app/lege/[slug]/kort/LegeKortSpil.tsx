"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { legeSider, legeDeck } from "@/data/lege";
import { useFavorites } from "@/hooks/useLocalStorage";
import { QuestionCard } from "@/components/QuestionCard";
import { PlayScreen, dealMotion } from "@/components/PlayScreen";
import { track } from "@/utils/track";
import type { Question } from "@/types";

function shuffle<T>(items: T[]): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** The small deck from a /lege/ page, dealt in random order. Rendered in the browser only. */
export function LegeKortSpil({ slug }: { slug: string }) {
  const side = legeSider.find((s) => s.slug === slug)!;
  const deckId = legeDeck(slug);
  const toQuestion = (k: (typeof side.kort)[number]): Question => ({ id: k.id, categoryId: deckId, text: k.text, depth: "let" });
  const [pile, setPile] = useState(() => shuffle(side.kort).map(toQuestion));
  const [index, setIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const { isFavorite, toggleFavorite } = useFavorites();
  const card = pile[index % pile.length];

  const next = () => {
    if (index === 0) track("Spil startet", { tilstand: `lege-${slug}` });
    setIsFlipped(false);
    if (index + 1 >= pile.length) {
      setPile(shuffle(side.kort).map(toQuestion));
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
  };

  return (
    <PlayScreen
      deckId={deckId}
      title={side.h1.split(":")[0]}
      backHref={`/lege/${slug}/`}
      answered={index}
      total={pile.length}
      onReset={() => {
        setPile(shuffle(side.kort).map(toQuestion));
        setIndex(0);
        setIsFlipped(false);
      }}
      onNext={next}
    >
      <AnimatePresence mode="wait">
        <motion.div key={card.id + index} {...dealMotion} className="w-full">
          <QuestionCard
            question={card}
            categoryName={side.h1.split(":")[0]}
            isFlipped={isFlipped}
            onFlip={() => setIsFlipped((f) => !f)}
            isFavorite={isFavorite(card.id)}
            onToggleFavorite={() => toggleFavorite(card)}
            sharePath={`/lege/${slug}/`}
          />
        </motion.div>
      </AnimatePresence>
    </PlayScreen>
  );
}
