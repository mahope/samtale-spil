import type { Metadata } from "next";
import Link from "next/link";
import { APPS_LIVE, OG_BASE, QUESTION_COUNT_LABEL } from "@/config/site";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { StoreButtons } from "@/components/site/StoreButtons";

const title = "Snakkespil som app til iPhone og Android";
const description =
  "Snakkespil-appen har de samme gratis samtalekort som hjemmesiden. Den virker uden internet, kan minde dig om dagens spørgsmål og kræver ingen konto.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/app/", languages: { da: "https://snakkespil.dk/app/", en: "https://goodtalkcards.com/app/" } },
  openGraph: { ...OG_BASE, url: "/app/", title, description },
};

const features = [
  {
    title: "Virker uden internet",
    text: "Alle kortene ligger i appen. I kan spille i sommerhuset, i toget eller i flyet.",
  },
  {
    title: "Dagens spørgsmål",
    text: "Slå en påmindelse til, så kommer der et nyt spørgsmål på det tidspunkt, der passer jer. Fx lige før aftensmaden.",
  },
  {
    title: "Dine favoritter",
    text: "Gem de kort, I gerne vil tage igen. De ligger på telefonen, ikke hos os.",
  },
  {
    title: "Ingen konto",
    text: "Du skal ikke oprette dig eller logge ind. Åbn appen og træk et kort.",
  },
  {
    title: "Ingen reklamer",
    text: "Appen er gratis og uden reklamer, ligesom hjemmesiden.",
  },
  {
    title: "Plads til børnene",
    text: "Appen har ikke bunken for voksne, så den kan ligge på familiens fælles telefon eller tablet.",
  },
];

export default function AppPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="mx-auto max-w-3xl px-4 pt-10 sm:px-6">
        <h1 className="text-4xl font-extrabold leading-[1.05] tracking-[-0.025em] sm:text-5xl" style={{ fontStretch: "88%" }}>
          Snakkespil som app
        </h1>
        <p className="mt-5 text-lg leading-relaxed">
          De samme {QUESTION_COUNT_LABEL} spørgsmål som her på siden, samlet i en app til iPhone og Android. Den er gratis, og
          den passer til en telefon, der bliver sendt rundt om bordet.
        </p>
        <div className="mt-7">
          <StoreButtons />
        </div>

        <h2 className="mt-14 text-2xl font-bold sm:text-3xl">Det kan appen</h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {features.map((f) => (
            <li key={f.title} className="rounded-2xl bg-flade p-5 ring-1 ring-streg">
              <h3 className="text-lg font-bold">{f.title}</h3>
              <p className="mt-1.5 leading-relaxed text-blaek-2">{f.text}</p>
            </li>
          ))}
        </ul>

        {!APPS_LIVE && (
          <>
            <h2 className="mt-14 text-2xl font-bold sm:text-3xl">Indtil da</h2>
            <p className="mt-3 leading-relaxed">
              Alle kortene virker allerede i browseren på telefonen. Åbn siden, og vælg »Føj til hjemmeskærm« i
              browserens menu, så ligger Snakkespil ved siden af dine andre apps og kan også bruges uden internet.
            </p>
            <Link
              href="/spil/"
              className="mt-6 inline-flex min-h-12 items-center rounded-full bg-bord px-6 dark:bg-kridt dark:text-kridt-blaek dark:hover:bg-kridt/90 text-base font-bold text-white hover:bg-bord-lys"
            >
              Vælg et spil
            </Link>
          </>
        )}
        <p className="mt-8 text-[0.95rem] text-blaek-2">
          Det, du gemmer i appen, bliver på telefonen. Læs mere under <Link href="/privatliv/" className="underline">privatliv</Link>.
        </p>
      </main>
      <SiteFooter englishHref="https://goodtalkcards.com/app/" />
    </>
  );
}
