import { AppScreen } from "@/components/app/AppScreen";
import { Favorites } from "@/intl/app/Favorites";
import { intlDecks } from "@/intl/data";
import { intlGames } from "@/intl/games";

export const metadata = { title: "Favorites" };

const deckNames = Object.fromEntries([...intlGames.map((g) => [g.deckId, g.h1.split(":")[0]]), ...intlDecks.map((d) => [d.id, d.name])]);

export default function FavoritesTab() {
  return (
    <AppScreen title="Favorites">
      <div className="px-4">
        <Favorites deckNames={deckNames} />
      </div>
    </AppScreen>
  );
}
