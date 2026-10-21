import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { OG_BASE, SITE_URL } from "@/config/site";
import { ui } from "@/locale/ui";
import { getDeck } from "@/data/decks";
import { DeckBack, DepthPips } from "@/components/deck/DeckParts";
import { IntlHeader, IntlFooter } from "@/intl/Chrome";
import { intlDecks, intlDeckBySlug } from "@/intl/data";
import { deckLanguages } from "@/locales/alternates";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return intlDecks.map((d) => ({ slug: d.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const deck = intlDeckBySlug.get((await params).slug);
  if (!deck) return {};
  const url = `/questions/${deck.slug}/`;
  return {
    title: deck.seoTitle,
    description: deck.metaDescription,
    alternates: { canonical: url, languages: deckLanguages(deck.id) },
    openGraph: { ...OG_BASE, url, title: deck.seoTitle, description: deck.metaDescription },
  };
}

const GROUPS = [
  { depth: "let", title: "Light questions", intro: "Easy to start with. Good for warming up." },
  { depth: "medium", title: "A bit more personal", intro: "For when the conversation is flowing." },
  { depth: "dyb", title: "Deep questions", intro: "Take your time. These are the ones people remember." },
] as const;

export default async function QuestionsPage({ params }: Props) {
  const deck = intlDeckBySlug.get((await params).slug);
  if (!deck) notFound();
  const style = getDeck(deck.id);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Goodtalk", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Questions", item: `${SITE_URL}/questions/` },
      { "@type": "ListItem", position: 3, name: deck.name, item: `${SITE_URL}/questions/${deck.slug}/` },
    ],
  };
  return (
    <>
      <IntlHeader />
      <main id="main-content">
        <section className="mx-auto max-w-3xl px-4 pt-6 sm:px-6">
          <nav aria-label="Breadcrumb" className="text-[0.95rem] text-blaek-2">
            <Link href="/" className="hover:underline">Home</Link>
            <span aria-hidden="true"> / </span>
            <Link href="/questions/" className="hover:underline">Questions</Link>
          </nav>
          <div className="mt-6 flex items-start gap-5">
            <DeckBack categoryId={deck.id} className="hidden h-28 w-20 shrink-0 rounded-xl sm:block" />
            <div>
              <h1 className="text-4xl font-extrabold tracking-[-0.025em] sm:text-5xl" style={{ fontStretch: "88%" }}>
                {deck.seoTitle.split(":")[0]}
              </h1>
              <p className="mt-4 text-lg leading-relaxed">{deck.intro}</p>
              <p className="mt-3 text-blaek-2">
                <strong className="font-semibold text-blaek">Good for:</strong> {deck.fitsFor}
              </p>
              <Link
                href={`/play/${deck.slug}/`}
                className="mt-6 inline-flex min-h-12 items-center rounded-full px-6 font-bold"
                style={{ background: style.bg, color: style.ink }}
              >
                Play {deck.questions.length} cards
              </Link>
            </div>
          </div>
          <div className="mt-10 rounded-2xl bg-flade p-5 ring-1 ring-streg">
            <h2 className="text-xl font-bold">Tips for playing</h2>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              {deck.tips.map((t) => <li key={t}>{t}</li>)}
            </ul>
          </div>
        </section>
        <section className="mx-auto mt-14 max-w-3xl px-4 sm:px-6">
          {GROUPS.map((group) => {
            const questions = deck.questions.filter((q) => q.depth === group.depth);
            if (questions.length === 0) return null;
            return (
              <div key={group.depth} className="mt-12 first:mt-0">
                <h2 className="flex items-center gap-3 text-2xl font-bold sm:text-3xl">
                  <DepthPips depth={group.depth} color="currentColor" />
                  {group.title}
                </h2>
                <p className="mt-1 text-blaek-2">{group.intro}</p>
                <ol className="mt-5 divide-y divide-streg border-y border-streg">
                  {questions.map((q) => (
                    <li key={q.id} data-kort className="flex gap-4 py-3.5">
                      <span className="w-7 shrink-0 pt-0.5 text-right text-sm font-semibold tabular-nums text-blaek-2" aria-hidden="true">
                        {deck.questions.indexOf(q) + 1}
                      </span>
                      <span className="text-[1.0625rem] leading-snug">{q.text}</span>
                    </li>
                  ))}
                </ol>
              </div>
            );
          })}
          <p className="mt-10 text-blaek-2">{ui.deck.cards(deck.questions.length)} in this deck.</p>
        </section>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      </main>
      <IntlFooter danishHref={deckLanguages(deck.id)?.da} />
    </>
  );
}
