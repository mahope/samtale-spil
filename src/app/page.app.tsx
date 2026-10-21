import { AppScreen } from "@/components/app/AppScreen";
import { AppRow, AppSection } from "@/components/app/AppList";
import { DeckBack } from "@/components/deck/DeckParts";
import { GroupedDecks } from "@/components/deck/GroupedDecks";
import { AppChooserTools } from "./spil/AppChooserTools";
import { modes } from "./spil/modes";

/** The Spil tab: every deck on shelves by audience, and the other ways to play. */
export default function SpilTab() {
  return (
    <AppScreen title="Spil" route="forside">
      <AppChooserTools />
      <div className="mt-6">
        <GroupedDecks variant="app" />
      </div>
      <div className="mt-4">
        <AppSection title="Andre måder at spille på">
          {modes.map((m) => (
            <AppRow
              key={m.href}
              href={m.href}
              label={<span className="font-semibold">{m.title}</span>}
              detail={m.text}
              media={<DeckBack categoryId={m.deck} className="h-[52px] w-[38px] rounded-md ring-1 ring-black/10" />}
            />
          ))}
        </AppSection>
      </div>
    </AppScreen>
  );
}
