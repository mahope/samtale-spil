import Link from "next/link";
import { intlDecks, INTL_CARD_COUNT } from "@/intl/data";

/*
 * The texts of Pratespill's About, Privacy and How to play (Norwegian Bokmål; same exports as src/locales/en/content.tsx).
 * The app (*.intlapp.tsx) wraps them in AppTextScreen; "app" swaps links to pages the app does not have.
 */

export function AboutText() {
  return (
    <>
      <p>
        Idéen kommer fra esken med samtalekort som mange har liggende i en skuff: spørsmål som får folk til å fortelle ting de
        ellers ikke ville ha sagt. Pratespill gjør det samme på telefonen, helt gratis.
      </p>
      <p>
        Det finnes {INTL_CARD_COUNT.toLocaleString("nb-NO")} spørsmål i {intlDecks.length} kortstokker. Hvert spørsmål er merket som lett, middels
        eller dypt, så du kan velge hvor dypt du vil gå.
      </p>
      <h2>Hvem står bak</h2>
      <p>
        Pratespill er laget av Mads Holst Jensen, som driver det lille webstudioet <a href="https://mahoje.dk">Mahoje</a> i Danmark. Det
        begynte på dansk som <a href="https://snakkespil.dk" hrefLang="da">Snakkespil</a> og finnes også på engelsk som{" "}
        <a href="https://goodtalkcards.com" hrefLang="en">Goodtalk</a>.
      </p>
      <h2>Ingen konto, ingen reklame</h2>
      <p>Ingenting du gjør her, kobles til deg. Det finnes ingen kontoer, ingen sporingskaker, og vi selger eller deler aldri noen opplysninger.</p>
    </>
  );
}

export const PRIVACY_LEAD = "Kortversjonen: ingen konto, ingen reklame, ingen sporingskaker, og det du lagrer, blir på enheten din.";

export function PrivacyText({ app = false }: { app?: boolean }) {
  return (
    <>
      <h2>Hva som blir på enheten din</h2>
      {app ? (
        <p>Favorittene og innstillingene dine lagres i appen på telefonen din. De forlater aldri enheten din, og når du sletter appen, forsvinner de.</p>
      ) : (
        <p>Innstillingene dine lagres i nettleserens lokale lagring. De forlater aldri enheten din, og du kan slette dem ved å tømme nettleserdataene.</p>
      )}
      <h2>Hva vi teller</h2>
      <p>
        Vi bruker Plausible og Umami, to personvernvennlige analyseverktøy som vi selv drifter på våre egne servere i EU, til å telle sidevisninger og noen få anonyme hendelser som
        «et spill ble startet». Ingen av dem setter informasjonskapsler eller lagrer personopplysninger eller IP-adresser. Plausible kan ikke følge deg fra side til side eller fra dag til dag.
        Umami gir nettleseren din en anonym besøks-id som regnes ut fra IP-adressen og nettleseren din med en hemmelig verdi som byttes jevnlig, slik at den kan
        se at sidevisninger i samme periode kommer fra samme nettleser, men ikke hvem du er.
      </p>
      <h2>Rapporter et kort</h2>
      <p>
        Hvis du rapporterer et kort, får vi kortet, årsaken du valgte og kommentaren din i en e-post, som sendes via e-posttjenesten Resend.
        Vi får ikke navnet ditt, e-postadressen din eller IP-adressen din. For å holde spam unna bruker skjemaet Cloudflare Turnstile, som sjekker at du er
        et menneske. Cloudflare bruker IP-adressen din kortvarig til den sjekken og til å begrense hvor mange rapporter som kan komme fra én adresse.
      </p>
      <h2>Hvem som er ansvarlig</h2>
      <p>Mahope, Danmark. Spørsmål om personvern: mads@mahoje.dk.</p>
    </>
  );
}

export const HOW_TO_PLAY_LEAD = "Pratespill bygger på forskning om hva som gjør at samtaler bringer folk nærmere hverandre. Her er det viktigste.";

export function HowToPlayText({ app = false }: { app?: boolean }) {
  return (
    <>
      <h2>Få mest mulig ut av det</h2>
      <p>Finn et rolig øyeblikk der dere ikke blir avbrutt. Legg bort telefonene, bortsett fra den dere spiller på.</p>
      <p>Begynn med de lette kortene, og gå over til de dypere når dere har lyst. De første spørsmålene kjennes ofte litt kleine. Det er helt normalt.</p>
      <p>Alle svarer. Den som leser kortet, svarer først, og så bytter dere på å lese.</p>
      <p>Still et oppfølgingsspørsmål. Det beste spørsmålet er ofte det andre: «Hvordan føltes det?» eller «Fortell mer.» Lytt for å forstå, ikke for å svare.</p>
      <p>Du kan alltid hoppe over et kort eller ta et nytt. Ingen trenger å forklare hvorfor.</p>
      <p>Avslutt med et lett eller muntert kort, og takk hverandre for praten.</p>

      <h2>Når en samtale blir vanskelig</h2>
      <p>Noen ganger treffer et spørsmål et ømt punkt. Det betyr ikke at noe er galt. Noen ting hjelper:</p>
      <ul>
        <li>Senk tempoet og lytt. Du trenger ikke å løse noe akkurat nå.</li>
        <li>Si hva du føler og trenger, i stedet for hva den andre alltid gjør.</li>
        <li>Ta en pause hvis noen føler seg overveldet, og avtal når dere tar det opp igjen.</li>
      </ul>

      <h2 id="not-therapy">Et samtalespill, ikke terapi</h2>
      <p>
        Pratespill kan gjøre det lettere å snakke sammen, men erstatter ikke hjelp fra fagfolk. Hvis noe tynger deg, eller hvis
        den samme krangelen kommer tilbake igjen og igjen, snakk med fastlegen din eller en samtaleterapeut.
      </p>
      <p>
        Hvis du tenker på selvmord, eller hvis noen du kjenner er i fare, ring 113 med en gang (politiet har 112). I Norge kan du også ringe Mental Helses
        hjelpetelefon på 116 123, døgnet rundt. Utenfor Norge finner du en gratis og fortrolig hjelpelinje i ditt land på <a href="https://findahelpline.com/">findahelpline.com</a>.
      </p>
      <p>
        Klar? <Link href={app ? "/" : "/play/"}>Velg en kortstokk</Link>.
      </p>
    </>
  );
}
