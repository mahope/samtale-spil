import { Metadata } from "next";
import { Suspense } from "react";
import { categories, getCategory } from "@/data/categories";
import { appScreenMetadata } from "@/config/site";
import CategoryPlayClient from "./CategoryPlayClient";

// Generate static params for all categories at build time
export function generateStaticParams() {
  return categories.map((category) => ({
    categoryId: category.id,
  }));
}

// The play screen is app state; the indexable page for a category is /spoergsmaal/<id>/
export async function generateMetadata({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}): Promise<Metadata> {
  const { categoryId } = await params;
  const category = getCategory(categoryId);
  if (!category) return { title: "Spillet findes ikke" };
  return appScreenMetadata(`${category.name}: spil med kortene`, `${category.description}. ${category.questions.length} spørgsmål.`);
}

interface Props {
  params: Promise<{ categoryId: string }>;
}

export default async function CategoryPlayPage({ params }: Props) {
  const { categoryId } = await params;
  return (
    <Suspense fallback={<CategoryLoadingFallback categoryId={categoryId} />}>
      <CategoryPlayClient categoryId={categoryId} />
    </Suspense>
  );
}

// Loading fallback: the empty table, so the screen does not jump when the game mounts
function CategoryLoadingFallback({ categoryId }: { categoryId: string }) {
  return (
    <div className="filt flex min-h-dvh items-center justify-center px-6" data-category={categoryId}>
      <div className="aspect-[5/7] w-full max-w-sm animate-pulse rounded-[1.25rem] bg-white/10" />
    </div>
  );
}
