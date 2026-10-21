import type { Metadata } from "next";
import { OG_BASE } from "@/config/site";
import { site } from "@/locale/site";
import { IntlHeader, IntlFooter } from "@/intl/Chrome";
import { intlDecks } from "@/intl/data";
import { SamletStatistik } from "@/app/statistik/samlet/SamletStatistik";

export const metadata: Metadata = {
  title: `What Are People Playing? ${site.name} Stats`,
  description: "See how much people play, which decks are most popular and which questions get flipped most often. All numbers are anonymous.",
  alternates: { canonical: "/stats/" },
  openGraph: { ...OG_BASE, url: "/stats/" },
};

export default function StatsPage() {
  const deckNames = Object.fromEntries(intlDecks.map((d) => [d.id, d.name]));
  const deckHref = Object.fromEntries(intlDecks.map((d) => [d.id, `/questions/${d.slug}/`]));
  return (
    <>
      <IntlHeader />
      <main id="main-content" className="mx-auto max-w-3xl px-4 pt-8 sm:px-6">
        <h1 className="text-4xl font-extrabold tracking-[-0.025em] sm:text-5xl" style={{ fontStretch: "88%" }}>
          What are people playing?
        </h1>
        <p className="mt-4 text-lg text-blaek-2">
          Numbers for everyone who plays {site.name}. They come from anonymous, cookieless statistics, and no single player can be identified.
        </p>
        <SamletStatistik deckNames={deckNames} deckHref={deckHref} />
      </main>
      <IntlFooter />
    </>
  );
}
