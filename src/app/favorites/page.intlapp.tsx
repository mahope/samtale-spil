import { AppScreen } from "@/components/app/AppScreen";
import { Favorites } from "@/intl/app/Favorites";
import { intlDecks } from "@/intl/data";
import { intlGames } from "@/intl/games";
import { screens } from "@/locale/screens";

export const metadata = { title: screens.favorites.title };

const deckNames = Object.fromEntries([
  ...intlGames.map((g) => [g.deckId, g.h1.split(":")[0]]),
  ...intlDecks.map((d) => [d.id, d.name]),
  ["aaret", screens.year.title],
]);

export default function FavoritesTab() {
  return (
    <AppScreen title={screens.favorites.title}>
      <div className="px-4">
        <Favorites deckNames={deckNames} />
      </div>
    </AppScreen>
  );
}
