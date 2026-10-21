import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { appScreenMetadata } from "@/config/site";
import { intlGames, intlGameBySlug } from "@/intl/games";
import { PlayDeckLoader } from "@/intl/PlayDeckLoader";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return intlGames.map((g) => ({ slug: g.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const game = intlGameBySlug.get((await params).slug);
  return appScreenMetadata(game ? `${game.h1.split(":")[0]}: the cards` : "Play");
}

export default async function GamePlayPage({ params }: Props) {
  const game = intlGameBySlug.get((await params).slug);
  if (!game) notFound();
  const path = `/games/${game.slug}/`;
  return <PlayDeckLoader deckId={game.deckId} name={game.h1.split(":")[0]} sharePath={path} backHref={path} questions={game.cards} />;
}
