import { intlDeckById } from "@/intl/data";
import { GaetLoader } from "@/app/spil/gaet/GaetLoader";

export { metadata } from "./page.intl";

/**
 * The same game as on the site; the setup screen gets the app's navigation bar on the felt,
 * and back goes to the Play tab when the screen was opened directly (issue #108).
 */
export default function GuessScreen() {
  const deck = intlDeckById.get("kend-din-partner")!;
  return <GaetLoader questions={deck.questions} deckName={deck.name} backHref="/" backLabel="Play" variant="app" />;
}
