"use client";

import dynamic from "next/dynamic";
import type { SequenceStep } from "@/components/SequenceGame";
import { AAR_FREMTID, AAR_GAET_FREM, AAR_GAET_TILBAGE, AAR_TILBAGEBLIK } from "@/data/aaretDerGik";

const SequenceGame = dynamic(() => import("@/components/SequenceGame").then((m) => m.SequenceGame), {
  ssr: false,
  loading: () => <div className="filt min-h-dvh" />,
});

// Four rounds of three cards: look back, guess, look ahead, guess (issue #41)
const round = (label: string, from: SequenceStep["from"]): SequenceStep[] =>
  [1, 2, 3].map((n) => ({ depth: "let", label: `${label}, kort ${n} af 3`, from }));

const STEPS: SequenceStep[] = [
  ...round("Runde 1 af 4: året der gik", AAR_TILBAGEBLIK),
  ...round("Runde 2 af 4: gæt hinandens svar", AAR_GAET_TILBAGE),
  ...round("Runde 3 af 4: året der kommer", AAR_FREMTID),
  ...round("Runde 4 af 4: gæt igen", AAR_GAET_FREM),
];

export function AaretLoader() {
  return (
    <SequenceGame
      mode="aaret-der-gik"
      title="Året der gik"
      deckId="aaret"
      decks={[]}
      steps={STEPS}
      doneTitle="Godt nytår"
      doneText="Skriv gerne et par af svarene ned, og tag dem frem igen næste år."
    />
  );
}
