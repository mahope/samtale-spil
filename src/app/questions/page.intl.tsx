import type { Metadata } from "next";
import Link from "next/link";
import { OG_BASE } from "@/config/site";
import { ui } from "@/locale/ui";
import { DeckBack } from "@/components/deck/DeckParts";
import { IntlHeader, IntlFooter } from "@/intl/Chrome";
import { intlGroups, INTL_CARD_COUNT } from "@/intl/data";

export const metadata: Metadata = {
  title: "Conversation Questions for Every Kind of Talk",
  description: "All our conversation questions sorted by topic: for couples, first dates, families, kids and friends, plus deep questions. Free to read and play.",
  alternates: { canonical: "/questions/" },
  openGraph: { ...OG_BASE, url: "/questions/" },
};

export default function QuestionIndex() {
  return (
    <>
      <IntlHeader />
      <main id="main-content" className="mx-auto max-w-6xl px-4 pt-8 sm:px-6">
        <h1 className="text-4xl font-extrabold tracking-[-0.025em] sm:text-5xl" style={{ fontStretch: "88%" }}>
          Conversation questions for every kind of talk
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-blaek-2">
          All {INTL_CARD_COUNT.toLocaleString("en-US")} questions, sorted by topic. Read them here, use them at dinner, or play them as cards.
        </p>
        {intlGroups().map((g) => (
          <section key={g.id} aria-labelledby={`topic-${g.id}`}>
            <h2 id={`topic-${g.id}`} className="mt-12 text-2xl font-bold sm:text-3xl">{ui.groups[g.id]}</h2>
            <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {g.decks.map((d) => (
                <li key={d.id}>
                  <Link href={`/questions/${d.slug}/`} className="group flex h-full gap-4 rounded-2xl bg-flade p-4 ring-1 ring-streg hover:bg-flade-2">
                    <DeckBack categoryId={d.id} className="h-20 w-14 shrink-0 rounded-lg" />
                    <span>
                      <span className="block text-lg font-bold group-hover:underline">{d.seoTitle.split(/[:?]/)[0]}</span>
                      <span className="mt-1 block text-[0.95rem] leading-snug text-blaek-2">{d.description}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </main>
      <IntlFooter />
    </>
  );
}
