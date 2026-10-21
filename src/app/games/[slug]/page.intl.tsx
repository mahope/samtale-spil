import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { OG_BASE, SITE_URL } from "@/config/site";
import { ui } from "@/locale/ui";
import { getDeck } from "@/data/decks";
import { CARD_TYPE_LABEL } from "@/data/cardTypes";
import { IntlHeader, IntlFooter } from "@/intl/Chrome";
import { intlGames, intlGameBySlug } from "@/intl/games";
import { IntlGameList } from "@/intl/GameList";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return intlGames.map((g) => ({ slug: g.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const game = intlGameBySlug.get((await params).slug);
  if (!game) return {};
  const url = `/games/${game.slug}/`;
  return {
    title: game.seoTitle,
    description: game.metaDescription,
    alternates: { canonical: url },
    openGraph: { ...OG_BASE, url, title: game.seoTitle, description: game.metaDescription },
  };
}

export default async function GamePage({ params }: Props) {
  const game = intlGameBySlug.get((await params).slug);
  if (!game) notFound();
  const deck = getDeck(game.deckId);
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Goodtalk", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Games", item: `${SITE_URL}/games/` },
        { "@type": "ListItem", position: 3, name: game.h1.split(":")[0], item: `${SITE_URL}/games/${game.slug}/` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: game.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ];
  return (
    <>
      <IntlHeader />
      <main id="main-content">
        <article className="mx-auto max-w-3xl px-4 pt-6 sm:px-6">
          <nav aria-label="Breadcrumb" className="text-[0.95rem] text-blaek-2">
            <Link href="/" className="hover:underline">Home</Link>
            <span aria-hidden="true"> / </span>
            <Link href="/games/" className="hover:underline">Games</Link>
          </nav>
          <h1 className="mt-4 text-4xl font-extrabold tracking-[-0.025em] sm:text-5xl" style={{ fontStretch: "88%" }}>
            {game.h1}
          </h1>
          <p className="mt-5 text-lg leading-relaxed">{game.intro}</p>
          <Link
            href={`/games/${game.slug}/play/`}
            className="mt-6 inline-flex min-h-12 items-center rounded-full px-6 font-bold"
            style={{ background: deck.bg, color: deck.ink }}
          >
            Play the {game.cards.length} cards
          </Link>

          <h2 className="mt-12 text-2xl font-bold sm:text-3xl">The games</h2>
          <IntlGameList game={game} />

          <h2 className="mt-12 text-2xl font-bold sm:text-3xl">The cards</h2>
          <ol className="mt-4 divide-y divide-streg border-y border-streg">
            {game.cards.map((c, i) => (
              <li key={c.id} data-kort className="flex gap-4 py-3">
                <span className="w-7 shrink-0 pt-0.5 text-right text-sm font-semibold tabular-nums text-blaek-2" aria-hidden="true">{i + 1}</span>
                <span className="text-[1.0625rem] leading-snug">
                  {c.type && c.type !== "spoergsmaal" && <span className="mr-2 text-sm font-bold text-blaek-2">{CARD_TYPE_LABEL[c.type]}:</span>}
                  {c.text}
                </span>
              </li>
            ))}
          </ol>
          <p className="mt-3 text-sm text-blaek-2">{ui.deck.cards(game.cards.length)}.</p>

          <h2 className="mt-12 text-2xl font-bold sm:text-3xl">Questions and answers</h2>
          <div className="mt-4 space-y-5">
            {game.faq.map((f) => (
              <div key={f.q}>
                <h3 className="font-bold">{f.q}</h3>
                <p className="mt-1 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </article>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      </main>
      <IntlFooter />
    </>
  );
}
