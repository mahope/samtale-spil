import { DeckBox } from "@/components/deck/DeckParts";

export interface ShelfDeck {
  id: string;
  name: string;
  count: number;
  href: string;
  familievenlig?: boolean;
}

/** The decks as shelves of card boxes that scroll sideways, one shelf per audience (each app's first tab) */
export function AppShelves({ shelves }: { shelves: { id: string; title: string; decks: ShelfDeck[] }[] }) {
  return (
    <div className="space-y-6">
      {shelves.map((g) => (
        <section key={g.id} aria-labelledby={`gruppe-${g.id}`} data-bunkegruppe>
          <h2 id={`gruppe-${g.id}`} className="px-4 text-xl font-bold tracking-[-0.015em] android:text-lg android:font-semibold">
            {g.title}
          </h2>
          <div className="app-shelf mt-2.5 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 pb-1 pt-0.5">
            {g.decks.map((d) => (
              <DeckBox key={d.id} categoryId={d.id} name={d.name} count={d.count} href={d.href} familievenlig={d.familievenlig} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
