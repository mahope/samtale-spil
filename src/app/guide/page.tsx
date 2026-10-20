import type { Metadata } from "next";
import Link from "next/link";
import { OG_BASE } from "@/config/site";
import { guides } from "@/data/guides";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";

export const metadata: Metadata = {
  title: "Guides til bedre samtaler",
  description:
    "Korte guides med øvelser og spørgsmål: aktiv lytning, kærlighedssprog, love maps og kommunikation i parforholdet. Med kilder og uden løfter.",
  alternates: { canonical: "/guide/" },
  openGraph: { ...OG_BASE, url: "/guide/" },
};

export default function GuideIndexPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="mx-auto max-w-4xl px-4 pt-8 sm:px-6">
        <h1 className="text-4xl font-extrabold tracking-[-0.025em] sm:text-5xl" style={{ fontStretch: "88%" }}>
          Guides til bedre samtaler
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-blaek-2">
          Hver guide tager en idé fra forskningen i samtaler og parforhold og gør den til en øvelse, I kan prøve med
          kortene. Kilderne står nederst på siderne.
        </p>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {guides.map((g) => (
            <li key={g.slug}>
              <Link href={`/guide/${g.slug}/`} className="group block h-full rounded-2xl bg-flade p-5 ring-1 ring-streg hover:bg-flade-2">
                <span className="block text-xl font-bold group-hover:underline">{g.h1.split(":")[0]}</span>
                <span className="mt-1.5 block leading-snug text-blaek-2">{g.metaDescription}</span>
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <SiteFooter />
    </>
  );
}
