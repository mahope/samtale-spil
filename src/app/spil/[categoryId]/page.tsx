import { categories } from "@/data/categories";
import CategoryPlayClient from "./CategoryPlayClient";

// Generate static params for all categories at build time
export function generateStaticParams() {
  return categories.map((category) => ({
    categoryId: category.id,
  }));
}

interface Props {
  params: Promise<{ categoryId: string }>;
}

export default async function CategoryPlayPage({ params }: Props) {
  const { categoryId } = await params;
  return <CategoryPlayClient categoryId={categoryId} />;
}
