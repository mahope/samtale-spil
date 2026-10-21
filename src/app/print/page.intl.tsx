import type { Metadata } from "next";
import Link from "next/link";
import { OG_BASE } from "@/config/site";
import { DeckBack } from "@/components/deck/DeckParts";
import { IntlHeader, IntlFooter } from "@/intl/Chrome";
import { intlPrintDecks } from "@/intl/printDecks";

export const metadata: Metadata = {
  title: "Printable Conversation Cards: Free PDF for Every Deck",
  description: "Print the conversation cards yourself: a free PDF for every deck with eight cards per page, cut lines, a card back and four blank cards for your own questions.",
  alternates: { canonical: "/print/" },
  openGraph: { ...OG_BASE, url: "/print/" },
};

export default function PrintPage() {
  return (
    <>
      <IntlHeader />
      <main id="main-content" className="mx-auto max-w-4xl px-4 pt-8 sm:px-6">
        <h1 className="text-4xl font-extrabold tracking-[-0.025em] sm:text-5xl" style={{ fontStretch: "88%" }}>Printable conversation cards</h1>
        <p className="mt-4 max-w-2xl text-lg text-blaek-2">Rather hold the cards in your hand? Every deck is a free PDF with eight cards per page and four blank cards for your own questions.</p>
        <section aria-labelledby="how" className="mt-8 max-w-2xl rounded-2xl bg-flade p-5 ring-1 ring-streg">
          <h2 id="how" className="text-lg font-bold">How to print them</h2>
          <ul className="mt-2 list-disc space-y-1 pl-6">
            <li>The PDFs are A4. On US Letter, choose &ldquo;Fit to page&rdquo; in the print dialog; the cards get slightly smaller.</li>
            <li>Print double-sided, flipped on the long edge, so the backs line up with the fronts.</li>
            <li>Cut along the dashed lines. Each card is 9.5 &times; 6.5 cm (about 3.7 &times; 2.6 in).</li>
          </ul>
          <p className="mt-3 text-[0.95rem] text-blaek-2">Free for personal use and teaching. Not for sale.</p>
        </section>
        <h2 className="mt-12 text-2xl font-bold sm:text-3xl">Pick a deck</h2>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {intlPrintDecks.map((d) => (
            <li key={d.fil} className="flex items-center gap-3 rounded-2xl bg-flade p-3 ring-1 ring-streg">
              <DeckBack categoryId={d.deckId} className="h-14 w-10 shrink-0 rounded-md" />
              <span className="flex-1">
                <a href={`/print/${d.fil}.pdf`} download className="block font-bold underline">{d.title} (PDF)</a>
                <span className="text-sm text-blaek-2">{d.cards.length} cards, <Link href={d.href} className="underline">see them on the site</Link></span>
              </span>
            </li>
          ))}
        </ul>
      </main>
      <IntlFooter />
    </>
  );
}
