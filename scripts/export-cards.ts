// Writes worker/src/cards.json: every card id with its text and deck, so the
// worker only accepts reports for cards that exist. Run: npx tsx scripts/export-cards.ts
import { writeFileSync } from "node:fs";
import { categories } from "../src/data/categories";
import { adultQuestions } from "../src/data/questions/voksne";
import { udfordringer } from "../src/data/questions/udfordringer";
import { legeSider } from "../src/data/lege";
import { AAR_KORT } from "../src/data/aaretDerGik";
import { localeDecks } from "../src/locales/en/decks";
import { localeGames } from "../src/locales/en/games";
import { APP_LOCALES } from "../src/locales/appLocales";
import { localeDecks as svDecks } from "../src/locales/sv/decks";
import { localeGames as svGames } from "../src/locales/sv/games";
import { localeDecks as esDecks } from "../src/locales/es/decks";
import { localeGames as esGames } from "../src/locales/es/games";

/**
 * App-only languages (web: false in src/locales/appLocales.ts): their reports reach the worker on
 * goodtalkcards.com with `sprog`, and the mail shows the text the player actually saw (l.<code>).
 */
const APP_ONLY: Record<string, { decks: Record<string, { name: string; cards: Record<string, string> }>; games: Record<string, { h1: string; kort: Record<string, string> }> }> = {
  sv: { decks: svDecks, games: svGames },
  es: { decks: esDecks, games: esGames },
};
for (const l of APP_LOCALES) if (!l.web && !APP_ONLY[l.code]) throw new Error(`export-cards: add ${l.code} to APP_ONLY`);

type Text = { t: string; c: string };

const cards: Record<string, { t: string; c: string; d: string; a?: 1; e?: string; ce?: string; l?: Record<string, Text> }> = {};
for (const c of categories) for (const q of c.questions) cards[q.id] = { t: q.text, c: c.name, d: c.id };
for (const q of adultQuestions) cards[q.id] = { t: q.text, c: "Kun for voksne", d: "voksne", a: 1 };
for (const q of udfordringer) cards[q.id] = { t: q.text, c: "Udfordringer (18+-appen)", d: "udfordringer", a: 1 };
for (const q of AAR_KORT) cards[q.id] = { t: q.text, c: "Året der gik", d: "aaret" };
for (const s of legeSider) for (const k of s.kort) cards[k.id] = { t: k.text, c: s.h1.split(":")[0], d: `lege-${s.slug}` };
// Goodtalk (goodtalkcards.com) shows the same ids with English words
for (const [deckId, deck] of Object.entries(localeDecks))
  for (const [id, text] of Object.entries(deck.cards)) if (cards[id]) Object.assign(cards[id], { e: text, ce: deck.name, d: deckId });
for (const [slug, page] of Object.entries(localeGames))
  for (const [id, text] of Object.entries(page.kort)) if (cards[id]) Object.assign(cards[id], { e: text, ce: page.h1.split(":")[0], d: `lege-${slug}` });
for (const [code, { decks, games }] of Object.entries(APP_ONLY)) {
  const add = (id: string, text: Text) => {
    if (cards[id]) cards[id].l = { ...cards[id].l, [code]: text };
  };
  for (const deck of Object.values(decks)) for (const [id, t] of Object.entries(deck.cards)) add(id, { t, c: deck.name });
  for (const page of Object.values(games)) for (const [id, t] of Object.entries(page.kort)) add(id, { t, c: page.h1.split(":")[0] });
}
writeFileSync(new URL("../worker/src/cards.json", import.meta.url), JSON.stringify(cards));
console.log(`cards: ${Object.keys(cards).length}`);
