/** The texts of the 18+ app's Om and Privatliv screens (AppTextScreen) */

export const OM_LEAD = "Snakkespil 18+ er samtalekort og udfordringer til par: frække spørgsmål, nærhed og små opgaver for jer to.";

export function OmTekst() {
  return (
    <>
      <p>
        Appen er lillesøster til Snakkespil, som har samtalekort til familien, vennerne og skolen. Her er kun kortene til voksne par, og
        udfordringerne findes kun i denne app.
      </p>
      <h2>Sådan spiller I</h2>
      <p>
        Vælg en bunke, og skiftes til at trække. Den, der trækker, læser højt og svarer først. Alle må springe et kort over uden at
        forklare hvorfor, og I bestemmer selv, hvor langt I vil gå.
      </p>
      <h2>Hvem står bag</h2>
      <p>
        Snakkespil 18+ er lavet af Mads Holst Jensen fra webstudiet <a href="https://mahoje.dk">Mahope</a>. Der er ingen reklamer og ingen
        konto. Skriv til <a href="mailto:mads@mahoje.dk">mads@mahoje.dk</a>, hvis du har et forslag til et kort.
      </p>
    </>
  );
}

export const PRIVATLIV_LEAD = "Kort fortalt: appen ved ikke, hvem du er. Der er ingen konto, ingen cookies og ingen reklamer.";

export function PrivatlivTekst() {
  return (
    <>
      <h2>Det du gemmer, bliver på telefonen</h2>
      <p>
        Favoritter, indstillinger og dit svar på, om du er fyldt 18, gemmes kun i appen på din telefon. De sendes aldrig til os.
        Sletter du appen, forsvinder de også.
      </p>
      <h2>Hvad vi måler</h2>
      <p>
        Vi bruger Plausible, et besøgstal uden cookies, som kører på vores egen server i EU. Det tæller, at et spil bliver startet, og
        med hvilken bunke. Det gemmer ingen IP-adresser og kan ikke følge dig fra dag til dag.
      </p>
      <h2>Når du rapporterer et kort</h2>
      <p>
        Rapportér-knappen sender kortets nummer, den årsag du vælger, og din kommentar, hvis du skriver en, til os som en mail gennem
        mailtjenesten Resend. Vi får ikke dit navn, din mail eller din IP-adresse. Formularen bruger Cloudflare Turnstile til at holde
        spam ude; Cloudflare bruger kortvarigt din IP-adresse til tjekket.
      </p>
      <h2>Hvem står bag</h2>
      <p>
        Snakkespil 18+ er lavet af Mahope ved Mads Holst Jensen. Har du spørgsmål om privatliv, så skriv til{" "}
        <a href="mailto:mads@mahoje.dk">mads@mahoje.dk</a>.
      </p>
    </>
  );
}
