import type { CuratedPage } from "./curatedPages";

/**
 * Three curated landing pages from docs/butik-og-seo.md 3.1 (issue #97): bryllupsdag,
 * langdistance and livshistorie. The questions live in questions/temasider.ts with ids of
 * their own; seoTitle counts match the question sections (headings starting "Sådan" are tips).
 * No research claims: nothing here is cited, so nothing is claimed.
 */
const ids = (prefix: string, from: number, to: number) =>
  Array.from({ length: to - from + 1 }, (_, i) => `${prefix}-${from + i}`);

export const curatedPages3: CuratedPage[] = [
  {
    slug: "bryllupsdag",
    seoTitle: "Bryllupsdag: 48 spørgsmål til en aften for to",
    metaDescription:
      "48 gratis spørgsmål til bryllupsdagen: lette til middagen, minder fra jeres tid som gift og spørgsmål om fremtiden. Til en aften for to.",
    h1: "Bryllupsdag: 48 spørgsmål til en aften for to",
    intro:
      "En bryllupsdag er en god anledning til at sætte sig ned og tale om andet end hverdagens planer. Spørgsmålene her går i tre trin: først lette, så minder fra jeres tid som gift, og til sidst fremtiden. Til sidst er der ti spørgsmål, I kan gemme til næste år. Vælg et par stykker, eller tag dem i rækkefølge, og hold pause, når I har lyst.",
    sections: [
      {
        heading: "Lette spørgsmål til middagen",
        text: "Til forretten eller kaffen, mens I lander i aftenen. De handler mest om selve bryllupsdagen.",
        questionIds: ids("bryllupsdag", 1, 12),
      },
      {
        heading: "Minder fra jeres tid som gift",
        text: "Hvad I har oplevet sammen, og hvad det har betydet. Lad hinanden fortælle, før I svarer selv.",
        questionIds: ids("bryllupsdag", 13, 26),
      },
      {
        heading: "Fremtiden sammen",
        text: "Hvad I ønsker for tiden fremover. Nogle af dem er dybe, så tag dem, når der er ro.",
        questionIds: ids("bryllupsdag", 27, 38),
      },
      {
        heading: "Ti spørgsmål til næste år",
        text: "Svar på dem i aften, skriv svarene ned, og læs dem op igen på næste bryllupsdag.",
        questionIds: ids("bryllupsdag", 39, 48),
      },
    ],
    links: [
      { href: "/spoergsmaal/date-night/", label: "Date night derhjemme" },
      { href: "/spoergsmaal/fremtid/", label: "Spørgsmål om fremtiden" },
      { href: "/spoergsmaal/parforhold/", label: "Spørgsmål til parforholdet" },
      { href: "/spoergsmaal/tak/", label: "Spørgsmål om tak" },
    ],
    faq: [
      {
        q: "Hvor mange spørgsmål skal vi nå på en bryllupsdag?",
        a: "Det behøver ikke være mange. Tre til fem spørgsmål, der giver en rigtig snak, er bedre end at nå hele listen.",
      },
      {
        q: "Hvad kan man lave på sin bryllupsdag derhjemme?",
        a: "Lav en middag, I begge kan lide, læg telefonerne væk, og tag spørgsmålene med. Mange kigger også på billeder fra dagen undervejs.",
      },
      {
        q: "Kan vi bruge spørgsmålene, selvom vi ikke er gift?",
        a: "Ja. Spørgsmålene virker lige så godt på en årsdag eller en anden dag, hvor I vil tale om jer to.",
      },
    ],
    playDeck: "parforhold",
  },
  {
    slug: "langdistance",
    seoTitle: "Langdistanceforhold: 42 spørgsmål til opkald og chat",
    metaDescription:
      "42 gratis spørgsmål til jer i et langdistanceforhold: til videoopkaldet, korte spørgsmål til hver dag og til næste gang, I ses.",
    h1: "Langdistanceforhold: 42 spørgsmål til videoopkald, hverdag og næste gang I ses",
    intro:
      "Når I bor langt fra hinanden, bliver samtalerne let til en rapport over dagen. Spørgsmålene her giver opkaldene noget at hænge på: nogle til videoopkaldet, nogle korte, I kan sende i løbet af dagen, og nogle om næste gang, I ses. Tag dem i jeres tempo, og lad hinanden springe over.",
    sections: [
      {
        heading: "Til videoopkaldet",
        text: "Til en aften, hvor I har tid. Nogle af dem beder jer vise noget fra jeres hverdag.",
        questionIds: ids("langdistance", 1, 14),
      },
      {
        heading: "Korte spørgsmål til hver dag",
        text: "Små spørgsmål, der er lette at sende som besked og lette at svare på en travl dag.",
        questionIds: ids("langdistance", 15, 30),
      },
      {
        heading: "Næste gang vi ses",
        text: "Glæden ved at se frem, og de aftaler der gør afskeden lettere.",
        questionIds: ids("langdistance", 31, 42),
      },
    ],
    links: [
      { href: "/spoergsmaal/kend-din-partner/", label: "Kend din partner" },
      { href: "/spoergsmaal/parforhold/", label: "Spørgsmål til parforholdet" },
      { href: "/spoergsmaal/date-night/", label: "Date night derhjemme" },
    ],
    faq: [
      {
        q: "Hvor ofte skal man ringe i et langdistanceforhold?",
        a: "Det afgør I selv. Nogle ringer hver aften, andre et par gange om ugen. Det vigtigste er, at begge har det godt med aftalen.",
      },
      {
        q: "Kan vi spille spillet sammen, selvom vi ikke er samme sted?",
        a: "Ja. Åbn spillet hver for sig, eller læs spørgsmålene her op for hinanden i videoopkaldet. Så svarer I begge på det samme spørgsmål.",
      },
    ],
    playDeck: "kend-din-partner",
  },
  {
    slug: "livshistorie",
    seoTitle: "Livshistorie: 46 spørgsmål til bedsteforældre og forældre",
    metaDescription:
      "46 gratis spørgsmål til at interviewe bedsteforældre og forældre om deres livshistorie, med en kort vejledning i at lytte og optage med tilladelse.",
    h1: "Livshistorie: 46 spørgsmål til bedsteforældre og forældre",
    intro:
      "Mange af historierne i en familie bliver aldrig fortalt, fordi ingen spørger. Spørgsmålene her kan bruges til et interview med en bedsteforælder eller en forælder: fra barndom og ungdom til kærlighed, familie og det, de har lært. Vælg ét emne ad gangen, og lad samtalen tage den tid, den tager.",
    sections: [
      {
        heading: "Sådan lytter og optager du",
        text: "Et par enkle råd, inden du begynder.",
        items: [
          "Spørg først, om den anden har lyst til at fortælle, og aftal, hvor længe I sidder.",
          "Optag kun, hvis den anden har sagt ja, og sig, hvad optagelsen skal bruges til, og hvem der får den.",
          "Stil ét spørgsmål ad gangen, og vent, også når der bliver stille.",
          "Spørg ind til det, der bliver sagt: hvordan så det ud, hvem var der, hvad tænkte du dengang.",
          "Spring over de spørgsmål, der er for svære. Den, du spørger, bestemmer.",
          "Skriv bagefter ned, hvad du husker, og del det med dem, der var med. Se også guiden til aktiv lytning.",
        ],
      },
      {
        heading: "Barndom og opvækst",
        text: "Et godt sted at starte. Mange husker barndommen levende.",
        questionIds: ids("livshistorie", 1, 12),
      },
      {
        heading: "Ungdom og arbejdsliv",
        text: "Skolen, de første job og de første valg.",
        questionIds: ids("livshistorie", 13, 24),
      },
      {
        heading: "Kærlighed, familie og venner",
        text: "Dem, der betød noget, og de traditioner, der blev ved.",
        questionIds: ids("livshistorie", 25, 36),
      },
      {
        heading: "Det, de har lært",
        text: "De mere personlige spørgsmål. Tag dem sidst, og kun hvis stemningen er til det.",
        questionIds: ids("livshistorie", 37, 46),
      },
    ],
    links: [
      { href: "/spoergsmaal/familiehistorier/", label: "Familiehistorier" },
      { href: "/spoergsmaal/barndom/", label: "Spørgsmål om barndommen" },
      { href: "/guide/aktiv-lytning/", label: "Guide: aktiv lytning" },
    ],
    faq: [
      {
        q: "Hvordan optager man et interview med sine bedsteforældre?",
        a: "Brug telefonens diktafon, og læg den på bordet. Spørg først, om det er i orden, og sig, hvad optagelsen skal bruges til.",
      },
      {
        q: "Hvad gør man, hvis den anden ikke vil fortælle om noget?",
        a: "Gå videre til et andet spørgsmål. Det er ikke et krav, at alt bliver fortalt, og man kan altid vende tilbage en anden dag.",
      },
    ],
    playDeck: "familiehistorier",
  },
];
