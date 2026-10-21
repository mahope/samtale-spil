"use client";

import dynamic from "next/dynamic";
import type { Question } from "@/types";

// The pile is shuffled at random, so the game only renders in the browser
const PlayDeck = dynamic(() => import("./PlayDeck").then((m) => m.PlayDeck), {
  ssr: false,
  loading: () => <div className="filt min-h-dvh" />,
});

export function PlayDeckLoader(props: { deckId: string; name: string; sharePath: string; backHref?: string; questions: Question[] }) {
  return <PlayDeck {...props} />;
}
