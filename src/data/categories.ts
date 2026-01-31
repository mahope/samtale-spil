import { Category } from "@/types";

export const categories: Category[] = [
  {
    id: "parforhold",
    name: "Parforhold",
    description: "Spørgsmål der styrker jeres forbindelse",
    emoji: "💑",
    color: "from-rose-400 to-pink-500",
    questions: [
      { id: "par-1", categoryId: "parforhold", text: "Hvad er det første du lagde mærke til ved mig?", depth: "let" },
      { id: "par-2", categoryId: "parforhold", text: "Hvornår følte du dig sidst virkelig elsket af mig?", depth: "medium" },
      { id: "par-3", categoryId: "parforhold", text: "Hvad er din yndlingsting ved vores forhold?", depth: "let" },
      { id: "par-4", categoryId: "parforhold", text: "Er der noget du ønsker vi gjorde mere sammen?", depth: "medium" },
      { id: "par-5", categoryId: "parforhold", text: "Hvad er den sværeste udfordring vi har overvundet sammen?", depth: "dyb" },
      { id: "par-6", categoryId: "parforhold", text: "Hvordan kan jeg bedre vise dig at jeg elsker dig?", depth: "dyb" },
      { id: "par-7", categoryId: "parforhold", text: "Hvad er dit yndlingsminde fra vores tid sammen?", depth: "let" },
      { id: "par-8", categoryId: "parforhold", text: "Hvad drømmer du om at vi skal opleve sammen?", depth: "medium" },
      { id: "par-9", categoryId: "parforhold", text: "Hvornår føler du dig mest forbundet med mig?", depth: "dyb" },
      { id: "par-10", categoryId: "parforhold", text: "Hvad ville du ønske jeg vidste om dig?", depth: "dyb" },
    ],
  },
  {
    id: "familie",
    name: "Familie",
    description: "Lær hinanden bedre at kende på tværs af generationer",
    emoji: "👨‍👩‍👧‍👦",
    color: "from-amber-400 to-orange-500",
    questions: [
      { id: "fam-1", categoryId: "familie", text: "Hvad er din yndlingstradition i vores familie?", depth: "let" },
      { id: "fam-2", categoryId: "familie", text: "Hvilket familiemedlem ligner du mest?", depth: "let" },
      { id: "fam-3", categoryId: "familie", text: "Hvad er det bedste råd du nogensinde har fået fra familien?", depth: "medium" },
      { id: "fam-4", categoryId: "familie", text: "Hvad ville du gerne videregive til næste generation?", depth: "dyb" },
      { id: "fam-5", categoryId: "familie", text: "Hvad er dit yndlingsminde fra din barndom?", depth: "let" },
      { id: "fam-6", categoryId: "familie", text: "Hvilken familiehistorie fortæller du oftest?", depth: "medium" },
      { id: "fam-7", categoryId: "familie", text: "Hvad beundrer du mest ved dine forældre/bedsteforældre?", depth: "medium" },
      { id: "fam-8", categoryId: "familie", text: "Hvordan har din familie formet den person du er i dag?", depth: "dyb" },
      { id: "fam-9", categoryId: "familie", text: "Hvad er den vigtigste værdi i vores familie?", depth: "dyb" },
      { id: "fam-10", categoryId: "familie", text: "Hvis du kunne planlægge den perfekte familiedag, hvordan ville den se ud?", depth: "let" },
    ],
  },
  {
    id: "intimitet",
    name: "Intimitet",
    description: "Dybe og personlige spørgsmål for par",
    emoji: "🔥",
    color: "from-red-400 to-rose-600",
    questions: [
      { id: "int-1", categoryId: "intimitet", text: "Hvad får dig til at føle dig mest attraktiv?", depth: "let" },
      { id: "int-2", categoryId: "intimitet", text: "Hvornår føler du dig mest tæt på mig?", depth: "medium" },
      { id: "int-3", categoryId: "intimitet", text: "Er der en fantasi du gerne ville dele med mig?", depth: "dyb" },
      { id: "int-4", categoryId: "intimitet", text: "Hvad betyder fysisk nærhed for dig?", depth: "medium" },
      { id: "int-5", categoryId: "intimitet", text: "Hvad er det mest romantiske jeg nogensinde har gjort?", depth: "let" },
      { id: "int-6", categoryId: "intimitet", text: "Hvordan kan vi holde gnisten i live?", depth: "dyb" },
      { id: "int-7", categoryId: "intimitet", text: "Hvad får dig til at føle dig tryg i vores forhold?", depth: "medium" },
      { id: "int-8", categoryId: "intimitet", text: "Hvad ønsker du at vi eksperimenterede mere med?", depth: "dyb" },
      { id: "int-9", categoryId: "intimitet", text: "Hvilken berøring betyder mest for dig?", depth: "medium" },
      { id: "int-10", categoryId: "intimitet", text: "Hvad er din definition af intimitet?", depth: "dyb" },
    ],
  },
  {
    id: "fremtid",
    name: "Fremtid",
    description: "Drømme, mål og hvad der venter forude",
    emoji: "🚀",
    color: "from-violet-400 to-purple-500",
    questions: [
      { id: "frem-1", categoryId: "fremtid", text: "Hvor ser du dig selv om 5 år?", depth: "medium" },
      { id: "frem-2", categoryId: "fremtid", text: "Hvad står øverst på din bucket list?", depth: "let" },
      { id: "frem-3", categoryId: "fremtid", text: "Hvilken drøm har du aldrig fortalt nogen om?", depth: "dyb" },
      { id: "frem-4", categoryId: "fremtid", text: "Hvis penge ikke var et problem, hvad ville du så gøre?", depth: "let" },
      { id: "frem-5", categoryId: "fremtid", text: "Hvad håber du vi opnår sammen?", depth: "medium" },
      { id: "frem-6", categoryId: "fremtid", text: "Hvad frygter du mest ved fremtiden?", depth: "dyb" },
      { id: "frem-7", categoryId: "fremtid", text: "Hvilket land drømmer du om at besøge?", depth: "let" },
      { id: "frem-8", categoryId: "fremtid", text: "Hvad vil du gerne være kendt for?", depth: "dyb" },
      { id: "frem-9", categoryId: "fremtid", text: "Hvilken ny færdighed vil du gerne lære?", depth: "let" },
      { id: "frem-10", categoryId: "fremtid", text: "Hvordan ser din drømmepensionisttilværelse ud?", depth: "medium" },
    ],
  },
  {
    id: "fortid",
    name: "Fortid",
    description: "Minder, oplevelser og livets lærdom",
    emoji: "📜",
    color: "from-emerald-400 to-teal-500",
    questions: [
      { id: "fort-1", categoryId: "fortid", text: "Hvad er dit lykkeligste barndomsminde?", depth: "let" },
      { id: "fort-2", categoryId: "fortid", text: "Hvilken beslutning har formet dit liv mest?", depth: "dyb" },
      { id: "fort-3", categoryId: "fortid", text: "Hvad ville du fortælle dit yngre jeg?", depth: "medium" },
      { id: "fort-4", categoryId: "fortid", text: "Hvem har haft størst indflydelse på dit liv?", depth: "medium" },
      { id: "fort-5", categoryId: "fortid", text: "Hvad er den vigtigste lektie livet har lært dig?", depth: "dyb" },
      { id: "fort-6", categoryId: "fortid", text: "Hvilket øjeblik ville du gerne opleve igen?", depth: "let" },
      { id: "fort-7", categoryId: "fortid", text: "Hvad er du mest stolt af at have opnået?", depth: "medium" },
      { id: "fort-8", categoryId: "fortid", text: "Er der noget du fortryder?", depth: "dyb" },
      { id: "fort-9", categoryId: "fortid", text: "Hvad er det sjoveste der nogensinde er sket for dig?", depth: "let" },
      { id: "fort-10", categoryId: "fortid", text: "Hvilken udfordring har gjort dig stærkere?", depth: "dyb" },
    ],
  },
  {
    id: "sjove",
    name: "Sjove",
    description: "Lette og underholdende spørgsmål",
    emoji: "😂",
    color: "from-yellow-400 to-amber-500",
    questions: [
      { id: "sjov-1", categoryId: "sjove", text: "Hvis du var et dyr, hvilket ville du være?", depth: "let" },
      { id: "sjov-2", categoryId: "sjove", text: "Hvad er din mest pinlige hemmelighed?", depth: "medium" },
      { id: "sjov-3", categoryId: "sjove", text: "Hvis du kunne have én superkraft, hvilken?", depth: "let" },
      { id: "sjov-4", categoryId: "sjove", text: "Hvad er det mærkeligste du nogensinde har spist?", depth: "let" },
      { id: "sjov-5", categoryId: "sjove", text: "Hvilken celebrity ville du bytte liv med i en dag?", depth: "let" },
      { id: "sjov-6", categoryId: "sjove", text: "Hvad er din guilty pleasure?", depth: "medium" },
      { id: "sjov-7", categoryId: "sjove", text: "Hvis du vandt en million, hvad ville det første køb være?", depth: "let" },
      { id: "sjov-8", categoryId: "sjove", text: "Hvad er den værste date du har været på?", depth: "medium" },
      { id: "sjov-9", categoryId: "sjove", text: "Hvilken sang synger du i badet?", depth: "let" },
      { id: "sjov-10", categoryId: "sjove", text: "Hvad er din mest upopulære holdning?", depth: "medium" },
    ],
  },
  {
    id: "dybe",
    name: "Dybe",
    description: "Filosofiske spørgsmål om livet og eksistens",
    emoji: "🌊",
    color: "from-blue-400 to-indigo-500",
    questions: [
      { id: "dyb-1", categoryId: "dybe", text: "Hvad er meningen med livet for dig?", depth: "dyb" },
      { id: "dyb-2", categoryId: "dybe", text: "Hvad frygter du mest i livet?", depth: "dyb" },
      { id: "dyb-3", categoryId: "dybe", text: "Tror du på skæbne eller tilfældigheder?", depth: "medium" },
      { id: "dyb-4", categoryId: "dybe", text: "Hvad ville du gøre hvis du kun havde ét år tilbage?", depth: "dyb" },
      { id: "dyb-5", categoryId: "dybe", text: "Hvad er kærlighed for dig?", depth: "dyb" },
      { id: "dyb-6", categoryId: "dybe", text: "Hvad gør dig virkelig lykkelig?", depth: "medium" },
      { id: "dyb-7", categoryId: "dybe", text: "Hvad vil du huskes for?", depth: "dyb" },
      { id: "dyb-8", categoryId: "dybe", text: "Hvornår følte du dig sidst helt i fred?", depth: "medium" },
      { id: "dyb-9", categoryId: "dybe", text: "Hvad betyder succes for dig?", depth: "medium" },
      { id: "dyb-10", categoryId: "dybe", text: "Hvad har du lært om dig selv det seneste år?", depth: "dyb" },
    ],
  },
];

export function getCategory(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}

export function getRandomQuestion(categoryId: string, excludeIds: string[] = []) {
  const category = getCategory(categoryId);
  if (!category) return null;
  
  const availableQuestions = category.questions.filter(
    (q) => !excludeIds.includes(q.id)
  );
  
  if (availableQuestions.length === 0) return null;
  
  const randomIndex = Math.floor(Math.random() * availableQuestions.length);
  return availableQuestions[randomIndex];
}
