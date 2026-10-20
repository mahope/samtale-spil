import type { Metadata } from "next";
import Link from "next/link";
import { OG_BASE } from "@/config/site";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { groupedCategories } from "@/data/deckGroups";
import { Generator } from "./Generator";

export const metadata: Metadata = {
  title: "Spørgsmålsgenerator: find et spørgsmål til samtalen",
  description:
    "Vælg hvem I er sammen med, og hvor dybt I vil gå, og få et nyt samtalespørgsmål ved hvert klik. Over 2.500 spørgsmål til par, familie, venner, skole og spejder.",
  alternates: { canonical: "/generator/" },
  openGraph: { ...OG_BASE, url: "/generator/" },
};

export default function GeneratorPage() {
  // A fixed sample that is in the HTML: crawlable, and what you see without JavaScript
  const groups = groupedCategories();
  const udvalg = groups.flatMap((g) =>
    g.categories.slice(0, 3).map((c) => ({ q: c.questions[Math.floor(c.questions.length / 3)], c }))
  );
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="mx-auto max-w-4xl px-4 pt-8 sm:px-6">
        <h1 className="text-4xl font-extrabold tracking-[-0.025em] sm:text-5xl" style={{ fontStretch: "88%" }}>
          Spørgsmålsgenerator
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-blaek-2">
          Mangler I noget at snakke om? Vælg hvem I er sammen med, og hvor dybt I har lyst til at gå, og tryk på knappen.
          Der kommer et nyt spørgsmål hver gang, fra lette ice-breakers til de spørgsmål, man husker bagefter.
        </p>

        <Generator start={udvalg[0].q} />

        <h2 className="mt-16 text-2xl font-bold sm:text-3xl">Et udvalg af spørgsmålene</h2>
        <p className="mt-2 max-w-2xl text-blaek-2">Et par kort fra hver slags bunke. Tryk på bunken for at se dem alle.</p>
        <ol className="mt-5 divide-y divide-streg border-y border-streg">
          {udvalg.map(({ q, c }) => (
            <li key={q.id} data-kort className="flex flex-col gap-1 py-3.5 sm:flex-row sm:gap-6">
              <Link href={`/spoergsmaal/${c.id}/`} className="w-40 shrink-0 text-sm font-semibold text-blaek-2 underline">
                {c.name}
              </Link>
              <span>{q.text}</span>
            </li>
          ))}
        </ol>
        <p className="mt-10 text-blaek-2">
          Hver dag er der også et nyt kort under <Link href="/dagens-spoergsmaal/" className="underline">dagens spørgsmål</Link>.
        </p>
      </main>
      <SiteFooter />
    </>
  );
}
