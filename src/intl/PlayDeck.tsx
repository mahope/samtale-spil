"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { QuestionCard } from "@/components/QuestionCard";
import { PlayScreen, dealMotion } from "@/components/PlayScreen";
import { useFavorites } from "@/hooks/useLocalStorage";
import { track } from "@/utils/track";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { JOKER_KEY, jokerAt, stepDeck, type DeckTurn } from "@/lib/joker";
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
export function PlayDeck({ deckId, name, sharePath, backHref, questions }: { deckId: string; name: string; sharePath: string; backHref?: string; questions: Question[] }) {
  const [pile, setPile] = useState(() => shuffle(questions));
  const [at, setAt] = useState<DeckTurn>({ pos: 0, turn: 0 });
  const [isFlipped, setIsFlipped] = useState(false);
  const { isFavorite, toggleFavorite } = useFavorites();
  const [jokerOn] = useLocalStorage<boolean>(JOKER_KEY, true);
  const joker = jokerAt(at.turn, deckId, jokerOn ?? true);
  const card = joker ?? pile[at.pos];

  const next = () => {
    if (at.turn === 0) track("Spil startet", { kategori: deckId });
    setIsFlipped(false);
    const step = stepDeck(at, pile.length, jokerOn ?? true, deckId);
    if (step.wrapped) setPile(shuffle(questions));
    setAt({ pos: step.pos, turn: step.turn });
  };

  return (
    <PlayScreen
      deckId={deckId}
      title={name}
      backHref={backHref}
      answered={at.pos}
      total={pile.length}
      onReset={() => {
        setPile(shuffle(questions));
        setAt({ pos: 0, turn: 0 });
        setIsFlipped(false);
      }}
      onNext={next}
    >
      <AnimatePresence mode="wait">
        <motion.div key={`${card.id}-${at.turn}-${at.pos}`} {...dealMotion} className="w-full">
          <QuestionCard
            question={card}
            categoryName={joker ? "Joker" : name}
            isFlipped={isFlipped}
            onFlip={() => setIsFlipped((f) => !f)}
            isFavorite={isFavorite(card.id)}
            onToggleFavorite={() => toggleFavorite(card)}
            sharePath={sharePath}
          />
        </motion.div>
      </AnimatePresence>
    </PlayScreen>
  );
}
