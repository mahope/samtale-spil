"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { QuestionCard } from "@/components/QuestionCard";
import { PlayScreen, dealMotion } from "@/components/PlayScreen";
import { useFavorites } from "@/hooks/useLocalStorage";
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

/** One deck on an international site: shuffled once, played card by card. Browser only. */
export function PlayDeck({ deckId, name, slug, questions }: { deckId: string; name: string; slug: string; questions: Question[] }) {
  const [pile, setPile] = useState(() => shuffle(questions));
  const [index, setIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const { isFavorite, toggleFavorite } = useFavorites();
  const card = pile[index % pile.length];

  const next = () => {
    if (index === 0) track("Spil startet", { kategori: deckId });
    setIsFlipped(false);
    if (index + 1 >= pile.length) {
      setPile(shuffle(questions));
      setIndex(0);
    } else setIndex(index + 1);
  };

  return (
    <PlayScreen
      deckId={deckId}
      title={name}
      answered={index}
      total={pile.length}
      onReset={() => {
        setPile(shuffle(questions));
        setIndex(0);
        setIsFlipped(false);
      }}
      onNext={next}
    >
      <AnimatePresence mode="wait">
        <motion.div key={card.id + index} {...dealMotion} className="w-full">
          <QuestionCard
            question={card}
            categoryName={name}
            isFlipped={isFlipped}
            onFlip={() => setIsFlipped((f) => !f)}
            isFavorite={isFavorite(card.id)}
            onToggleFavorite={() => toggleFavorite(card)}
            sharePath={`/questions/${slug}/`}
          />
        </motion.div>
      </AnimatePresence>
    </PlayScreen>
  );
}
