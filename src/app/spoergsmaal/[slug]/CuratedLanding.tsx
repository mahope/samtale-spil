import Link from "next/link";
import { curatedPages, type CuratedPage } from "@/data/curatedPages";
import { categoryTexts } from "@/data/categoryTexts";
import { getCategory, getQuestionById } from "@/data/categories";
import { getDeck } from "@/data/decks";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SITE_URL } from "@/config/site";

/** Hand-picked question list on one theme, e.g. "Spørgsmål til kæresten". */
export function CuratedLanding({ page }: { page: CuratedPage }) {
  const deck = page.playDeck ? getDeck(page.playDeck) : null;
  const playName = page.playDeck ? getCategory(page.playDeck)?.name : undefined;
  let n = 0;
  const others = curatedPages.filter((p) => p.slug !== page.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Snakkespil", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Spørgsmål", item: `${SITE_URL}/spoergsmaal/` },
      { "@type": "ListItem", position: 3, name: page.h1.split(":")[0], item: `${SITE_URL}/spoergsmaal/${page.slug}/` },
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
            <Link href="/spoergsmaal/" className="hover:underline">Spørgsmål</Link>
          </nav>
          <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-[-0.025em] sm:text-5xl" style={{ fontStretch: "88%" }}>
            {page.h1}
          </h1>
          <p className="mt-5 text-lg leading-relaxed">{page.intro}</p>
          {deck && page.playDeck && (
            <Link
              href={`/spil/${page.playDeck}/`}
              className="mt-7 inline-flex min-h-12 items-center rounded-full px-6 text-base font-bold"
              style={{ background: deck.bg, color: deck.ink }}
            >
              Spil {playName ? playName.toLowerCase() : "kortene"} som kort
            </Link>
          )}

          {page.sections.map((section) => {
            const questions = (section.questionIds ?? [])
              .map((id) => getQuestionById(id)?.question.text)
              .filter((t): t is string => Boolean(t));
            const list = [...questions, ...(section.items ?? [])];
            const isQuestionList = list.filter((t) => t.trim().endsWith("?")).length * 2 >= list.length;
            return (
              <section key={section.heading} className="mt-12">
                <h2 className="text-2xl font-bold sm:text-3xl">{section.heading}</h2>
                {section.text && <p className="mt-2 leading-relaxed text-blaek-2">{section.text}</p>}
                {/* Instructions and sources are plain bullets; only questions get a running number */}
                {list.length > 0 && !isQuestionList && (
                  <ul className="mt-4 list-disc space-y-2 pl-6 leading-relaxed">
                    {list.map((text) => (
                      <li key={text}>{text}</li>
                    ))}
                  </ul>
                )}
                {list.length > 0 && isQuestionList && (
                  <ol className="mt-5 divide-y divide-streg border-y border-streg">
                    {list.map((text) => {
                      n += 1;
                      return (
                        <li key={text} className="flex gap-4 py-3.5">
                          <span className="w-7 shrink-0 pt-0.5 text-right text-sm font-semibold tabular-nums text-blaek-2" aria-hidden="true">
                            {n}
                          </span>
                          <span className="text-[1.0625rem] leading-snug">{text}</span>
                        </li>
                      );
                    })}
                  </ol>
                )}
              </section>
            );
          })}

          {page.faq && page.faq.length > 0 && (
            <section className="mt-14">
              <h2 className="text-2xl font-bold sm:text-3xl">Spørgsmål og svar</h2>
              <div className="mt-4 divide-y divide-streg border-y border-streg">
                {page.faq.map((item) => (
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
        </article>

        <section className="mx-auto mt-20 max-w-6xl px-4 sm:px-6" aria-labelledby="flere">
          <h2 id="flere" className="text-2xl font-bold">Flere spørgsmål</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {others.map((p) => (
              <li key={p.slug}>
                <Link href={`/spoergsmaal/${p.slug}/`} className="inline-flex min-h-11 items-center rounded-full bg-flade px-4 font-semibold ring-1 ring-streg hover:bg-flade-2">
                  {p.h1.split(":")[0]}
                </Link>
              </li>
            ))}
            {Object.keys(categoryTexts).slice(0, 6).map((id) => (
              <li key={id}>
                <Link href={`/spoergsmaal/${id}/`} className="inline-flex min-h-11 items-center rounded-full bg-flade px-4 font-semibold ring-1 ring-streg hover:bg-flade-2">
                  {getCategory(id)?.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <SiteFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
