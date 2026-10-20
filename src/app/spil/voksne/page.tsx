import type { Metadata } from "next";
import Link from "next/link";
import { appScreenMetadata } from "@/config/site";
import { adultQuestions } from "@/data/questions/voksne";
import AdultPlayClient from "./AdultPlayClient";

export const metadata: Metadata = appScreenMetadata("Kun for voksne");

export default function AdultPlayPage() {
  // The apps ship without the 18+ deck (issue #54)
  if (adultQuestions.length === 0) {
    return (
      <main id="main-content" className="mx-auto max-w-xl px-4 pt-16 sm:px-6">
        <h1 className="text-3xl font-bold">Kun for voksne</h1>
        <p className="mt-3 text-lg text-blaek-2">Kortene for voksne findes ikke i appen. Du kan spille dem på snakkespil.dk.</p>
        <Link href="/spil/" className="mt-6 inline-flex min-h-12 items-center rounded-full bg-bord px-6 font-bold text-white">
          Vælg et andet spil
        </Link>
      </main>
    );
  }
  return <AdultPlayClient />;
}
