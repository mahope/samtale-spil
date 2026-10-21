/**
 * Date and hashing helpers for "Dagens spørgsmål" / "Question of the day" (issue #46, #73).
 * No card data here, so both sites can use it in the browser.
 */
const fmt = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Copenhagen", year: "numeric", month: "2-digit", day: "2-digit" });

/** The date in Denmark as YYYY-MM-DD, whatever the device's time zone (both sites share the card of the day) */
export function danishDateKey(date: Date): string {
  const part = (type: string) => fmt.formatToParts(date).find((p) => p.type === type)!.value;
  return `${part("year")}-${part("month")}-${part("day")}`;
}

/** FNV-1a, 32 bit */
function hash(text: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/**
 * Rendezvous hashing: the card with the highest hash of date + card id wins. A new card
 * only takes over the days it wins itself, so an app with slightly older data still
 * shows the same card as the website on almost every day.
 */
export function vaelgForDato<T extends { q: { id: string } }>(key: string, from: T[]): T {
  let best = from[0];
  let bestScore = -1;
  for (const p of from) {
    const score = hash(`${key}|${p.q.id}`);
    if (score > bestScore) {
      best = p;
      bestScore = score;
    }
  }
  return best;
}

/** The n dates before a date key (YYYY-MM-DD), newest first; whole calendar days, so DST cannot skip or repeat one */
export function tidligereDatoer(key: string, n: number): string[] {
  const noon = Date.parse(`${key}T12:00:00Z`);
  return Array.from({ length: n }, (_, i) => new Date(noon - (i + 1) * 86_400_000).toISOString().slice(0, 10));
}
