import Link from "next/link";
import { intlDecks, INTL_CARD_COUNT } from "@/intl/data";

/*
 * The texts of Plauderspiel's About, Privacy and How to play (German; same exports as src/locales/en/content.tsx).
 * The app (*.intlapp.tsx) wraps them in AppTextScreen; "app" swaps links to pages the app does not have.
 */

export function AboutText() {
  return (
    <>
      <p>
        Die Idee kommt von der Schachtel mit Gesprächskarten, die viele in einer Schublade liegen haben: Fragen, die Menschen dazu bringen,
        Dinge zu erzählen, die sie sonst nicht sagen würden. Plauderspiel macht dasselbe auf dem Handy, ganz kostenlos.
      </p>
      <p>
        Es gibt {INTL_CARD_COUNT.toLocaleString("de-DE")} Fragen in {intlDecks.length} Kartenstapeln. Jede Frage ist als leicht, mittel
        oder tief markiert, damit du selbst wählen kannst, wie tief du gehen willst.
      </p>
      <h2>Wer dahintersteckt</h2>
      <p>
        Plauderspiel wird von Mads Holst Jensen gemacht, der in Dänemark das kleine Webstudio <a href="https://mahoje.dk">Mahoje</a> betreibt.
        Es fing auf Dänisch als <a href="https://snakkespil.dk" hrefLang="da">Snakkespil</a> an und gibt es auch auf Englisch als{" "}
        <a href="https://goodtalkcards.com" hrefLang="en">Goodtalk</a> und auf Schwedisch als Pratspel.
      </p>
      <h2>Kein Konto, keine Werbung</h2>
      <p>Nichts, was du hier tust, wird mit dir verknüpft. Es gibt keine Konten, keine Tracking-Cookies, und wir verkaufen oder teilen niemals Daten.</p>
    </>
  );
}

export const PRIVACY_LEAD = "Kurz gesagt: kein Konto, keine Werbung, keine Tracking-Cookies, und was du speicherst, bleibt auf deinem Gerät.";

export function PrivacyText({ app = false }: { app?: boolean }) {
  return (
    <>
      <h2>Was auf deinem Gerät bleibt</h2>
      {app ? (
        <p>Deine Favoriten und Einstellungen werden in der App auf deinem Handy gespeichert. Sie verlassen dein Gerät nie, und wenn du die App löschst, sind sie weg.</p>
      ) : (
        <p>Deine Einstellungen werden im lokalen Speicher deines Browsers gespeichert. Sie verlassen dein Gerät nie, und du kannst sie löschen, indem du die Browserdaten löschst.</p>
      )}
      <h2>Was wir zählen</h2>
      <p>
        Wir nutzen Plausible und Umami, zwei datenschutzfreundliche Analysetools, die wir selbst auf unseren eigenen Servern in der EU betreiben, um Seitenaufrufe und ein paar anonyme Ereignisse wie
        „ein Spiel wurde gestartet“ zu zählen. Keines der beiden setzt Cookies oder speichert personenbezogene Daten oder IP-Adressen. Plausible kann dir nicht von Seite zu Seite oder von Tag zu Tag folgen.
        Umami gibt deinem Browser eine anonyme Besuchs-ID, die aus deiner IP-Adresse und deinem Browser zusammen mit einem geheimen Wert berechnet wird, der regelmäßig gewechselt wird. So kann
        Umami erkennen, dass Seitenaufrufe im selben Zeitraum vom selben Browser kommen, aber nicht, wer du bist.
      </p>
      <h2>Eine Karte melden</h2>
      <p>
        Wenn du eine Karte meldest, bekommen wir die Karte, den Grund, den du gewählt hast, und deinen Kommentar per E-Mail, verschickt über den E-Mail-Dienst Resend.
        Wir bekommen weder deinen Namen noch deine E-Mail-Adresse oder IP-Adresse. Um Spam fernzuhalten, nutzt das Formular Cloudflare Turnstile, das prüft, ob du
        ein Mensch bist. Cloudflare nutzt deine IP-Adresse kurz für diese Prüfung und um zu begrenzen, wie viele Meldungen von einer Adresse kommen können.
      </p>
      <h2>Wer verantwortlich ist</h2>
      <p>Mahope, Dänemark. Fragen zum Datenschutz: mads@mahoje.dk.</p>
    </>
  );
}

export const HOW_TO_PLAY_LEAD = "Plauderspiel beruht auf Forschung dazu, was Gespräche ausmacht, die Menschen einander näherbringen. Hier ist das Wichtigste.";

export function HowToPlayText({ app = false }: { app?: boolean }) {
  return (
    <>
      <h2>So holt ihr am meisten heraus</h2>
      <p>Sucht euch einen ruhigen Moment, in dem ihr nicht gestört werdet. Legt die Handys weg, bis auf das, auf dem ihr spielt.</p>
      <p>Fangt mit den leichten Karten an und geht zu den tieferen über, wenn ihr Lust habt. Die ersten Fragen fühlen sich oft etwas komisch an. Das ist ganz normal.</p>
      <p>Alle antworten. Wer die Karte vorliest, antwortet zuerst, danach lest ihr abwechselnd vor.</p>
      <p>Fragt nach. Die beste Frage ist oft die zweite: „Wie hat sich das angefühlt?“ oder „Erzähl mehr.“ Hört zu, um zu verstehen, nicht um zu antworten.</p>
      <p>Du kannst jederzeit eine Karte überspringen oder eine neue nehmen. Niemand muss erklären, warum.</p>
      <p>Hört mit einer leichten oder fröhlichen Karte auf und dankt einander für das Gespräch.</p>

      <h2>Wenn ein Gespräch schwierig wird</h2>
      <p>Manchmal trifft eine Frage einen wunden Punkt. Das heißt nicht, dass etwas nicht stimmt. Ein paar Dinge helfen:</p>
      <ul>
        <li>Werdet langsamer und hört zu. Ihr müsst jetzt nichts lösen.</li>
        <li>Sag, was du fühlst und brauchst, statt was die andere Person immer macht.</li>
        <li>Macht eine Pause, wenn es jemandem zu viel wird, und verabredet, wann ihr weiterredet.</li>
      </ul>

      <h2 id="not-therapy">Ein Gesprächsspiel, keine Therapie</h2>
      <p>
        Plauderspiel kann das Reden leichter machen, ersetzt aber keine professionelle Hilfe. Wenn dich etwas belastet oder
        immer wieder derselbe Streit aufkommt, sprich mit einer Ärztin, einem Arzt oder einer Beratungsstelle.
      </p>
      <p>
        Wenn du an Suizid denkst oder jemand, den du kennst, in Gefahr ist, ruf sofort die 112 an. In Deutschland erreichst du die TelefonSeelsorge
        rund um die Uhr kostenlos und anonym unter 0800 111 0 111 oder 0800 111 0 222, oder online auf telefonseelsorge.de. Außerhalb Deutschlands
        findest du eine kostenlose und vertrauliche Hilfe-Hotline in deinem Land auf <a href="https://findahelpline.com/">findahelpline.com</a>.
      </p>
      <p>
        Bereit? <Link href={app ? "/" : "/play/"}>Kartenstapel wählen</Link>.
      </p>
    </>
  );
}
