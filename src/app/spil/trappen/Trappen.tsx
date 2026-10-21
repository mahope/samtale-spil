"use client";

import { useState } from "react";
import Link from "next/link";
import { ui } from "@/locale/ui";
import { SequenceGame, type SequenceStep } from "@/components/SequenceGame";
import { DeckBack } from "@/components/deck/DeckParts";

// Aron et al. (1997): closeness grows when both answer, and the questions get
// gradually more personal. See docs/forskning.md 2.1 and 3.1.
const STEPS: SequenceStep[] = [
  ...Array(4).fill({ depth: "let", label: "Trin 1 af 3: lette spørgsmål" }),
  ...Array(4).fill({ depth: "medium", label: "Trin 2 af 3: lidt mere personligt" }),
  ...Array(4).fill({ depth: "dyb", label: "Trin 3 af 3: dybe spørgsmål" }),
];

const GROUPS = [
  { id: "par", deck: "parforhold", title: "Til jer to", text: "Kort fra parforhold, drømme og fremtid.", decks: ["parforhold", "droemme", "fremtid", "fortid"] },
  { id: "nye", deck: "foerste-date", title: "Til nye bekendtskaber", text: "Til en første date eller en ny ven.", decks: ["foerste-date", "venner", "barndom", "fortid"] },
  { id: "alle", deck: "dybe", title: "Til alle", text: "Store og små spørgsmål om livet.", decks: ["dybe", "filosofiske", "selvindsigt", "droemme"] },
];

export function Trappen() {
  const [group, setGroup] = useState<(typeof GROUPS)[number] | null>(null);

  if (group) {
    return (
      <SequenceGame
        mode="trappen"
        title="Trappen"
        deckId={group.deck}
        decks={group.decks}
        steps={STEPS}
        doneTitle="Hele vejen op"
        doneText="Tolv kort, fra de lette til de dybe. Slut gerne af med at sige, hvad du satte mest pris på i snakken."
      />
    );
  }

  return (
    <div className="min-h-dvh bg-papir">
      <main id="main-content" className="mx-auto max-w-xl px-4 pb-16 pt-safe sm:px-6">
        <Link href={ui.play.backHref} className="mt-4 inline-flex min-h-11 items-center font-semibold text-blaek-2 hover:text-blaek">
          Tilbage til spillene
        </Link>
        <h1 className="mt-4 text-4xl font-extrabold tracking-[-0.025em]" style={{ fontStretch: "88%" }}>
          Trappen
        </h1>
        <p className="mt-3 text-lg text-blaek-2">
          Tolv kort i rækkefølge: fire lette, fire personlige og fire dybe. Svar begge to på hvert kort, og tag jer god tid
          på de sidste. Idéen kommer fra Arthur Arons forskning i, hvordan to mennesker kommer tættere på hinanden.
        </p>
        <h2 className="mt-8 text-xl font-bold">Hvem spiller I med?</h2>
        <ul className="mt-3 space-y-2">
          {GROUPS.map((g) => (
            <li key={g.id}>
              <button
                type="button"
                onClick={() => setGroup(g)}
                className="flex min-h-16 w-full items-center gap-4 rounded-2xl bg-flade p-4 text-left ring-1 ring-streg hover:bg-flade-2"
              >
                <DeckBack categoryId={g.deck} className="h-14 w-10 shrink-0 rounded-lg" />
                <span>
                  <span className="block text-lg font-bold">{g.title}</span>
                  <span className="block text-blaek-2">{g.text}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
