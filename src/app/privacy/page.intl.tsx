import type { Metadata } from "next";
import { OG_BASE } from "@/config/site";
import { IntlTextPage } from "@/intl/Chrome";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Goodtalk has no accounts, no ads and no tracking cookies. What you save stays on your device. Here's exactly what we store and why.",
  alternates: { canonical: "/privacy/" },
  openGraph: { ...OG_BASE, url: "/privacy/" },
};

export default function Privacy() {
  return (
    <IntlTextPage title="Privacy" lead="Short version: no account, no ads, no tracking cookies, and what you save stays on your device.">
      <h2>What stays on your device</h2>
      <p>Your settings are stored in your browser&rsquo;s local storage. They never leave your device, and you can delete them by clearing your browser data.</p>
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
    </IntlTextPage>
  );
}
