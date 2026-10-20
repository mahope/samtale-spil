import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { guides } from "@/data/guides";
import { categories } from "@/data/categories";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { DeckBack } from "@/components/deck/DeckParts";
import { IkkeTerapi } from "@/components/site/IkkeTerapi";
import { OG_BASE, SITE_URL } from "@/config/site";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = guides.find((g) => g.slug === slug);
  if (!guide) return {};
  const url = `/guide/${slug}/`;
  return {
    title: guide.seoTitle,
    description: guide.metaDescription,
    alternates: { canonical: url },
    openGraph: { ...OG_BASE, type: "article", url, title: guide.seoTitle, description: guide.metaDescription },
  };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = guides.find((g) => g.slug === slug);
  if (!guide) notFound();
  const bunker = guide.bunker.map((id) => categories.find((c) => c.id === id)).filter((c) => c !== undefined);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Snakkespil", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE_URL}/guide/` },
        { "@type": "ListItem", position: 3, name: guide.h1.split(":")[0], item: `${SITE_URL}/guide/${slug}/` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: guide.h1,
      description: guide.metaDescription,
      inLanguage: "da-DK",
      author: { "@type": "Organization", name: "Snakkespil", url: SITE_URL },
      citation: guide.kilder.map((k) => k.fuld),
    },
  ];

  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <article className="mx-auto max-w-[42rem] px-4 pt-6 sm:px-6">
          <nav aria-label="Brødkrumme" className="text-[0.95rem] text-blaek-2">
            <Link href="/" className="hover:underline">Forside</Link>
            <span aria-hidden="true"> / </span>
            <Link href="/guide/" className="hover:underline">Guides</Link>
          </nav>
          <h1 className="mt-4 text-4xl font-extrabold tracking-[-0.025em] sm:text-5xl" style={{ fontStretch: "88%" }}>
            {guide.h1}
          </h1>
          <p className="mt-5 text-lg leading-relaxed">{guide.intro}</p>

          <IkkeTerapi />

          <div className="space-y-5 leading-relaxed [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-bold">
            {guide.afsnit.map((a) => (
              <section key={a.h2}>
                <h2>{a.h2}</h2>
                {a.tekst.map((t) => (
                  <p key={t} className="mt-3">
                    {t}
                  </p>
                ))}
                {a.punkter && (
                  <ul className="mt-3 list-disc space-y-1.5 pl-6">
                    {a.punkter.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          <h2 className="mt-12 text-2xl font-bold">Spørgsmål til øvelsen</h2>
          <ol className="mt-4 divide-y divide-streg border-y border-streg">
            {guide.spoergsmaal.map((q, i) => (
              <li key={q} data-kort className="flex gap-4 py-3">
                <span className="w-7 shrink-0 pt-0.5 text-right text-sm font-semibold tabular-nums text-blaek-2" aria-hidden="true">
                  {i + 1}
                </span>
                <span className="text-[1.0625rem] leading-snug">{q}</span>
              </li>
            ))}
          </ol>

          {bunker.length > 0 && (
            <>
              <h2 className="mt-12 text-2xl font-bold">Spil videre med kortene</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {bunker.map((c) => (
                  <li key={c.id}>
                    <Link href={`/spoergsmaal/${c.id}/`} className="group flex items-center gap-3 rounded-2xl bg-flade p-3 ring-1 ring-streg hover:bg-flade-2">
                      <DeckBack categoryId={c.id} className="h-14 w-10 shrink-0 rounded-md" />
                      <span>
                        <span className="block font-bold group-hover:underline">{c.name}</span>
                        <span className="text-sm text-blaek-2">{c.questions.length} kort</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}

          <h2 className="mt-12 text-2xl font-bold">Kilder</h2>
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
      <SiteFooter />
    </>
  );
}
