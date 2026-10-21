import { AppScreen } from "@/components/app/AppScreen";
import { IkkeTerapi } from "@/components/site/IkkeTerapi";

export const metadata = { title: "Når det bliver svært" };

/** The not-therapy note and the help lines */
export default function IkkeTerapiScreen() {
  return (
    <AppScreen title="Når det bliver svært" back={{ href: "/mere/", label: "Mere" }}>
      <div className="px-4 [&>aside]:mt-3">
        <IkkeTerapi saadanHref={null} />
      </div>
    </AppScreen>
  );
}
