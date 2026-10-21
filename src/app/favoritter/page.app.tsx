import { AppScreen } from "@/components/app/AppScreen";
import { FavoritterIndhold } from "./FavoritterIndhold";

export const metadata = { title: "Favoritter" };

export default function FavoritterTab() {
  return (
    <AppScreen title="Favoritter">
      <div className="px-4 [&>p:first-child]:mt-0">
        <FavoritterIndhold spilHref="/" />
      </div>
    </AppScreen>
  );
}
