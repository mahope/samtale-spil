import { DeckTile } from "@/components/deck/DeckParts";
import { AgeGate } from "@/voksen/AgeGate";
import { voksenDecks } from "@/voksen/decks";

export default function VoksenHome() {
  return (
    <AgeGate>
      <main id="main-content" data-route="forside" className="mx-auto max-w-4xl px-4 pb-16 pt-10 sm:px-6">
        <h1 className="text-4xl font-extrabold tracking-[-0.025em] sm:text-5xl" style={{ fontStretch: "88%" }}>
          Snakkespil 18+
        </h1>
        <p className="mt-3 max-w-xl text-lg text-blaek-2">
          Kort til jer to: frække spørgsmål, nærhed og udfordringer. Vælg en bunke, og skiftes til at trække.
        </p>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
          {voksenDecks.map((d) => (
            <DeckTile key={d.id} categoryId={d.id} name={d.name} description={d.description} count={d.questions.length} href={`/spil/${d.id}/`} />
          ))}
        </div>
        <p className="mt-10 text-sm text-blaek-2">Snakkespil 18+ er et samtalespil til par. Det er ikke terapi. Alt, du gemmer, bliver på telefonen.</p>
      </main>
    </AgeGate>
  );
}
