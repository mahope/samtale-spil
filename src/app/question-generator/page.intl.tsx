import type { Metadata } from "next";
import Link from "next/link";
import { OG_BASE } from "@/config/site";
import { ui } from "@/locale/ui";
import { FAMILY_FRIENDLY_DECKS } from "@/data/cardTypes";
import { IntlHeader, IntlFooter } from "@/intl/Chrome";
import { intlGroups, INTL_CARD_COUNT } from "@/intl/data";
import { IntlGenerator, type GenDeck } from "./IntlGenerator";

export const metadata: Metadata = {
  title: "Question Generator: Find a Good Conversation Starter",
  description: `Pick who you are with and how deep you want to go, and get a new conversation question with every click. ${INTL_CARD_COUNT.toLocaleString("en-US")} questions to choose from.`,
  alternates: { canonical: "/question-generator/" },
  openGraph: { ...OG_BASE, url: "/question-generator/" },
};

export default function GeneratorPage() {
  const groups = intlGroups();
  const decks: GenDeck[] = groups.flatMap((g) =>
    g.decks.map((d) => ({ id: d.id, name: d.name, slug: d.slug, group: g.id, familyFriendly: FAMILY_FRIENDLY_DECKS.has(d.id), questions: d.questions }))
  );
  // A fixed sample in the HTML: crawlable, and what you see without JavaScript
  const sample = groups.flatMap((g) => g.decks.slice(0, 3).map((d) => ({ q: d.questions[Math.floor(d.questions.length / 3)], d })));
  return (
    <>
      <IntlHeader />
      <main id="main-content" className="mx-auto max-w-4xl px-4 pt-8 sm:px-6">
        <h1 className="text-4xl font-extrabold tracking-[-0.025em] sm:text-5xl" style={{ fontStretch: "88%" }}>
          Question generator
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-blaek-2">
          Stuck for something to talk about? Pick who you are with and how deep you feel like going, then hit the button. You get a new question every time, from easy icebreakers to the ones people remember.
        </p>
        <IntlGenerator decks={decks} groups={groups.map((g) => ({ id: g.id, title: ui.groups[g.id] }))} start={sample[0].q} />
        <h2 className="mt-16 text-2xl font-bold sm:text-3xl">A few of the questions</h2>
        <ol className="mt-5 divide-y divide-streg border-y border-streg">
          {sample.map(({ q, d }) => (
            <li key={q.id} data-kort className="flex flex-col gap-1 py-3.5 sm:flex-row sm:gap-6">
              <Link href={`/questions/${d.slug}/`} className="w-44 shrink-0 text-sm font-semibold text-blaek-2 underline">{d.name}</Link>
              <span>{q.text}</span>
            </li>
          ))}
        </ol>
        <p className="mt-10 text-blaek-2">There is also a new card every day as the <Link href="/daily-question/" className="underline">question of the day</Link>.</p>
      </main>
      <IntlFooter />
    </>
  );
}
