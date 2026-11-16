import { dailyPool } from "@/intl/daily";

// The cards the reminders can carry, as a static file in the app (/en/reminder-cards.json, /sv/...):
// the client cannot import @/intl/daily, which builds the decks from the Danish cards (src/intl/app/reminders.ts)
export const dynamic = "force-static";

export function GET() {
  return Response.json(dailyPool.map(({ q }) => ({ id: q.id, text: q.text })));
}
