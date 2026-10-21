import type { Metadata } from "next";
import { appScreenMetadata } from "@/config/site";
import { GaetLoader } from "./GaetLoader";
import { getCategory } from "@/data/categories";

export const metadata: Metadata = appScreenMetadata(
  "Gæt svaret: Kend din partner med point",
  "Én svarer i hemmelighed, den anden gætter. Eller alle svarer skjult og afslører sammen."
);

export default function GaetPage() {
  const deck = getCategory("kend-din-partner")!;
  return <GaetLoader questions={deck.questions} deckName={deck.name} backHref="/spil/kend-din-partner/" />;
}
