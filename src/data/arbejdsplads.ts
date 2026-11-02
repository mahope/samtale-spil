/**
 * The 30-minute exercise on /til-arbejdspladsen/ (issue #99).
 * Questions come from the "kollegaer" deck by id, so the text is never copied. Per research (docs/forskning.md 3.8)
 * the workplace deck stays on light and medium cards. Ids must never change or be reused.
 */
export interface ArbejdspladsTrin {
  id: string;
  title: string;
  /** Minutes, so the plan always adds up to ARBEJDSPLADS_MINUTTER */
  minutter: number;
  text: string;
  /** Question ids from the kollegaer deck; empty for the frame and the closing */
  questionIds: string[];
}

export const ARBEJDSPLADS_MINUTTER = 30;
export const ARBEJDSPLADS_DECK = "kollegaer";

export const arbejdspladsTrin: ArbejdspladsTrin[] = [
  {
    id: "ramme",
    title: "Ramme og frivillighed",
    minutter: 4,
    text: "Sig, hvad I skal, og hvor lang tid det tager. Sig også, at alle må sige pas uden at forklare hvorfor, og at det man hører, bliver i rummet. Del gruppen i hold på tre til fem, hvis I er mange. Lederen svarer først på det første spørgsmål, så alle kan høre, hvor personligt eller let et svar må være.",
    questionIds: [],
  },
  {
    id: "runde-1",
    title: "Runde 1: let opvarmning",
    minutter: 8,
    text: "Fire lette spørgsmål, cirka to minutter til hvert. Alle svarer kort på samme spørgsmål, og én læser op og svarer først. Næste spørgsmål starter hos næste person.",
    questionIds: ["kol-1", "kol-8", "kol-11", "kol-14"],
  },
  {
    id: "runde-2",
    title: "Runde 2: arbejdet og dig",
    minutter: 8,
    text: "Fire spørgsmål om, hvad der giver energi, og hvad man har lært. Stil gerne et opfølgende spørgsmål til den, der lige har svaret, fx »fortæl lidt mere om det«.",
    questionIds: ["kol-5", "kol-35", "kol-37", "kol-38"],
  },
  {
    id: "runde-3",
    title: "Runde 3: os som kolleger",
    minutter: 8,
    text: "Fire spørgsmål om samarbejdet. Her handler det om, hvad der fungerer, ikke om hvem der har gjort noget forkert.",
    questionIds: ["kol-42", "kol-47", "kol-63", "kol-64"],
  },
  {
    id: "afslutning",
    title: "Afslutning",
    minutter: 2,
    text: "Gå en runde, hvor alle i en enkelt sætning siger noget, de tager med, eller siger pas. Sig tak. Aftal selv bagefter, om der er noget, I vil følge op på i det daglige. Det er ikke en del af øvelsen.",
    questionIds: [],
  },
];

export const arbejdspladsHuskeregler = [
  "Ingen tvang. Ingen skal svare, og ingen skal forklare, hvorfor de siger pas.",
  "Ingen personlige spørgsmål om helbred, økonomi, familie eller privatliv. Brug kun kortene fra denne øvelse, eller lad være.",
  "Svar ikke på andres vegne, og tag ikke andres svar med videre uden at spørge.",
  "Brug ikke svarene i en vurdering, en samtale om løn eller en afskedigelsessag.",
  "Lederen deltager på lige fod og svarer selv først, men har ikke ret til at kræve et svar af nogen.",
];
