import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { DeckBack } from "@/components/deck/DeckParts";

export const metadata: Metadata = {
  title: "Siden findes ikke",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="mx-auto grid max-w-4xl items-center gap-10 px-4 pt-12 sm:px-6 md:grid-cols-[1fr_14rem]">
        <div>
          <h1 className="text-4xl font-extrabold tracking-[-0.025em] sm:text-5xl" style={{ fontStretch: "88%" }}>
            Det kort findes ikke i bunken
          </h1>
          <p className="mt-4 max-w-lg text-lg text-blaek-2">
            Siden er flyttet eller har aldrig været her. Måske var linket en smule forkert.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/spil/" className="inline-flex min-h-12 items-center rounded-full bg-bord px-6 font-bold text-white dark:bg-kridt dark:text-kridt-blaek">
              Vælg et spil
            </Link>
            <Link href="/" className="inline-flex min-h-12 items-center rounded-full px-5 font-semibold ring-1 ring-streg hover:bg-flade-2">
              Til forsiden
            </Link>
          </div>
        </div>
        <DeckBack categoryId="blandet" className="hidden aspect-[5/7] rotate-[-6deg] items-center justify-center rounded-[1.25rem] shadow-kort md:flex">
          <span className="font-display text-7xl font-extrabold">?</span>
        </DeckBack>
      </main>
      <SiteFooter />
    </>
  );
}
