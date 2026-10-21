import { AppScreen } from "@/components/app/AppScreen";
import { Favoritter } from "@/voksen/Favoritter";
import { voksenDecks } from "@/voksen/decks";

export const metadata = { title: "Favoritter" };

const deckNames = Object.fromEntries(voksenDecks.map((d) => [d.id, d.name]));

export default function FavoritterTab() {
  return (
    <AppScreen title="Favoritter">
      <div className="px-4">
        <Favoritter deckNames={deckNames} />
      </div>
    </AppScreen>
  );
}
