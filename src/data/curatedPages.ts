/**
 * Curated landing pages under /spoergsmaal/<slug>/ (issue #11). Questions are
 * referenced by id from the decks, so the text lives in one place.
 */

export interface CuratedPage {
  slug: string;
  seoTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  sections: { heading: string; text?: string; questionIds?: string[]; items?: string[] }[];
  faq?: { q: string; a: string }[];
  playDeck?: string;
}

export const curatedPages: CuratedPage[] = [
  {
    "slug": "kaeresten",
    "seoTitle": "Spørgsmål til kæresten: 102 gode, sjove og dybe",
    "metaDescription": "102 gratis spørgsmål til kæresten, fra lette og sjove til dybe og nære. Læs dem her, eller træk dem som samtalekort til date night.",
    "h1": "Spørgsmål til kæresten: 102 spørgsmål til jer to",
    "intro": "Det er let at tale om indkøb, børn og hvem der henter. Det er sværere at finde ind til det, I ikke har sagt i et stykke tid. Spørgsmålene her er samlet fra spillets kort til par og sorteret efter, hvor tæt de går på. Start med de lette, og tag de dybe en aften, hvor der er ro.",
    "sections": [
      {
        "heading": "Lette spørgsmål at starte med",
        "text": "Gode til middagen, gåturen eller bilen. De kræver ikke meget, men de får gang i historierne.",
        "questionIds": [
          "par-1",
          "par-3",
          "par-7",
          "par-11",
          "par-15",
          "par-16",
          "par-22",
          "par-26",
          "par-30",
          "par-34",
          "par-41",
          "par-44",
          "par-47",
          "par-49",
          "int-5",
          "int-16",
          "int-29",
          "int-35",
          "int-41",
          "int-44"
        ]
      },
      {
        "heading": "Om jeres historie",
        "text": "Hvordan det hele begyndte, og hvad I har været igennem siden.",
        "questionIds": [
          "par-5",
          "par-12",
          "par-13",
          "par-14",
          "par-21",
          "par-24",
          "par-29",
          "par-38",
          "par-42",
          "par-46",
          "int-31",
          "int-34"
        ]
      },
      {
        "heading": "Om hverdagen og det, der virker",
        "text": "Små ting fylder meget i et forhold. Her kan I tale om, hvad der gør jer glade, og hvad der kunne være bedre.",
        "questionIds": [
          "par-4",
          "par-18",
          "par-20",
          "par-23",
          "par-27",
          "par-31",
          "par-33",
          "par-35",
          "par-37",
          "par-40",
          "par-45",
          "int-38",
          "int-46",
          "int-49"
        ]
      },
      {
        "heading": "Om nærhed",
        "text": "Spørgsmål om tryghed, tillid og det at være tæt på hinanden. Ingen af dem handler om sex.",
        "questionIds": [
          "par-2",
          "par-6",
          "par-9",
          "int-2",
          "int-4",
          "int-7",
          "int-8",
          "int-9",
          "int-12",
          "int-15",
          "int-25",
          "int-26",
          "int-40",
          "int-43",
          "int-45"
        ]
      },
      {
        "heading": "Dybe spørgsmål til kæresten",
        "text": "Tag dem, når I har tid. Det er fint at tænke længe, og det er fint at sige, at man ikke ved det endnu.",
        "questionIds": [
          "par-10",
          "par-17",
          "par-25",
          "par-28",
          "par-32",
          "par-36",
          "par-39",
          "par-48",
          "par-50",
          "int-11",
          "int-17",
          "int-21",
          "int-30",
          "int-36",
          "int-42",
          "int-48",
          "droem-8"
        ]
      },
      {
        "heading": "Drømme og fremtid",
        "text": "Hvor skal I hen, og hvad vil I nå? Også de drømme, der lyder urealistiske.",
        "questionIds": [
          "par-8",
          "par-19",
          "par-43",
          "frem-1",
          "frem-2",
          "frem-5",
          "frem-7",
          "frem-20",
          "frem-23",
          "frem-27",
          "frem-29",
          "frem-33",
          "frem-39",
          "frem-47",
          "droem-1",
          "droem-4",
          "droem-5",
          "droem-15",
          "droem-18",
          "droem-21",
          "droem-25",
          "droem-34",
          "droem-38",
          "droem-42"
        ]
      }
    ],
    "faq": [
      {
        "q": "Hvordan bruger vi spørgsmålene?",
        "a": "Skiftes til at læse et spørgsmål højt, og lad den anden svare først. I kan også trække dem som kort i spillet, så I ikke kan se, hvad der kommer."
      },
      {
        "q": "Er der også frække spørgsmål?",
        "a": "Ikke på denne side. Spillet har et særskilt sæt kun for voksne, som kræver, at man bekræfter at være fyldt 18."
      }
    ],
    "playDeck": "parforhold"
  },
  {
    "slug": "hvad-vil-du-helst",
    "seoTitle": "Hvad vil du helst? 100 dilemmaer til venner og familie",
    "metaDescription": "100 »hvad vil du helst«-spørgsmål: sjove, svære, til børn og til vennerne. Gratis og på dansk. Læs dem her, eller spil dem som kort.",
    "h1": "Hvad vil du helst? 100 dilemmaer til hele bordet",
    "intro": "Et godt dilemma har ikke noget rigtigt svar, og det er hele pointen. Det sjove kommer, når folk skal forklare, hvorfor de valgte, som de gjorde. Her er dilemmaerne delt op, så du kan finde dem, der passer til selskabet.",
    "sections": [
      {
        "heading": "Sjove dilemmaer",
        "text": "Lette og fjollede. Gode til at få alle med fra start.",
        "questionIds": [
          "dil-1",
          "dil-2",
          "dil-3",
          "dil-4",
          "dil-5",
          "dil-6",
          "dil-7",
          "dil-8",
          "dil-9",
          "dil-10",
          "dil-11",
          "dil-12",
          "dil-13",
          "dil-14",
          "dil-15",
          "dil-16",
          "dil-17",
          "dil-18",
          "dil-19",
          "dil-20",
          "dil-21",
          "dil-22",
          "dil-23",
          "dil-24",
          "dil-25",
          "dil-26",
          "dil-27",
          "dil-28",
          "dil-29",
          "dil-30"
        ]
      },
      {
        "heading": "Svære dilemmaer",
        "text": "Her skal man tænke sig om. De giver ofte de længste snakke.",
        "questionIds": [
          "dil-31",
          "dil-32",
          "dil-33",
          "dil-34",
          "dil-35",
          "dil-36",
          "dil-37",
          "dil-38",
          "dil-39",
          "dil-40",
          "dil-41",
          "dil-42",
          "dil-43",
          "dil-44",
          "dil-45",
          "dil-46",
          "dil-47",
          "dil-48",
          "dil-49",
          "dil-50",
          "dil-51",
          "dil-52",
          "dil-53",
          "dil-54",
          "dil-55"
        ]
      },
      {
        "heading": "Dilemmaer til børn",
        "text": "Skrevet til børn fra cirka 6 år. Spørg også de voksne, børnene elsker at høre deres svar.",
        "questionIds": [
          "dil-56",
          "dil-57",
          "dil-58",
          "dil-59",
          "dil-60",
          "dil-61",
          "dil-62",
          "dil-63",
          "dil-64",
          "dil-65",
          "dil-66",
          "dil-67",
          "dil-68",
          "dil-69",
          "dil-70",
          "dil-71",
          "dil-72",
          "dil-73",
          "dil-74",
          "dil-75",
          "dil-76",
          "dil-77",
          "dil-78",
          "dil-79",
          "dil-80"
        ]
      },
      {
        "heading": "Dilemmaer til vennerne",
        "text": "Om fester, ferier og alt det, man er uenige om i en vennegruppe.",
        "questionIds": [
          "dil-81",
          "dil-82",
          "dil-83",
          "dil-84",
          "dil-85",
          "dil-86",
          "dil-87",
          "dil-88",
          "dil-89",
          "dil-90",
          "dil-91",
          "dil-92",
          "dil-93",
          "dil-94",
          "dil-95",
          "dil-96",
          "dil-97",
          "dil-98",
          "dil-99",
          "dil-100"
        ]
      }
    ],
    "faq": [
      {
        "q": "Hvordan spiller man »hvad vil du helst«?",
        "a": "En læser dilemmaet højt, og alle vælger. Bagefter fortæller hver især, hvorfor. Man må ikke svare »ingen af dem«."
      },
      {
        "q": "Kan børn være med?",
        "a": "Ja. Dilemmaerne til børn er skrevet til 6-12 år, og de fleste sjove dilemmaer fungerer også for børn."
      }
    ],
    "playDeck": "dilemmaer"
  },
  {
    "slug": "36-spoergsmaal-til-at-forelske-sig",
    "seoTitle": "36 spørgsmål til at forelske sig: hele listen på dansk",
    "metaDescription": "De 36 spørgsmål fra psykologen Arthur Arons studie fra 1997 på dansk, i de tre sæt. Med vejledning til, hvordan I bruger dem.",
    "h1": "36 spørgsmål til at forelske sig",
    "intro": "I 1997 lod psykologen Arthur Aron og hans kolleger to fremmede stille hinanden 36 spørgsmål. Spørgsmålene bliver mere og mere personlige undervejs, og formålet var at undersøge, om man kan skabe nærhed mellem to mennesker på kort tid. Det kunne man. Listen er siden blevet kendt som »de 36 spørgsmål til at forelske sig«. Her er den i vores egen danske oversættelse.",
    "sections": [
      {
        "heading": "Sådan gør I",
        "items": [
          "Sæt jer over for hinanden med cirka 45 minutter og telefonerne væk.",
          "Tag spørgsmålene i rækkefølge, et sæt ad gangen. Brug omkring et kvarter på hvert sæt.",
          "Skiftes til at læse spørgsmålet højt, og lad begge svare, før I går videre.",
          "Mange slutter med at se hinanden i øjnene i fire minutter uden at sige noget. Det var ikke en del af studiet, men kom til, da journalisten Mandy Len Catron prøvede spørgsmålene og skrev om det i New York Times i 2015."
        ]
      },
      {
        "heading": "Sæt 1",
        "text": "De første tolv er lette at svare på og handler mest om vaner og drømme.",
        "items": [
          "Hvis du kunne vælge hvem som helst i hele verden, hvem ville du så have som middagsgæst?",
          "Kunne du tænke dig at være berømt? På hvilken måde?",
          "Øver du dig nogensinde i, hvad du vil sige, før du ringer til nogen? Hvorfor?",
          "Hvordan ser en »perfekt« dag ud for dig?",
          "Hvornår sang du sidst for dig selv? Og for en anden?",
          "Hvis du kunne blive 90 år og i de sidste 60 år beholde enten hovedet eller kroppen, som de var, da du var 30, hvad ville du så vælge?",
          "Har du en fornemmelse af, hvordan du kommer til at dø?",
          "Nævn tre ting, som du og den anden ser ud til at have til fælles.",
          "Hvad i dit liv er du mest taknemmelig for?",
          "Hvis du kunne ændre én ting ved den måde, du blev opdraget på, hvad skulle det så være?",
          "Brug fire minutter på at fortælle den anden din livshistorie så detaljeret som muligt.",
          "Hvis du kunne vågne i morgen med en ny egenskab eller evne, hvilken skulle det så være?"
        ]
      },
      {
        "heading": "Sæt 2",
        "text": "Nu bliver det mere personligt: minder, venskab og familie.",
        "items": [
          "Hvis en krystalkugle kunne fortælle dig sandheden om dig selv, dit liv, fremtiden eller noget helt andet, hvad ville du så gerne vide?",
          "Er der noget, du længe har drømt om at gøre? Hvorfor har du ikke gjort det?",
          "Hvad er det største, du har udrettet i dit liv?",
          "Hvad sætter du mest pris på i et venskab?",
          "Hvad er dit mest dyrebare minde?",
          "Hvad er dit værste minde?",
          "Hvis du vidste, at du ville dø pludselig om et år, ville du så ændre noget ved den måde, du lever på nu? Hvorfor?",
          "Hvad betyder venskab for dig?",
          "Hvilken plads har kærlighed og ømhed i dit liv?",
          "Skiftes til at nævne noget, I sætter pris på ved hinanden. Fem ting hver.",
          "Hvor tæt og varm er din familie? Synes du, at din barndom var lykkeligere end de flestes?",
          "Hvordan har du det med dit forhold til din mor?"
        ]
      },
      {
        "heading": "Sæt 3",
        "text": "De sidste tolv handler om jer to, og om det, man sjældent siger højt.",
        "items": [
          "Sig tre sande sætninger hver, der begynder med »vi«. For eksempel: »Vi sidder begge her og føler ...«",
          "Gør denne sætning færdig: »Jeg ville ønske, jeg havde nogen, jeg kunne dele ... med.«",
          "Hvis I skulle blive nære venner, hvad ville det så være vigtigt for den anden at vide om dig?",
          "Fortæl den anden, hvad du kan lide ved vedkommende. Vær helt ærlig, og sig ting, du normalt ikke ville sige til en, du lige har mødt.",
          "Fortæl om et pinligt øjeblik i dit liv.",
          "Hvornår græd du sidst foran et andet menneske? Og alene?",
          "Fortæl den anden noget, du allerede nu kan lide ved vedkommende.",
          "Er der noget, der er for alvorligt til at lave sjov med? Hvad?",
          "Hvis du døde i aften uden at kunne tale med nogen først, hvad ville du så mest fortryde ikke at have sagt til nogen? Hvorfor har du ikke sagt det endnu?",
          "Dit hjem med alt, hvad du ejer, brænder. Dine kære og dine dyr er i sikkerhed, og du kan nå ind efter én ting mere. Hvad henter du? Hvorfor?",
          "Af alle i din familie, hvis død ville ramme dig hårdest? Hvorfor?",
          "Fortæl om et personligt problem, og spørg den anden, hvordan vedkommende ville håndtere det. Bed også den anden om at sige, hvordan du ser ud til at have det med problemet."
        ]
      },
      {
        "heading": "Kilde",
        "text": "Aron, A., Melinat, E., Aron, E. N., Vallone, R. D. og Bator, R. J. (1997): »The Experimental Generation of Interpersonal Closeness: A Procedure and Some Preliminary Findings«. Personality and Social Psychology Bulletin, 23(4), 363-377. Den danske oversættelse er Snakkespils egen."
      }
    ],
    "faq": [
      {
        "q": "Virker de 36 spørgsmål?",
        "a": "Studiet viste, at par, der stillede hinanden spørgsmålene, følte sig tættere på hinanden end par, der kun småsnakkede. Det lover ikke forelskelse, men det giver en usædvanlig god samtale."
      },
      {
        "q": "Kan man bruge dem, hvis man allerede er kærester?",
        "a": "Ja. Mange par bruger dem til en aften, hvor de vil tale om andet end hverdagen."
      }
    ]
  },
  {
    "slug": "icebreakers",
    "seoTitle": "Icebreaker-spørgsmål: 50 spørgsmål til møder og teams",
    "metaDescription": "50 icebreaker-spørgsmål på dansk til møder, teamdage og nye kolleger. Lette at gå til og uden at blive for private.",
    "h1": "Icebreaker-spørgsmål: 50 spørgsmål der bryder isen",
    "intro": "Et godt icebreaker-spørgsmål er let at svare på, siger lidt om den, der svarer, og kræver ikke, at nogen skal dele noget privat. Spørgsmålene her er skrevet til arbejdspladsen: til mødets første fem minutter, til teamdagen og til den dag, hvor der starter en ny.",
    "sections": [
      {
        "heading": "Sådan bruger du dem",
        "items": [
          "Vælg ét spørgsmål, og lad alle svare på det i en runde. Det tager under fem minutter.",
          "Start selv, så andre kan høre, hvor lang et svar må være.",
          "Det er altid i orden at sige »pas«."
        ]
      },
      {
        "heading": "Til mødets første fem minutter",
        "text": "Hurtige spørgsmål, som alle kan svare på med det samme.",
        "questionIds": [
          "kol-3",
          "kol-6",
          "kol-8",
          "kol-10",
          "kol-11",
          "kol-18",
          "kol-19",
          "kol-22",
          "kol-23",
          "kol-26",
          "kol-32"
        ]
      },
      {
        "heading": "Om arbejdslivet",
        "text": "Lidt mere snak om job, kolleger og det, man har lært undervejs.",
        "questionIds": [
          "kol-1",
          "kol-2",
          "kol-4",
          "kol-5",
          "kol-7",
          "kol-12",
          "kol-14",
          "kol-15",
          "kol-16",
          "kol-20",
          "kol-21",
          "kol-27",
          "kol-28",
          "kol-29",
          "kol-30",
          "kol-31",
          "kol-33",
          "kol-34"
        ]
      },
      {
        "heading": "Til teamdagen",
        "text": "Spørgsmål, der giver grin og lidt fælles historie.",
        "questionIds": [
          "kol-9",
          "kol-13",
          "kol-17",
          "kol-24",
          "kol-25"
        ]
      },
      {
        "heading": "Lidt skævere",
        "text": "Når stemningen er til det. De fungerer også godt, når holdet ikke kender hinanden.",
        "questionIds": [
          "sjov-1",
          "sjov-3",
          "sjov-5",
          "sjov-7",
          "sjov-13",
          "sjov-17",
          "sjov-20",
          "sjov-24",
          "sjov-27",
          "sjov-29",
          "sjov-34",
          "sjov-40",
          "sjov-45",
          "sjov-47",
          "sjov-50",
          "sjov-31"
        ]
      }
    ],
    "playDeck": "kollegaer"
  },
  {
    "slug": "laer-hinanden-at-kende",
    "seoTitle": "Lær hinanden at kende: 60 spørgsmål fra let til dyb",
    "metaDescription": "60 spørgsmål til at lære et andet menneske at kende, delt op i lette, personlige og dybe. Til nye venner, kolleger og dates.",
    "h1": "Spørgsmål til at lære hinanden at kende",
    "intro": "Det er svært at komme forbi »hvad laver du?«, når man ikke kender hinanden. Spørgsmålene her er bygget op i tre trin. De første kan stilles til hvem som helst. De næste kræver lidt tillid, og de sidste er til, når I har snakket et stykke tid og har lyst til at gå tættere på.",
    "sections": [
      {
        "heading": "Trin 1: lette spørgsmål",
        "text": "Til den første snak. Svarene siger mere, end man skulle tro.",
        "questionIds": [
          "date-2",
          "date-3",
          "date-4",
          "date-5",
          "date-6",
          "date-7",
          "date-8",
          "date-11",
          "date-13",
          "date-14",
          "date-17",
          "date-19",
          "date-20",
          "date-22",
          "date-25",
          "date-27",
          "date-28",
          "date-30",
          "date-33",
          "fort-1",
          "fort-11",
          "fort-16",
          "fort-21",
          "fort-29",
          "fort-34"
        ]
      },
      {
        "heading": "Trin 2: lidt mere personligt",
        "text": "Om familie, hverdag og det, der betyder noget.",
        "questionIds": [
          "date-35",
          "date-36",
          "date-37",
          "date-38",
          "date-40",
          "date-41",
          "date-42",
          "date-43",
          "date-44",
          "date-45",
          "date-46",
          "date-47",
          "date-48",
          "date-51",
          "date-52",
          "date-56",
          "date-59",
          "date-62",
          "date-63",
          "fort-3"
        ]
      },
      {
        "heading": "Trin 3: dybe spørgsmål",
        "text": "Til når samtalen har fået fat. Lad den anden vælge, om de vil svare.",
        "questionIds": [
          "date-65",
          "date-66",
          "date-67",
          "date-68",
          "date-71",
          "date-73",
          "date-75",
          "date-76",
          "date-77",
          "date-82",
          "date-85",
          "fort-5",
          "fort-17",
          "fort-39",
          "fort-48"
        ]
      }
    ],
    "playDeck": "foerste-date"
  },
  {
    "slug": "graenseoverskridende",
    "seoTitle": "Grænseoverskridende spørgsmål: 50 modige og ærlige",
    "metaDescription": "50 grænseoverskridende spørgsmål til kæresten, vennen eller dig selv. Ærlige og lidt ubehagelige, men ikke frække. Start med de første ti.",
    "h1": "Grænseoverskridende spørgsmål: 50 modige og ærlige spørgsmål",
    "intro": "Grænseoverskridende spørgsmål er dem, man normalt springer over: om frygt, skam, tvivl og det, man aldrig har sagt. De er ikke frække, men de kræver mod at svare ærligt på. Stil dem til en, du stoler på, og husk, at det altid er i orden at sige »det vil jeg ikke svare på«.",
    "sections": [
      {
        "heading": "10 grænseoverskridende spørgsmål at starte med",
        "text": "Hvis I kun tager ti, så tag disse.",
        "questionIds": [
          "dyb-25",
          "dyb-32",
          "dyb-40",
          "dyb-34",
          "selv-68",
          "selv-73",
          "selv-57",
          "selv-45",
          "int-11",
          "int-17"
        ]
      },
      {
        "heading": "Om dig selv",
        "text": "Spørgsmål, der handler om det, man helst ikke ser i sig selv.",
        "questionIds": [
          "selv-37",
          "selv-40",
          "selv-41",
          "selv-46",
          "selv-56",
          "selv-66",
          "selv-69",
          "selv-70",
          "selv-78",
          "selv-82",
          "dyb-14",
          "dyb-28",
          "dyb-36",
          "dyb-48"
        ]
      },
      {
        "heading": "Om tillid og forhold",
        "text": "Til kæresten eller en meget nær ven.",
        "questionIds": [
          "int-15",
          "int-21",
          "int-24",
          "int-26",
          "int-27",
          "int-30",
          "int-36",
          "int-42",
          "int-48",
          "int-50"
        ]
      },
      {
        "heading": "Om livet",
        "text": "Store spørgsmål om frygt, tab og det, man stadig mangler at gøre.",
        "questionIds": [
          "dyb-2",
          "dyb-4",
          "dyb-12",
          "dyb-18",
          "dyb-23",
          "dyb-24",
          "dyb-38",
          "dyb-43",
          "dyb-46",
          "dyb-47",
          "selv-62",
          "selv-64",
          "selv-77",
          "selv-79",
          "selv-80",
          "selv-83"
        ]
      }
    ],
    "faq": [
      {
        "q": "Hvad er et grænseoverskridende spørgsmål?",
        "a": "Et spørgsmål, der går tættere på end almindelig snak: om følelser, tvivl og ting, man sjældent siger højt. Det handler om ærlighed, ikke om at være fræk."
      },
      {
        "q": "Hvad hvis jeg ikke vil svare?",
        "a": "Så siger du det. Pointen er at åbne op, når man har lyst, ikke at presse nogen."
      }
    ],
    "playDeck": "dybe"
  },
];
