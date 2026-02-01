import { Metadata } from "next";
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
  return <CategoryPlayClient categoryId={categoryId} />;
}
