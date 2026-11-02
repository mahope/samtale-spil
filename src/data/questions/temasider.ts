import type { Question } from "@/types";

/**
 * Questions that only live on the curated pages bryllupsdag, langdistance and livshistorie
 * (issue #97). They are not part of any deck, so decks, counts and print PDFs stay as they were.
 * Ids are permanent: never change or reuse one (favourites in localStorage point at them).
 */
type Depth = Question["depth"];

function make(prefix: string, categoryId: string, rows: [Depth, string][]): Question[] {
  return rows.map(([depth, text], i) => ({ id: `${prefix}-${i + 1}`, categoryId, text, depth }));
}

export const bryllupsdagQuestions: Question[] = make("bryllupsdag", "bryllupsdag", [
  // Lette (1-12)
  ["let", "Hvad lavede vi i løbet af dagen, da vi blev gift, som du helst vil huske?"],
  ["let", "Hvilken sang fra vores bryllup får dig til at smile, når du hører den?"],
  ["let", "Hvad spiste vi til bryllupsmiddagen, og hvad ville du vælge i dag?"],
  ["let", "Hvem til vores bryllup talte du mest med, og hvad snakkede I om?"],
  ["let", "Hvad ved dagen skulle vi gøre på samme måde, hvis vi giftede os igen?"],
  ["let", "Hvad ved dagen skulle vi gøre helt anderledes?"],
  ["let", "Hvad havde jeg på den dag, som du stadig husker tydeligt?"],
  ["let", "Hvilket billede fra bryllupsdagen holder du mest af?"],
  ["let", "Hvad var det mest uventede, der skete til vores bryllup?"],
  ["let", "Hvad tænkte du, da du så mig komme ind eller stå foran dig?"],
  ["let", "Hvilken lille detalje fra dagen tænker du på, men har aldrig nævnt?"],
  ["let", "Hvad skal vi spise i aften, for at det føles som en fest?"],
  // Minder (13-26)
  ["medium", "Hvad er det bedste, der er sket for os, siden vi blev gift?"],
  ["medium", "Hvilket år som gift har været det mest spændende, og hvorfor?"],
  ["medium", "Hvad har vi grinet mest af i vores tid som gift?"],
  ["medium", "Hvilken hverdagsscene fra de seneste år vil du gerne have et billede af?"],
  ["medium", "Hvad har vi klaret sammen, som vi ikke troede, vi kunne?"],
  ["medium", "Hvilken tradition er blevet vores, uden at vi besluttede det?"],
  ["medium", "Hvad har du lært af mig siden bryllupsdagen?"],
  ["medium", "Hvornår har du mærket, at vi virkelig er et hold?"],
  ["medium", "Hvilken rejse eller tur sammen kommer du oftest til at tænke på?"],
  ["medium", "Hvad gør vi bedre i dag, end vi gjorde det første år?"],
  ["medium", "Hvad var en lille gestus fra mig, der betød mere, end jeg anede?"],
  ["medium", "Hvilket sted i vores bolig føles mest som os?"],
  ["medium", "Hvad ville du fortælle os selv på bryllupsdagen, hvis du kunne sende en besked tilbage?"],
  ["dyb", "Hvad lovede vi hinanden, som betyder mere for dig nu, end da vi sagde det?"],
  // Fremtid (27-38)
  ["medium", "Hvad vil du gerne, at vi har gjort mere af om fem år?"],
  ["medium", "Hvilket sted vil du gerne fejre en af de kommende bryllupsdage?"],
  ["medium", "Hvad skal vi øve os på at gøre bedre sammen?"],
  ["medium", "Hvilken drøm skal vi tage et konkret skridt mod i år?"],
  ["medium", "Hvad vil du gerne, at vi ser tilbage på med glæde om ti år?"],
  ["dyb", "Hvad skal der til, for at du stadig føler dig set af mig om mange år?"],
  ["dyb", "Hvad er du mest spændt på ved at blive ældre sammen?"],
  ["dyb", "Hvad ønsker du dig mere af fra mig i hverdagen?"],
  ["dyb", "Hvad vil du gerne, at vi aldrig holder op med at gøre?"],
  ["dyb", "Hvilket løfte vil du give mig i dag, som du kan holde?"],
  ["dyb", "Hvad håber du, at andre tænker, når de ser os sammen om mange år?"],
  ["dyb", "Hvad skal vi huske, hvis hverdagen bliver travl eller svær?"],
  // Til næste år (39-48)
  ["let", "Hvad skal vi lave på næste års bryllupsdag?"],
  ["let", "Hvilken ny ting skal vi prøve sammen, inden næste bryllupsdag?"],
  ["let", "Hvilket billede af os skal vi have taget før næste bryllupsdag?"],
  ["medium", "Hvad skal vi have opnået sammen, når vi fejrer næste år?"],
  ["medium", "Hvilken lille vane skal vi starte, så den har ét år på bagen næste gang?"],
  ["medium", "Hvilket sted skal vi besøge, inden vi sidder her igen næste år?"],
  ["medium", "Hvad skal du have sagt til mig, inden næste års bryllupsdag, som du endnu ikke har sagt?"],
  ["medium", "Hvilket spørgsmål fra i aften skal vi tage frem igen om et år?"],
  ["dyb", "Hvad håber du, at vi kan sige om det kommende år, når vi ser tilbage?"],
  ["dyb", "Hvad skal være anderledes mellem os næste bryllupsdag end i dag?"],
]);

