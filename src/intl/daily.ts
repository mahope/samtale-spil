import { intlDeckById } from "@/intl/data";
import { DAILY_DECKS } from "@/lib/dagensKort";
import type { DailyPick } from "@/app/daily-question/DailyCard";

// The same decks and card ids as Snakkespil's "Dagens spørgsmål", so both sites share the card of the day
export const dailyPool: DailyPick[] = DAILY_DECKS.flatMap((id) => {
  const deck = intlDeckById.get(id);
  return deck ? deck.questions.filter((q) => q.depth !== "dyb").map((q) => ({ q, deck: { name: deck.name, slug: deck.slug } })) : [];
});
