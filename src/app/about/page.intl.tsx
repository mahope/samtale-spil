import type { Metadata } from "next";
import { OG_BASE } from "@/config/site";
import { IntlTextPage } from "@/intl/Chrome";
import { intlDecks, INTL_CARD_COUNT } from "@/intl/data";

export const metadata: Metadata = {
  title: "About Goodtalk",
  description: "Goodtalk is a free conversation card game for couples, families and friends, made in Denmark. No account, no ads, no tracking cookies.",
  alternates: { canonical: "/about/" },
  openGraph: { ...OG_BASE, url: "/about/" },
};

export default function About() {
  return (
    <IntlTextPage title="About Goodtalk">
      <p>
        The idea comes from the box of conversation cards many people keep in a drawer: questions that get people to share things they
        would not otherwise say. Goodtalk does the same on your phone, for free.
      </p>
      <p>
        There are {INTL_CARD_COUNT.toLocaleString("en-US")} questions in {intlDecks.length} decks. Every question is marked light, medium
        or deep, so you choose how far in you want to go.
      </p>
      <h2>Who makes it</h2>
      <p>
        Goodtalk is made by Mads Holst Jensen, who runs the small web studio <a href="https://mahoje.dk">Mahope</a> in Denmark. It started
        in Danish as <a href="https://snakkespil.dk" hrefLang="da">Snakkespil</a>.
      </p>
      <h2>No account, no ads</h2>
      <p>Favorites and progress are saved in your own browser. We count visits without cookies, and we never sell or share data.</p>
    </IntlTextPage>
  );
}
