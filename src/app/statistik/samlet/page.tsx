import type { Metadata } from "next";
import Link from "next/link";
import { categories } from "@/data/categories";
import { OG_BASE } from "@/config/site";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SamletStatistik } from "./SamletStatistik";

export const metadata: Metadata = {
  title: "Hvad spiller folk? Statistik for Snakkespil",
  description: "Se hvor meget der bliver spillet, hvilke bunker der er mest populære, og hvilke spørgsmål folk vender oftest. Tallene er anonyme.",
  alternates: { canonical: "/statistik/samlet/" },
  openGraph: { ...OG_BASE, url: "/statistik/samlet/" },
  // the /statistik/ layout marks personal stats noindex; this page is public
  robots: { index: true, follow: true },
};

export default function SamletPage() {
  const deckNames = Object.fromEntries(categories.map((c) => [c.id, c.name]));
  const deckHref = Object.fromEntries(categories.map((c) => [c.id, `/spoergsmaal/${c.id}/`]));
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="mx-auto max-w-3xl px-4 pt-8 sm:px-6">
        <h1 className="text-4xl font-extrabold tracking-[-0.025em] sm:text-5xl" style={{ fontStretch: "88%" }}>
          Hvad spiller folk?
        </h1>
        <p className="mt-4 text-lg text-blaek-2">
          Tal for alle, der spiller Snakkespil. De kommer fra anonym brugsstatistik uden cookies, og ingen enkelt spiller
          kan genkendes. Din egen statistik ligger kun på din telefon under{" "}
          <Link href="/statistik/" className="underline">Din statistik</Link>.
        </p>
        <SamletStatistik deckNames={deckNames} deckHref={deckHref} />
      </main>
      <SiteFooter />
    </>
  );
}
