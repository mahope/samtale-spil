import type { Metadata } from "next";
import Link from "next/link";
import { OG_BASE } from "@/config/site";
import { localeGuides } from "@/locale/guides";
import { IntlHeader, IntlFooter } from "@/intl/Chrome";

export const metadata: Metadata = {
  title: "Guides to Better Conversations",
  description: "Short guides with exercises and questions: active listening, love languages, love maps and communication in relationships. With sources, no promises.",
  alternates: { canonical: "/guide/" },
  openGraph: { ...OG_BASE, url: "/guide/" },
};

export default function GuideIndex() {
  return (
    <>
      <IntlHeader />
      <main id="main-content" className="mx-auto max-w-4xl px-4 pt-8 sm:px-6">
        <h1 className="text-4xl font-extrabold tracking-[-0.025em] sm:text-5xl" style={{ fontStretch: "88%" }}>
          Guides to better conversations
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-blaek-2">Each guide turns an idea from research on conversations and relationships into an exercise you can try with the cards. The sources are at the bottom of each page.</p>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {localeGuides.map((g) => (
            <li key={g.slug}>
              <Link href={`/guide/${g.slug}/`} className="group block h-full rounded-2xl bg-flade p-5 ring-1 ring-streg hover:bg-flade-2">
                <span className="block text-xl font-bold group-hover:underline">{g.h1.split(":")[0]}</span>
                <span className="mt-1.5 block leading-snug text-blaek-2">{g.metaDescription}</span>
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <IntlFooter />
    </>
  );
}
