import type { Metadata } from "next";
import { CARD_TYPE_LABEL } from "@/data/cardTypes";
import Link from "next/link";
import { notFound } from "next/navigation";
import { legeSider, legeDeck } from "@/data/lege";
import { categories } from "@/data/categories";
import { curatedPages } from "@/data/curatedPages";
import { getDeck } from "@/data/decks";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { DeckBack } from "@/components/deck/DeckParts";
import { LegeListe } from "./LegeListe";
import { OG_BASE, SITE_URL } from "@/config/site";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return legeSider.map((s) => ({ slug: s.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const side = legeSider.find((s) => s.slug === slug);
  if (!side) return {};
  const url = `/lege/${slug}/`;
  return {
    title: side.seoTitle,
    description: side.metaDescription,
    alternates: { canonical: url },
    openGraph: { ...OG_BASE, url, title: side.seoTitle, description: side.metaDescription },
  };
}

export default async function LegePage({ params }: Props) {
  const { slug } = await params;
  const side = legeSider.find((s) => s.slug === slug);
  if (!side) notFound();
  const deckId = legeDeck(slug);
  const deck = getDeck(deckId);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Snakkespil", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Lege", item: `${SITE_URL}/lege/` },
      { "@type": "ListItem", position: 3, name: side.h1.split(":")[0], item: `${SITE_URL}/lege/${slug}/` },
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
            <Link href="/lege/" className="hover:underline">Lege</Link>
          </nav>
          <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-[-0.025em] sm:text-5xl" style={{ fontStretch: "88%" }}>
            {side.h1}
          </h1>
          <p className="mt-5 text-lg leading-relaxed">{side.intro}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href={`/lege/${slug}/kort/`}
              className="inline-flex min-h-12 items-center rounded-full px-6 text-base font-bold"
              style={{ background: deck.bg, color: deck.ink }}
            >
              Spil de {side.kort.length} kort
            </Link>
            <a href="#lege" className="inline-flex min-h-12 items-center rounded-full px-5 font-semibold ring-1 ring-streg hover:bg-flade-2">
              Se alle {side.lege.length} lege
            </a>
          </div>

          <section id="lege" className="mt-14 scroll-mt-6">
            <h2 className="text-2xl font-bold sm:text-3xl">Lege</h2>
            <LegeListe side={side} />
          </section>

          <section className="mt-14">
            <div className="flex items-center gap-4">
              <DeckBack categoryId={deckId} className="h-16 w-12 shrink-0 rounded-lg" />
              <h2 className="text-2xl font-bold sm:text-3xl">Kortene til legen</h2>
            </div>
            <p className="mt-2 text-blaek-2">Læs dem herfra, eller spil dem som kort på telefonen.</p>
            <ol className="mt-5 divide-y divide-streg border-y border-streg">
              {side.kort.map((k, i) => (
                <li key={k.id} className="flex gap-4 py-3.5">
                  <span className="w-7 shrink-0 pt-0.5 text-right text-sm font-semibold tabular-nums text-blaek-2" aria-hidden="true">
                    {i + 1}
                  </span>
                  <span className="text-[1.0625rem] leading-snug">
                    {k.type !== "spoergsmaal" && <span className="mr-2 text-sm font-bold text-blaek-2">{CARD_TYPE_LABEL[k.type]}:</span>}
                    {k.text}
                  </span>
                </li>
              ))}
            </ol>
          </section>

          {side.faq.length > 0 && (
            <section className="mt-14">
              <h2 className="text-2xl font-bold sm:text-3xl">Spørgsmål og svar</h2>
              <div className="mt-4 divide-y divide-streg border-y border-streg">
                {side.faq.map((item) => (
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
          )}

          <section className="mt-14">
            <h2 className="text-2xl font-bold">Mere til festen</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {[...legeSider.filter((s) => s.slug !== slug).map((s) => ({ href: `/lege/${s.slug}/`, label: s.h1.split(":")[0] })),
                // the other /lege/ pages are listed already
                ...side.relaterede.filter((href) => !href.startsWith("/lege/")).map((href) => ({ href, label: relatedLabel(href) }))].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="inline-flex min-h-11 items-center rounded-full bg-flade px-4 font-semibold ring-1 ring-streg hover:bg-flade-2">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </article>
      </main>
      <SiteFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}

/** Link text for a related page: hand-picked names first, then the page's own name from the data */
function relatedLabel(href: string): string {
  if (RELATED_LABEL[href]) return RELATED_LABEL[href];
  const [, section, slug] = href.split("/");
  if (section === "lege") return legeSider.find((s) => s.slug === slug)?.h1.split(":")[0] ?? href;
  if (section === "spoergsmaal") {
    const deck = categories.find((c) => c.id === slug);
    if (deck) return `Spørgsmål: ${deck.name}`;
    return curatedPages.find((p) => p.slug === slug)?.h1.split(":")[0] ?? href;
  }
  return href;
}

const RELATED_LABEL: Record<string, string> = {
  "/spoergsmaal/hoejtider/": "Spørgsmål til højtider",
  "/spoergsmaal/kollegaer/": "Spørgsmål til kolleger",
  "/spoergsmaal/dilemmaer/": "Dilemmaer",
  "/spoergsmaal/hvad-vil-du-helst/": "Hvad vil du helst",
  "/spoergsmaal/sjove/": "Sjove spørgsmål",
  "/spoergsmaal/familie/": "Spørgsmål til familien",
  "/spoergsmaal/icebreakers/": "Icebreakers",
  "/spil/aftensmad/": "Aftensmad-spillet",
  "/spil/trappen/": "Trappen",
  "/spil/aaret-der-gik/": "Året der gik",
  "/multiplayer/": "Send telefonen rundt",
};
