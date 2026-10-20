import type { Metadata } from "next";
import Link from "next/link";
import { OG_BASE } from "@/config/site";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { danishDateKey } from "@/lib/dagensKort";
import { DagensKortVisning } from "./DagensKortVisning";

export const metadata: Metadata = {
  title: "Dagens spørgsmål: et nyt samtalekort hver dag",
  description:
    "Et nyt spørgsmål hver dag til aftensmaden, kaffepausen eller gåturen. Gratis, uden login, og det samme spørgsmål som i Snakkespil-appen.",
  alternates: { canonical: "/dagens-spoergsmaal/" },
  openGraph: { ...OG_BASE, url: "/dagens-spoergsmaal/" },
};

export default function DagensSpoergsmaalPage() {
  // Built once per deploy; the client switches to the current day (DagensKortVisning)
  const buildKey = danishDateKey(new Date());
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="mx-auto max-w-3xl px-4 pt-8 sm:px-6">
        <h1 className="text-4xl font-extrabold tracking-[-0.025em] sm:text-5xl" style={{ fontStretch: "88%" }}>
          Dagens spørgsmål
        </h1>
        <p className="mt-4 max-w-xl text-lg text-blaek-2">
          Et nyt kort hver dag. Læs det højt ved aftensmaden, send det til en ven, eller tag det med på gåturen. I appen
          kan du få det som en påmindelse.
        </p>

        <DagensKortVisning buildKey={buildKey} />

        <p className="mt-10 text-blaek-2">
          Vil du have flere? Prøv <Link href="/generator/" className="underline">spørgsmålsgeneratoren</Link>, eller{" "}
          <Link href="/spil/" className="underline">vælg en hel bunke</Link>.
        </p>
      </main>
      <SiteFooter />
    </>
  );
}
