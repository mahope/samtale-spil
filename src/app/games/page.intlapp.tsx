import { AppScreen } from "@/components/app/AppScreen";
import { AppRow, AppSection } from "@/components/app/AppList";
import { DeckBack } from "@/components/deck/DeckParts";
import { intlGames } from "@/intl/games";

export const metadata = { title: "Party games" };

export default function PartyGamesScreen() {
  return (
    <AppScreen title="Party games" back={{ href: "/more/", label: "More" }}>
      <p className="px-4 pb-2 pt-1 text-blaek-2">Games that get the table going, with nobody having to drink or be put on the spot. Each has a small deck of cards.</p>
      <AppSection>
        {intlGames.map((g) => (
          <AppRow
            key={g.slug}
            href={`/games/${g.slug}/`}
            label={<span className="font-semibold">{g.h1.split(":")[0]}</span>}
            detail={`${g.lege.length} games and ${g.cards.length} cards`}
            media={<DeckBack categoryId={g.deckId} className="h-[52px] w-[38px] rounded-md ring-1 ring-black/10" />}
          />
        ))}
      </AppSection>
    </AppScreen>
  );
}
