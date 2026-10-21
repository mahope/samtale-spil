import { AppScreen } from "@/components/app/AppScreen";
import { AppRow, AppSection } from "@/components/app/AppList";
import { AppShelves } from "@/components/app/AppShelves";
import { DeckBack } from "@/components/deck/DeckParts";
import { intlDeckById, intlDecks, intlGroups } from "@/intl/data";
import { PickForUs } from "@/intl/app/PickForUs";
import { ui } from "@/locale/ui";

const partner = intlDeckById.get("kend-din-partner")!;

const modes = [
  { href: "/play/guess/", deck: partner.id, title: "Guess the answer", text: "One answers in secret, the next one guesses. With points, if you like." },
  { href: "/play/year-in-review/", deck: "aaret", title: "Year in review", text: "Four rounds: look back, guess, look ahead and guess again." },
  { href: "/games/", deck: "venner", title: "Party games", text: "Games that get the table going, each with a small deck of cards." },
];

/** The Play tab: every deck on shelves by audience, and the other ways to play */
export default function PlayTab() {
  return (
    <AppScreen title="Play" route="forside">
      <PickForUs slugs={intlDecks.map((d) => d.slug)} />
      <div className="mt-6">
        <AppShelves
          shelves={intlGroups().map((g) => ({
            id: g.id,
            title: ui.groups[g.id],
            decks: g.decks.map((d) => ({ id: d.id, name: d.name, count: d.questions.length, href: `/play/${d.slug}/` })),
          }))}
        />
      </div>
      <div className="mt-4">
        <AppSection title="Other ways to play">
          {modes.map((m) => (
            <AppRow
              key={m.href}
              href={m.href}
              label={<span className="font-semibold">{m.title}</span>}
              detail={m.text}
              media={<DeckBack categoryId={m.deck} className="h-[52px] w-[38px] rounded-md ring-1 ring-black/10" />}
            />
          ))}
        </AppSection>
      </div>
    </AppScreen>
  );
}
