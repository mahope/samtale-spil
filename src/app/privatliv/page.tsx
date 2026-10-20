import type { Metadata } from "next";
import { OG_BASE } from "@/config/site";
import { TextPage } from "@/components/site/TextPage";

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
      lead="Kort fortalt: Snakkespil ved ikke, hvem du er. Der er ingen konto, ingen cookies og ingen reklamer."
    >
      <h2>Det du gemmer, bliver hos dig</h2>
      <p>
        Favoritter, fremskridt, statistik og dine egne spørgsmål gemmes kun i din browser eller i appen på din
        telefon. De sendes aldrig til os. Sletter du browserdata eller appen, forsvinder de også.
      </p>

      <h2>Hvad vi måler</h2>
      <p>
        Vi bruger Plausible, et besøgstal uden cookies, som kører på vores egen server i EU. Det tæller sidevisninger
        og enkelte handlinger, fx at et spil bliver startet, og hvilken kategori det er. Det gemmer ingen IP-adresser
        og kan ikke følge dig fra side til side eller fra dag til dag.
      </p>
      <p>
        Teksten i dine egne spørgsmål bliver aldrig sendt nogen steder hen.
      </p>
      <p>
        Tallene på siden »Hvad spiller folk?« kommer fra den samme anonyme statistik og viser kun summer.
      </p>

      <h2>Når du rapporterer et kort</h2>
      <p>
        Rapportér-knappen sender kortets nummer, den årsag du vælger, og din kommentar, hvis du skriver en, til os som en
        mail. Vi får ikke dit navn, din mail eller din IP-adresse i mailen. For at holde spam ude bruger formularen
        Cloudflare Turnstile, som tjekker, at du er et menneske. Den hentes først, når du åbner formularen, og sætter ikke
        sporings-cookies.
      </p>

      <h2>Appen</h2>
      <p>
        Appen til iPhone og Android gør det samme som hjemmesiden og gemmer også alt på telefonen. Hvis du slår
        påmindelser om dagens spørgsmål til, planlægges de lokalt på telefonen. Der bruges ingen push-server.
      </p>

      <h2>Hvem står bag</h2>
      <p>
        Snakkespil er lavet af Mahope ved Mads Holst Jensen. Har du spørgsmål om privatliv, så skriv til{" "}
        <a href="mailto:mads@mahoje.dk">mads@mahoje.dk</a>.
      </p>
      <p className="text-sm text-blaek-2">Opdateret 20. oktober 2026.</p>
    </TextPage>
  );
}
