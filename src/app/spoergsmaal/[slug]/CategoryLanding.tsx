import Link from "next/link";
import { notFound } from "next/navigation";
import { categories, getCategory } from "@/data/categories";
import { categoryTexts } from "@/data/categoryTexts";
import { legeSider } from "@/data/lege";
import { getDeck } from "@/data/decks";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { DeckBack, DepthPips, deckStyle } from "@/components/deck/DeckParts";
import { SITE_URL } from "@/config/site";
import type { Question } from "@/types";

const GROUPS: { depth: Question["depth"]; title: string; intro: string }[] = [
  { depth: "let", title: "Lette spørgsmål", intro: "Gode at starte med. De kræver ikke meget at svare på." },
  { depth: "medium", title: "Lidt mere personlige", intro: "Her kommer historierne og meningerne frem." },
  { depth: "dyb", title: "Dybe spørgsmål", intro: "Tag dem, når der er ro og tid. Det er fint at tænke længe." },
];

export function CategoryLanding({ categoryId }: { categoryId: string }) {
  const category = getCategory(categoryId);
  const text = categoryTexts[categoryId];
  if (!category || !text) notFound();

  const deck = getDeck(category.id);
  const related = categories.filter((c) => c.id !== category.id && categoryTexts[c.id]).slice(0, 15);
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Snakkespil", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Spørgsmål", item: `${SITE_URL}/spoergsmaal/` },
      { "@type": "ListItem", position: 3, name: category.name, item: `${SITE_URL}/spoergsmaal/${category.id}/` },
    ],
  };

  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <section className="mx-auto max-w-6xl px-4 pt-6 sm:px-6">
          <nav aria-label="Brødkrumme" className="text-[0.95rem] text-blaek-2">
            <Link href="/" className="hover:underline">Forside</Link>
            <span aria-hidden="true"> / </span>
            <Link href="/spoergsmaal/" className="hover:underline">Spørgsmål</Link>
            <span aria-hidden="true"> / </span>
            <span aria-current="page">{category.name}</span>
          </nav>

          <div className="mt-6 grid items-start gap-10 md:grid-cols-[1.4fr_1fr]">
            <div>
              <h1 className="text-4xl font-extrabold leading-[1.05] tracking-[-0.025em] sm:text-5xl" style={{ fontStretch: "88%" }}>
                {text.seoTitle}
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed">{text.intro}</p>
              <p className="mt-3 max-w-2xl text-blaek-2">
                <strong className="font-semibold text-blaek">Passer til:</strong> {text.passerTil}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href={`/spil/${category.id}/`}
                  className="inline-flex min-h-12 items-center rounded-full px-6 text-base font-bold"
                  style={{ background: deck.bg, color: deck.ink }}
                >
                  Spil med kortene
                </Link>
                <a href="#alle-spoergsmaal" className="inline-flex min-h-12 items-center rounded-full px-5 font-semibold ring-1 ring-streg hover:bg-flade-2">
                  Se alle {category.questions.length} spørgsmål
                </a>
              </div>
            </div>
            <DeckBack categoryId={category.id} className="hidden aspect-[5/3] items-end rounded-2xl p-6 shadow-kort md:flex">
              <div>
                <p className="font-display text-6xl font-extrabold leading-none">{deck.mark}</p>
                <p className="mt-2 text-lg font-bold">{category.name}</p>
              </div>
            </DeckBack>
          </div>

          <aside className="mt-12 rounded-2xl bg-flade p-6 ring-1 ring-streg">
            <h2 className="text-xl font-bold">Gode råd til spillet</h2>
            <ul className="mt-3 grid gap-2 sm:grid-cols-3 sm:gap-6">
              {text.tips.map((tip) => (
                <li key={tip} className="text-blaek-2">{tip}</li>
              ))}
            </ul>
            {text.forskning && (
              <p className="mt-5 border-t border-streg pt-4 text-[0.95rem] text-blaek-2">
                <strong className="font-semibold text-blaek">Hvorfor denne bunke?</strong> {text.forskning}{" "}
                <Link href="/saadan-spiller-i/" className="underline">Læs mere om rådene bag spillet</Link>.
              </p>
            )}
          </aside>
        </section>

        <section id="alle-spoergsmaal" className="mx-auto mt-14 max-w-3xl scroll-mt-6 px-4 sm:px-6" style={deckStyle(deck)}>
          {GROUPS.map((group) => {
            const questions = category.questions.filter((q) => q.depth === group.depth);
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
                    <li key={q.id} className="flex gap-4 py-3.5">
                      <span className="w-7 shrink-0 pt-0.5 text-right text-sm font-semibold tabular-nums text-blaek-2" aria-hidden="true">
                        {category.questions.indexOf(q) + 1}
                      </span>
                      <span className="text-[1.0625rem] leading-snug">{q.text}</span>
                    </li>
                  ))}
                </ol>
              </div>
            );
          })}
          {text.ekstraAfsnit && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold sm:text-3xl">{text.ekstraAfsnit.heading}</h2>
              <p className="mt-1 text-blaek-2">{text.ekstraAfsnit.text}</p>
              <ol className="mt-5 list-decimal divide-y divide-streg border-y border-streg pl-10">
                {text.ekstraAfsnit.items.map((item) => (
                  <li key={item} className="py-3.5 text-[1.0625rem] leading-snug">
                    {item}
                  </li>
                ))}
              </ol>
              {category.id === "kend-din-partner" && (
                <p className="mt-4">
                  Vil I spille med skjulte svar og point? Prøv <Link href="/spil/gaet/" className="underline">Gæt svaret</Link>.
                </p>
              )}
            </div>
          )}
          <div className="mt-10">
            <Link
              href={`/spil/${category.id}/`}
              className="inline-flex min-h-12 items-center rounded-full px-6 text-base font-bold"
              style={{ background: deck.bg, color: deck.ink }}
            >
              Spil {category.name.toLowerCase()} som kort
            </Link>
          </div>
        </section>

        <section className="mx-auto mt-20 max-w-6xl px-4 sm:px-6" aria-labelledby="andre">
          <h2 id="andre" className="text-2xl font-bold">Andre spørgsmål</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {legeSider
              .filter((l) => l.relaterede.includes(`/spoergsmaal/${category.id}/`))
              .map((l) => (
                <li key={l.slug}>
                  <Link
                    href={`/lege/${l.slug}/`}
                    className="inline-flex min-h-11 items-center rounded-full bg-kridt px-4 font-semibold text-kridt-blaek"
                  >
                    {l.h1.split(":")[0]}
                  </Link>
                </li>
              ))}
            {related.map((c) => {
              const d = getDeck(c.id);
              return (
                <li key={c.id}>
                  <Link
                    href={`/spoergsmaal/${c.id}/`}
                    className="inline-flex min-h-11 items-center gap-2 rounded-full bg-flade px-4 font-semibold ring-1 ring-streg hover:bg-flade-2"
                  >
                    <span className="h-3 w-3 rounded-full" style={{ background: d.bg }} aria-hidden="true" />
                    {c.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      </main>
      <SiteFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
    </>
  );
}
