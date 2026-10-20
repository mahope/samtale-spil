"use client";

import dynamic from "next/dynamic";
import type { SequenceStep } from "@/components/SequenceGame";

const SequenceGame = dynamic(() => import("@/components/SequenceGame").then((m) => m.SequenceGame), {
  ssr: false,
  loading: () => <div className="filt min-h-dvh" />,
});

// Three light cards for the family table (Fivush on family stories; docs/forskning.md 3.7)
const STEPS: SequenceStep[] = [
  { depth: "let", label: "Kort 1 af 3" },
  { depth: "let", label: "Kort 2 af 3" },
  { depth: "let", label: "Kort 3 af 3" },
];

export function AftensmadLoader() {
  return (
    <SequenceGame
      mode="aftensmad"
      title="Aftensmad"
      deckId="familie"
      decks={["familie", "boern", "barndom"]}
      steps={STEPS}
      doneTitle="Tak for snakken"
      doneText="Et par kort er nok til en god snak ved bordet. Spørg gerne, hvem der vil vælge spørgsmålene i morgen."
    />
  );
}
