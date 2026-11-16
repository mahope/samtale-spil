import Link from "next/link";
import { intlDecks, INTL_CARD_COUNT } from "@/intl/data";

/*
 * The texts of Praatspel's About, Privacy and How to play (Dutch; same exports as src/locales/en/content.tsx).
 * The app (*.intlapp.tsx) wraps them in AppTextScreen; "app" swaps links to pages the app does not have.
 */

export function AboutText() {
  return (
    <>
      <p>
        Het idee komt van het doosje met gesprekskaarten dat veel mensen in een la hebben liggen: vragen waardoor mensen dingen vertellen
        die ze anders niet zo snel zouden zeggen. Praatspel doet hetzelfde op je telefoon, en helemaal gratis.
      </p>
      <p>
        Er zijn {INTL_CARD_COUNT.toLocaleString("nl-NL")} vragen in {intlDecks.length} stapels. Elke vraag is licht, midden of diep, zodat
        je zelf kiest hoe diep je wilt gaan.
      </p>
      <h2>Wie maakt het</h2>
      <p>
        Praatspel is gemaakt door Mads Holst Jensen, die in Denemarken de kleine webstudio <a href="https://mahoje.dk">Mahoje</a> heeft.
        Het begon in het Deens als <a href="https://snakkespil.dk" hrefLang="da">Snakkespil</a> en bestaat ook in het Engels als{" "}
        <a href="https://goodtalkcards.com" hrefLang="en">Goodtalk</a>.
      </p>
      <h2>Geen account, geen reclame</h2>
      <p>Niets wat je hier doet, wordt aan jou gekoppeld. Er zijn geen accounts en geen trackingcookies, en we verkopen of delen nooit gegevens.</p>
    </>
  );
}

export const PRIVACY_LEAD = "Kort gezegd: geen account, geen reclame, geen trackingcookies, en wat je bewaart, blijft op je apparaat.";

export function PrivacyText({ app = false }: { app?: boolean }) {
  return (
    <>
      <h2>Wat er op je apparaat blijft</h2>
      {app ? (
        <p>Je favorieten en instellingen worden in de app op je telefoon bewaard. Ze verlaten je apparaat nooit, en als je de app verwijdert, zijn ze weg.</p>
      ) : (
        <p>Je instellingen worden in de lokale opslag van je browser bewaard. Ze verlaten je apparaat nooit, en je kunt ze wissen door je browsergegevens te verwijderen.</p>
      )}
      <h2>Wat we tellen</h2>
      <p>
        We gebruiken Plausible en Umami, twee privacyvriendelijke analysetools die we zelf draaien op onze eigen servers in de EU, om paginaweergaven en een paar anonieme gebeurtenissen te tellen, zoals
        &ldquo;er is een spel gestart&rdquo;. Geen van beide plaatst cookies of bewaart persoonsgegevens of IP-adressen. Plausible kan je niet volgen van pagina naar pagina of van dag tot dag.
        Umami geeft je browser een anonieme bezoek-ID, berekend uit je IP-adres en browser met een geheime waarde die regelmatig wordt vervangen. Zo kan Umami zien
        dat paginaweergaven in dezelfde periode van dezelfde browser komen, maar niet wie je bent.
      </p>
      <h2>Een kaart melden</h2>
      <p>
        Als je een kaart meldt, krijgen we de kaart, de reden die je koos en je opmerking per e-mail, verstuurd via de e-maildienst Resend.
        We krijgen niet je naam, je e-mailadres of je IP-adres. Om spam tegen te houden gebruikt het formulier Cloudflare Turnstile, dat controleert of je een mens bent.
        Cloudflare gebruikt je IP-adres kort voor die controle en om te beperken hoeveel meldingen er van één adres kunnen komen.
      </p>
      <h2>Wie is verantwoordelijk</h2>
      <p>Mahope, Denemarken. Vragen over privacy: mads@mahoje.dk.</p>
    </>
  );
}

export const HOW_TO_PLAY_LEAD = "Praatspel is gebaseerd op onderzoek naar wat ervoor zorgt dat gesprekken mensen dichter bij elkaar brengen. Dit zijn de belangrijkste dingen.";

export function HowToPlayText({ app = false }: { app?: boolean }) {
  return (
    <>
      <h2>Haal er zoveel mogelijk uit</h2>
      <p>Zoek een rustig moment waarop jullie niet gestoord worden. Leg de telefoons weg, behalve die waarop jullie spelen.</p>
      <p>Begin met de lichte kaarten en ga naar de diepere als jullie daar zin in hebben. De eerste vragen voelen vaak een beetje ongemakkelijk. Dat is heel normaal.</p>
      <p>Iedereen antwoordt. Wie de kaart voorleest, antwoordt als eerste, daarna lezen jullie om de beurt voor.</p>
      <p>Vraag door. De beste vraag is vaak de tweede: &ldquo;Hoe voelde dat?&rdquo; of &ldquo;Vertel eens meer.&rdquo; Luister om te begrijpen, niet om te antwoorden.</p>
      <p>Je mag altijd een kaart overslaan of een nieuwe pakken. Niemand hoeft uit te leggen waarom.</p>
      <p>Sluit af met een lichte of vrolijke kaart, en bedank elkaar voor het gesprek.</p>

      <h2>Als een gesprek moeilijk wordt</h2>
      <p>Soms raakt een vraag een gevoelige plek. Dat betekent niet dat er iets mis is. Een paar dingen helpen:</p>
      <ul>
        <li>Neem de tijd en luister. Je hoeft nu niets op te lossen.</li>
        <li>Zeg wat jij voelt en nodig hebt, in plaats van wat de ander altijd doet.</li>
        <li>Neem een pauze als het iemand te veel wordt, en spreek af wanneer jullie het weer oppakken.</li>
      </ul>

      <h2 id="not-therapy">Een gespreksspel, geen therapie</h2>
      <p>
        Praatspel kan het makkelijker maken om te praten, maar het vervangt geen hulp van een professional. Als iets zwaar op je drukt, of
        als dezelfde ruzies steeds terugkomen, praat dan met je huisarts of een psycholoog.
      </p>
      <p>
        Denk je aan zelfdoding, of is iemand die je kent in gevaar, bel dan meteen 112. In Nederland kun je ook dag en nacht gratis en
        anoniem praten met 113 Zelfmoordpreventie: bel 113 of 0800-0113, of chat via <a href="https://www.113.nl/">113.nl</a>. In België
        bel je de Zelfmoordlijn op 1813. Buiten Nederland en België vind je een gratis en vertrouwelijke hulplijn in jouw land op{" "}
        <a href="https://findahelpline.com/">findahelpline.com</a>.
      </p>
      <p>
        Klaar? <Link href={app ? "/" : "/play/"}>Kies een stapel</Link>.
      </p>
    </>
  );
}
