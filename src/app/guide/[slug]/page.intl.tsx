import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { OG_BASE, SITE_URL } from "@/config/site";
import { localeGuides } from "@/locale/guides";
import { DeckBack } from "@/components/deck/DeckParts";
import { IntlHeader, IntlFooter } from "@/intl/Chrome";
import { intlDeckById } from "@/intl/data";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return localeGuides.map((g) => ({ slug: g.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = localeGuides.find((g) => g.slug === slug);
  if (!guide) return {};
  const url = `/guide/${guide.slug}/`;
  return {
    title: guide.seoTitle,
    description: guide.metaDescription,
    alternates: { canonical: url },
    openGraph: { ...OG_BASE, type: "article", url, title: guide.seoTitle, description: guide.metaDescription },
  };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = localeGuides.find((g) => g.slug === slug);
  if (!guide) notFound();
  const decks = guide.bunker.map((id) => intlDeckById.get(id)).filter((d) => d !== undefined);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.h1,
    description: guide.metaDescription,
    inLanguage: "en",
    author: { "@type": "Organization", name: "Goodtalk", url: SITE_URL },
    citation: guide.kilder.map((k) => k.fuld),
  };
  return (
    <>
      <IntlHeader />
      <main id="main-content">
        <article className="mx-auto max-w-[42rem] px-4 pt-6 sm:px-6">
          <nav aria-label="Breadcrumb" className="text-[0.95rem] text-blaek-2">
            <Link href="/" className="hover:underline">Home</Link>
            <span aria-hidden="true"> / </span>
            <Link href="/guide/" className="hover:underline">Guides</Link>
          </nav>
          <h1 className="mt-4 text-4xl font-extrabold tracking-[-0.025em] sm:text-5xl" style={{ fontStretch: "88%" }}>{guide.h1}</h1>
          <p className="mt-5 text-lg leading-relaxed">{guide.intro}</p>

          <aside aria-labelledby="not-therapy" className="my-8 rounded-2xl bg-flade p-5 ring-1 ring-streg">
            <h2 id="not-therapy" className="text-lg font-bold">A conversation game, not treatment</h2>
            <p className="mt-2">
              These exercises can make it easier to talk, but they don&rsquo;t replace help from a professional. If something weighs on you,
              or the same fights keep coming back, talk to a doctor or a licensed counselor.
            </p>
            <p className="mt-2">
              If anyone is in danger, call your local emergency number. You can find free, confidential helplines in your country at{" "}
              <a href="https://findahelpline.com/" className="underline">findahelpline.com</a>.
            </p>
          </aside>

          <div className="space-y-5 leading-relaxed [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-bold">
            {guide.afsnit.map((a) => (
              <section key={a.h2}>
                <h2>{a.h2}</h2>
                {a.tekst.map((t) => <p key={t} className="mt-3">{t}</p>)}
                {a.punkter && <ul className="mt-3 list-disc space-y-1.5 pl-6">{a.punkter.map((p) => <li key={p}>{p}</li>)}</ul>}
              </section>
            ))}
          </div>

          <h2 className="mt-12 text-2xl font-bold">Questions for the exercise</h2>
          <ol className="mt-4 divide-y divide-streg border-y border-streg">
            {guide.spoergsmaal.map((q, i) => (
              <li key={q} data-kort className="flex gap-4 py-3">
                <span className="w-7 shrink-0 pt-0.5 text-right text-sm font-semibold tabular-nums text-blaek-2" aria-hidden="true">{i + 1}</span>
                <span className="text-[1.0625rem] leading-snug">{q}</span>
              </li>
            ))}
          </ol>

          {decks.length > 0 && (
            <>
              <h2 className="mt-12 text-2xl font-bold">Keep playing with the cards</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {decks.map((d) => (
                  <li key={d.id}>
                    <Link href={`/questions/${d.slug}/`} className="group flex items-center gap-3 rounded-2xl bg-flade p-3 ring-1 ring-streg hover:bg-flade-2">
                      <DeckBack categoryId={d.id} className="h-14 w-10 shrink-0 rounded-md" />
                      <span>
                        <span className="block font-bold group-hover:underline">{d.name}</span>
                        <span className="text-sm text-blaek-2">{d.questions.length} cards</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}

          <h2 className="mt-12 text-2xl font-bold">Sources</h2>
          <ul className="mt-4 space-y-3 text-[0.95rem]">
            {guide.kilder.map((k) => (
              <li key={k.fuld}>
                <span className="font-semibold">{k.kort}.</span> {k.fuld}
                {k.forbehold && <span className="mt-0.5 block text-blaek-2">{k.forbehold}</span>}
              </li>
            ))}
          </ul>
        </article>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      </main>
      <IntlFooter />
    </>
  );
}
