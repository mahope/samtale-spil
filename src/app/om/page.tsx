import type { Metadata } from "next";
import { OG_BASE, QUESTION_COUNT, CATEGORY_COUNT } from "@/config/site";
import Link from "next/link";
import { TextPage } from "@/components/site/TextPage";

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
      lead="Snakkespil er et kortspil uden kort. Du trækker et spørgsmål, læser det højt, og så snakker I."
    >
      <p>
        Idéen kommer fra de samtalekort, mange har liggende i en skuffe: en æske med spørgsmål, der får folk til at
        fortælle noget, de ellers ikke ville have sagt. Snakkespil gør det samme, bare på telefonen, gratis og på dansk.
      </p>
      <p>
        Der er {QUESTION_COUNT.toLocaleString("da-DK")} spørgsmål fordelt på {CATEGORY_COUNT} spil og et spil kun for voksne.
        Hvert spørgsmål er mærket let, medium eller dyb, så I selv kan vælge, hvor langt ind I vil.
      </p>

      <h2>Hvem laver det</h2>
      <p>
        Snakkespil er lavet af Mads Holst Jensen, der driver det lille webbureau{" "}
        <a href="https://mahoje.dk">Mahope</a>. Spillet har ingen reklamer og samler ingen persondata, og sådan bliver
        det ved med at være.
      </p>

      <h2>Mangler du et spørgsmål?</h2>
      <p>
        Skriv til <a href="mailto:mads@mahoje.dk">mads@mahoje.dk</a> med dit forslag. Du kan også lave dit eget sæt
        under <Link href="/mine-spoergsmaal/">Dine egne spørgsmål</Link>.
      </p>
    </TextPage>
  );
}
