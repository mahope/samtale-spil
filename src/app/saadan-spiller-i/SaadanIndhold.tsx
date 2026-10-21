import Link from "next/link";

export const SAADAN_LEAD =
  "Snakkespil er bygget på det, forskningen ved om samtaler, der bringer folk tættere på hinanden. Her er de vigtigste råd.";

/**
 * The text of the page; the site wraps it in TextPage, the app in AppTextScreen.
 * The app has no /spoergsmaal/ pages, so there (app) the 36 questions are not a link.
 */
export function SaadanIndhold({ app = false }: { app?: boolean }) {
  return (
    <>
      <h2>Sådan får I mest ud af spillet</h2>
      <p>Find et roligt øjeblik, hvor I ikke bliver afbrudt. Læg telefonerne væk, undtagen den I spiller på.</p>
      <p>
        Start med de lette kort, og gå først videre til de dybere, når I har lyst. Det er helt normalt, at de første par
        spørgsmål føles lidt kunstige.
      </p>
      <p>Svar begge to på hvert kort. Den ene læser op og svarer først, og næste gang er det den anden, der starter.</p>
      <p>
        Spørg videre. Det bedste spørgsmål er ofte det andet: »Hvordan føltes det?« eller »Fortæl lidt mere.« Lyt for at
        forstå, ikke for at svare.
      </p>
      <p>I må altid springe et kort over eller tage et nyt. Ingen skal forklare hvorfor.</p>
      <p>Mange bliver overraskede over, hvor gode de dybe snakke bliver. Giv dem en chance, men pres ikke nogen.</p>
      <p>Slut af med et let eller glad kort, og sig gerne tak for snakken.</p>
      <p>
        Kom tilbage til spillet igen. Et par kort en gang om ugen giver mere end en lang aften en gang om året.
      </p>

      <h2>Spilformer</h2>
      <p>
        <Link href="/spil/aaret-der-gik/">Året der gik</Link> er fire runder til nytår, fødselsdage og årsdage: først ser
        I tilbage på året, så gætter I hinandens svar, så ser I frem, og til sidst gætter I igen.
      </p>
      <p>
        <Link href="/spil/trappen/">Trappen</Link> går fra lette til dybe kort, og{" "}
        <Link href="/spil/gaet/">Gæt svaret</Link> lader den ene svare i hemmelighed, mens den anden gætter.
      </p>
      <p>
        Cirka hvert tiende kort er en joker, som bryder rækken: stil dit eget spørgsmål, eller giv kortet videre. Jokeren
        kan slås fra under <Link href="/indstillinger/">Indstillinger</Link>. De faste runder slutter med et let kort, så I
        slutter på noget godt.
      </p>

      <h2>Når en snak bliver svær</h2>
      <p>Nogle gange rammer et spørgsmål noget ømt. Det er ikke et tegn på, at noget er galt. Et par gode greb:</p>
      <ul>
        <li>Hold en pause. I må gerne sige: »Det her vil jeg gerne tale om, men ikke lige nu.«</li>
        <li>Tal om dig selv. Sig »jeg føler« og »jeg har brug for« i stedet for »du gør altid«.</li>
        <li>Lyt først, og gentag med dine egne ord, hvad du hørte, før du svarer.</li>
        <li>I skal ikke løse alt ved bordet. Det er nok at have hørt hinanden.</li>
        <li>Skift til et lettere kort, hvis stemningen bliver for tung, og vend tilbage til emnet en anden dag.</li>
        <li>Ingen skal fortælle om oplevelser, de ikke er klar til at dele. Det gælder især børn.</li>
      </ul>
      <p>Hvis den samme svære snak bliver ved med at gå i ring, kan det være en god idé at få hjælp udefra.</p>

      <h2>Et samtalespil, ikke terapi</h2>
      <p>
        Snakkespil er til hygge og nærvær. Det kan ikke erstatte professionel hjælp. Søg hjælp, hvis jeres konflikter ofte
        ender i skænderier, hvis nogen føler sig utrygge, bange eller presset, hvis der er vold, trusler eller kontrol i
        forholdet, eller hvis en af jer har det psykisk dårligt over længere tid.
      </p>
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

      <h2>Hvor kommer rådene fra?</h2>
      <p>
        Rådene bygger på forskning i nærhed og samtale, blandt andet Arthur Arons studier af de{" "}
        {app ? "36 spørgsmål" : <Link href="/spoergsmaal/36-spoergsmaal-til-at-forelske-sig/">36 spørgsmål</Link>}, forskning i at lytte og spørge
        ind, i at glæde sig over hinandens gode nyheder og i familiers fortællinger med børn. Den fulde gennemgang med
        kilder ligger i projektets dokumentation.
      </p>
    </>
  );
}
