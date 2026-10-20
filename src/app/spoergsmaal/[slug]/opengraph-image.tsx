import { categories, getCategory, getQuestionById } from "@/data/categories";
import { categoryTexts } from "@/data/categoryTexts";
import { curatedPages } from "@/data/curatedPages";
import { renderOgImage, OG_SIZE } from "@/lib/ogImage";

export const dynamic = "force-static";
export const alt = "Samtalekort fra Snakkespil";
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return [
    ...categories.filter((c) => categoryTexts[c.id]).map((c) => ({ slug: c.id })),
    ...curatedPages.map((p) => ({ slug: p.slug })),
  ];
}

export default async function OpengraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (category && categoryTexts[slug]) {
    const question = category.questions.find((q) => q.depth === "let") ?? category.questions[0];
    return renderOgImage({
      title: categoryTexts[slug].seoTitle.split(/[:?]/)[0],
      categoryId: slug,
      categoryName: category.name,
      question: question.text,
    });
  }
  const page = curatedPages.find((p) => p.slug === slug)!;
  const firstId = page.sections.flatMap((s) => s.questionIds ?? [])[0];
  const first = firstId ? getQuestionById(firstId) : null;
  const firstItem = page.sections.flatMap((s) => s.items ?? [])[0];
  return renderOgImage({
    title: page.h1.split(":")[0],
    categoryId: page.playDeck ?? first?.category.id ?? "blandet",
    categoryName: first?.category.name ?? "Snakkespil",
    question: first?.question.text ?? firstItem ?? page.intro.slice(0, 80),
  });
}
