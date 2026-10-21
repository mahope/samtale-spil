import type { LegeSide } from "@/data/lege";

/** The games on a /lege/ page, numbered, with how to play; the app shows them too */
export function LegeListe({ side }: { side: LegeSide }) {
  return (
    <div className="mt-6 space-y-8">
      {side.lege.map((leg, i) => (
        <div key={leg.navn} className="rounded-2xl bg-flade p-5 ring-1 ring-streg">
          <h3 className="text-xl font-bold">
            {i + 1}. {leg.navn}
          </h3>
          <p className="mt-1 text-[0.95rem] text-blaek-2">
            {leg.antal} spillere, {leg.tid}, {leg.alder.charAt(0).toLowerCase() + leg.alder.slice(1)}
          </p>
          <ol className="mt-3 list-decimal space-y-1.5 pl-5">
            {leg.saadan.map((trin) => (
              <li key={trin}>{trin}</li>
            ))}
          </ol>
          {leg.variant && (
            <p className="mt-3 text-blaek-2">
              <strong className="font-semibold text-blaek">Variant:</strong> {leg.variant}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
