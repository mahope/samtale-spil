import Link from "next/link";
import { AppScreen } from "@/components/app/AppScreen";
import { DeckBack } from "@/components/deck/DeckParts";

export const metadata = { title: "Siden findes ikke" };

export default function NotFound() {
  return (
    <AppScreen title="Det kort findes ikke" back={{ href: "/", label: "Spil" }}>
      <div className="flex flex-col items-center px-6 pt-10 text-center">
        <DeckBack categoryId="blandet" className="flex aspect-[5/7] w-28 rotate-[-6deg] items-center justify-center rounded-2xl shadow-kort">
          <span className="font-display text-6xl font-extrabold">?</span>
        </DeckBack>
        <p className="mt-8 max-w-xs text-blaek-2">Skærmen findes ikke i appen. Måske var linket en smule forkert.</p>
        <Link href="/" className="app-press mt-6 inline-flex min-h-12 items-center rounded-full bg-bord px-6 font-bold text-white dark:bg-kridt dark:text-kridt-blaek">
          Vælg et spil
        </Link>
      </div>
    </AppScreen>
  );
}