export const langdistanceQuestions: Question[] = make("langdistance", "langdistance", [
  // Til videoopkaldet (1-14)
  ["let", "Hvad ser du lige nu uden for dit vindue?"],
  ["let", "Vis mig det sted, hvor du sidder, og fortæl, hvad du har lavet i dag."],
  ["let", "Hvad er det bedste ved dit sted, som jeg ikke kan se på skærmen?"],
  ["let", "Hvilken lyd i din hverdag ville jeg kunne genkende, hvis jeg var hos dig?"],
  ["let", "Hvad har du spist i dag, og var det godt?"],
  ["let", "Hvad er den mest almindelige ting, du savner at gøre sammen med mig?"],
  ["let", "Hvis du kunne flytte én ting fra mit sted til dit, hvad skulle det være?"],
  ["medium", "Hvad er den bedste del af vores opkald for dig?"],
  ["medium", "Hvad tænker du på lige inden, vi ringer til hinanden?"],
  ["medium", "Hvornår i løbet af dagen savner du mig mest?"],
  ["medium", "Hvad gør du, når savnet er stærkest?"],
  ["medium", "Hvordan skal vi holde opkaldene levende, så de ikke bliver en pligt?"],
  ["dyb", "Hvordan har du det med afstanden lige nu, hvis du skal være helt ærlig?"],
  ["dyb", "Hvad kan jeg gøre, så du føler dig tæt på mig, selv når vi er langt væk?"],
  // Korte daglige kort (15-30)
  ["let", "Hvad var det bedste ved din dag?"],
  ["let", "Hvad fik dig til at smile i dag?"],
  ["let", "Hvilken sang skal jeg lytte til i aften?"],
  ["let", "Hvad ville du helst have lavet sammen med mig lige nu?"],
  ["let", "Hvad skal du lave i weekenden?"],
  ["let", "Hvem mødte du i dag, som du vil fortælle om?"],
  ["let", "Hvilket billede kan du sende mig, der viser din dag?"],
  ["let", "Hvad er den mindste ting, der gjorde din dag lidt bedre?"],
  ["let", "Hvad glæder du dig til i morgen?"],
  ["medium", "Hvad har du lyst til at fortælle mig, som du ikke har nået endnu?"],
  ["medium", "Hvad har fyldt mest i dine tanker i dag?"],
  ["medium", "Hvad var svært i dag, og kan jeg gøre noget?"],
  ["medium", "Hvad skal jeg vide om din uge, inden vi snakker i weekenden?"],
  ["medium", "Hvad har du lært i dag, som du gerne vil dele?"],
  ["medium", "Hvad ville du gerne have sagt til mig i dag, hvis jeg havde stået foran dig?"],
  ["medium", "Hvad er det bedste, jeg har sagt til dig i denne uge?"],
  // Næste gang vi ses (31-42)
  ["let", "Hvad er det første, vi skal gøre, når vi ses igen?"],
  ["let", "Hvad skal vi spise den første aften, vi ses?"],
  ["let", "Hvilken lille ting skal vi have lavet sammen, næste gang vi er på samme sted?"],
  ["let", "Hvad skal jeg medbringe til dig, når jeg kommer?"],
  ["let", "Hvilken tur skal vi på, næste gang vi har en hel dag sammen?"],
  ["medium", "Hvad glæder du dig mest til ved at kunne røre ved mig igen?"],
  ["medium", "Hvordan vil du gerne tage imod mig, når jeg kommer?"],
  ["medium", "Hvordan bruger vi den første dag bedst, så vi ikke skynder os?"],
  ["medium", "Hvad skal vi sørge for ikke at spilde tiden på, når vi endelig er sammen?"],
  ["medium", "Hvordan siger vi farvel, så det gør mindst ondt?"],
  ["dyb", "Hvad håber du, at vi har aftalt, inden vi skilles igen?"],
  ["dyb", "Hvordan ser vores hverdag ud, den dag afstanden ikke længere er der?"],
]);

