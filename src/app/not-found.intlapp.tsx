import Link from "next/link";
import { AppScreen } from "@/components/app/AppScreen";
import { DeckBack } from "@/components/deck/DeckParts";
import { screens } from "@/locale/screens";

const t = screens.notFound;

export const metadata = { title: t.meta };

export default function NotFound() {
  return (
    <AppScreen title={t.title} back={{ href: "/", label: t.back }}>
      <div className="flex flex-col items-center px-6 pt-10 text-center">
        <DeckBack categoryId="blandet" className="flex aspect-[5/7] w-28 rotate-[-6deg] items-center justify-center rounded-2xl shadow-kort">
          <span className="font-display text-6xl font-extrabold">?</span>
        </DeckBack>
        <p className="mt-8 max-w-xs text-blaek-2">{t.text}</p>
        <Link href="/" className="app-press mt-6 inline-flex min-h-12 items-center rounded-full bg-bord px-6 font-bold text-white dark:bg-kridt dark:text-kridt-blaek">
          {t.cta}
        </Link>
      </div>
    </AppScreen>
  );
}
