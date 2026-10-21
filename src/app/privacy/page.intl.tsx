import type { Metadata } from "next";
import { OG_BASE } from "@/config/site";
import { IntlTextPage } from "@/intl/Chrome";
import { PRIVACY_LEAD, PrivacyText } from "@/intl/content";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Goodtalk has no accounts, no ads and no tracking cookies. What you save stays on your device. Here's exactly what we store and why.",
  alternates: { canonical: "/privacy/" },
  openGraph: { ...OG_BASE, url: "/privacy/" },
};

export default function Privacy() {
  return (
    <IntlTextPage title="Privacy" lead={PRIVACY_LEAD}>
      <PrivacyText />
    </IntlTextPage>
  );
}
