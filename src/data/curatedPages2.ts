import type { CuratedPage } from "./curatedPages";

/**
 * Three more curated landing pages (docs/butik-og-seo.md 3.1 #5, #7 and #17).
 * Counts in seoTitle match questionIds + items in the question sections.
 * Sections whose heading starts with "Idéer" hold ideas, not questions, and
 * their items never end with "?", so the renderer shows them as bullets.
 */
export const curatedPages2: CuratedPage[] = [
  {
    "slug": "spoergsmaal-til-crush",
    "seoTitle": "Spørgsmål til dit crush: 80 til sms, chat og første snak",
    "metaDescription": "80 spørgsmål til dit crush, der er lette at sende på sms og chat og gode til den første snak. Nysgerrige og sjove, men aldrig påtrængende.",
    "h1": "Spørgsmål til dit crush: 80 spørgsmål til sms, chat og første snak",
    "intro": "Det sværeste ved at skrive til et crush er ofte den første besked. Spørgsmålene her er lette at svare på, åbner for en historie og kræver ikke, at nogen blotter sig. Start med dem til sms og chat, og gem de lidt mere personlige, til I har skrevet sammen et stykke tid.",
    "sections": [
      {
        "heading": "Sådan rammer du timingen",
        "text": "Stil ét spørgsmål ad gangen, og svar gerne selv på det, så det føles som en snak og ikke et interview. Får du et kort svar, så spørg videre om noget fra svaret i stedet for at skifte emne. Og lad samtalen hvile, når den går i stå: et godt spørgsmål virker også i morgen."
      },
      {
        "heading": "Spørgsmål til sms og chat",
        "text": "Korte spørgsmål, der er lette at svare på med et par linjer, også mellem to møder.",
        "questionIds": [
          "date-87",
          "date-88",
          "date-90",
          "date-108",
          "date-113"
        ],
        "items": [
          "Hvad var det første, du tænkte på, da du vågnede i morges?",
          "Hvilken sang har du hørt flest gange i denne uge?",
          "Hvad fik du til aftensmad, og var det godt?",
          "Hvilken serie skal jeg se næste gang, hvis du må bestemme?",
          "Hvad skal du lave i weekenden?",
          "Hvor skal du hen på ferie eller tur næste gang?",
          "Hvilket billede på din telefon gør dig glad, hver gang du ser det?",
          "Hvilken podcast ville du anbefale til en lang gåtur?",
          "Hvilken bog eller tegneserie elskede du som barn?",
          "Hvilken by ville du rejse til i morgen, hvis billetten var betalt?",
          "Hvad har du grinet af på nettet for nylig?",
          "Hvad er din yndlingsmorgenmad?",
          "Sover du med vinduet åbent eller lukket?",
          "Hvilken lille ting har du altid i lommen eller tasken?",
          "Hvilket vejr er dit yndlingsvejr?",
          "Hvilken sang ville du sætte på, hvis du styrede musikken til en fest?",
          "Hvad hører du helst, når du laver mad?",
          "Hvad drikker du helst, når du skal hygge dig?",
          "Hvilket ord eller udtryk siger du alt for tit?",
          "Hvilken film kan du citere næsten hele?"
        ]
      },
      {
        "heading": "Spørgsmål til den første snak",
        "text": "Når I mødes eller ringer sammen første gang, og der skal være noget at tale om ud over vejret.",
        "questionIds": [
          "date-101",
          "date-104",
          "date-105",
          "date-106",
          "date-107",
          "date-110",
          "date-111",
          "date-112",
          "date-114",
          "date-115",
          "date-116",
          "date-117"
        ],
        "items": [
          "Hvad laver du typisk på en helt almindelig tirsdag?",
          "Hvordan ser din vennegruppe ud, og hvem er den, der samler jer?",
          "Hvilket sted i byen går du hen, når du vil have en god kop kaffe?",
          "Hvad var det sidste, du blev rigtig glad for at høre?",
          "Hvad laver du, når du ikke arbejder eller studerer?",
          "Hvad er det bedste, du har oplevet i år indtil nu?",
          "Hvilken tv-serie fra din barndom vil du stadig forsvare?",
          "Hvilket brætspil eller kortspil er du farligt god til?"
        ]
      },
      {
        "heading": "Når I kender hinanden lidt",
        "text": "Lidt mere personlige spørgsmål til, når I har skrevet eller set hinanden et par gange.",
        "questionIds": [
          "date-92",
          "date-93",
          "date-94",
          "date-96",
          "date-118",
          "date-119",
          "date-120",
          "date-121",
          "date-122",
          "date-123",
          "date-124",
          "date-125",
          "date-126",
          "date-127",
          "date-128"
        ],
        "items": [
          "Hvilken beslutning er du glad for, at du tog i år?",
          "Hvad gør dig glad, som du ikke tror, folk ville gætte?",
          "Hvilken slags weekend giver dig mest energi?",
          "Hvem ringer du til, når du har brug for et godt grin?",
          "Hvilket sted har du det bedst, når du skal tænke dig om?"
        ]
      },
      {
        "heading": "Sjove spørgsmål til dit crush",
        "text": "Til når stemningen er god, og I har lyst til at grine lidt.",
        "questionIds": [
          "sjov-53",
          "sjov-54",
          "sjov-56",
          "sjov-58",
          "sjov-61",
          "sjov-62",
          "sjov-64",
          "sjov-65",
          "sjov-67",
          "sjov-72"
        ],
        "items": [
          "Hvilken fiktiv figur ville du helst have som nabo?",
          "Hvis du fik en ret opkaldt efter dig, hvad skulle der så være i den?",
          "Hvilken mode fra din barndom ville du ønske kom tilbage?",
          "Hvad er den værste sang at få på hjernen?",
          "Hvilken overflødig ting ville du købe, hvis ingen så det?"
        ]
      }
    ],
    "faq": [
      {
        "q": "Hvad skriver man til sit crush?",
        "a": "Noget, der er let at svare på, og som handler om den anden. Et konkret spørgsmål som »Hvilken sang har du hørt flest gange i denne uge?« virker bedre end »Hvad laver du?«, fordi det giver et svar, man kan spørge videre til."
      },
      {
        "q": "Hvor mange spørgsmål skal man stille ad gangen?",
        "a": "Ét. Flere spørgsmål i samme besked kan føles som et skema. Svar også selv, så det bliver en samtale og ikke en udspørgen."
      },
      {
        "q": "Er der flirtende spørgsmål på listen?",
        "a": "Spørgsmålene er nysgerrige og venlige, men ikke frække. De er skrevet, så de kan sendes til en, man kun kender lidt, uden at det bliver pinligt for nogen af jer."
      },
      {
        "q": "Hvad er forskellen på denne side og spørgsmålene til første date?",
        "a": "Her handler det om tiden før og omkring den første snak, ofte på skrift. Skal I mødes til en rigtig date, er spørgsmålene til første date skrevet til lige den situation."
      }
    ],
    "playDeck": "foerste-date"
  },
  {
    "slug": "date-night",
    "seoTitle": "Date night derhjemme: 50 samtalekort og idéer for to",
    "metaDescription": "Date night derhjemme med 50 gratis samtalekort og 10 idéer til aftenen. En plan i tre trin: lette spørgsmål, gæt den andens svar og tættere på.",
    "h1": "Date night derhjemme: samtalekort og idéer til en aften for jer to",
    "intro": "En god date night kræver hverken barnepige eller bordbestilling. Her er idéer til en aften derhjemme og samtalekort i tre trin, fra de lette spørgsmål over et gættespil til de samtaler, I sjældent får taget. Vælg en idé, læg telefonerne væk, og tag kortene i den rækkefølge, de står.",
    "sections": [
      {
        "heading": "Idéer til date night derhjemme",
        "text": "Vælg én ting, og hold resten af aftenen enkel. Det vigtigste er, at I gør noget, der ikke ligner en almindelig aften.",
        "items": [
          "Lav en ret sammen, som ingen af jer har lavet før, og spis den ved et dækket bord.",
          "Byg en hule i stuen af dyner og puder, og spil kortene derinde.",
          "Hold en smagning af noget, I har i skabet: chokolade, ost, te eller kaffe, og giv karakterer på en serviet.",
          "Find gamle billeder frem, og fortæl hinanden historien bag tre af dem.",
          "Tænd stearinlys, og lad den ene vælge musikken den første time og den anden den næste.",
          "Gå en aftentur ad en vej, I aldrig har gået, og tag tre kort med i lommen.",
          "Lav biograf i stuen med en film, den ene har valgt i hemmelighed.",
          "Skriv hver tre ting på en seddel, I gerne vil nå sammen i år, og byt sedler.",
          "Spil et brætspil eller kortspil, hvor taberen laver morgenmad dagen efter.",
          "Lav en spilleliste sammen med en sang fra hvert sted, I har boet eller rejst."
        ]
      },
      {
        "heading": "Sådan bruger I kortene",
        "text": "Tænk på aftenen som tre trin. Start med lette spørgsmål, mens I spiser. Gå videre til gættespillet, hvor den ene gætter, hvad den anden vil svare, og bagefter fortæller den anden, hvordan det egentlig er. Slut med de spørgsmål, der går tættere på, når der er ro."
      },
      {
        "heading": "Trin 1: lette spørgsmål til middagen",
        "text": "Spørgsmål om nye oplevelser, sjove minder og det, I kunne finde på sammen.",
        "questionIds": [
          "par-51",
          "par-52",
          "par-53",
          "par-54",
          "par-55",
          "par-57",
          "par-58",
          "par-61",
          "par-62",
          "int-55",
          "int-62",
          "ukendt-3",
          "ukendt-6",
          "ukendt-8",
          "ukendt-12",
          "ukendt-24",
          "ukendt-26",
          "ukendt-27"
        ]
      },
      {
        "heading": "Trin 2: gæt den andens svar",
        "text": "Den ene gætter, den anden svarer. Det er fint at gætte forkert, det er der, I lærer noget nyt.",
        "questionIds": [
          "kend-7",
          "kend-9",
          "kend-12",
          "kend-14",
          "kend-19",
          "kend-30",
          "kend-31",
          "kend-37",
          "kend-43",
          "kend-47",
          "kend-51",
          "kend-57",
          "kend-65",
          "kend-69"
        ]
      },
      {
        "heading": "Trin 3: tættere på",
        "text": "Til sidst på aftenen, når der er ro. Tag dem en ad gangen, og lad den anden svare færdig.",
        "questionIds": [
          "par-63",
          "par-65",
          "par-66",
          "par-69",
          "par-72",
          "par-80",
          "ukendt-30",
          "ukendt-36",
          "ukendt-45",
          "ukendt-51",
          "ukendt-55",
          "ukendt-61",
          "ukendt-67",
          "ukendt-70",
          "int-63",
          "int-68",
          "int-69",
          "tak-64"
        ]
      },
      {
        "heading": "Hvorfor nye oplevelser virker",
        "text": "Nye og spændende fælles aktiviteter hænger sammen med højere tilfredshed i lange forhold (Aron m.fl. 2000), og følelsen af at vokse sammen hænger sammen med mere lyst (Muise m.fl. 2019). Derfor handler mange af kortene om det, I endnu ikke har prøvet."
      }
    ],
    "faq": [
      {
        "q": "Hvad laver man til date night derhjemme?",
        "a": "Noget, der bryder hverdagen: en ny ret, en tur ad en ukendt vej eller et spil. Vælg én idé fra listen, og brug samtalekortene til at få snakket om andet end indkøb og kalender."
      },
      {
        "q": "Hvor lang tid tager det?",
        "a": "En aften med de tre trin tager typisk to til tre timer med mad. Har I mindre tid, så tag fem kort fra hvert trin."
      },
      {
        "q": "Skal vi bruge alle spørgsmålene?",
        "a": "Nej. Det er bedre at tale længe om få kort end at nå dem alle. Spring et kort over, hvis det ikke passer i aften."
      },
      {
        "q": "Kan vi spille kortene på telefonen?",
        "a": "Ja. Knappen øverst åbner bunken Nyt og ukendt, hvor I trækker kortene ét ad gangen. Vil I bruge netop spørgsmålene på denne side, så læs dem op fra listen."
      }
    ],
    "playDeck": "nyt-og-ukendt"
  },
  {
    "slug": "valentinsdag",
    "seoTitle": "Valentinsdag derhjemme: 45 spørgsmål og idéer for to",
    "metaDescription": "Valentinsdag derhjemme uden gaveræs: 45 gratis spørgsmål til en aften for to og 8 enkle idéer. Om jeres begyndelse, hverdagen og det, der kommer.",
    "h1": "Valentinsdag derhjemme: spørgsmål og idéer til en aften for to",
    "intro": "Valentinsdag behøver ikke handle om roser og bordbestilling. En aften derhjemme med god mad og en ordentlig samtale siger ofte mere. Her er enkle idéer og spørgsmål om jeres begyndelse, jeres hverdag og det, I gerne vil have mere af.",
    "sections": [
      {
        "heading": "Idéer til valentinsdag derhjemme",
        "text": "Ingen af dem kræver, at I køber noget. Vælg en eller to.",
        "items": [
          "Skriv et kort brev i hånden til hinanden, og læs dem højt efter maden.",
          "Lav den ret, I spiste på en af jeres første aftener sammen, eller noget der minder om den.",
          "Gå en tur i februarmørket med varm kakao på termokande.",
          "Tag et billede af jer to i aften, og læg det ved siden af et billede fra jeres begyndelse.",
          "Bag boller eller en kage sammen, og spis den, mens den stadig er lun.",
          "Tag den andens kedeligste pligt i den kommende uge, og sig det højt i aften.",
          "Giv hinanden en time hver, hvor den anden bestemmer, hvad I laver.",
          "Læg telefonerne i en skuffe, og træk tre spørgsmål hver fra listen nedenfor."
        ]
      },
      {
        "heading": "Spørgsmål om jeres begyndelse",
        "text": "Det er sjovt at høre, hvordan den anden husker de første uger.",
        "questionIds": [
          "par-59",
          "par-60",
          "int-54",
          "int-58",
          "int-60",
          "int-61"
        ],
        "items": [
          "Hvad tænkte du om mig efter vores første aften sammen?",
          "Hvad var du nervøs for, de første gange vi mødtes?",
          "Hvem fortalte du først om mig, og hvad sagde du?",
          "Hvad husker du af det tøj, jeg havde på, da vi mødtes?",
          "Hvilken lille ting ved mig opdagede du først efter et stykke tid?",
          "Hvad lavede vi på vores anden aften sammen?",
          "Hvilken af vores første beskeder kan du stadig huske?",
          "Hvad ville du sige til os to, hvis du mødte os på vores første aften?",
          "Hvad troede du om mig, før du lærte mig ordentligt at kende?"
        ]
      },
      {
        "heading": "Spørgsmål om kærlighed i hverdagen",
        "text": "Romantik er også de små ting, der sker en helt almindelig tirsdag.",
        "questionIds": [
          "int-51",
          "int-52",
          "int-53",
          "int-56",
          "int-57",
          "int-59",
          "int-64",
          "int-65",
          "int-66",
          "int-67",
          "int-72"
        ],
        "items": [
          "Hvilken helt almindelig dag med mig husker du som en god dag?",
          "Hvad siger jeg, som får dig til at føle dig forstået?",
          "Hvad er romantik for dig, når det ikke er en særlig dag?",
          "Hvornår har du sidst tænkt på mig i løbet af en arbejdsdag, og hvorfor?"
        ]
      },
      {
        "heading": "Spørgsmål om tak og om det, der kommer",
        "text": "Til sidst på aftenen: det, I er glade for, og det, I gerne vil have mere af.",
        "questionIds": [
          "tak-29",
          "tak-38",
          "tak-50",
          "tak-54",
          "ukendt-52",
          "ukendt-68",
          "par-56",
          "par-79"
        ],
        "items": [
          "Hvad håber du, vi fejrer sammen til næste valentinsdag?",
          "Hvilken drøm vil du gerne have, at vi kommer et skridt nærmere i år?",
          "Hvad skal vi blive ved med at gøre, uanset hvor travlt vi får?",
          "Hvordan vil du gerne have, at vi fejrer de små ting i hverdagen?",
          "Hvad har du lært om kærlighed, siden vi mødtes?",
          "Hvilken ny tradition skal vi starte, så den bliver helt vores egen?",
          "Hvad håber du, vi stadig griner af om ti år?"
        ]
      }
    ],
    "faq": [
      {
        "q": "Hvad kan man lave på valentinsdag derhjemme?",
        "a": "Lav mad sammen, skriv et kort brev til hinanden, eller gå en aftentur, og tag spørgsmålene med. Det behøver ikke koste noget for at blive en aften, I husker."
      },
      {
        "q": "Vi fejrer ikke rigtig valentinsdag. Kan vi bruge spørgsmålene alligevel?",
        "a": "Ja. Spørgsmålene virker på enhver aften, hvor I vil tale om jer to. Mange bruger dem også på en årsdag eller en helt almindelig fredag."
      },
      {
        "q": "Er der frække spørgsmål på listen?",
        "a": "Nej. Spørgsmålene handler om nærhed, minder og hverdag. Spillet har et særskilt sæt kun for voksne, som kræver, at man bekræfter at være fyldt 18."
      },
      {
        "q": "Hvordan er det forskelligt fra date night?",
        "a": "Siden om date night er en plan til en hvilken som helst aften med et gættespil i midten. Her handler spørgsmålene mere om jeres begyndelse og om at sige tak."
      }
    ],
    "playDeck": "parforhold"
  }
];
