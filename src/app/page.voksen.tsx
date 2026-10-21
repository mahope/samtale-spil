import { AppScreen } from "@/components/app/AppScreen";
import { AppRow, AppSection } from "@/components/app/AppList";
import { DeckBack } from "@/components/deck/DeckParts";
import { ui } from "@/locale/ui";
import { voksenDecks } from "@/voksen/decks";

/** The Bunker tab: the 18+ app's decks */
export default function BunkerTab() {
  return (
    <AppScreen title="Bunker" route="forside">
      <p className="px-4 pb-2 pt-1 text-blaek-2">Kort til jer to: frække spørgsmål, nærhed og udfordringer. Vælg en bunke, og skiftes til at trække.</p>
      <AppSection>
        {voksenDecks.map((d) => (
          <AppRow
            key={d.id}
            href={`/spil/${d.id}/`}
            label={<span className="font-semibold">{d.name}</span>}
            detail={d.description}
            value={<span className="tabular-nums">{ui.deck.cards(d.questions.length)}</span>}
            media={<DeckBack categoryId={d.id} className="h-[52px] w-[38px] rounded-md ring-1 ring-black/10" />}
          />
        ))}
      </AppSection>
    </AppScreen>
  );
}
