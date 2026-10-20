import type { Metadata } from "next";
import { OG_BASE } from "@/config/site";
import Link from "next/link";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { DeckBack } from "@/components/deck/DeckParts";
import { GroupedDecks } from "@/components/deck/GroupedDecks";
import { getTotalQuestionCount } from "@/data/categories";
import { ChooserTools } from "./ChooserTools";

export const metadata: Metadata = {
  title: "Vælg et spil",
  description:
    "Vælg mellem samtalekort til par, familie, venner, børn, kollegaer og første date. Eller bland alle kortene og se, hvad der kommer.",
  alternates: { canonical: "/spil/" },
  openGraph: { ...OG_BASE, url: "/spil/" },
};

const modes = [
  {
    href: "/spil/trappen/",
    deck: "dybe",
    title: "Trappen",
    text: "Tolv kort fra let til dyb, som i Arons 36 spørgsmål.",
  },
  {
    href: "/spil/aftensmad/",
    deck: "familie",
    title: "Aftensmad",
    text: "Tre lette kort til familiebordet.",
  },
  {
    href: "/spil/aaret-der-gik/",
    deck: "aaret",
    title: "Året der gik",
    text: "Fire runder: se tilbage, gæt, se frem og gæt igen. Til nytår og fødselsdage.",
  },
  {
    href: "/spil/shuffle-all/",
    deck: "blandet",
    title: "Bland alle kort",
    text: `Alle ${getTotalQuestionCount().toLocaleString("da-DK")} spørgsmål i én bunke.`,
  },
  {
    href: "/multiplayer/",
    deck: "venner",
    title: "Send telefonen rundt",
    text: "I skiftes til at trække og svare. Holder styr på, hvis tur det er.",
  },
  {
    href: "/spil/gaet/",
    deck: "kend-din-partner",
    title: "Gæt svaret",
    text: "Én svarer i hemmelighed, og den næste gætter. Med point, hvis I vil.",
  },
  {
    href: "/mine-spoergsmaal/",
    deck: "egne",
    title: "Dine egne spørgsmål",
    text: "Skriv jeres egne kort og spil med dem.",
  },
];

export default function ChooserPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="mx-auto max-w-6xl px-4 pt-8 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl font-extrabold tracking-[-0.025em] sm:text-5xl" style={{ fontStretch: "88%" }}>
              Vælg et spil
            </h1>
            <p className="mt-3 max-w-xl text-lg text-blaek-2">
              Hver bunke har sit emne. Tryk på en for at begynde.
            </p>
          </div>
          <ChooserTools />
        </div>

        <GroupedDecks headingLevel="h2" />

        <h2 className="mt-16 text-2xl font-bold sm:text-3xl">Andre måder at spille på</h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {modes.map((m) => (
            <li key={m.href}>
              <Link href={m.href} className="group flex h-full items-center gap-4 rounded-2xl bg-flade p-4 ring-1 ring-streg hover:bg-flade-2">
                <DeckBack categoryId={m.deck} className="h-16 w-12 shrink-0 rounded-lg ring-1 ring-black/10" />
                <span>
                  <span className="block text-lg font-bold group-hover:underline">{m.title}</span>
                  <span className="mt-0.5 block text-[0.95rem] leading-snug text-blaek-2">{m.text}</span>
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
