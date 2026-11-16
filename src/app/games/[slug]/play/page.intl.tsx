import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { appScreenMetadata } from "@/config/site";
import { intlGames, intlGameBySlug } from "@/intl/games";
import { PlayDeckLoader } from "@/intl/PlayDeckLoader";
import { screens } from "@/locale/screens";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return intlGames.map((g) => ({ slug: g.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const game = intlGameBySlug.get((await params).slug);
  return appScreenMetadata(game ? screens.play.gameMeta(game.h1.split(":")[0]) : screens.play.title);
}

export default async function GamePlayPage({ params }: Props) {
  const game = intlGameBySlug.get((await params).slug);
  if (!game) notFound();
  const path = `/games/${game.slug}/`;
  return <PlayDeckLoader deckId={game.deckId} name={game.h1.split(":")[0]} sharePath={path} backHref={path} questions={game.cards} />;
}
