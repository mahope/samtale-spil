import type { Metadata } from "next";
import { OG_BASE } from "@/config/site";
import { TextPage } from "@/components/site/TextPage";
import { OmIndhold, OM_LEAD } from "./OmIndhold";

export const metadata: Metadata = {
  title: "Om Snakkespil",
  description: "Snakkespil er gratis samtalekort på dansk til par, familier og venner. Her kan du læse, hvorfor spillet findes, og hvem der laver det.",
  alternates: { canonical: "/om/" },
  openGraph: { ...OG_BASE, url: "/om/" },
};

export default function AboutPage() {
  return (
    <TextPage
      title="Om Snakkespil"
      lead={OM_LEAD}
    >
      <OmIndhold />
    </TextPage>
  );
}
