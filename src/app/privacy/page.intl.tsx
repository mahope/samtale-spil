import type { Metadata } from "next";
import { OG_BASE } from "@/config/site";
import { IntlTextPage } from "@/intl/Chrome";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Goodtalk has no accounts, no ads and no tracking cookies. What you save stays on your device. Here is exactly what we count and why.",
  alternates: { canonical: "/privacy/" },
  openGraph: { ...OG_BASE, url: "/privacy/" },
};

export default function Privacy() {
  return (
    <IntlTextPage title="Privacy" lead="Short version: no account, no ads, no tracking cookies, and what you save stays on your device.">
      <h2>What stays on your device</h2>
      <p>Favorites, progress and your own questions are stored in your browser&rsquo;s local storage. They never leave your device, and you can delete them by clearing your browser data.</p>
      <h2>What we count</h2>
      <p>
        We use Plausible, a privacy-friendly analytics tool hosted in the EU, to count page views and a few anonymous events such as
        &ldquo;a game was started&rdquo;. It sets no cookies and stores no personal data or IP addresses.
      </p>
      <h2>Who is responsible</h2>
      <p>Mahope, Denmark. Questions about privacy: mads@mahoje.dk.</p>
    </IntlTextPage>
  );
}
