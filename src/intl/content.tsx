import Link from "next/link";
import { intlDecks, INTL_CARD_COUNT } from "@/intl/data";

/*
 * The texts of Goodtalk's About, Privacy and How to play. The site wraps them in IntlTextPage,
 * the app (*.intlapp.tsx) in AppTextScreen; "app" swaps links to pages the app does not have.
 */

export function AboutText() {
  return (
    <>
      <p>
        The idea comes from the box of conversation cards many people keep in a drawer: questions that get people to share things they
        wouldn&rsquo;t otherwise say. Goodtalk does the same on your phone, for free.
      </p>
      <p>
        There are {INTL_CARD_COUNT.toLocaleString("en-US")} questions in {intlDecks.length} decks. Every question is marked light, medium
        or deep, so you can choose how deep you want to go.
      </p>
      <h2>Who makes it</h2>
      <p>
        Goodtalk is made by Mads Holst Jensen, who runs the small web studio <a href="https://mahoje.dk">Mahope</a> in Denmark. It started
        in Danish as <a href="https://snakkespil.dk" hrefLang="da">Snakkespil</a>.
      </p>
      <h2>No account, no ads</h2>
      <p>Nothing you do here is tied to you. There are no accounts, no tracking cookies, and we never sell or share data.</p>
    </>
  );
}

export const PRIVACY_LEAD = "Short version: no account, no ads, no tracking cookies, and what you save stays on your device.";

export function PrivacyText({ app = false }: { app?: boolean }) {
  return (
    <>
      <h2>What stays on your device</h2>
      {app ? (
        <p>Your favorites and settings are stored in the app on your phone. They never leave your device, and deleting the app deletes them.</p>
      ) : (
        <p>Your settings are stored in your browser&rsquo;s local storage. They never leave your device, and you can delete them by clearing your browser data.</p>
      )}
      <h2>What we count</h2>
      <p>
        We use Plausible, a privacy-friendly analytics tool hosted in the EU, to count page views and a few anonymous events such as
        &ldquo;a game was started&rdquo;. It sets no cookies and stores no personal data or IP addresses.
      </p>
      <h2>Reporting a card</h2>
      <p>
        If you report a card, we receive the card, the reason you picked and your comment by email, sent through the email service Resend.
        We don&rsquo;t receive your name, email or IP address. To keep spam out, the form uses Cloudflare Turnstile, which checks that you&rsquo;re
        human; Cloudflare briefly uses your IP address for that check and to limit how many reports can come from one address.
      </p>
      <h2>Who is responsible</h2>
      <p>Mahope, Denmark. Questions about privacy: mads@mahoje.dk.</p>
    </>
  );
}

export const HOW_TO_PLAY_LEAD = "Goodtalk is based on research into what makes conversations bring people closer. Here's what matters most.";

export function HowToPlayText({ app = false }: { app?: boolean }) {
  return (
    <>
      <h2>Getting the most out of it</h2>
      <p>Find a quiet moment when you won&rsquo;t be interrupted. Put the phones away, except the one you play on.</p>
      <p>Start with the light cards and move to the deeper ones when you feel like it. The first few questions often feel a little awkward. That&rsquo;s normal.</p>
      <p>Everyone answers. Whoever reads the card answers first, then take turns reading.</p>
      <p>Ask a follow-up. The best question is often the second one: &ldquo;How did that feel?&rdquo; or &ldquo;Tell me more.&rdquo; Listen to understand, not to reply.</p>
      <p>You can always skip a card or take a new one. Nobody has to explain why.</p>
      <p>Finish with a light or happy card, and thank each other for the conversation.</p>

      <h2>When a talk gets hard</h2>
      <p>Sometimes a question hits a sore spot. That doesn&rsquo;t mean something is wrong. A few things help:</p>
      <ul>
        <li>Slow down and listen. You don&rsquo;t have to fix anything right now.</li>
        <li>Say what you feel and need, instead of what the other person always does.</li>
        <li>Take a break if anyone feels overwhelmed, and agree on when to pick it up again.</li>
      </ul>

      <h2>A conversation game, not therapy</h2>
      <p>
        Goodtalk can make it easier to talk, but it doesn&rsquo;t replace help from a professional. If something weighs on you, or the
        same fights keep coming back, talk to a doctor or a counselor.
      </p>
      <p>
        If you&rsquo;re thinking about suicide, or someone you know is in danger, contact your local emergency number right away. You can
        find a free, confidential helpline in your country at <a href="https://findahelpline.com/">findahelpline.com</a>.
      </p>
      <p>
        Ready? <Link href={app ? "/" : "/play/"}>Choose a deck</Link>.
      </p>
    </>
  );
}
