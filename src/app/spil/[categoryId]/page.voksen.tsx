import { notFound } from "next/navigation";
import { voksenDecks, voksenDeckById } from "@/voksen/decks";
import { PlayDeckLoader } from "@/intl/PlayDeckLoader";

interface Props {
  params: Promise<{ categoryId: string }>;
}

export function generateStaticParams() {
  return voksenDecks.map((d) => ({ categoryId: d.id }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props) {
  return { title: voksenDeckById.get((await params).categoryId)?.name ?? "Spil" };
}

/** A deck on the felt; the age gate sits in front of everything in layout.voksen.tsx */
export default async function VoksenPlay({ params }: Props) {
  const deck = voksenDeckById.get((await params).categoryId);
  if (!deck) notFound();
  return <PlayDeckLoader deckId={deck.id} name={deck.name} sharePath={deck.sharePath} backHref="/" questions={deck.questions} jokers={false} />;
}
