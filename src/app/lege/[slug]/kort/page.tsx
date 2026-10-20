import type { Metadata } from "next";
import { legeSider } from "@/data/lege";
import { appScreenMetadata } from "@/config/site";
import { LegeKortLoader } from "./LegeKortLoader";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return legeSider.map((s) => ({ slug: s.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const side = legeSider.find((s) => s.slug === slug);
  return appScreenMetadata(`${side?.h1.split(":")[0] ?? "Lege"}: kortene`);
}

export default async function LegeKortPage({ params }: Props) {
  const { slug } = await params;
  return <LegeKortLoader slug={slug} />;
}
