"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { API_BASE } from "@/config/api";
import { DeckBack } from "@/components/deck/DeckParts";
import { ui } from "@/locale/ui";

interface Stats {
  periode: string;
  opdateret: string;
  besoegende: number;
  sidevisninger: number;
  spilStartet: number;
  kortVendt: number;
  bunker: { id: string; spil: number }[];
  kort: { id: string; tekst: string; bunke: string; vendt: number }[];
  perDag: { dato: string; spil: number }[];
}

const fmt = (n: number) => n.toLocaleString(ui.numberLocale);
const T = ui.stats;

/** Deck names and links come from the page (server data) so the client bundle stays small */
export function SamletStatistik({ deckNames, deckHref }: { deckNames: Record<string, string>; deckHref: Record<string, string> }) {
  const [stats, setStats] = useState<Stats | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE}/stats`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then(setStats)
      .catch(() => setFailed(true));
  }, []);

  if (failed) {
    return <p className="mt-8 text-blaek-2">{T.failed}</p>;
  }
  if (!stats) {
    return (
      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4" role="status" aria-label={T.loading}>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-24 animate-pulse rounded-2xl bg-flade-2" />
        ))}
      </div>
    );
  }

  const maxDeck = Math.max(1, ...stats.bunker.map((b) => b.spil));
  const maxDay = Math.max(1, ...stats.perDag.map((d) => d.spil));
  const tiles = [
    { label: T.tiles.spil, value: stats.spilStartet },
    { label: T.tiles.vendt, value: stats.kortVendt },
    { label: T.tiles.besoegende, value: stats.besoegende },
    { label: T.tiles.sidevisninger, value: stats.sidevisninger },
  ];

  return (
    <div className="mt-8 space-y-14">
      <section aria-labelledby="tal">
        <h2 id="tal" className="sr-only">{T.keyFigures}</h2>
        <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {tiles.map((t) => (
            <div key={t.label} className="rounded-2xl bg-flade p-4 ring-1 ring-streg">
              <dd className="font-display text-4xl font-extrabold tabular-nums">{fmt(t.value)}</dd>
              <dt className="mt-1 text-blaek-2">{t.label}</dt>
            </div>
          ))}
        </dl>
        <p className="mt-3 text-sm text-blaek-2">
          {T.period(stats.periode, new Date(stats.opdateret).toLocaleString(ui.numberLocale, { dateStyle: "long", timeStyle: "short" }))}
        </p>
      </section>

      <section aria-labelledby="bunker">
        <h2 id="bunker" className="text-2xl font-bold sm:text-3xl">{T.decks}</h2>
        {stats.bunker.length === 0 ? (
          <p className="mt-3 text-blaek-2">{T.decksEmpty}</p>
        ) : (
          <ol className="mt-5 space-y-2.5">
            {stats.bunker.slice(0, 12).map((b) => (
              <li key={b.id} className="grid grid-cols-[1.5rem_8.5rem_1fr_3rem] items-center gap-3 sm:grid-cols-[1.5rem_11rem_1fr_3.5rem]">
                <DeckBack categoryId={b.id} className="h-7 w-5 rounded-[4px]" />
                <Link href={deckHref[b.id] ?? "#"} className="truncate font-semibold hover:underline">
                  {deckNames[b.id] ?? b.id}
                </Link>
                <span className="h-3 rounded-r-[4px] bg-[var(--graf)]" style={{ width: `${(b.spil / maxDeck) * 100}%` }} title={`${deckNames[b.id] ?? b.id}: ${T.games(fmt(b.spil))}`} />
                <span className="text-right tabular-nums text-blaek-2">{fmt(b.spil)}</span>
              </li>
            ))}
          </ol>
        )}
      </section>

      <section aria-labelledby="dage">
        <h2 id="dage" className="text-2xl font-bold sm:text-3xl">{T.perDay}</h2>
        {stats.perDag.length === 0 ? (
          <p className="mt-3 text-blaek-2">{T.perDayEmpty}</p>
        ) : (
          <>
            <div className="mt-5 flex h-40 items-end gap-[2px]" role="img" aria-label={T.chartLabel}>
              {stats.perDag.map((d) => (
                <span
                  key={d.dato}
                  className="flex-1 rounded-t-[4px] bg-[var(--graf)] hover:opacity-80"
                  style={{ height: `${Math.max(2, (d.spil / maxDay) * 100)}%` }}
                  title={`${new Date(d.dato).toLocaleDateString(ui.numberLocale, { day: "numeric", month: "short" })}: ${T.games(fmt(d.spil))}`}
                />
              ))}
            </div>
            <details className="mt-3 text-[0.95rem]">
              <summary className="cursor-pointer text-blaek-2 underline">{T.asTable}</summary>
              <table className="mt-2 w-full max-w-sm text-left">
                <thead>
                  <tr className="border-b border-streg">
                    <th className="py-1 font-semibold">{T.date}</th>
                    <th className="py-1 text-right font-semibold">{T.gamesColumn}</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.perDag.map((d) => (
                    <tr key={d.dato} className="border-b border-streg">
                      <td className="py-1">{new Date(d.dato).toLocaleDateString(ui.numberLocale, { day: "numeric", month: "long" })}</td>
                      <td className="py-1 text-right tabular-nums">{fmt(d.spil)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </details>
          </>
        )}
      </section>

      <section aria-labelledby="kort">
        <h2 id="kort" className="text-2xl font-bold sm:text-3xl">{T.cards}</h2>
        {stats.kort.length === 0 ? (
          <p className="mt-3 text-blaek-2">{T.cardsEmpty}</p>
        ) : (
          <ol className="mt-5 divide-y divide-streg border-y border-streg">
            {stats.kort.map((k, i) => (
              <li key={k.id} className="flex gap-4 py-3.5">
                <span className="w-6 shrink-0 text-right font-semibold tabular-nums text-blaek-2">{i + 1}</span>
                <span className="flex-1">
                  {k.tekst}
                  <span className="mt-0.5 block text-sm text-blaek-2">
                    {T.flipped(k.bunke, fmt(k.vendt))}
                  </span>
                </span>
              </li>
            ))}
          </ol>
        )}
      </section>
    </div>
  );
}