export const livshistorieQuestions: Question[] = make("livshistorie", "livshistorie", [
  // Barndom og opvækst (1-12)
  ["let", "Hvor er du født, og hvad ved du om dagen, du kom til verden?"],
  ["let", "Hvordan så det hjem ud, du voksede op i?"],
  ["let", "Hvad legede du helst med som barn, og hvem legede du med?"],
  ["let", "Hvad spiste I til aftensmad derhjemme, og hvem lavede maden?"],
  ["let", "Hvad havde du pligter med som barn?"],
  ["let", "Hvordan var din vej til skole, og hvordan var din første skoledag?"],
  ["let", "Hvad lærte du i skolen, som du stadig bruger i dag?"],
  ["let", "Hvad lavede I i sommerferien, da du var barn?"],
  ["medium", "Hvordan blev jul fejret hjemme hos jer, da du var lille?"],
  ["medium", "Hvem var din bedste ven som barn, og hvad lavede I sammen?"],
  ["medium", "Hvad var du bange for som barn?"],
  ["medium", "Hvad drømte du om at blive, da du var otte år?"],
  // Ungdom og arbejdsliv (13-24)
  ["let", "Hvad var dit første job, og hvad lærte du af det?"],
  ["let", "Hvilken musik lyttede du til som ung, og hvor hørte du den?"],
  ["let", "Hvordan klædte du dig som teenager, og hvad syntes dine forældre om det?"],
  ["medium", "Hvordan valgte du uddannelse eller arbejde?"],
  ["medium", "Hvad var det modigste, du gjorde som ung?"],
  ["medium", "Hvordan var det at flytte hjemmefra første gang?"],
  ["medium", "Hvilket arbejde var du mest stolt af, og hvorfor?"],
  ["medium", "Hvad var forskellen på at være ung dengang og nu?"],
  ["medium", "Hvilken beslutning fra de år er du glad for, at du tog?"],
  ["medium", "Hvem hjalp dig mest, da du skulle i gang med voksenlivet?"],
  ["dyb", "Hvad var det sværeste valg, du stod med som ung?"],
  ["dyb", "Hvad ville du gøre anderledes, hvis du fik de år igen?"],
  // Kærlighed, familie og venner (25-36)
  ["let", "Hvordan mødte du den, du blev gift med, eller den, du holdt mest af?"],
  ["let", "Hvordan var jeres første aften sammen?"],
  ["let", "Hvordan var din bryllupsdag eller den dag, du flyttede sammen med nogen?"],
  ["let", "Hvad hed du som barn blandt familie og venner, og hvorfor?"],
  ["medium", "Hvordan var det at blive forælder eller bedsteforælder første gang?"],
  ["medium", "Hvad er din bedste erindring fra tiden, da børnene var små?"],
  ["medium", "Hvad har dine venner betydet for dig gennem livet?"],
  ["medium", "Hvilken tradition fra din familie vil du gerne have, at vi holder i live?"],
  ["medium", "Hvem i familien var den, som alle fortalte historier om?"],
  ["dyb", "Hvad lærte du af dine forældre, som du gerne vil give videre?"],
  ["dyb", "Hvem savner du mest, og hvad ville du sige til dem?"],
  ["dyb", "Hvad håber du, at jeg ved om dig, når du ikke er her mere?"],
  // Livets lære (37-46)
  ["medium", "Hvad er den vigtigste ting, du har lært i dit liv?"],
  ["medium", "Hvilken begivenhed i verden husker du tydeligst, og hvor var du?"],
  ["medium", "Hvad har ændret sig mest i løbet af dit liv?"],
  ["medium", "Hvilken ting har du lavet, som du altid har været stolt af?"],
  ["medium", "Hvad ville du gerne have lært tidligere?"],
  ["medium", "Hvad vil du gerne have, at de unge i familien ved om dengang?"],
  ["dyb", "Hvad er du mest taknemlig for, når du ser tilbage?"],
  ["dyb", "Hvad ville du råde mig til, hvis jeg skulle træffe et stort valg?"],
  ["dyb", "Hvad er du glad for, at du nåede?"],
  ["dyb", "Hvad vil du gerne fortælle, som ingen har spurgt dig om?"],
]);

export const temasideQuestions: Question[] = [...bryllupsdagQuestions, ...langdistanceQuestions, ...livshistorieQuestions];

const byId = new Map(temasideQuestions.map((q) => [q.id, q]));

export function getTemasideQuestion(id: string): Question | undefined {
  return byId.get(id);
}
