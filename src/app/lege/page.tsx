import type { Metadata } from "next";
import Link from "next/link";
import { legeSider, legeDeck } from "@/data/lege";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { DeckBack } from "@/components/deck/DeckParts";
import { OG_BASE } from "@/config/site";

export const metadata: Metadata = {
  title: "Lege til jul, nytår og selskaber",
  description: "Gratis lege og kort til julen, julefrokosten, nytårsaften og middagsselskabet. Uden alkohol og uden at nogen skal udstilles.",
  alternates: { canonical: "/lege/" },
  openGraph: { ...OG_BASE, url: "/lege/" },
};

export default function LegeIndex() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="mx-auto max-w-6xl px-4 pt-8 sm:px-6">
        <h1 className="text-4xl font-extrabold tracking-[-0.025em] sm:text-5xl" style={{ fontStretch: "88%" }}>
          Lege til festen
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-blaek-2">
          Lege, der får gang i bordet, uden at nogen skal drikke eller udstilles. Hver side har en håndfuld lege og en lille
          bunke kort, I kan spille på telefonen.
        </p>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {legeSider.map((s) => (
            <li key={s.slug}>
              <Link href={`/lege/${s.slug}/`} className="group flex h-full gap-4 rounded-2xl bg-flade p-4 ring-1 ring-streg hover:bg-flade-2">
                <DeckBack categoryId={legeDeck(s.slug)} className="h-20 w-14 shrink-0 rounded-lg" />
                <span>
                  <span className="block text-lg font-bold group-hover:underline">{s.h1.split(":")[0]}</span>
                  <span className="mt-1 block text-[0.95rem] leading-snug text-blaek-2">{s.metaDescription}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <SiteFooter />
    </>
  );
}
