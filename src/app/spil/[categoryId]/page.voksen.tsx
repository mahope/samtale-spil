import { notFound } from "next/navigation";
import { AgeGate } from "@/voksen/AgeGate";
import { voksenDecks, voksenDeckById } from "@/voksen/decks";
import { PlayDeckLoader } from "@/intl/PlayDeckLoader";

interface Props {
  params: Promise<{ categoryId: string }>;
}

export function generateStaticParams() {
  return voksenDecks.map((d) => ({ categoryId: d.id }));
}

export const dynamicParams = false;

export default async function VoksenPlay({ params }: Props) {
  const deck = voksenDeckById.get((await params).categoryId);
  if (!deck) notFound();
  return (
    <AgeGate>
      <PlayDeckLoader deckId={deck.id} name={deck.name} sharePath={deck.sharePath} backHref="/" questions={deck.questions} />
    </AgeGate>
  );
}
