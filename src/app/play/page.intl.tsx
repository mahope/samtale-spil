import type { Metadata } from "next";
import { ui } from "@/locale/ui";
import { DeckTile } from "@/components/deck/DeckParts";
import { IntlHeader, IntlFooter } from "@/intl/Chrome";
import { intlGroups } from "@/intl/data";
import { OG_BASE } from "@/config/site";

export const metadata: Metadata = {
  title: "Choose a deck",
  description: "Conversation cards for couples, first dates, families, kids and friends, plus deep and philosophical questions. Pick a deck and start playing.",
  alternates: { canonical: "/play/" },
  openGraph: { ...OG_BASE, url: "/play/" },
};

export default function PlayChooser() {
  return (
    <>
      <IntlHeader />
      <main id="main-content" className="mx-auto max-w-6xl px-4 pt-8 sm:px-6">
        <h1 className="text-4xl font-extrabold tracking-[-0.025em] sm:text-5xl" style={{ fontStretch: "88%" }}>
          Choose a deck
        </h1>
        <p className="mt-3 max-w-xl text-lg text-blaek-2">Every deck has its own theme. Tap one to start.</p>
        <div className="mt-8 space-y-10">
          {intlGroups().map((g) => (
            <section key={g.id} aria-labelledby={`group-${g.id}`}>
              <h2 id={`group-${g.id}`} className="text-xl font-bold sm:text-2xl">
                {ui.groups[g.id]}
              </h2>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
                {g.decks.map((d) => (
                  <DeckTile key={d.id} categoryId={d.id} name={d.name} description={d.description} count={d.questions.length} href={`/play/${d.slug}/`} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
      <IntlFooter />
    </>
  );
}
