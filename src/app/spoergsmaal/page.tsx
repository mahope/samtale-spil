import type { Metadata } from "next";
import { OG_BASE, QUESTION_COUNT } from "@/config/site";
import Link from "next/link";
import { categories } from "@/data/categories";
import { categoryTexts } from "@/data/categoryTexts";
import { curatedPages } from "@/data/curatedPages";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { DeckBack } from "@/components/deck/DeckParts";

export const metadata: Metadata = {
  title: "Samtalespørgsmål til par, familie og venner",
  description:
    "Alle spørgsmålene fra Snakkespil samlet efter emne: til kæresten, familien, vennerne, børnene, kollegerne og første date. Gratis at læse og spille.",
  alternates: { canonical: "/spoergsmaal/" },
  openGraph: { ...OG_BASE, url: "/spoergsmaal/" },
};

export default function QuestionIndexPage() {
  const listed = categories.filter((c) => categoryTexts[c.id]);
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="mx-auto max-w-6xl px-4 pt-8 sm:px-6">
        <h1 className="text-4xl font-extrabold tracking-[-0.025em] sm:text-5xl" style={{ fontStretch: "88%" }}>
          Samtalespørgsmål til enhver snak
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-blaek-2">
          Her er alle {QUESTION_COUNT.toLocaleString("da-DK")} spørgsmål fra spillet sorteret efter emne. Læs dem
          igennem, brug dem til middagen, eller spil dem som kort.
        </p>
        <h2 className="mt-12 text-2xl font-bold sm:text-3xl">Efter anledning</h2>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {curatedPages.map((p) => (
            <li key={p.slug}>
              <Link href={`/spoergsmaal/${p.slug}/`} className="group block h-full rounded-2xl bg-flade p-4 ring-1 ring-streg hover:bg-flade-2">
                <span className="block text-lg font-bold group-hover:underline">{p.h1.split(":")[0]}</span>
                <span className="mt-1 block text-[0.95rem] leading-snug text-blaek-2">{p.metaDescription}</span>
              </Link>
            </li>
          ))}
        </ul>
        <h2 className="mt-14 text-2xl font-bold sm:text-3xl">Efter emne</h2>
        <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {listed.map((c) => (
            <li key={c.id}>
              <Link href={`/spoergsmaal/${c.id}/`} className="group flex h-full gap-4 rounded-2xl bg-flade p-4 ring-1 ring-streg hover:bg-flade-2">
                <DeckBack categoryId={c.id} className="h-20 w-14 shrink-0 rounded-lg" />
                <span>
                  <span className="block text-lg font-bold group-hover:underline">{categoryTexts[c.id].seoTitle.split(/[:?]/)[0]}</span>
                  <span className="mt-1 block text-[0.95rem] leading-snug text-blaek-2">{c.description}</span>
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
