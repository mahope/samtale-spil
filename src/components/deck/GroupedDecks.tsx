import { DeckTile } from "@/components/deck/DeckParts";
import { groupedCategories } from "@/data/deckGroups";
import { adultQuestions } from "@/data/questions/voksne";
import { FAMILY_FRIENDLY_DECKS } from "@/data/cardTypes";

/** All decks as tiles, one section per audience. Server component. */
export function GroupedDecks({ headingLevel = "h2" }: { headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <div className="mt-8 space-y-10">
      {groupedCategories().map((g) => (
        <section key={g.id} aria-labelledby={`gruppe-${g.id}`} data-bunkegruppe>
          <Heading id={`gruppe-${g.id}`} className="text-xl font-bold sm:text-2xl">
            {g.title}
          </Heading>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
            {g.categories.map((c) => (
              <DeckTile
                key={c.id}
                categoryId={c.id}
                name={c.name}
                description={c.description}
                count={c.questions.length}
                href={`/spil/${c.id}/`}
                familievenlig={FAMILY_FRIENDLY_DECKS.has(c.id)}
              />
            ))}
            {g.withAdult && adultQuestions.length > 0 && (
              <DeckTile
                categoryId="voksne"
                name="Kun for voksne"
                description="Intime spørgsmål til par. Kræver at du er fyldt 18."
                count={adultQuestions.length}
                href="/spil/voksne/"
                familievenlig={false}
              />
            )}
          </div>
        </section>
      ))}
    </div>
  );
}
