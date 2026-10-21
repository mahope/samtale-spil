import Link from "next/link";
import { notFound } from "next/navigation";
import { AppScreen } from "@/components/app/AppScreen";
import { legeSider, legeDeck } from "@/data/lege";
import { getDeck } from "@/data/decks";
import { LegeListe } from "./LegeListe";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return legeSider.map((s) => ({ slug: s.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const side = legeSider.find((s) => s.slug === slug);
  return { title: side?.h1.split(":")[0] ?? "Lege" };
}

/** One page of party games in the app: the games, and the cards to play on the phone */
export default async function LegScreen({ params }: Props) {
  const { slug } = await params;
  const side = legeSider.find((s) => s.slug === slug);
  if (!side) notFound();
  const deck = getDeck(legeDeck(slug));
  return (
    <AppScreen title={side.h1.split(":")[0]} back={{ href: "/lege/", label: "Lege" }}>
      <div className="px-4 pt-1">
        <p className="leading-relaxed">{side.intro}</p>
        <Link
          href={`/lege/${slug}/kort/`}
          className="app-press mt-5 flex min-h-12 items-center justify-center rounded-full px-6 text-base font-bold android:rounded-2xl"
          style={{ background: deck.bg, color: deck.ink }}
          data-ripple
        >
          Spil de {side.kort.length} kort
        </Link>
        <h2 className="mt-8 text-xl font-bold">Lege</h2>
        <LegeListe side={side} />
      </div>
    </AppScreen>
  );
}
