import { AppScreen } from "@/components/app/AppScreen";
import { AppRow, AppSection } from "@/components/app/AppList";
import { DeckBack } from "@/components/deck/DeckParts";
import { legeSider, legeDeck } from "@/data/lege";

export const metadata = { title: "Lege til festen" };

export default function LegeScreen() {
  return (
    <AppScreen title="Lege til festen" back={{ href: "/mere/", label: "Mere" }}>
      <p className="px-4 pb-2 pt-1 text-blaek-2 android:px-4">
        Lege, der får gang i bordet, uden at nogen skal drikke eller udstilles. Hver har en lille bunke kort.
      </p>
      <AppSection>
        {legeSider.map((s) => (
          <AppRow
            key={s.slug}
            href={`/lege/${s.slug}/`}
            label={<span className="font-semibold">{s.h1.split(":")[0]}</span>}
            detail={`${s.lege.length} lege og ${s.kort.length} kort`}
            media={<DeckBack categoryId={legeDeck(s.slug)} className="h-[52px] w-[38px] rounded-md ring-1 ring-black/10" />}
          />
        ))}
      </AppSection>
    </AppScreen>
  );
}
