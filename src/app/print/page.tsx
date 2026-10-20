import type { Metadata } from "next";
import Link from "next/link";
import { OG_BASE } from "@/config/site";
import { printDecks } from "@/data/printDecks";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { DeckBack } from "@/components/deck/DeckParts";

export const metadata: Metadata = {
  title: "Samtalekort til print: gratis PDF til hver bunke",
  description:
    "Print samtalekortene selv: en gratis PDF til hver bunke med otte kort pr. A4-ark, skærelinjer, bagside og fire blanke kort til jeres egne spørgsmål.",
  alternates: { canonical: "/print/" },
  openGraph: { ...OG_BASE, url: "/print/" },
};

export default function PrintPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="mx-auto max-w-4xl px-4 pt-8 sm:px-6">
        <h1 className="text-4xl font-extrabold tracking-[-0.025em] sm:text-5xl" style={{ fontStretch: "88%" }}>
          Samtalekort til print
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-blaek-2">
          Vil I hellere have kortene i hånden? Hver bunke findes som en gratis PDF med otte kort pr. A4-ark og fire blanke
          kort til jeres egne spørgsmål.
        </p>
        <section aria-labelledby="saadan" className="mt-8 max-w-2xl rounded-2xl bg-flade p-5 ring-1 ring-streg">
          <h2 id="saadan" className="text-lg font-bold">
            Sådan printer I dem
          </h2>
          <ul className="mt-2 list-disc space-y-1 pl-6">
            <li>Print på A4 i 100 % (»faktisk størrelse«), gerne på lidt tykkere papir.</li>
            <li>Vælg dobbeltsidet print, vendt på den lange kant, så bagsiden passer til forsiden.</li>
            <li>Klip langs de stiplede linjer. Hvert kort er 9,5 × 6,5 cm.</li>
          </ul>
          <p className="mt-3 text-[0.95rem] text-blaek-2">
            Gratis til personligt brug og undervisning. Kortene må ikke sælges.
          </p>
        </section>

        <h2 className="mt-12 text-2xl font-bold sm:text-3xl">Vælg en bunke</h2>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {printDecks.map((d) => (
            <li key={d.fil} className="flex items-center gap-3 rounded-2xl bg-flade p-3 ring-1 ring-streg">
              <DeckBack categoryId={d.deckId} className="h-14 w-10 shrink-0 rounded-md" />
              <span className="flex-1">
                <a href={`/print/${d.fil}.pdf`} download className="block font-bold underline">
                  {d.title} (PDF)
                </a>
                <span className="text-sm text-blaek-2">
                  {d.cards.length} kort,{" "}
                  <Link href={d.href} className="underline">
                    se dem på siden
                  </Link>
                </span>
              </span>
            </li>
          ))}
        </ul>
      </main>
      <SiteFooter />
    </>
  );
}
