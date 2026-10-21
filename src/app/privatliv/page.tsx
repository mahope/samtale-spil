import type { Metadata } from "next";
import { OG_BASE } from "@/config/site";
import { TextPage } from "@/components/site/TextPage";
import { PrivatlivIndhold, PRIVATLIV_LEAD } from "./PrivatlivIndhold";

export const metadata: Metadata = {
  title: "Privatliv",
  description: "Snakkespil har ingen konti og ingen cookies. Det du gemmer, bliver på din egen enhed. Læs hvad vi måler, og hvordan.",
  alternates: { canonical: "/privatliv/" },
  openGraph: { ...OG_BASE, url: "/privatliv/" },
};

export default function PrivacyPage() {
  return (
    <TextPage
      title="Privatliv"
      lead={PRIVATLIV_LEAD}
    >
      <PrivatlivIndhold />
    </TextPage>
  );
}
