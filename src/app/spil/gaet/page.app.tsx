import { getCategory } from "@/data/categories";
import { GaetLoader } from "./GaetLoader";

export { metadata } from "./page";

// The setup screen gets the app's navigation bar on the felt; back goes to the Spil tab (issue #108)
export default function GaetAppPage() {
  const deck = getCategory("kend-din-partner")!;
  return <GaetLoader questions={deck.questions} deckName={deck.name} backHref="/" backLabel="Spil" variant="app" />;
}
