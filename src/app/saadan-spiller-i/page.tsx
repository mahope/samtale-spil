import type { Metadata } from "next";
import { TextPage } from "@/components/site/TextPage";
import { SaadanIndhold, SAADAN_LEAD } from "./SaadanIndhold";
import { OG_BASE } from "@/config/site";

// Text from docs/forskning.md (section 5), built on research about conversation and closeness.
export const metadata: Metadata = {
  title: "Sådan spiller I",
  description:
    "Gode råd til samtalekort: start let, svar begge to, spørg videre, og spring over når I vil. Og hvad I kan gøre, når en snak bliver svær.",
  alternates: { canonical: "/saadan-spiller-i/" },
  openGraph: { ...OG_BASE, url: "/saadan-spiller-i/" },
};

export default function HowToPlayPage() {
  return (
    <TextPage
      title="Sådan spiller I"
      lead={SAADAN_LEAD}
    >
      <SaadanIndhold />
    </TextPage>
  );
}
