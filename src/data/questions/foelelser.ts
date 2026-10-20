import { Category } from "@/types";
import type { CategoryText } from "@/data/categoryTexts";

/**
 * Følelseskort (issue #45, page #15 in docs/butik-og-seo.md): one feeling per card and two
 * child-friendly questions about it. For children from about 5 years, at home or in class.
 */
const FEELINGS: [string, string, "let" | "medium"][] = [
  ["Glad", "Hvornår blev du sidst rigtig glad? Hvordan kan man se det på dig?", "let"],
  ["Ked af det", "Hvad gør dig ked af det? Hvad hjælper, når du er ked af det?", "medium"],
  ["Vred", "Hvad kan gøre dig vred? Hvad gør du, når vreden skal ud?", "medium"],
  ["Bange", "Hvad var du bange for, da du var mindre? Hvem hjælper dig, når du er bange?", "medium"],
  ["Stolt", "Hvornår har du været stolt af dig selv? Hvem fortalte du det til?", "let"],
  ["Nervøs", "Hvornår har du haft sommerfugle i maven? Hvad gjorde du for at blive rolig?", "medium"],
  ["Overrasket", "Hvad er det bedste, der har overrasket dig? Hvordan ser dit ansigt ud, når du er overrasket?", "let"],
  ["Jaloux", "Hvornår har du ønsket dig noget, en anden havde? Hvad gjorde du med den følelse?", "medium"],
  ["Flov", "Hvad kan gøre en person flov? Hvad kan man sige til en, der er flov?", "medium"],
  ["Træt", "Hvordan mærker du, at du er træt? Hvad er det bedste at lave, når man er træt?", "let"],
  ["Keder sig", "Hvornår keder du dig mest? Hvad kan man finde på, når man keder sig?", "let"],
  ["Modig", "Hvornår har du været modig? Hvad hjalp dig med at turde?", "let"],
  ["Ensom", "Hvordan kan man se, at nogen føler sig alene? Hvad kan man gøre for en, der er ensom?", "medium"],
  ["Tryg", "Hvor føler du dig allermest tryg? Hvem gør dig tryg?", "let"],
  ["Skuffet", "Hvornår er du blevet skuffet over noget? Hvad hjalp dig bagefter?", "medium"],
  ["Forvirret", "Hvornår har du været forvirret over noget? Hvem kan du spørge, når du ikke forstår?", "let"],
  ["Taknemmelig", "Hvad er du glad for at have? Hvem vil du gerne sige tak til?", "let"],
  ["Spændt", "Hvad glæder du dig til lige nu? Hvordan føles det i kroppen at være spændt?", "let"],
  ["Irriteret", "Hvad kan irritere dig? Hvordan kan man sige det pænt, når noget irriterer?", "medium"],
  ["Rolig", "Hvor er du helt rolig? Hvad gør du for at falde til ro?", "let"],
  ["Savn", "Hvem eller hvad savner du? Hvad gør du, når du savner nogen?", "medium"],
  ["Lettet", "Hvornår har du været lettet over, at noget gik godt? Hvad var du bekymret for før?", "let"],
  ["Frustreret", "Hvad er svært for dig at lære? Hvad gør du, når noget ikke lykkes i første forsøg?", "medium"],
  ["Håb", "Hvad håber du på? Hvad kan du selv gøre for, at det sker?", "let"],
];

export const foelelserCategory: Category = {
  id: "foelelseskort",
  name: "Følelseskort",
  description: "En følelse og to spørgsmål på hvert kort, til børn derhjemme og i klassen",
  emoji: "🙂",
  color: "from-sky-300 to-indigo-400",
  questions: FEELINGS.map(([feeling, text, depth], i) => ({
    id: `foel-${i + 1}`,
    categoryId: "foelelseskort",
    text: `${feeling}: ${text}`,
    depth,
  })),
};

export const foelelserTexts: Record<string, CategoryText> = {
  foelelseskort: {
    seoTitle: "Følelseskort til børn: 24 gratis kort om følelser",
    metaDescription:
      "24 gratis følelseskort til børn med en følelse og to spørgsmål på hvert kort. Spil dem på telefonen, eller print dem til hjemmet og klassen.",
    intro:
      "Det er lettere at tale om følelser, når de har et navn. Hvert kort har en følelse og to spørgsmål, som børn kan svare på med en lille historie. Kortene kan spilles på telefonen eller printes som PDF.",
    passerTil: "Børn fra cirka 5 år sammen med en voksen, derhjemme, i indskolingen og i SFO'en.",
    tips: [
      "Lad barnet vælge kortet, og svar gerne selv først, så barnet hører, at voksne også har følelser.",
      "Det er fint kun at svare på det ene spørgsmål, eller at sige pas.",
      "Brug kortene på et roligt tidspunkt, ikke midt i en konflikt.",
    ],
  },
};
