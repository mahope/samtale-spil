import type { IntlGame } from "@/intl/games";

/** The games on a /games/ page, with how to play; the app shows them too */
export function IntlGameList({ game }: { game: IntlGame }) {
  return (
    <div className="mt-4 space-y-6">
      {game.lege.map((leg) => (
        <section key={leg.navn} className="rounded-2xl bg-flade p-5 ring-1 ring-streg">
          <h3 className="text-xl font-bold">{leg.navn}</h3>
          <p className="mt-1 text-sm text-blaek-2">
            {/^\d+(-\d+)?$/.test(leg.antal) ? `${leg.antal} players` : leg.antal}, {leg.tid}, {leg.alder}
          </p>
          <ol className="mt-3 list-decimal space-y-1 pl-6">
            {leg.saadan.map((step) => <li key={step}>{step}</li>)}
          </ol>
          {leg.variant && <p className="mt-3 text-[0.95rem]"><strong>Tip:</strong> {leg.variant}</p>}
        </section>
      ))}
    </div>
  );
}
