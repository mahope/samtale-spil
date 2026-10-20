"use client";

import Link from "next/link";
import { DeckBack } from "@/components/deck/DeckParts";

/**
 * The fixed frame shown before "Svære samtaler". Talking about problems without
 * a frame can turn into shared rumination (Rose 2002); soft start-up and
 * I-statements keep it safe. See docs/forskning.md 3.2, 3.3 and 3.9.
 */
export function HardTalkFrame({ onStart }: { onStart: () => void }) {
  return (
    <div className="filt min-h-dvh">
      <main id="main-content" className="mx-auto max-w-md px-5 pb-12 pt-safe">
        <Link href="/spil/" className="mt-4 inline-flex min-h-11 items-center font-semibold text-white/85 hover:text-white">
          Tilbage til spillene
        </Link>
        <DeckBack categoryId="svaere-samtaler" className="mt-4 h-20 w-14 rounded-lg ring-1 ring-white/20" />
        <h1 className="mt-5 text-4xl font-extrabold" style={{ fontStretch: "88%" }}>
          Før I begynder
        </h1>
        <p className="mt-3 text-lg text-white/85">Svære samtaler går bedst med en fast ramme. Aftal disse fire ting:</p>
        <ol className="mt-5 space-y-3 text-[1.0625rem]">
          {[
            "Vi taler om én ting ad gangen, og vi skal ikke løse alt i aften.",
            "Vi siger »jeg føler« og »jeg har brug for«, ikke »du gør altid«.",
            "Den, der lytter, siger med egne ord, hvad den hørte, før den svarer.",
            "Begge kan sige pause. Så stopper vi og tager et lettere kort eller fortsætter en anden dag.",
          ].map((rule, i) => (
            <li key={rule} className="flex gap-3">
              <span className="font-display flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-kridt font-extrabold text-kridt-blaek" aria-hidden="true">
                {i + 1}
              </span>
              <span className="pt-0.5">{rule}</span>
            </li>
          ))}
        </ol>
        <button
          type="button"
          onClick={onStart}
          className="mt-8 min-h-14 w-full rounded-full bg-kridt px-6 text-lg font-bold text-kridt-blaek shadow-[0_3px_0_rgb(0_0_0/0.3)]"
        >
          Vi er klar
        </button>
        <p className="mt-6 text-sm text-white/75">
          Spillet er ikke terapi. Er der vold, trusler eller kontrol i forholdet, så søg hjælp, fx hos Lev Uden Vold på 1888.{" "}
          <Link href="/saadan-spiller-i/" className="underline">Flere råd og hjælp</Link>
        </p>
      </main>
    </div>
  );
}
