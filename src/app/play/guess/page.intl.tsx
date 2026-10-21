import type { Metadata } from "next";
import { appScreenMetadata } from "@/config/site";
import { intlDeckById } from "@/intl/data";
import { GaetLoader } from "@/app/spil/gaet/GaetLoader";

export const metadata: Metadata = appScreenMetadata(
  "Guess the answer: Know Your Partner with points",
  "One answers in secret, the other guesses. Or everyone answers in secret and you reveal together."
);

export default function GuessPage() {
  const deck = intlDeckById.get("kend-din-partner")!;
  return <GaetLoader questions={deck.questions} deckName={deck.name} backHref={`/questions/${deck.slug}/`} />;
}
