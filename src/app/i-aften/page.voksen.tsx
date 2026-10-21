import { AppScreen } from "@/components/app/AppScreen";
import { IAftenLoader } from "@/voksen/IAftenLoader";
import { voksenDecks } from "@/voksen/decks";

export const metadata = { title: "I aften" };

/** The I aften tab: one card or dare at random, for when you don't want to pick a deck */
export default function IAftenTab() {
  return (
    <AppScreen title="I aften">
      <div className="px-4">
        <p className="text-blaek-2">Et tilfældigt kort fra alle bunkerne. Tag det, eller træk et andet.</p>
        <IAftenLoader decks={voksenDecks.map((d) => ({ id: d.id, name: d.name, questions: d.questions }))} />
      </div>
    </AppScreen>
  );
}
