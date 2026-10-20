/**
 * Content for /lege/ (issue #42): games described in our own words plus a 30-card
 * mini deck per page. No alcohol, nobody made fun of; julefrokost is workplace-safe.
 */
import type { LegeSide } from "./lege";

export const legeSider: LegeSide[] = 
[
  {
    "slug": "julelege",
    "seoTitle": "Julelege for hele familien: lege og kort til juleaften",
    "metaDescription": "Julelege til juleaften og juledagene: pakkeleg i nye udgaver, gæt en julesang, juleminder rundt om bordet og 30 gratis kort til hele familien.",
    "h1": "Julelege for hele familien: 10 lege og 30 kort til juleaften",
    "intro": "Juleaften har sine faste ritualer, men der er tit en time mellem risalamanden og gaverne, hvor alle sidder og venter. Her er lege, som både børn, forældre og bedsteforældre kan være med i, og en bunke kort, der får julehistorierne frem.",
    "lege": [
      {
        "navn": "Pakkeleg med historier",
        "antal": "4-20",
        "tid": "30-45 min",
        "alder": "Fra 5 år",
        "saadan": [
          "Alle har en lille, indpakket gave med til en fælles bunke.",
          "Man slår på skift med en terning, og en sekser giver ret til at tage en pakke.",
          "Når uret ringer, går legen over i runde to, hvor seksere stjæler fra de andre.",
          "Til sidst fortæller hver, hvem de tror, pakken er fra, og hvorfor."
        ],
        "variant": "Sæt en regel om, at den, der stjæler, skal svare på et kort fra bunken nedenfor."
      },
      {
        "navn": "Gæt en julesang",
        "antal": "3-15",
        "tid": "15-20 min",
        "alder": "Fra 6 år",
        "saadan": [
          "Del jer i to hold.",
          "En fra holdet nynner en julesang uden ord, eller siger tre ord fra teksten.",
          "Holdet har 30 sekunder til at gætte titlen.",
          "Det hold, der gætter flest, vælger den sang, alle skal synge ved juletræet."
        ],
        "variant": "For de mindste: klap rytmen i stedet for at nynne."
      },
      {
        "navn": "Juleminder rundt om bordet",
        "antal": "2-20",
        "tid": "20 min",
        "alder": "Alle",
        "saadan": [
          "Den yngste trækker det første kort fra bunken.",
          "Alle ved bordet svarer kort, og den ældste svarer altid sidst.",
          "Spørg gerne ind til den bedste historie, før næste kort trækkes."
        ],
        "variant": "Bed bedsteforældrene om at fortælle, hvordan juleaften så ud, da de var børn."
      },
      {
        "navn": "Nissevenner",
        "antal": "4-15",
        "tid": "Hele december",
        "alder": "Fra 6 år",
        "saadan": [
          "Skriv alles navne på sedler, og lad hver trække én i hemmelighed.",
          "I hele julemåneden gør man små, anonyme glæder for den, man har trukket.",
          "Juleaften gætter alle, hvem deres nisseven var."
        ],
        "variant": "Gør det til en regel, at glæderne skal være gratis: en tegning, en hjælpende hånd, en seddel."
      },
      {
        "navn": "Hvem i familien",
        "antal": "4-20",
        "tid": "15 min",
        "alder": "Fra 7 år",
        "saadan": [
          "En læser et pegekort højt, fx »Peg på den, der altid finder mandlen«.",
          "På tre peger alle samtidig.",
          "Den, der får flest peg, fortæller historien bag, eller giver ordet videre."
        ],
        "variant": "Hold kortene venlige. Legen handler om at grine sammen, ikke om at hænge nogen ud."
      },
      {
        "navn": "Juletræs-quiz om året",
        "antal": "3-20",
        "tid": "20 min",
        "alder": "Fra 8 år",
        "saadan": [
          "En voksen har på forhånd skrevet 10 spørgsmål om familiens år: rejser, nye vaner, sjove øjeblikke.",
          "Familien svarer i hold på et stykke papir.",
          "Svarene læses op ved juletræet, og vinderholdet vælger første gave."
        ]
      },
      {
        "navn": "Fortsæt julehistorien",
        "antal": "3-12",
        "tid": "15 min",
        "alder": "Fra 5 år",
        "saadan": [
          "En begynder en julehistorie med én sætning, fx »Nissen vågnede og opdagede, at loftet var tomt«.",
          "Den næste fortsætter med én sætning, og sådan går det rundt om bordet.",
          "Efter tre runder skal historien have en slutning."
        ],
        "variant": "Skriv historien ned og læs den op igen næste jul."
      },
      {
        "navn": "Mandelgaven med en opgave",
        "antal": "Alle ved bordet",
        "tid": "5 min",
        "alder": "Alle",
        "saadan": [
          "Den, der finder mandlen, får gaven som altid.",
          "Til gengæld trækker vinderen et opgavekort og udfører det for bordet.",
          "Hold opgaverne små: en sang, en kompliment, et minde."
        ]
      },
      {
        "navn": "Gæt hvem der ønskede sig hvad",
        "antal": "4-15",
        "tid": "10 min",
        "alder": "Fra 7 år",
        "saadan": [
          "Alle skriver på en seddel, hvad de ønskede sig mest, da de var syv år.",
          "Sedlerne blandes og læses op én efter én.",
          "Bordet gætter, hvis seddel det er, og ejeren fortæller, om ønsket gik i opfyldelse."
        ]
      },
      {
        "navn": "Stille stund ved lyset",
        "antal": "2-20",
        "tid": "10 min",
        "alder": "Alle",
        "saadan": [
          "Sluk loftlyset, og lad kun juletræet og stearinlysene lyse.",
          "Gå bordet rundt: hver fortæller én ting fra året, de er glade for.",
          "Man må gerne sige pas og bare lytte."
        ],
        "variant": "God at slutte aftenen med, når de små er ved at blive trætte."
      }
    ],
    "kort": [
      {
        "id": "jul-1",
        "text": "Hvad er det første juleminde, du kan huske?",
        "type": "spoergsmaal"
      },
      {
        "id": "jul-2",
        "text": "Hvilken julegave har du aldrig glemt, og hvorfor?",
        "type": "spoergsmaal"
      },
      {
        "id": "jul-3",
        "text": "Hvad duftede det af hjemme hos dig i december, da du var barn?",
        "type": "spoergsmaal"
      },
      {
        "id": "jul-4",
        "text": "Hvilken juletradition ville du savne mest, hvis den forsvandt?",
        "type": "spoergsmaal"
      },
      {
        "id": "jul-5",
        "text": "Hvem i familien var bedst til at holde på en hemmelighed om gaver?",
        "type": "spoergsmaal"
      },
      {
        "id": "jul-6",
        "text": "Hvad er det sjoveste, der er sket ved et juletræ, du har danset om?",
        "type": "spoergsmaal"
      },
      {
        "id": "jul-7",
        "text": "Hvis nissen kunne give dig én ting, der ikke kan købes, hvad skulle det så være?",
        "type": "spoergsmaal"
      },
      {
        "id": "jul-8",
        "text": "Hvilken julesang får dig til at tænke på nogen bestemt?",
        "type": "spoergsmaal"
      },
      {
        "id": "jul-9",
        "text": "Hvordan fejrede dine bedsteforældre jul, da de var børn?",
        "type": "spoergsmaal"
      },
      {
        "id": "jul-10",
        "text": "Hvad ville du lave, hvis det var juleaften hele året?",
        "type": "spoergsmaal"
      },
      {
        "id": "jul-11",
        "text": "Hvilken ret på julebordet kunne du godt undvære?",
        "type": "spoergsmaal"
      },
      {
        "id": "jul-12",
        "text": "Hvem vil du gerne sige tak til her ved bordet, inden året er omme?",
        "type": "spoergsmaal"
      },
      {
        "id": "jul-13",
        "text": "Hvornår holdt du op med at tro på julemanden, og hvordan opdagede du det?",
        "type": "spoergsmaal"
      },
      {
        "id": "jul-14",
        "text": "Hvilken ny tradition skal vi prøve næste jul?",
        "type": "spoergsmaal"
      },
      {
        "id": "jul-15",
        "text": "Hvad er det bedste, der er sket for dig i år?",
        "type": "spoergsmaal"
      },
      {
        "id": "jul-16",
        "text": "Syng første vers af din yndlingsjulesang, og lad resten af bordet tage omkvædet.",
        "type": "opgave"
      },
      {
        "id": "jul-17",
        "text": "Fortæl om en gave, du selv har givet, som du var ekstra stolt af.",
        "type": "opgave"
      },
      {
        "id": "jul-18",
        "text": "Giv personen til venstre for dig en kompliment, der handler om året, der gik.",
        "type": "opgave"
      },
      {
        "id": "jul-19",
        "text": "Beskriv din drømmejuleaften med tre ord.",
        "type": "opgave"
      },
      {
        "id": "jul-20",
        "text": "Lav din bedste nisselyd, og lad de andre gætte, hvilken nisse du er.",
        "type": "opgave"
      },
      {
        "id": "jul-21",
        "text": "Vælg en sang, alle skal synge, når vi danser om juletræet.",
        "type": "opgave"
      },
      {
        "id": "jul-22",
        "text": "Fortæl en julehistorie fra din barndom på højst et minut.",
        "type": "opgave"
      },
      {
        "id": "jul-23",
        "text": "Del et juleminde, som ingen andre ved bordet kender.",
        "type": "opgave"
      },
      {
        "id": "jul-24",
        "text": "Peg på den, der altid pakker gaverne flottest.",
        "type": "peg"
      },
      {
        "id": "jul-25",
        "text": "Peg på den, der først finder ud af, hvad de har fået, før papiret er af.",
        "type": "peg"
      },
      {
        "id": "jul-26",
        "text": "Peg på den, der er bedst til at finde mandlen.",
        "type": "peg"
      },
      {
        "id": "jul-27",
        "text": "Peg på den, der synger højest ved juletræet.",
        "type": "peg"
      },
      {
        "id": "jul-28",
        "text": "Peg på den, der helst vil åbne gaverne tidligt.",
        "type": "peg"
      },
      {
        "id": "jul-29",
        "text": "Peg på den, der laver den bedste julemad.",
        "type": "peg"
      },
      {
        "id": "jul-30",
        "text": "Peg på den, der er mest nisse hele december.",
        "type": "peg"
      }
    ],
    "faq": [
      {
        "q": "Hvilke julelege passer til både børn og voksne?",
        "a": "Lege, hvor alle kan svare, uden at det handler om at være hurtigst eller stærkest. Juleminder rundt om bordet, gæt en julesang og pakkeleg med historier fungerer fra omkring fem år og op til oldeforældrene."
      },
      {
        "q": "Hvordan får man teenagerne med?",
        "a": "Lad dem styre noget: vælge sangen til juletræet, læse kortene op eller lave quizzen om året. Og hold kortene lette i starten."
      },
      {
        "q": "Kræver legene forberedelse?",
        "a": "De fleste kræver intet. Quizzen om året og nissevenner kræver lidt planlægning, resten kan startes direkte fra telefonen."
      },
      {
        "q": "Kan man spille kortene på telefonen?",
        "a": "Ja. Tryk på »Spil kortene«, så trækker telefonen ét kort ad gangen, og I kan sende den rundt om bordet."
      }
    ],
    "relaterede": [
      "/spoergsmaal/hoejtider/",
      "/spoergsmaal/familiehistorier/",
      "/spoergsmaal/familie/",
      "/spil/aftensmad/"
    ]
  },
  {
    "slug": "julefrokost-lege",
    "seoTitle": "Julefrokost-lege: lege der får alle til at snakke",
    "metaDescription": "Julefrokost-lege til arbejdspladsen og vennerne, uden at nogen bliver til grin: quiz om året, pegelege i venlig udgave og 30 gratis kort til bordet.",
    "h1": "Julefrokost-lege: 9 lege der får alle til at snakke, uden at nogen bliver til grin",
    "intro": "En god julefrokost handler om at lære kollegerne eller vennerne lidt bedre at kende, ikke om at udstille nogen. Legene her kan bruges i firmaet, i foreningen og blandt venner, og kortene er skrevet, så alle kan svare uden at fortryde det mandag morgen.",
    "lege": [
      {
        "navn": "Årets quiz om arbejdspladsen",
        "antal": "6-80",
        "tid": "20-30 min",
        "alder": "Voksne",
        "saadan": [
          "Festudvalget skriver 10-15 spørgsmål om året: nye kolleger, store opgaver, sjove episoder.",
          "Bordene konkurrerer som hold og skriver svarene ned.",
          "Svarene gennemgås fra scenen, og vinderbordet vælger den første sang."
        ],
        "variant": "Lad hvert bord bidrage med ét spørgsmål, som de andre borde skal svare på."
      },
      {
        "navn": "To sandheder og en opdigtet",
        "antal": "4-12 pr. bord",
        "tid": "15 min",
        "alder": "Voksne",
        "saadan": [
          "Hver fortæller tre ting om sig selv. To er sande, én er opdigtet.",
          "Bordet stemmer om, hvilken der er opdigtet.",
          "Den, der narrer flest, vinder æren."
        ],
        "variant": "Sæt et tema: »ting jeg kunne, da jeg var barn« eller »mit første job«."
      },
      {
        "navn": "Hvem på holdet",
        "antal": "6-30",
        "tid": "15 min",
        "alder": "Voksne",
        "saadan": [
          "En læser et pegekort højt, fx »Peg på den, der altid husker fødselsdage«.",
          "Alle peger på tre.",
          "Den med flest peg fortæller kort, om de kan genkende det."
        ],
        "variant": "Brug kun venlige kort. Kortene nedenfor er skrevet, så ingen bliver hængt ud."
      },
      {
        "navn": "Kollega-bingo",
        "antal": "10-100",
        "tid": "Hele aftenen",
        "alder": "Voksne",
        "saadan": [
          "Lav en plade med 16 felter som »har boet i udlandet« eller »kan spille et instrument«.",
          "Gæsterne skal finde en kollega, der passer til hvert felt, og skrive navnet på.",
          "Den første med fuld plade råber bingo og fortæller tre af historierne."
        ]
      },
      {
        "navn": "Bordets fælles ønskeliste",
        "antal": "4-12 pr. bord",
        "tid": "10 min",
        "alder": "Voksne",
        "saadan": [
          "Hvert bord skriver tre ting, der ville gøre næste år bedre på arbejdet.",
          "Listerne læses op, og salen klapper for den bedste idé.",
          "Ledelsen lover at svare på den mest populære i januar."
        ],
        "variant": "Kræver en ledelse, der rent faktisk svarer. Ellers spring den over."
      },
      {
        "navn": "Gæt babyfotoet",
        "antal": "8-60",
        "tid": "15 min",
        "alder": "Voksne",
        "saadan": [
          "Alle, der vil, sender et barnebillede til festudvalget på forhånd.",
          "Billederne vises nummererede på en skærm eller hænger på en væg.",
          "Gæsterne gætter, hvem der er hvem, og den med flest rigtige vinder."
        ],
        "variant": "Kun frivilligt. Ingen skal føle sig presset til at være med."
      },
      {
        "navn": "Samtalekort mellem retterne",
        "antal": "4-12 pr. bord",
        "tid": "Mellem retterne",
        "alder": "Voksne",
        "saadan": [
          "Læg en telefon eller en bunke kort midt på bordet.",
          "Mellem hver ret trækker en ny person et kort og læser det højt.",
          "Alle, der har lyst, svarer, og man må altid sige pas."
        ]
      },
      {
        "navn": "Sangbog-stafet",
        "antal": "6-60",
        "tid": "10 min",
        "alder": "Voksne",
        "saadan": [
          "Bordene får hver et vers af den samme sang.",
          "Sangen synges bord for bord, så ingen skal synge alene.",
          "Sidste vers synger hele salen sammen."
        ]
      },
      {
        "navn": "Det gode ord",
        "antal": "4-30",
        "tid": "10 min",
        "alder": "Voksne",
        "saadan": [
          "Hver trækker en seddel med en kollegas navn.",
          "På bagsiden skriver man én ting, man har sat pris på ved personen i år.",
          "Sedlerne afleveres anonymt og kan tages med hjem."
        ],
        "variant": "En stille og populær afslutning, når musikken skal til at starte."
      }
    ],
    "kort": [
      {
        "id": "jfrok-1",
        "text": "Hvad var dit første job, og hvad lærte du af det?",
        "type": "spoergsmaal"
      },
      {
        "id": "jfrok-2",
        "text": "Hvilken opgave i år er du mest stolt af?",
        "type": "spoergsmaal"
      },
      {
        "id": "jfrok-3",
        "text": "Hvad er det bedste råd, du har fået af en kollega?",
        "type": "spoergsmaal"
      },
      {
        "id": "jfrok-4",
        "text": "Hvis du kunne bytte job med en her ved bordet i en dag, hvem skulle det så være?",
        "type": "spoergsmaal"
      },
      {
        "id": "jfrok-5",
        "text": "Hvad laver du helst, når du har fri mellem jul og nytår?",
        "type": "spoergsmaal"
      },
      {
        "id": "jfrok-6",
        "text": "Hvad ville du lave, hvis du ikke havde dit nuværende job?",
        "type": "spoergsmaal"
      },
      {
        "id": "jfrok-7",
        "text": "Hvilken julefrokost husker du bedst, og hvorfor?",
        "type": "spoergsmaal"
      },
      {
        "id": "jfrok-8",
        "text": "Hvad er din skjulte evne, som få på arbejdet kender til?",
        "type": "spoergsmaal"
      },
      {
        "id": "jfrok-9",
        "text": "Hvem har lært dig mest i år?",
        "type": "spoergsmaal"
      },
      {
        "id": "jfrok-10",
        "text": "Hvad glæder du dig mest til næste år?",
        "type": "spoergsmaal"
      },
      {
        "id": "jfrok-11",
        "text": "Hvilket sted i verden ville du gerne holde et møde?",
        "type": "spoergsmaal"
      },
      {
        "id": "jfrok-12",
        "text": "Hvad var det sjoveste, der skete på arbejdet i år?",
        "type": "spoergsmaal"
      },
      {
        "id": "jfrok-13",
        "text": "Hvis vores arbejdsplads var en film, hvilken genre ville det så være?",
        "type": "spoergsmaal"
      },
      {
        "id": "jfrok-14",
        "text": "Hvad er den bedste julefrokostret, og hvad springer du over?",
        "type": "spoergsmaal"
      },
      {
        "id": "jfrok-15",
        "text": "Hvilken lille vane hos en kollega gør din dag bedre?",
        "type": "spoergsmaal"
      },
      {
        "id": "jfrok-16",
        "text": "Fortæl om dit første arbejdsår på højst et minut.",
        "type": "opgave"
      },
      {
        "id": "jfrok-17",
        "text": "Giv en kompliment til en ved bordet, som du ikke arbejder tæt sammen med.",
        "type": "opgave"
      },
      {
        "id": "jfrok-18",
        "text": "Beskriv dit år på arbejdet med tre ord.",
        "type": "opgave"
      },
      {
        "id": "jfrok-19",
        "text": "Del et godt tip, der gør hverdagen på arbejdet lettere.",
        "type": "opgave"
      },
      {
        "id": "jfrok-20",
        "text": "Fortæl om en fejl, du har lært noget af, og hvad du lærte.",
        "type": "opgave"
      },
      {
        "id": "jfrok-21",
        "text": "Vælg den næste sang, og fortæl hvorfor.",
        "type": "opgave"
      },
      {
        "id": "jfrok-22",
        "text": "Sig tak til en, der har hjulpet dig i år, og fortæl hvordan.",
        "type": "opgave"
      },
      {
        "id": "jfrok-23",
        "text": "Peg på den, der altid husker fødselsdagene.",
        "type": "peg"
      },
      {
        "id": "jfrok-24",
        "text": "Peg på den, der har den bedste kaffehistorie.",
        "type": "peg"
      },
      {
        "id": "jfrok-25",
        "text": "Peg på den, der først kommer med kage.",
        "type": "peg"
      },
      {
        "id": "jfrok-26",
        "text": "Peg på den, der er bedst til at få et møde til at slutte til tiden.",
        "type": "peg"
      },
      {
        "id": "jfrok-27",
        "text": "Peg på den, der helst ville have været på eventyr i stedet for at være her.",
        "type": "peg"
      },
      {
        "id": "jfrok-28",
        "text": "Peg på den, der kan fortælle den bedste rejsehistorie.",
        "type": "peg"
      },
      {
        "id": "jfrok-29",
        "text": "Peg på den, der altid har en oplader, man kan låne.",
        "type": "peg"
      },
      {
        "id": "jfrok-30",
        "text": "Peg på den, der er bedst til at få nye kolleger til at føle sig velkomne.",
        "type": "peg"
      }
    ],
    "faq": [
      {
        "q": "Hvordan undgår vi, at legene bliver pinlige?",
        "a": "Vælg lege, hvor alle selv bestemmer, hvor meget de deler, og brug kun venlige pegespørgsmål. Man skal altid kunne sige pas uden at forklare sig."
      },
      {
        "q": "Hvilke lege passer til en stor firmajulefrokost?",
        "a": "Quizzen om året, kollega-bingo og sangbog-stafetten fungerer fint med mange gæster. De mindre lege passer bedst ved det enkelte bord."
      },
      {
        "q": "Kan legene bruges til en vennejulefrokost?",
        "a": "Ja. Byt ordene »kollega« og »arbejde« ud med »vennegruppen«, så passer de fleste lege og kort direkte."
      },
      {
        "q": "Skal man forberede noget?",
        "a": "Quizzen, bingopladerne og babyfotoerne kræver forberedelse. Resten kan startes direkte fra telefonen ved bordet."
      }
    ],
    "relaterede": [
      "/spoergsmaal/kollegaer/",
      "/spoergsmaal/icebreakers/",
      "/spoergsmaal/sjove/",
      "/spoergsmaal/dilemmaer/"
    ]
  },
  {
    "slug": "nytaarslege",
    "seoTitle": "Nytårslege: lege og spørgsmål til nytårsaften",
    "metaDescription": "Nytårslege til hele selskabet: året der gik, tidskapsel, nytårsforsæt på en ny måde og 30 gratis kort, der får snakken i gang før midnat.",
    "h1": "Nytårslege: 9 lege og 30 kort til nytårsaften",
    "intro": "Nytårsaften er en lang aften med en fast slutning. Mellem dessert og midnat er der god tid til at se tilbage på året og frem mod det næste. Legene her kan bruges med familien, vennerne og i et blandet selskab.",
    "lege": [
      {
        "navn": "Året der gik i fire runder",
        "antal": "2-12",
        "tid": "30-45 min",
        "alder": "Fra 10 år",
        "saadan": [
          "Runde 1: alle fortæller om et højdepunkt fra året.",
          "Runde 2: de andre gætter, hvad personen var mest stolt af.",
          "Runde 3: alle fortæller, hvad de håber på næste år.",
          "Runde 4: de andre gætter, hvad personen gerne vil blive bedre til."
        ]
      },
      {
        "navn": "Tidskapsel til næste nytår",
        "antal": "2-20",
        "tid": "20 min",
        "alder": "Fra 7 år",
        "saadan": [
          "Alle skriver tre gæt om næste år: én ting om dem selv, én om familien og én om verden.",
          "Sedlerne lægges i en kuvert, der lukkes og dateres.",
          "Næste nytårsaften åbnes kuverten, og gættene læses op."
        ],
        "variant": "Gem kuverten et sted, hvor I finder den igen: i julepynten er et godt bud."
      },
      {
        "navn": "Forsæt på tværs",
        "antal": "3-15",
        "tid": "15 min",
        "alder": "Fra 12 år",
        "saadan": [
          "Hver skriver et forsæt for personen til højre i stedet for sig selv.",
          "Forsættet skal være noget, man under personen, ikke noget, de skal rette.",
          "Sedlerne læses op, og ejeren vælger, om de vil tage imod forsættet."
        ]
      },
      {
        "navn": "Nytårsquiz om året",
        "antal": "4-30",
        "tid": "20 min",
        "alder": "Fra 10 år",
        "saadan": [
          "En skriver 10 spørgsmål om årets begivenheder, både store og små.",
          "Selskabet svarer i hold.",
          "Vinderholdet vælger musikken frem til midnat."
        ],
        "variant": "Bland spørgsmål om verden med spørgsmål om selskabet selv."
      },
      {
        "navn": "Højdepunktet i ét billede",
        "antal": "2-15",
        "tid": "15 min",
        "alder": "Fra 10 år",
        "saadan": [
          "Alle finder ét billede fra årets fotos på telefonen.",
          "Billederne vises på skift, og ejeren fortæller historien på højst et minut.",
          "Selskabet stemmer om årets billede."
        ]
      },
      {
        "navn": "Nedtællingsrunden",
        "antal": "Alle",
        "tid": "10 min før midnat",
        "alder": "Alle",
        "saadan": [
          "Ti minutter før midnat går man rundt i selskabet.",
          "Hver siger én ting, de vil tage med fra året, og én ting, de vil lade blive tilbage.",
          "Når alle har sagt deres, er det tid til champagne, sodavand og kransekage."
        ]
      },
      {
        "navn": "Gæt hvis forsæt",
        "antal": "4-20",
        "tid": "15 min",
        "alder": "Fra 12 år",
        "saadan": [
          "Alle skriver et forsæt anonymt på en seddel.",
          "Sedlerne blandes og læses op.",
          "Selskabet gætter, hvis forsæt det er, og ejeren må fortælle hvorfor."
        ]
      },
      {
        "navn": "Årets ord",
        "antal": "2-20",
        "tid": "10 min",
        "alder": "Fra 8 år",
        "saadan": [
          "Hver vælger ét ord, der beskriver deres år.",
          "Ordene skrives på et fælles stykke papir.",
          "Selskabet vælger tilsammen et ord for det næste år."
        ]
      },
      {
        "navn": "Samtalekort til ventetiden",
        "antal": "2-12",
        "tid": "Efter behov",
        "alder": "Alle",
        "saadan": [
          "Læg telefonen midt på bordet.",
          "Den, der sidst har spist et stykke kransekage, trækker kortet.",
          "Alle svarer, og man må altid sige pas."
        ]
      }
    ],
    "kort": [
      {
        "id": "nyt-aar-1",
        "text": "Hvad er du mest stolt af fra i år?",
        "type": "spoergsmaal"
      },
      {
        "id": "nyt-aar-2",
        "text": "Hvem har betydet mest for dig i år, og ved de det?",
        "type": "spoergsmaal"
      },
      {
        "id": "nyt-aar-3",
        "text": "Hvad har du lært om dig selv i år?",
        "type": "spoergsmaal"
      },
      {
        "id": "nyt-aar-4",
        "text": "Hvilket øjeblik fra i år ville du gerne opleve igen?",
        "type": "spoergsmaal"
      },
      {
        "id": "nyt-aar-5",
        "text": "Hvad var det sværeste ved året, og hvordan kom du igennem det?",
        "type": "spoergsmaal"
      },
      {
        "id": "nyt-aar-6",
        "text": "Hvilken ny vane er du glad for, at du fik i år?",
        "type": "spoergsmaal"
      },
      {
        "id": "nyt-aar-7",
        "text": "Hvad vil du gerne nå i det nye år, som du ikke nåede i år?",
        "type": "spoergsmaal"
      },
      {
        "id": "nyt-aar-8",
        "text": "Hvad har du sagt ja til i år, som du er glad for?",
        "type": "spoergsmaal"
      },
      {
        "id": "nyt-aar-9",
        "text": "Hvad har du sagt nej til i år, som du er glad for?",
        "type": "spoergsmaal"
      },
      {
        "id": "nyt-aar-10",
        "text": "Hvis året var en sang, hvilken skulle det så være?",
        "type": "spoergsmaal"
      },
      {
        "id": "nyt-aar-11",
        "text": "Hvem vil du gerne se mere til næste år?",
        "type": "spoergsmaal"
      },
      {
        "id": "nyt-aar-12",
        "text": "Hvilket sted besøgte du i år for første gang?",
        "type": "spoergsmaal"
      },
      {
        "id": "nyt-aar-13",
        "text": "Hvad håber du, verden bliver bedre til næste år?",
        "type": "spoergsmaal"
      },
      {
        "id": "nyt-aar-14",
        "text": "Hvordan vil du gerne have det, når vi sidder her igen om et år?",
        "type": "spoergsmaal"
      },
      {
        "id": "nyt-aar-15",
        "text": "Hvilken lille ting fik din hverdag til at fungere i år?",
        "type": "spoergsmaal"
      },
      {
        "id": "nyt-aar-16",
        "text": "Hvad var årets bedste måltid, og hvem spiste du det med?",
        "type": "spoergsmaal"
      },
      {
        "id": "nyt-aar-17",
        "text": "Beskriv dit år med tre ord.",
        "type": "opgave"
      },
      {
        "id": "nyt-aar-18",
        "text": "Fortæl om årets største overraskelse på højst et minut.",
        "type": "opgave"
      },
      {
        "id": "nyt-aar-19",
        "text": "Sig tak til en her i selskabet for noget fra året, der gik.",
        "type": "opgave"
      },
      {
        "id": "nyt-aar-20",
        "text": "Del et mål for det nye år, som du endnu ikke har fortalt nogen.",
        "type": "opgave"
      },
      {
        "id": "nyt-aar-21",
        "text": "Vælg den sang, vi skal høre lige efter midnat.",
        "type": "opgave"
      },
      {
        "id": "nyt-aar-22",
        "text": "Fortæl, hvad du gerne vil lade blive tilbage i det gamle år.",
        "type": "opgave"
      },
      {
        "id": "nyt-aar-23",
        "text": "Giv personen til højre et ønske med ind i det nye år.",
        "type": "opgave"
      },
      {
        "id": "nyt-aar-24",
        "text": "Peg på den, der har prøvet flest nye ting i år.",
        "type": "peg"
      },
      {
        "id": "nyt-aar-25",
        "text": "Peg på den, der helst vil sove, når klokken slår tolv.",
        "type": "peg"
      },
      {
        "id": "nyt-aar-26",
        "text": "Peg på den, der holder sit nytårsforsæt længst.",
        "type": "peg"
      },
      {
        "id": "nyt-aar-27",
        "text": "Peg på den, der har rejst mest i år.",
        "type": "peg"
      },
      {
        "id": "nyt-aar-28",
        "text": "Peg på den, der har grinet mest i år.",
        "type": "peg"
      },
      {
        "id": "nyt-aar-29",
        "text": "Peg på den, der er bedst til at overraske andre.",
        "type": "peg"
      },
      {
        "id": "nyt-aar-30",
        "text": "Peg på den, der står først i køen til kransekagen.",
        "type": "peg"
      }
    ],
    "faq": [
      {
        "q": "Hvilke nytårslege passer, når selskabet ikke kender hinanden så godt?",
        "a": "Start med lette lege som årets ord og højdepunktet i ét billede. De dybere spørgsmål om året passer bedre senere på aftenen eller i mindre grupper."
      },
      {
        "q": "Hvad er et godt nytårsforsæt?",
        "a": "Et forsæt, der er konkret og venligt, fungerer bedst: noget man gerne vil mere af, frem for noget man skal holde op med. Forsæt på tværs er en sjov måde at få idéer fra andre."
      },
      {
        "q": "Kan børn være med?",
        "a": "Ja. Tidskapslen, årets ord og nedtællingsrunden passer til børn fra omkring syv år. Quizzen kan laves i en børneudgave."
      },
      {
        "q": "Hvordan bruger jeg kortene på nytårsaften?",
        "a": "Tryk på »Spil kortene«, så trækker telefonen ét kort ad gangen. Send telefonen rundt, eller lad én læse op for hele bordet."
      }
    ],
    "relaterede": [
      "/spoergsmaal/fremtid/",
      "/spoergsmaal/selvindsigt/",
      "/spoergsmaal/tak/",
      "/spoergsmaal/gode-nyheder/"
    ]
  },
  {
    "slug": "selskabslege-ved-bordet",
    "seoTitle": "Sjove selskabslege ved bordet uden forberedelse",
    "metaDescription": "Sjove selskabslege til middagen, der ikke kræver forberedelse: to sandheder og en løgn, historiestafet, dilemmaer og 30 gratis kort til bordet.",
    "h1": "Sjove selskabslege ved bordet: 10 lege til middagen, der ikke kræver forberedelse",
    "intro": "De bedste selskabslege kan startes, uden at nogen rejser sig fra bordet. Legene her kræver ingen rekvisitter, kun lidt nysgerrighed, og de fungerer til både familiemiddagen, middagsselskabet og fødselsdagen.",
    "lege": [
      {
        "navn": "To sandheder og en løgn",
        "antal": "3-12",
        "tid": "15 min",
        "alder": "Fra 10 år",
        "saadan": [
          "Hver fortæller tre ting om sig selv. To er sande, én er opdigtet.",
          "Bordet stemmer om, hvilken der er løgnen.",
          "Den, der narrer flest, vinder runden."
        ]
      },
      {
        "navn": "Historiestafetten",
        "antal": "3-12",
        "tid": "10-15 min",
        "alder": "Fra 6 år",
        "saadan": [
          "En begynder en historie med én sætning.",
          "Den næste fortsætter med én sætning, og sådan går det rundt.",
          "I tredje runde skal historien slutte, og ingen må dræbe hovedpersonen."
        ]
      },
      {
        "navn": "Hvad vil du helst",
        "antal": "2-12",
        "tid": "Efter behov",
        "alder": "Fra 7 år",
        "saadan": [
          "En læser et dilemma højt.",
          "Alle vælger samtidig ved at række én eller to fingre i vejret.",
          "Én fra hver side forklarer sit valg."
        ],
        "variant": "Find over hundrede dilemmaer under »Hvad vil du helst«."
      },
      {
        "navn": "Gæt hvem",
        "antal": "4-12",
        "tid": "15 min",
        "alder": "Fra 8 år",
        "saadan": [
          "Alle skriver en lille, ukendt ting om sig selv på en seddel.",
          "Sedlerne blandes og læses op én efter én.",
          "Bordet gætter, hvis seddel det er."
        ]
      },
      {
        "navn": "Ordkæden",
        "antal": "3-12",
        "tid": "10 min",
        "alder": "Fra 6 år",
        "saadan": [
          "En siger et ord, fx »sommer«.",
          "Den næste siger et ord, der starter med sidste bogstav i det forrige.",
          "Den, der tøver mere end fem sekunder, giver et ord til en ny kategori."
        ]
      },
      {
        "navn": "Det fælles minde",
        "antal": "3-12",
        "tid": "15 min",
        "alder": "Alle",
        "saadan": [
          "En nævner en oplevelse, flere ved bordet har været med til.",
          "Hver fortæller, hvad de husker bedst fra den.",
          "Bordet opdager, hvor forskelligt de har oplevet det samme."
        ]
      },
      {
        "navn": "Hvem ved bordet",
        "antal": "4-12",
        "tid": "10 min",
        "alder": "Fra 8 år",
        "saadan": [
          "En læser et pegekort højt.",
          "På tre peger alle samtidig.",
          "Den med flest peg fortæller historien bag eller giver ordet videre."
        ],
        "variant": "Hold det venligt. Kortene nedenfor er skrevet til at få folk til at smile, ikke til at drille."
      },
      {
        "navn": "Samtalekort mellem retterne",
        "antal": "2-12",
        "tid": "Efter behov",
        "alder": "Alle",
        "saadan": [
          "Læg telefonen midt på bordet.",
          "Mellem retterne trækker en ny person et kort.",
          "Alle svarer, og den, der svarer sidst, trækker næste kort."
        ]
      },
      {
        "navn": "Tre ting til fælles",
        "antal": "4-12",
        "tid": "10 min",
        "alder": "Fra 8 år",
        "saadan": [
          "To og to finder tre ting, de har til fælles, som ikke er oplagte.",
          "Parrene fortæller deres tre ting for bordet.",
          "Det par med den mest overraskende fællesnævner vinder."
        ]
      },
      {
        "navn": "Fem sekunder",
        "antal": "3-12",
        "tid": "10 min",
        "alder": "Fra 8 år",
        "saadan": [
          "En stiller en kategori, fx »tre is-smage« eller »tre danske byer«.",
          "Personen til venstre skal nævne tre ting på fem sekunder.",
          "Lykkes det, får man et point, og så er det ens tur til at stille kategorien."
        ]
      }
    ],
    "kort": [
      {
        "id": "selsk-1",
        "text": "Hvad brugte du dine første lommepenge på?",
        "type": "spoergsmaal"
      },
      {
        "id": "selsk-2",
        "text": "Hvilket instrument ville du spille, hvis du kunne lære det på en uge?",
        "type": "spoergsmaal"
      },
      {
        "id": "selsk-3",
        "text": "Hvad er den bedste middag, du nogensinde har været med til?",
        "type": "spoergsmaal"
      },
      {
        "id": "selsk-4",
        "text": "Hvilken film kan du se igen og igen?",
        "type": "spoergsmaal"
      },
      {
        "id": "selsk-5",
        "text": "Hvad er det mærkeligste, du har spist?",
        "type": "spoergsmaal"
      },
      {
        "id": "selsk-6",
        "text": "Hvis du kunne invitere en kendt person til middag, hvem skulle det så være?",
        "type": "spoergsmaal"
      },
      {
        "id": "selsk-7",
        "text": "Hvad er den bedste bog, du har læst det sidste år?",
        "type": "spoergsmaal"
      },
      {
        "id": "selsk-8",
        "text": "Hvilken lyd gør dig glad?",
        "type": "spoergsmaal"
      },
      {
        "id": "selsk-9",
        "text": "Hvilket legetøj ville du gerne have tilbage fra din barndom?",
        "type": "spoergsmaal"
      },
      {
        "id": "selsk-10",
        "text": "Hvad er dit bedste rejseminde?",
        "type": "spoergsmaal"
      },
      {
        "id": "selsk-11",
        "text": "Hvilken ret laver du, når du gerne vil imponere?",
        "type": "spoergsmaal"
      },
      {
        "id": "selsk-12",
        "text": "Hvad ville du lave på en helt fri tirsdag?",
        "type": "spoergsmaal"
      },
      {
        "id": "selsk-13",
        "text": "Hvilken regel fra din barndom følger du stadig?",
        "type": "spoergsmaal"
      },
      {
        "id": "selsk-14",
        "text": "Hvad har du ændret mening om de sidste par år?",
        "type": "spoergsmaal"
      },
      {
        "id": "selsk-15",
        "text": "Hvem ved bordet har du kendt længst, og hvordan mødtes I?",
        "type": "spoergsmaal"
      },
      {
        "id": "selsk-16",
        "text": "Fortæl den sjoveste historie fra din barndom på højst et minut.",
        "type": "opgave"
      },
      {
        "id": "selsk-17",
        "text": "Beskriv din perfekte søndag med fem ord.",
        "type": "opgave"
      },
      {
        "id": "selsk-18",
        "text": "Nævn tre ting, du er god til, uden at blive genert.",
        "type": "opgave"
      },
      {
        "id": "selsk-19",
        "text": "Fortæl om et sted, de andre ved bordet burde besøge.",
        "type": "opgave"
      },
      {
        "id": "selsk-20",
        "text": "Del en lille ting, der har gjort dig glad i denne uge.",
        "type": "opgave"
      },
      {
        "id": "selsk-21",
        "text": "Giv en anbefaling: en bog, en film eller en ret, som bordet skal prøve.",
        "type": "opgave"
      },
      {
        "id": "selsk-22",
        "text": "Fortæl, hvordan du mødte en af de andre ved bordet.",
        "type": "opgave"
      },
      {
        "id": "selsk-23",
        "text": "Peg på den, der ville klare sig bedst på en øde ø.",
        "type": "peg"
      },
      {
        "id": "selsk-24",
        "text": "Peg på den, der kan fortælle den bedste historie.",
        "type": "peg"
      },
      {
        "id": "selsk-25",
        "text": "Peg på den, der først ville prøve en ny ret.",
        "type": "peg"
      },
      {
        "id": "selsk-26",
        "text": "Peg på den, der altid kommer til tiden.",
        "type": "peg"
      },
      {
        "id": "selsk-27",
        "text": "Peg på den, der ville vinde en quiz om film.",
        "type": "peg"
      },
      {
        "id": "selsk-28",
        "text": "Peg på den, der griner højest.",
        "type": "peg"
      },
      {
        "id": "selsk-29",
        "text": "Peg på den, der ville være den bedste guide på en rejse.",
        "type": "peg"
      },
      {
        "id": "selsk-30",
        "text": "Peg på den, der helst vil bestemme musikken.",
        "type": "peg"
      }
    ],
    "faq": [
      {
        "q": "Hvilke selskabslege kræver ingen forberedelse?",
        "a": "To sandheder og en løgn, historiestafetten, hvad vil du helst, ordkæden og samtalekortene kan alle startes direkte ved bordet uden papir eller rekvisitter."
      },
      {
        "q": "Hvilke lege passer, når gæsterne ikke kender hinanden?",
        "a": "Tre ting til fælles og to sandheder og en løgn er gode til at bryde isen. Hold kortene lette i starten, og gem de mere personlige til senere."
      },
      {
        "q": "Kan børn og voksne lege sammen?",
        "a": "Ja. Historiestafetten, ordkæden og hvad vil du helst fungerer fra omkring seks år og op."
      },
      {
        "q": "Hvordan spiller vi kortene?",
        "a": "Tryk på »Spil kortene«. Telefonen trækker ét kort ad gangen, og I kan sende den rundt om bordet eller lade én læse op."
      }
    ],
    "relaterede": [
      "/spoergsmaal/sjove/",
      "/spoergsmaal/dilemmaer/",
      "/spoergsmaal/venner/",
      "/multiplayer/"
    ]
  }
];
