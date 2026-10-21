import type { Metadata } from "next";
import Link from "next/link";
import { OG_BASE } from "@/config/site";
import { DeckBack } from "@/components/deck/DeckParts";
import { IntlHeader, IntlFooter } from "@/intl/Chrome";
import { intlGames } from "@/intl/games";

export const metadata: Metadata = {
  title: "Party Games and Holiday Games Without Alcohol",
  description: "Games for Christmas, New Year's Eve, office parties, dinner parties and weddings, plus never have I ever and truth or dare. All free, all alcohol-free.",
  alternates: { canonical: "/games/" },
  openGraph: { ...OG_BASE, url: "/games/" },
};

export default function GamesIndex() {
  return (
    <>
      <IntlHeader />
      <main id="main-content" className="mx-auto max-w-5xl px-4 pt-8 sm:px-6">
        <h1 className="text-4xl font-extrabold tracking-[-0.025em] sm:text-5xl" style={{ fontStretch: "88%" }}>
          Party games
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-blaek-2">
          Games that get people talking, for the holidays, the office party and the dinner table. Every page has the rules and a deck of cards you can play on your phone. No drinking games.
        </p>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {intlGames.map((g) => (
            <li key={g.slug}>
              <Link href={`/games/${g.slug}/`} className="group flex h-full gap-4 rounded-2xl bg-flade p-4 ring-1 ring-streg hover:bg-flade-2">
                <DeckBack categoryId={g.deckId} className="h-20 w-14 shrink-0 rounded-lg" />
                <span>
                  <span className="block text-lg font-bold group-hover:underline">{g.h1.split(":")[0]}</span>
                  <span className="mt-1 block text-[0.95rem] leading-snug text-blaek-2">{g.metaDescription}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <IntlFooter />
    </>
  );
}
