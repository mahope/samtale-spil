import type { Metadata } from "next";
import { OG_BASE } from "@/config/site";
import { notFound } from "next/navigation";
import { categories } from "@/data/categories";
import { categoryTexts } from "@/data/categoryTexts";
import { curatedPages } from "@/data/curatedPages";
import { CategoryLanding } from "./CategoryLanding";
import { CuratedLanding } from "./CuratedLanding";

interface Props {
  params: Promise<{ slug: string }>;
}

/** /spoergsmaal/<slug>/ is either a whole deck or a hand-picked theme page. */
export function generateStaticParams() {
  return [
    ...categories.filter((c) => categoryTexts[c.id]).map((c) => ({ slug: c.id })),
    ...curatedPages.map((p) => ({ slug: p.slug })),
  ];
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const text = categoryTexts[slug];
  const curated = curatedPages.find((p) => p.slug === slug);
  const title = text?.seoTitle ?? curated?.seoTitle;
  const description = text?.metaDescription ?? curated?.metaDescription;
  if (!title) return {};
  const url = `/spoergsmaal/${slug}/`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { ...OG_BASE, url, title, description },
  };
}

export default async function QuestionPage({ params }: Props) {
  const { slug } = await params;
  if (categoryTexts[slug]) return <CategoryLanding categoryId={slug} />;
  const curated = curatedPages.find((p) => p.slug === slug);
  if (curated) return <CuratedLanding page={curated} />;
  notFound();
}
