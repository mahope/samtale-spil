import type { Metadata } from "next";
import { appScreenMetadata } from "@/config/site";
import { intlDeckById } from "@/intl/data";
import { GaetLoader } from "@/app/spil/gaet/GaetLoader";
import { screens } from "@/locale/screens";

export const metadata: Metadata = appScreenMetadata(screens.guess.metaTitle, screens.guess.metaDescription);

export default function GuessPage() {
  const deck = intlDeckById.get("kend-din-partner")!;
  return <GaetLoader questions={deck.questions} deckName={deck.name} backHref={`/questions/${deck.slug}/`} />;
}
