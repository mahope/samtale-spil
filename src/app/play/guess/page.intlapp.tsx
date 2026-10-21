import { intlDeckById } from "@/intl/data";
import { GaetLoader } from "@/app/spil/gaet/GaetLoader";

export { metadata } from "./page.intl";

/** The same game as on the site; back goes to the deck's game, since the app has no /questions/ pages */
export default function GuessScreen() {
  const deck = intlDeckById.get("kend-din-partner")!;
  return <GaetLoader questions={deck.questions} deckName={deck.name} backHref={`/play/${deck.slug}/`} />;
}
