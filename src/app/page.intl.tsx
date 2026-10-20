import type { Metadata } from "next";
import Link from "next/link";
import { OG_BASE } from "@/config/site";
import { site } from "@/locale/site";
import { ui } from "@/locale/ui";
import { DeckTile } from "@/components/deck/DeckParts";
import { IntlHeader, IntlFooter } from "@/intl/Chrome";
import { intlGroups, intlDecks, INTL_CARD_COUNT } from "@/intl/data";
import { homeLanguages } from "@/locales/alternates";

export const metadata: Metadata = {
  title: { absolute: `Free Conversation Cards for Couples, Families and Friends | ${site.name}` },
  description: `${INTL_CARD_COUNT.toLocaleString("en-US")} free conversation questions in ${intlDecks.length} decks: for couples, first dates, families, kids and friends. Play in your browser, no sign-up.`,
  alternates: { canonical: "/", languages: homeLanguages },
  openGraph: { ...OG_BASE, url: "/" },
};

export default function Home() {
  return (
    <>
      <IntlHeader tone="filt" />
      <main id="main-content">
        <section className="filt px-4 pb-16 pt-10 text-white sm:px-6">
          <div className="mx-auto max-w-6xl">
            <h1 className="max-w-3xl text-5xl font-extrabold leading-[1.02] tracking-[-0.03em] sm:text-7xl" style={{ fontStretch: "86%" }}>
              Better conversations, one card at a time
            </h1>
            <p className="mt-6 max-w-xl text-lg text-white/85 sm:text-xl">
              {INTL_CARD_COUNT.toLocaleString("en-US")} free questions for couples, families and friends. Draw a card, read it out
              loud, and let the conversation go where it wants.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/play/" className="inline-flex min-h-14 items-center rounded-full bg-kridt px-7 text-lg font-bold text-kridt-blaek">
                Choose a deck
              </Link>
              <Link href="/how-to-play/" className="inline-flex min-h-14 items-center rounded-full px-5 text-lg font-semibold text-white underline underline-offset-4">
                How to play
              </Link>
            </div>
          </div>
        </section>
        <section className="mx-auto mt-16 max-w-6xl px-4 sm:px-6" aria-labelledby="decks">
          <h2 id="decks" className="text-3xl font-bold sm:text-4xl">
            {intlDecks.length} decks to choose from
          </h2>
          <p className="mt-2 max-w-xl text-blaek-2">Pick a deck based on who you&rsquo;re with and how deep you want to go. Every card is marked light, medium or deep.</p>
        <div className="mt-8 space-y-10">
          {intlGroups().map((g) => (
            <section key={g.id} aria-labelledby={`group-${g.id}`}>
              <h3 id={`group-${g.id}`} className="text-xl font-bold sm:text-2xl">
                {ui.groups[g.id]}
              </h3>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
                {g.decks.map((d) => (
                  <DeckTile key={d.id} categoryId={d.id} name={d.name} description={d.description} count={d.questions.length} href={`/play/${d.slug}/`} headingLevel="h4" />
                ))}
              </div>
            </section>
          ))}
        </div>
        </section>
        <section className="mx-auto mt-20 max-w-3xl px-4 sm:px-6" aria-labelledby="how">
          <h2 id="how" className="text-3xl font-bold sm:text-4xl">How it works</h2>
          <ol className="mt-5 list-decimal space-y-3 pl-6 text-lg">
            <li>Pick a deck for the people you&rsquo;re with.</li>
            <li>Flip a card, read it out loud, and everyone answers.</li>
            <li>Ask a follow-up question. The second question is often the best one.</li>
            <li>Skip any card you like. Nobody has to explain why.</li>
          </ol>
        </section>
      </main>
      <IntlFooter />
    </>
  );
}
