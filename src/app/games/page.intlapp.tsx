import { AppScreen } from "@/components/app/AppScreen";
import { AppRow, AppSection } from "@/components/app/AppList";
import { DeckBack } from "@/components/deck/DeckParts";
import { intlGames } from "@/intl/games";
import { screens } from "@/locale/screens";

const t = screens.games;

export const metadata = { title: t.title };

export default function PartyGamesScreen() {
  return (
    <AppScreen title={t.title} back={{ href: "/more/", label: screens.more.title }}>
      <p className="px-4 pb-2 pt-1 text-blaek-2">{t.lead}</p>
      <AppSection>
        {intlGames.map((g) => (
          <AppRow
            key={g.slug}
            href={`/games/${g.slug}/`}
            label={<span className="font-semibold">{g.h1.split(":")[0]}</span>}
            detail={t.count(g.lege.length, g.cards.length)}
            media={<DeckBack categoryId={g.deckId} className="h-[52px] w-[38px] rounded-md ring-1 ring-black/10" />}
          />
        ))}
      </AppSection>
    </AppScreen>
  );
}
