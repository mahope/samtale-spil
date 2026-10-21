import type { Metadata } from "next";
import Link from "next/link";
import { OG_BASE } from "@/config/site";
import { IntlHeader, IntlFooter } from "@/intl/Chrome";
import { intlDeckById } from "@/intl/data";
import { DAILY_DECKS } from "@/lib/dagensKort";
import { danishDateKey } from "@/lib/dagDato";
import { DailyCard, type DailyPick } from "./DailyCard";

export const metadata: Metadata = {
  title: "Question of the Day: a New Conversation Card Every Day",
  description: "A new conversation question every day for dinner, the coffee break or a walk. Free, no sign-up, and a good habit for couples, families and friends.",
  alternates: { canonical: "/daily-question/" },
  openGraph: { ...OG_BASE, url: "/daily-question/" },
};

// The same decks and card ids as Snakkespil's "Dagens spørgsmål", so both sites share the card of the day
const pool: DailyPick[] = DAILY_DECKS.flatMap((id) => {
  const deck = intlDeckById.get(id);
  return deck ? deck.questions.filter((q) => q.depth !== "dyb").map((q) => ({ q, deck: { name: deck.name, slug: deck.slug } })) : [];
});

export default function DailyQuestionPage() {
  return (
    <>
      <IntlHeader />
      <main id="main-content" className="mx-auto max-w-3xl px-4 pt-8 sm:px-6">
        <h1 className="text-4xl font-extrabold tracking-[-0.025em] sm:text-5xl" style={{ fontStretch: "88%" }}>
          Question of the day
        </h1>
        <p className="mt-4 max-w-xl text-lg text-blaek-2">A new card every day. Read it out loud at dinner, send it to a friend, or take it on your walk.</p>
        <DailyCard buildKey={danishDateKey(new Date())} pool={pool} />
        <p className="mt-10 text-blaek-2">
          Want more? Try the <Link href="/question-generator/" className="underline">question generator</Link>, or <Link href="/play/" className="underline">pick a whole deck</Link>.
        </p>
      </main>
      <IntlFooter />
    </>
  );
}
