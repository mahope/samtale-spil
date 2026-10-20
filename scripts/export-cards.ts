// Writes worker/src/cards.json: every card id with its text and deck, so the
// worker only accepts reports for cards that exist. Run: npx tsx scripts/export-cards.ts
import { writeFileSync } from "node:fs";
import { categories } from "../src/data/categories";
import { adultQuestions } from "../src/data/questions/voksne";
import { legeSider } from "../src/data/lege";

const cards: Record<string, { t: string; c: string; d: string; a?: 1 }> = {};
for (const c of categories) for (const q of c.questions) cards[q.id] = { t: q.text, c: c.name, d: c.id };
for (const q of adultQuestions) cards[q.id] = { t: q.text, c: "Kun for voksne", d: "voksne", a: 1 };
for (const s of legeSider) for (const k of s.kort) cards[k.id] = { t: k.text, c: s.h1.split(":")[0], d: `lege-${s.slug}` };
writeFileSync(new URL("../worker/src/cards.json", import.meta.url), JSON.stringify(cards));
console.log(`cards: ${Object.keys(cards).length}`);
