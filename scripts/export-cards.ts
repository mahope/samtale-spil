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

const cards: Record<string, { t: string; c: string; d: string; a?: 1; e?: string; ce?: string }> = {};
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
writeFileSync(new URL("../worker/src/cards.json", import.meta.url), JSON.stringify(cards));
console.log(`cards: ${Object.keys(cards).length}`);
