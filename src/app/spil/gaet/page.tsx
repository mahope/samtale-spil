import type { Metadata } from "next";
import { appScreenMetadata } from "@/config/site";
import { GaetLoader } from "./GaetLoader";

export const metadata: Metadata = appScreenMetadata(
  "Gæt svaret: Kend din partner med point",
  "Én svarer i hemmelighed, den anden gætter. Eller alle svarer skjult og afslører sammen."
);

export default function GaetPage() {
  return <GaetLoader />;
}
