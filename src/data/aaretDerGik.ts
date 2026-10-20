import type { Question } from "@/types";

/**
 * "Året der gik" (issue #41): four rounds, looking back, guessing, looking ahead and
 * guessing again. For New Year, birthdays and anniversaries. Not a deck of its own;
 * the cards are drawn by the game at /spil/aaret-der-gik/.
 */
const DECK = "aaret";

const card = (n: number, text: string, depth: Question["depth"] = "let"): Question => ({
  id: `aar-${n}`,
  categoryId: DECK,
  text,
  depth,
});

export const AAR_TILBAGEBLIK: Question[] = [
  card(1, "Hvilket øjeblik fra det forgangne år ville du gerne opleve en gang til?"),
  card(2, "Hvad har du lært i år, som du ikke kunne for et år siden?"),
  card(3, "Hvilken lille hverdagsting gjorde dig glad i år?"),
  card(4, "Hvem har betydet mere for dig i år, end du havde regnet med?"),
  card(5, "Hvad var det modigste, du gjorde i år?", "medium"),
  card(6, "Hvilken plan holdt ikke, og hvad kom der i stedet?", "medium"),
  card(7, "Hvad har overrasket dig mest ved dig selv i år?", "medium"),
  card(8, "Hvilken dag fra året husker du allerbedst, og hvorfor?"),
  card(9, "Hvad var årets bedste måltid?"),
  card(10, "Hvad er du mest stolt af fra året, der gik?", "medium"),
];

export const AAR_GAET_TILBAGE: Question[] = [
  card(11, "Gæt: hvad var mit bedste øjeblik i år?"),
  card(12, "Gæt: hvilken sang har jeg hørt mest i år?"),
  card(13, "Gæt: hvad har jeg brugt mest tid på i år?"),
  card(14, "Gæt: hvornår i år var jeg mest stresset?", "medium"),
  card(15, "Gæt: hvilken beslutning fra i år er jeg gladest for?", "medium"),
  card(16, "Gæt: hvilket sted i år ville jeg helst tilbage til?"),
  card(17, "Gæt: hvad grinede jeg mest af i år?"),
  card(18, "Gæt: hvem af mine venner har jeg talt mest med i år?"),
  card(19, "Gæt: hvad har jeg savnet mest i år?", "medium"),
  card(20, "Gæt: hvilken ny vane fra i år vil jeg gerne beholde?"),
];

export const AAR_FREMTID: Question[] = [
  card(21, "Hvad glæder du dig mest til i det kommende år?"),
  card(22, "Hvad vil du gerne lære i det nye år?"),
  card(23, "Hvilket sted vil du gerne besøge i løbet af året?"),
  card(24, "Hvad vil du gøre mere af næste år, og hvad vil du gøre mindre af?", "medium"),
  card(25, "Hvem vil du gerne se mere i det kommende år?"),
  card(26, "Hvad håber du, vi laver sammen næste år?", "medium"),
  card(27, "Hvad skal være anderledes, når vi sidder her igen om et år?", "medium"),
  card(28, "Hvilken lille ting vil du begynde på allerede i næste uge?"),
  card(29, "Hvad vil du gerne kunne sige om året, når det er gået?", "medium"),
  card(30, "Hvilken tradition vil du gerne starte?"),
];

export const AAR_GAET_FREM: Question[] = [
  card(31, "Gæt: hvad glæder jeg mig mest til næste år?"),
  card(32, "Gæt: hvad vil jeg gerne lære i det nye år?"),
  card(33, "Gæt: hvor vil jeg helst rejse hen næste år?"),
  card(34, "Gæt: hvad håber jeg, der bliver anderledes i det nye år?", "medium"),
  card(35, "Gæt: hvilken ting tror jeg selv, at jeg aldrig får gjort?"),
  card(36, "Gæt: hvad vil jeg bruge en fri dag på næste år?"),
  card(37, "Gæt: hvem vil jeg gerne lære bedre at kende?", "medium"),
  card(38, "Gæt: hvad er mit største ønske for det kommende år?", "medium"),
  card(39, "Gæt: hvilken ny ting vil jeg prøve først?"),
  card(40, "Gæt: hvad vil jeg fejre, når året er gået?"),
];

export const AAR_KORT: Question[] = [...AAR_TILBAGEBLIK, ...AAR_GAET_TILBAGE, ...AAR_FREMTID, ...AAR_GAET_FREM];
