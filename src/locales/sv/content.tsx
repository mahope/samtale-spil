import Link from "next/link";
import { intlDecks, INTL_CARD_COUNT } from "@/intl/data";

/*
 * The texts of Pratspel's About, Privacy and How to play (Swedish; same exports as src/locales/en/content.tsx).
 * The app (*.intlapp.tsx) wraps them in AppTextScreen; "app" swaps links to pages the app does not have.
 */

export function AboutText() {
  return (
    <>
      <p>
        Idén kommer från lådan med samtalskort som många har liggande i en byrålåda: frågor som får människor att berätta sådant de
        annars inte skulle ha sagt. Pratspel gör samma sak i telefonen, helt gratis.
      </p>
      <p>
        Det finns {INTL_CARD_COUNT.toLocaleString("sv-SE")} frågor i {intlDecks.length} lekar. Varje fråga är märkt som lätt, mellan
        eller djup, så att du kan välja hur djupt du vill gå.
      </p>
      <h2>Vem ligger bakom</h2>
      <p>
        Pratspel är gjort av Mads Holst Jensen, som driver den lilla webbstudion <a href="https://mahoje.dk">Mahoje</a> i Danmark. Det
        började på danska som <a href="https://snakkespil.dk" hrefLang="da">Snakkespil</a> och finns också på engelska som{" "}
        <a href="https://goodtalkcards.com" hrefLang="en">Goodtalk</a>.
      </p>
      <h2>Inget konto, ingen reklam</h2>
      <p>Inget du gör här kopplas till dig. Det finns inga konton, inga spårningskakor, och vi säljer eller delar aldrig några uppgifter.</p>
    </>
  );
}

export const PRIVACY_LEAD = "Kort version: inget konto, ingen reklam, inga spårningskakor, och det du sparar stannar på din enhet.";

export function PrivacyText({ app = false }: { app?: boolean }) {
  return (
    <>
      <h2>Vad som stannar på din enhet</h2>
      {app ? (
        <p>Dina favoriter och inställningar sparas i appen på din telefon. De lämnar aldrig din enhet, och när du tar bort appen försvinner de.</p>
      ) : (
        <p>Dina inställningar sparas i webbläsarens lokala lagring. De lämnar aldrig din enhet, och du kan ta bort dem genom att rensa webbläsarens data.</p>
      )}
      <h2>Vad vi räknar</h2>
      <p>
        Vi använder Plausible och Umami, två integritetsvänliga analysverktyg som vi själva driver på våra egna servrar i EU, för att räkna sidvisningar och några anonyma händelser som
        ”ett spel startades”. Ingen av dem sätter kakor eller sparar personuppgifter eller IP-adresser. Plausible kan inte följa dig från sida till sida eller från dag till dag.
        Umami ger din webbläsare ett anonymt besöks-id som räknas fram från din IP-adress och webbläsare med ett hemligt värde som byts regelbundet, så att det kan
        se att sidvisningar inom samma period kommer från samma webbläsare, men inte vem du är.
      </p>
      <h2>Rapportera ett kort</h2>
      <p>
        Om du rapporterar ett kort får vi kortet, den orsak du valde och din kommentar i ett mejl, som skickas via e-posttjänsten Resend.
        Vi får inte ditt namn, din e-postadress eller din IP-adress. För att hålla spam borta använder formuläret Cloudflare Turnstile, som kontrollerar att du är
        en människa. Cloudflare använder kortvarigt din IP-adress för den kontrollen och för att begränsa hur många rapporter som kan komma från en adress.
      </p>
      <h2>Vem som ansvarar</h2>
      <p>Mahope, Danmark. Frågor om integritet: mads@mahoje.dk.</p>
    </>
  );
}

export const HOW_TO_PLAY_LEAD = "Pratspel bygger på forskning om vad som gör att samtal för människor närmare varandra. Här är det viktigaste.";

export function HowToPlayText({ app = false }: { app?: boolean }) {
  return (
    <>
      <h2>Få ut det mesta av det</h2>
      <p>Hitta ett lugnt ögonblick när ni inte blir avbrutna. Lägg undan telefonerna, utom den ni spelar på.</p>
      <p>Börja med de lätta korten och gå över till de djupare när ni känner för det. De första frågorna känns ofta lite pinsamma. Det är helt normalt.</p>
      <p>Alla svarar. Den som läser kortet svarar först, sedan turas ni om att läsa.</p>
      <p>Ställ en följdfråga. Den bästa frågan är ofta den andra: ”Hur kändes det?” eller ”Berätta mer.” Lyssna för att förstå, inte för att svara.</p>
      <p>Du kan alltid hoppa över ett kort eller ta ett nytt. Ingen behöver förklara varför.</p>
      <p>Avsluta med ett lätt eller glatt kort och tacka varandra för samtalet.</p>

      <h2>När ett samtal blir svårt</h2>
      <p>Ibland träffar en fråga en öm punkt. Det betyder inte att något är fel. Några saker hjälper:</p>
      <ul>
        <li>Sakta ner och lyssna. Du behöver inte fixa något just nu.</li>
        <li>Säg vad du känner och behöver, i stället för vad den andra alltid gör.</li>
        <li>Ta en paus om någon känner sig överväldigad, och bestäm när ni tar upp det igen.</li>
      </ul>

      <h2 id="not-therapy">Ett samtalsspel, inte terapi</h2>
      <p>
        Pratspel kan göra det lättare att prata, men ersätter inte hjälp från en yrkesperson. Om något tynger dig, eller om
        samma bråk kommer tillbaka om och om igen, prata med en läkare eller en samtalsterapeut.
      </p>
      <p>
        Om du tänker på självmord, eller om någon du känner är i fara, ring 112 direkt. I Sverige kan du också ringa Mind Självmordslinjen på 90101
        eller chatta på mind.se. Utanför Sverige hittar du en kostnadsfri och konfidentiell hjälplinje i ditt land på <a href="https://findahelpline.com/">findahelpline.com</a>.
      </p>
      <p>
        Redo? <Link href={app ? "/" : "/play/"}>Välj en lek</Link>.
      </p>
    </>
  );
}
