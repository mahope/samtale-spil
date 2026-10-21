import type { Metadata } from "next";
import { OG_BASE } from "@/config/site";
import { IntlTextPage } from "@/intl/Chrome";
import { AboutText } from "@/intl/content";

export const metadata: Metadata = {
  title: "About Goodtalk",
  description: "Goodtalk is a free conversation card game for couples, families and friends, made in Denmark. No account, no ads, no tracking cookies.",
  alternates: { canonical: "/about/" },
  openGraph: { ...OG_BASE, url: "/about/" },
};

export default function About() {
  return (
    <IntlTextPage title="About Goodtalk">
      <AboutText />
    </IntlTextPage>
  );
}
