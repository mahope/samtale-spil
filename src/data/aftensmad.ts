/**
 * /samtaler-ved-aftensmaden/: advice per age and example questions for the family dinner table.
 * Questions are card ids from the family and children's decks, so the page follows the card texts.
 */
export type AftensmadAlder = {
  id: string;
  title: string;
  intro: string;
  tips: string[];
  questionIds: string[];
};

export const aftensmadAldre: AftensmadAlder[] = [
  {
    id: "smaaboern",
    title: "Småbørn",
    intro: "De mindste svarer bedst på spørgsmål om noget, de kan se for sig: maden, dyr, legen i dag.",
    tips: [
      "Spørg om én ting ad gangen, og hold spørgsmålet kort.",
      "»Hvad var det sjoveste i dag?« virker bedre end »Hvordan var din dag?«.",
      "Svar selv først. Så hører barnet, hvordan man kan svare, og et fjollet svar er lige så godt som et rigtigt.",
    ],
    questionIds: ["boern-30", "boern-4", "boern-8", "boern-40", "boern-11"],
  },
  {
    id: "skoleboern",
    title: "Skolebørn",
    intro: "I skolealderen kan børn fortælle længere historier, og de kan godt lide selv at stille spørgsmålene.",
    tips: [
      "Spørg til noget bestemt i stedet for »hvordan var det i skolen?«.",
      "Lad barnet trække kortet og spørge de voksne. Børn er gode til at stille spørgsmål, som voksne ikke selv ville stille.",
      "Tag svaret alvorligt, også når det er tosset. Og »det vil jeg ikke svare på« er et fint svar.",
    ],
    questionIds: ["boern-49", "boern-50", "boern-97", "boern-69", "boern-76"],
  },
  {
    id: "teenagere",
    title: "Teenagere",
    intro: "Med teenagere ved bordet går det bedst, når ingen føler sig udspurgt. Spørgsmål om meninger og om familien selv fungerer bedre end spørgsmål om skole og venner.",
    tips: [
      "Lad dem vælge kortet, eller springe det over. Tvang lukker samtalen hurtigere end noget andet.",
      "Fortæl selv noget, gerne noget lidt pinligt fra din egen ungdom.",
      "Lyt mere, end du kommenterer. Det er ikke tidspunktet for gode råd.",
    ],
    questionIds: ["fam-29", "fam-60", "fam-12", "fam-58", "boern-64"],
  },
];

export const aftensmadFaq = [
  {
    q: "Hvor mange spørgsmål skal vi tage ved bordet?",
    a: "Et til tre er rigeligt. Et godt spørgsmål kan sagtens holde hele måltidet, og det er bedre at stoppe, mens det er sjovt, end at køre en lang runde.",
  },
  {
    q: "Hvad gør vi, hvis et barn ikke vil svare?",
    a: "Så springer I over. Alle må sige pas, også de voksne. Ofte kommer barnet selv tilbage til spørgsmålet senere, når ingen kigger.",
  },
  {
    q: "Hvor gamle skal børnene være?",
    a: "Fra omkring tre år kan de fleste være med på enkle spørgsmål om dagen og om maden. Bunken Børn er skrevet til 6 til 12 år, og Familie passer til alle aldre.",
  },
  {
    q: "Skal telefonen så ligge på bordet?",
    a: "Kun lige så længe, det tager at læse kortet op. I spillet Aftensmad får I tre kort, så telefonen kan ligge væk resten af måltidet. I kan også printe kortene.",
  },
  {
    q: "Koster det noget?",
    a: "Nej. Snakkespil er gratis, uden reklamer og uden konto.",
  },
];
