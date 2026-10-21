import type { Metadata } from "next";
import Link from "next/link";
import { OG_BASE } from "@/config/site";
import { IntlTextPage } from "@/intl/Chrome";

export const metadata: Metadata = {
  title: "How to Play Conversation Cards",
  description: "Start light, everyone answers, ask a follow-up, and skip whenever you like. Simple tips for good conversations, and what to do when a talk gets hard.",
  alternates: { canonical: "/how-to-play/" },
  openGraph: { ...OG_BASE, url: "/how-to-play/" },
};

export default function HowToPlay() {
  return (
    <IntlTextPage title="How to play" lead="Goodtalk is based on research into what makes conversations bring people closer. Here's what matters most.">
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

      <h2 id="not-therapy">A conversation game, not therapy</h2>
      <p>
        Goodtalk can make it easier to talk, but it doesn&rsquo;t replace help from a professional. If something weighs on you, or the
        same fights keep coming back, talk to a doctor or a counselor.
      </p>
      <p>
        If you&rsquo;re thinking about suicide, or someone you know is in danger, contact your local emergency number right away. You can
        find a free, confidential helpline in your country at <a href="https://findahelpline.com/">findahelpline.com</a>.
      </p>
      <p>
        Ready? <Link href="/play/">Choose a deck</Link>.
      </p>
    </IntlTextPage>
  );
}
