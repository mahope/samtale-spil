import type { Metadata } from "next";
import { OG_BASE } from "@/config/site";
import { IntlTextPage } from "@/intl/Chrome";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Goodtalk has no accounts, no ads and no tracking cookies. What you save stays on your device. Here is exactly what we store and why.",
  alternates: { canonical: "/privacy/" },
  openGraph: { ...OG_BASE, url: "/privacy/" },
};

export default function Privacy() {
  return (
    <IntlTextPage title="Privacy" lead="Short version: no account, no ads, no tracking cookies, and what you save stays on your device.">
      <h2>What stays on your device</h2>
      <p>Your settings are stored in your browser&rsquo;s local storage. They never leave your device, and you can delete them by clearing your browser data.</p>
      <h2>What we count</h2>
      <p>Nothing at the moment. If we add visitor statistics later, it will be a cookieless tool that stores no personal data, and this page will say so.</p>
      <h2>Who is responsible</h2>
      <p>Mahope, Denmark. Questions about privacy: mads@mahoje.dk.</p>
    </IntlTextPage>
  );
}
