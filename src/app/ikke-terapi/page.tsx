import type { Metadata } from "next";
import Link from "next/link";
import { OG_BASE } from "@/config/site";
import { TextPage } from "@/components/site/TextPage";

export const metadata: Metadata = {
  title: "Et samtalespil, ikke terapi",
  description: "Snakkespil kan gøre det lettere at tale sammen, men det erstatter ikke hjælp fra en fagperson. Her finder du steder, hvor du kan få hjælp.",
  alternates: { canonical: "/ikke-terapi/" },
  openGraph: { ...OG_BASE, url: "/ikke-terapi/" },
};

/** The website's page for the not-therapy note; the app has its own screen (page.app.tsx) */
export default function IkkeTerapiPage() {
  return (
    <TextPage
      title="Et samtalespil, ikke terapi"
      lead="Snakkespil er til hygge og nærvær. Kortene kan gøre det lettere at tale sammen, men de erstatter ikke hjælp fra en fagperson."
    >
      <p>
        Søg hjælp, hvis jeres konflikter ofte ender i skænderier, hvis nogen føler sig utrygge, bange eller presset, hvis der
        er vold, trusler eller kontrol i forholdet, eller hvis en af jer har det psykisk dårligt over længere tid.
      </p>
      <h2>Her kan du få hjælp</h2>
      <ul>
        <li>Din egen læge kan henvise til psykolog eller parterapeut. Mange kommuner har gratis og anonym familierådgivning.</li>
        <li>
          <strong>Livslinien</strong>, hvis du har tanker om selvmord: <a href="tel:+4570201201">70 201 201</a>
        </li>
        <li>
          <strong>Lev Uden Vold</strong>, hvis der er vold i et nært forhold, hele døgnet: <a href="tel:1888">1888</a>
        </li>
        <li>
          <strong>BørneTelefonen</strong> for børn og unge, hele døgnet: <a href="tel:116111">116 111</a>
        </li>
        <li>Er nogen i akut fare, så ring 112.</li>
      </ul>
      <p>
        Gode råd til, hvad I gør, når et spørgsmål rammer et ømt punkt, står i{" "}
        <Link href="/saadan-spiller-i/">Sådan spiller I</Link>.
      </p>
    </TextPage>
  );
}
