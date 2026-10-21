import type { Metadata } from "next";
import Link from "next/link";
import { OG_BASE, SITE_URL } from "@/config/site";
import { getCategory, getQuestionById } from "@/data/categories";
import { getDeck } from "@/data/decks";
import { aftensmadAldre, aftensmadFaq } from "@/data/aftensmad";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";

const url = "/samtaler-ved-aftensmaden/";
const title = "Samtaler ved aftensmaden: spørgsmål og råd til børnefamilier";
const description =
  "Sådan får I en god snak ved middagsbordet med børn. Råd til småbørn, skolebørn og teenagere, eksempler på spørgsmål og et lille spil med tre kort.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: { ...OG_BASE, url, title, description },
};

/** Decks to go on with, in this order */
const DECKS = ["familie", "boern", "familiehistorier"];

const rules = [
  "Telefonerne ligger væk, også de voksnes. Den eneste undtagelse er den, I læser kortet op fra.",
  "Et til tre spørgsmål er nok. Det er bedre at stoppe, mens det er sjovt.",
  "Alle må sige pas, og der er ingen forkerte svar.",
  "Lad børnene stille spørgsmålene til de voksne en gang imellem.",
];

export default function AftensmadPage() {
  const familie = getDeck("familie");
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Snakkespil", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Samtaler ved aftensmaden", item: `${SITE_URL}${url}` },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: aftensmadFaq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
  let n = 0;

  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <article className="mx-auto max-w-3xl px-4 pt-6 sm:px-6">
          <nav aria-label="Brødkrumme" className="text-[0.95rem] text-blaek-2">
            <Link href="/" className="hover:underline">Forside</Link>
            <span aria-hidden="true"> / </span>
            <span aria-current="page">Samtaler ved aftensmaden</span>
          </nav>
          <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-[-0.025em] sm:text-5xl" style={{ fontStretch: "88%" }}>
            Samtaler ved aftensmaden
          </h1>
          <p className="mt-5 text-lg leading-relaxed">
            Aftensmaden er for mange børnefamilier den eneste stund på dagen, hvor alle sidder samme sted. Det er også der, man
            hører »fint« og »ingenting« som svar på, hvordan dagen gik. Et konkret spørgsmål gør tit hele forskellen, og det
            behøver ikke at være dybt. Her er råd til, hvordan I griber det an med børn i forskellige aldre, og spørgsmål I kan
            starte med i aften.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/spil/aftensmad/"
              className="inline-flex min-h-12 items-center rounded-full px-6 text-base font-bold"
              style={{ background: familie.bg, color: familie.ink }}
            >
              Spil Aftensmad: tre kort til bordet
            </Link>
            <a href="#spoergsmaal" className="inline-flex min-h-12 items-center rounded-full px-5 font-semibold ring-1 ring-streg hover:bg-flade-2">
              Se spørgsmålene
            </a>
          </div>

          <section className="mt-12 rounded-2xl bg-flade p-6 ring-1 ring-streg" aria-labelledby="spilleregler">
            <h2 id="spilleregler" className="text-xl font-bold">Enkle regler for bordet</h2>
            <ul className="mt-3 list-disc space-y-2 pl-6 leading-relaxed">
              {rules.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </section>

          <div id="spoergsmaal" className="scroll-mt-6">
            {aftensmadAldre.map((alder) => {
              const questions = alder.questionIds
                .map((id) => getQuestionById(id)?.question)
                .filter((q) => q !== undefined);
              return (
                <section key={alder.id} className="mt-14" aria-labelledby={alder.id}>
                  <h2 id={alder.id} className="text-2xl font-bold sm:text-3xl">
                    {alder.title}
                  </h2>
                  <p className="mt-2 leading-relaxed">{alder.intro}</p>
                  <ul className="mt-4 list-disc space-y-2 pl-6 leading-relaxed text-blaek-2">
                    {alder.tips.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                  <h3 className="mt-6 text-lg font-bold">Spørgsmål at starte med</h3>
                  <ol className="mt-3 divide-y divide-streg border-y border-streg">
                    {questions.map((q) => {
                      n += 1;
                      return (
                        <li key={q.id} data-kort="true" className="flex gap-4 py-3.5">
                          <span className="w-7 shrink-0 pt-0.5 text-right text-sm font-semibold tabular-nums text-blaek-2" aria-hidden="true">
                            {n}
                          </span>
                          <span className="text-[1.0625rem] leading-snug">{q.text}</span>
                        </li>
                      );
                    })}
                  </ol>
                </section>
              );
            })}
          </div>

          <section className="mt-14" aria-labelledby="flere-kort">
            <h2 id="flere-kort" className="text-2xl font-bold sm:text-3xl">Flere kort til familien</h2>
            <p className="mt-2 leading-relaxed">
              Spørgsmålene ovenfor kommer fra bunkerne herunder. Hver bunke kan spilles som kort på telefonen eller læses som en
              liste.
            </p>
            <ul className="mt-5 grid gap-3 sm:grid-cols-3">
              {DECKS.map((id) => {
                const category = getCategory(id);
                if (!category) return null;
                const deck = getDeck(id);
                return (
                  <li key={id}>
                    <Link
                      href={`/spoergsmaal/${id}/`}
                      className="flex min-h-20 flex-col justify-center rounded-2xl px-5 py-4"
                      style={{ background: deck.bg, color: deck.ink }}
                    >
                      <span className="text-lg font-bold">{category.name}</span>
                      <span className="text-[0.95rem]">{category.questions.length} spørgsmål</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>

          <section className="mt-14" aria-labelledby="faq">
            <h2 id="faq" className="text-2xl font-bold sm:text-3xl">Spørgsmål og svar</h2>
            <div className="mt-4 divide-y divide-streg border-y border-streg">
              {aftensmadFaq.map((item) => (
                <details key={item.q} className="group py-1">
                  <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold">
                    {item.q}
                    <span className="text-2xl leading-none text-blaek-2 transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                  </summary>
                  <p className="pb-5 text-blaek-2">{item.a}</p>
                </details>
              ))}
            </div>
          </section>

          <p className="mt-10 leading-relaxed">
            Vil du vide mere om at lytte, så børnene får lyst til at fortælle? Læs guiden om{" "}
            <Link href="/guide/aktiv-lytning/" className="underline">aktiv lytning</Link>.
          </p>
        </article>
      </main>
      <SiteFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
