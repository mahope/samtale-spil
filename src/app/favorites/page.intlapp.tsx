import { AppScreen } from "@/components/app/AppScreen";
import { FavoritesList } from "@/intl/app/FavoritesList";

export const metadata = { title: "Favorites" };

export default function FavoritesTab() {
  return (
    <AppScreen title="Favorites">
      <div className="px-4">
        <FavoritesList />
      </div>
    </AppScreen>
  );
}
