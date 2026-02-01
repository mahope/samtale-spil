import { Metadata } from "next";
import { Suspense } from "react";
import { categories, getCategory } from "@/data/categories";
import CategoryPlayClient from "./CategoryPlayClient";

const siteUrl = "https://mahope.github.io/samtale-spil";

// Generate static params for all categories at build time
export function generateStaticParams() {
  return categories.map((category) => ({
    categoryId: category.id,
  }));
}

// Generate dynamic metadata for each category
export async function generateMetadata({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}): Promise<Metadata> {
  const { categoryId } = await params;
  const category = getCategory(categoryId);

  if (!category) {
    return {
      title: "Kategori ikke fundet",
    };
  }

  const title = `${category.name} - Samtalekort`;
  const description = `${category.description}. ${category.questions.length} spørgsmål om ${category.name.toLowerCase()} til meningsfulde samtaler.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${siteUrl}/spil/${categoryId}`,
      type: "website",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
    alternates: {
      canonical: `${siteUrl}/spil/${categoryId}`,
    },
  };
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

// Loading fallback component
function CategoryLoadingFallback({ categoryId }: { categoryId: string }) {
  const category = getCategory(categoryId);
  const color = category?.color || "from-violet-400 to-purple-500";
  
  return (
    <div className={`min-h-screen bg-gradient-to-br ${color} flex flex-col items-center justify-center px-6`}>
      <div className="animate-pulse">
        <div className="w-full max-w-sm mx-auto">
          <div className="w-full h-[400px] bg-white/20 rounded-3xl" />
        </div>
        <div className="mt-8 w-full max-w-sm">
          <div className="h-14 bg-white/20 rounded-2xl" />
        </div>
      </div>
    </div>
  );
}
