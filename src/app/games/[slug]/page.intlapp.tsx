import Link from "next/link";
import { notFound } from "next/navigation";
import { AppScreen } from "@/components/app/AppScreen";
import { getDeck } from "@/data/decks";
import { IntlGameList } from "@/intl/GameList";
import { intlGames, intlGameBySlug } from "@/intl/games";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return intlGames.map((g) => ({ slug: g.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props) {
  return { title: intlGameBySlug.get((await params).slug)?.h1.split(":")[0] ?? "Games" };
}

/** One page of party games in the app: the games, and the cards to play on the phone */
export default async function GameScreen({ params }: Props) {
  const game = intlGameBySlug.get((await params).slug);
  if (!game) notFound();
  const deck = getDeck(game.deckId);
  return (
    <AppScreen title={game.h1.split(":")[0]} back={{ href: "/games/", label: "Party games" }}>
      <div className="px-4 pt-1">
        <p className="leading-relaxed">{game.intro}</p>
        <Link
          href={`/games/${game.slug}/play/`}
          className="app-press mt-5 flex min-h-12 items-center justify-center rounded-full px-6 text-base font-bold android:rounded-2xl"
          style={{ background: deck.bg, color: deck.ink }}
          data-ripple
        >
          Play the {game.cards.length} cards
        </Link>
        <h2 className="mt-8 text-xl font-bold">The games</h2>
        <IntlGameList game={game} />
      </div>
    </AppScreen>
  );
}
