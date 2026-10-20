import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { appScreenMetadata } from "@/config/site";
import { intlDecks, intlDeckBySlug } from "@/intl/data";
import { PlayDeckLoader } from "@/intl/PlayDeckLoader";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return intlDecks.map((d) => ({ slug: d.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const deck = intlDeckBySlug.get((await params).slug);
  return appScreenMetadata(deck ? `${deck.name}: play the cards` : "Play");
}

export default async function PlayDeckPage({ params }: Props) {
  const deck = intlDeckBySlug.get((await params).slug);
  if (!deck) notFound();
  return <PlayDeckLoader deckId={deck.id} name={deck.name} slug={deck.slug} questions={deck.questions} />;
}
