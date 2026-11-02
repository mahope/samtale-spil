import type { Metadata } from "next";
import Link from "next/link";
import { OG_BASE, SITE_URL } from "@/config/site";
import { getCategory, getQuestionById } from "@/data/categories";
import { getDeck } from "@/data/decks";
import { ARBEJDSPLADS_DECK, arbejdspladsHuskeregler, arbejdspladsTrin } from "@/data/arbejdsplads";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";

const url = "/til-arbejdspladsen/";
const title = "Samtalekort til møder og teamet: 30 minutters øvelse";
const description =
  "En gratis samtaleøvelse på 30 minutter til teamet: ramme, tre runder med fire spørgsmål og en afslutning. Uden forberedelse og med frivillighed som grundregel.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: { ...OG_BASE, url, title, description },
};

const BFA_URL = "https://www.arbejdsmiljoweb.dk/media/5gqg0u1z/bfa-psykologisk-tryghed-dialogkort-uden-talebobletekst-tryk-220224.pdf";
const VIDENSKAB_URL =
  "https://videnskab.dk/kultur-samfund/forskere-teambuilding-kan-vaere-spild-af-tid-personlige-samtaler-med-kollegerne-er-mere-givende/";

export default function TilArbejdspladsenPage() {
  const deck = getDeck(ARBEJDSPLADS_DECK);
  const category = getCategory(ARBEJDSPLADS_DECK);
  // Running numbers of the questions across the three rounds, and the clock at the start of each step
  const trin = arbejdspladsTrin.map((t, i) => {
    const before = arbejdspladsTrin.slice(0, i);
    const questionsBefore = before.reduce((sum, x) => sum + x.questionIds.length, 0);
    const fra = before.reduce((sum, x) => sum + x.minutter, 0);
    return {
      ...t,
      questions: t.questionIds.map((id) => getQuestionById(id)?.question).filter((q) => q !== undefined),
      start: questionsBefore + 1,
      tid: `${fra}–${fra + t.minutter} min`,
    };
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Snakkespil", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Til arbejdspladsen", item: `${SITE_URL}${url}` },
    ],
  };

  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <article className="mx-auto max-w-3xl px-4 pt-6 sm:px-6">
          <nav aria-label="Brødkrumme" className="text-[0.95rem] text-blaek-2">
            <Link href="/" className="hover:underline">Forside</Link>
            <span aria-hidden="true"> / </span>
            <span aria-current="page">Til arbejdspladsen</span>
          </nav>
          <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-[-0.025em] sm:text-5xl" style={{ fontStretch: "88%" }}>
            Samtalekort til møder og teamet
          </h1>
          <p className="mt-5 text-lg leading-relaxed">
            Her er en samtaleøvelse på 30 minutter, som du kan lede uden forberedelse. Tidsplanen og spørgsmålene står på
            siden. Du skal bruge et rum, et ur og denne side på en skærm eller i en udskrift.
          </p>
          <p className="mt-4 leading-relaxed">
            Idéen er ikke ny. BFA, Branchefællesskabet for Arbejdsmiljø, har lavet dialogkort om psykologisk tryghed, hvor man
            trækker et kort og taler højst fem minutter (
            <a href={BFA_URL} className="underline">BFA&apos;s dialogkort, PDF</a>
            ). Videnskab.dk refererer forskning, hvor målrettede øvelser, hvor man fortæller noget personligt, virkede bedre
            end traditionel teambuilding (
            <a href={VIDENSKAB_URL} className="underline">Videnskab.dk</a>
            ). Effekten af netop denne øvelse er ikke målt.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href={`/spil/${ARBEJDSPLADS_DECK}/`}
              className="inline-flex min-h-12 items-center rounded-full px-6 text-base font-bold"
              style={{ background: deck.bg, color: deck.ink }}
            >
              Spil bunken Kollegaer og team
            </Link>
            <a href="#oevelsen" className="inline-flex min-h-12 items-center rounded-full px-5 font-semibold ring-1 ring-streg hover:bg-flade-2">
              Se øvelsen
            </a>
          </div>

          <section id="oevelsen" className="mt-14 scroll-mt-6" aria-labelledby="oevelse-h">
            <h2 id="oevelse-h" className="text-2xl font-bold sm:text-3xl">Øvelsen på 30 minutter</h2>
            <p className="mt-2 leading-relaxed">
              Ramme, tre runder à otte minutter og en afslutning. Rundernes spørgsmål er valgt blandt de lette og de
              middelsvære i bunken, så ingen bliver bedt om noget dybt eller privat.
            </p>
            <ol className="mt-6 space-y-6">
              {trin.map((t) => (
                <li key={t.id} className="rounded-2xl bg-flade p-5 ring-1 ring-streg">
                  <h3 className="text-xl font-bold">{t.title}</h3>
                  <p className="mt-1 text-sm font-semibold tabular-nums text-blaek-2">
                    {t.tid}
                  </p>
                  <p className="mt-3 leading-relaxed">{t.text}</p>
                  {t.questions.length > 0 && (
                    <ol start={t.start} className="mt-4 list-decimal divide-y divide-streg border-y border-streg pl-8">
                      {t.questions.map((q) => (
                        <li key={q.id} className="py-3 pl-1 text-[1.0625rem] leading-snug">
                          {q.text}
                        </li>
                      ))}
                    </ol>
                  )}
                </li>
              ))}
            </ol>
          </section>

          <section className="mt-14" aria-labelledby="ikke-h">
            <h2 id="ikke-h" className="text-2xl font-bold sm:text-3xl">Hvad man ikke gør</h2>
            <ul className="mt-4 list-disc space-y-2 pl-6 leading-relaxed">
              {arbejdspladsHuskeregler.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
            <p className="mt-4 leading-relaxed text-blaek-2">
              Forskningen bag Snakkespil peger på, at kollegakort bør holde sig til arbejdsliv, styrker og læring, og at alle
              kan springe over (se <Link href="/saadan-spiller-i/" className="underline">Sådan spiller I</Link>). Der er ikke
              fundet fagfællebedømt forskning, der viser, at icebreakers i sig selv gør teams bedre.
            </p>
          </section>

          <section className="mt-14" aria-labelledby="print-h">
            <h2 id="print-h" className="text-2xl font-bold sm:text-3xl">Kortene på papir</h2>
            <p className="mt-2 leading-relaxed">
              Bunken {category ? `»${category.name}«` : ""} findes som gratis PDF med otte kort pr. A4-ark, så I kan lægge dem
              på bordet.
            </p>
            <p className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
              <a href={`/print/snakkespil-${ARBEJDSPLADS_DECK}.pdf`} download className="inline-flex min-h-11 items-center font-bold underline">
                Hent PDF med kollegakortene
              </a>
              <Link href="/print/" className="inline-flex min-h-11 items-center underline">
                Se alle bunker til print
              </Link>
            </p>
          </section>

          <aside className="mt-14 rounded-2xl bg-flade p-5 ring-1 ring-streg" aria-labelledby="terapi-h">
            <h2 id="terapi-h" className="text-lg font-bold">Et samtalespil, ikke en arbejdsmiljøindsats</h2>
            <p className="mt-2 leading-relaxed">
              Øvelsen kan gøre det lettere at tale sammen. Den er ikke terapi og erstatter ikke en arbejdsmiljøindsats, en
              samtale med nærmeste leder eller hjælp fra en fagperson. Går konflikter igen, eller har nogen det dårligt, så
              kontakt arbejdsmiljørepræsentanten, bedriftssundhedstjenesten eller egen læge. Der er mere på{" "}
              <Link href="/ikke-terapi/" className="underline">Et samtalespil, ikke terapi</Link>.
            </p>
          </aside>

          <section className="mt-14" aria-labelledby="spil-h">
            <h2 id="spil-h" className="text-2xl font-bold sm:text-3xl">Spil bunken</h2>
            <p className="mt-2 leading-relaxed">
              Vil I fortsætte efter øvelsen, ligger alle {category?.questions.length} kollegaspørgsmål klar, enten som kort på
              telefonen eller som liste.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href={`/spil/${ARBEJDSPLADS_DECK}/`}
                className="inline-flex min-h-12 items-center rounded-full px-6 text-base font-bold"
                style={{ background: deck.bg, color: deck.ink }}
              >
                Spil med kortene
              </Link>
              <Link href={`/spoergsmaal/${ARBEJDSPLADS_DECK}/`} className="inline-flex min-h-12 items-center rounded-full px-5 font-semibold ring-1 ring-streg hover:bg-flade-2">
                Se alle spørgsmålene
              </Link>
            </div>
          </section>
        </article>
      </main>
      <SiteFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    </>
  );
}
