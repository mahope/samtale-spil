import type { Metadata } from "next";
import { OG_BASE, SITE_URL, SITE_NAME, QUESTION_COUNT, CATEGORY_COUNT } from "@/config/site";
import Link from "next/link";
import { categories } from "@/data/categories";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { CardDraw, type DrawCard } from "@/components/home/CardDraw";
import { GroupedDecks } from "@/components/deck/GroupedDecks";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { ...OG_BASE,
    url: "/",
    title: "Gratis samtalekort og samtalespil på dansk",
  },
};

const questionCount = QUESTION_COUNT.toLocaleString("da-DK");

// A hand-picked opening hand for the hero: easy to answer, from different decks.
const HERO_IDS = ["sjov-5", "par-7", "ven-4", "fam-5", "date-3", "droem-2", "boern-12", "kol-1", "barn-1", "selv-1", "hoej-1", "frem-2"];

function heroCards(): DrawCard[] {
  const all = categories.flatMap((c) => c.questions.map((q) => ({ ...q, categoryName: c.name })));
  const picked = HERO_IDS.map((id) => all.find((q) => q.id === id)).filter((q) => q !== undefined);
  const pool = picked.length >= 4 ? picked : all.filter((q) => q.depth === "let").slice(0, 10);
  return pool.map((q) => ({ id: q.id, categoryId: q.categoryId, categoryName: q.categoryName, text: q.text, depth: q.depth }));
}

const faq = [
  {
    q: "Koster det noget?",
    a: "Nej. Snakkespil er gratis, og der er ingen reklamer.",
  },
  {
    q: "Skal jeg oprette en konto?",
    a: "Nej. Favoritter, fremskridt og dine egne spørgsmål gemmes kun på din egen telefon eller computer.",
  },
  {
    q: "Hvor mange kan spille?",
    a: "Fra to og opefter. I kan sende telefonen rundt og skiftes til at trække, eller én kan læse kortene højt for hele bordet.",
  },
  {
    q: "Kan børn være med?",
    a: "Ja. Kategorien Børn er skrevet til 6-12 år, og Familie passer til alle aldre. Kategorien for voksne kræver, at man bekræfter at være fyldt 18.",
  },
  {
    q: "Virker det uden internet?",
    a: "Ja. Når du har åbnet siden én gang, kan du føje den til hjemmeskærmen og spille offline.",
  },
  {
    q: "Kan jeg skrive mine egne spørgsmål?",
    a: "Ja. Under Dine egne spørgsmål kan du lave dit eget sæt kort og spille med dem.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: SITE_NAME,
      inLanguage: "da-DK",
      publisher: { "@id": `${SITE_URL}/#org` },
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#org`,
      name: "Mahope",
      url: "https://mahoje.dk",
    },
    {
      "@type": "WebApplication",
      name: SITE_NAME,
      url: `${SITE_URL}/`,
      applicationCategory: "GameApplication",
      operatingSystem: "Web, iOS, Android",
      inLanguage: "da-DK",
      offers: { "@type": "Offer", price: "0", priceCurrency: "DKK" },
    },
  ],
};

export default function Home() {
  return (
    <>
      <SiteHeader tone="filt" />
      <main id="main-content" data-route="forside">
        <section className="filt overflow-hidden">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-16 pt-8 sm:px-6 md:grid-cols-[1.1fr_1fr] md:pb-24 md:pt-14">
            <div>
              <h1
                className="text-[2.6rem] font-extrabold leading-[1.02] tracking-[-0.03em] sm:text-6xl lg:text-[4.4rem]"
                style={{ fontStretch: "84%" }}
              >
                Gratis samtalekort og samtalespil på dansk
              </h1>
              <p className="mt-6 max-w-[34rem] text-lg leading-relaxed text-white/85">
                Træk et kort, læs spørgsmålet højt, og lad snakken gå. {questionCount} spørgsmål til kæresten,
                familien, vennerne og kollegerne, fra de lette til dem, der kræver lidt mod.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/spil/"
                  className="inline-flex min-h-12 items-center rounded-full bg-white px-6 text-base font-bold text-bord-dyb"
                >
                  Vælg et spil
                </Link>
                <Link
                  href="/spil/shuffle-all/"
                  className="inline-flex min-h-12 items-center rounded-full px-5 text-base font-semibold text-white ring-1 ring-white/40 hover:bg-white/10"
                >
                  Bland alle kort
                </Link>
              </div>
            </div>
            <CardDraw cards={heroCards()} />
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 pt-16 sm:px-6" aria-labelledby="spil-overskrift">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 id="spil-overskrift" className="text-3xl font-bold sm:text-4xl">
                {CATEGORY_COUNT} spil at vælge imellem
              </h2>
              <p className="mt-2 max-w-xl text-blaek-2">
                Hvert spil er en bunke kort med sit eget emne. Vælg efter hvem I er sammen med, og hvor dybt I har lyst
                til at gå.
              </p>
            </div>
          </div>
          <GroupedDecks headingLevel="h3" />
        </section>

        <section className="mx-auto mt-20 max-w-6xl px-4 sm:px-6" aria-labelledby="saadan-overskrift">
          <h2 id="saadan-overskrift" className="text-3xl font-bold sm:text-4xl">
            Sådan spiller I
          </h2>
          <ol className="mt-8 grid gap-8 md:grid-cols-3">
            {[
              ["Vælg et spil", "Find en bunke, der passer til selskabet. Til par, til familien, til vennerne eller til en første date."],
              ["Træk et kort og læs det højt", "Den, der trækker, læser spørgsmålet op. Svar selv først, eller giv det videre."],
              ["Lyt og spørg ind", "De bedste snakke kommer af opfølgende spørgsmål. Et kort må gerne springes over."],
            ].map(([title, text], i) => (
              <li key={title} className="flex gap-4">
                <span
                  className="font-display flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-bord text-xl font-extrabold text-white"
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-xl font-bold">{title}</h3>
                  <p className="mt-1.5 text-blaek-2">{text}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-8">
            <Link href="/saadan-spiller-i/" className="font-semibold underline underline-offset-4">
              Flere råd, og hvad I gør når en snak bliver svær
            </Link>
          </p>
        </section>

        <section className="mx-auto mt-20 max-w-3xl px-4 sm:px-6" aria-labelledby="faq-overskrift">
          <h2 id="faq-overskrift" className="text-3xl font-bold sm:text-4xl">
            Spørgsmål om spillet
          </h2>
          <div className="mt-6 divide-y divide-streg border-y border-streg">
            {faq.map((item) => (
              <details key={item.q} className="group py-1">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold">
                  {item.q}
                  <span className="text-2xl leading-none text-blaek-2 transition-transform group-open:rotate-45" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p className="pb-5 text-blaek-2">{item.a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
