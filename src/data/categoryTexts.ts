/**
 * Copy for the category landing pages (/spoergsmaal/<id>/): titles, intro and tips.
 * Question counts in seoTitle match the data; categories.test.ts guards it.
 */

export interface CategoryText {
  seoTitle: string;
  metaDescription: string;
  intro: string;
  passerTil: string;
  tips: string[];
  /** Why the deck exists, with author and year (docs/forskning.md) */
  forskning?: string;
}

export const categoryTexts: Record<string, CategoryText> = {
  "parforhold": {
    seoTitle: "Spørgsmål til par: 80 samtalekort til jer to",
    metaDescription: "80 gratis spørgsmål til par, fra lette til dybe. Til date night, sofaen eller den lange gåtur, når I vil tale om andet end hverdagen.",
    intro: "Når man har været sammen et stykke tid, handler samtalerne let om indkøb, arbejde og hvem der henter. Spørgsmålene her giver plads til det, I ellers ikke får sagt, og til de gode historier, I har glemt at fortælle hinanden.",
    passerTil: "Kærester og ægtefæller, uanset om I har været sammen et år eller tredive.",
    tips: ["Skiftes til at trække et kort, og lad den anden svare først.", "Læg telefonerne væk, og giv hvert spørgsmål tid.", "Spring et kort over, hvis det ikke passer i aften."],
  },
  "familie": {
    seoTitle: "Samtalespørgsmål til familien: 80 kort",
    metaDescription: "80 spørgsmål til hele familien, på tværs af generationer. Til søndagsmiddagen, kaffen hos bedsteforældrene eller bilturen.",
    intro: "Mange af de bedste familiehistorier bliver aldrig fortalt, fordi ingen spørger. Kortene her får bedsteforældre, forældre og børn til at dele minder, traditioner og det, de har lært af hinanden.",
    passerTil: "Familier med flere generationer omkring bordet.",
    tips: ["Lad den yngste læse spørgsmålet højt.", "Spørg ind, når et svar åbner en god historie.", "Skriv de bedste historier ned bagefter."],
  },
  "intimitet": {
    seoTitle: "Intime spørgsmål til par: 80 kort til nærhed",
    metaDescription: "80 personlige spørgsmål om nærhed, tillid og romantik til par. Ærlige samtaler uden at det bliver pinligt.",
    intro: "Nærhed handler om mere end det fysiske. Spørgsmålene her hjælper jer med at tale om behov, ønsker og det, der får jer til at føle jer tæt på hinanden.",
    passerTil: "Par, der vil tale mere åbent om romantik og nærhed.",
    tips: ["Vælg et roligt tidspunkt, hvor I ikke bliver forstyrret.", "Lyt uden at forsvare dig.", "Det er altid i orden at sige pas."],
  },
  "fremtid": {
    seoTitle: "Spørgsmål om fremtiden: 80 kort om drømme og mål",
    metaDescription: "80 spørgsmål om drømme, mål og planer. Find ud af, hvor I hver især vil hen, og hvad I gerne vil nå sammen.",
    intro: "Det er sjovt at tale om, hvor man skal hen, og det siger meget om, hvem man er nu. Kortene spænder fra rejsedrømme og nye hobbyer til de store spørgsmål om arbejde, familie og det gode liv.",
    passerTil: "Par, venner og alle, der står over for en ny fase i livet.",
    tips: ["Tag en note med drømme, I gerne vil følge op på.", "Spørg: Hvad er første skridt?", "Gem de store spørgsmål til sidst på aftenen."],
  },
  "fortid": {
    seoTitle: "Spørgsmål om fortiden: 80 kort om minder",
    metaDescription: "80 spørgsmål om minder, valg og livets lærdom. Til samtaler med nogen, du gerne vil kende bedre.",
    intro: "Alle bærer på historier, der forklarer, hvorfor de er, som de er. Kortene her inviterer til at fortælle om vendepunkter, fejl, held og de mennesker, der gjorde en forskel.",
    passerTil: "Alle, der vil lære et menneske bedre at kende, også dem, man tror, man kender.",
    tips: ["Spørg om detaljer: hvor var du, hvem var der?", "Del selv et minde, når den anden har svaret.", "Kombinér med kategorien Barndom."],
  },
  "sjove": {
    seoTitle: "Sjove spørgsmål: 80 kort til grin og hygge",
    metaDescription: "80 sjove spørgsmål til fester, middage og lange køreture. Skøre hypotetiske valg og pinlige minder til at varme op med.",
    intro: "Nogle aftener skal bare være lette. Her er spørgsmål om superkræfter, pinlige minder og skøre valg, som får alle til at grine og ofte ender i overraskende gode historier.",
    passerTil: "Venner, kolleger, familien og nye bekendtskaber.",
    tips: ["Brug dem som opvarmning før de dybere kategorier.", "Lad alle svare på samme kort.", "Stem om det bedste svar."],
  },
  "dybe": {
    seoTitle: "Dybe spørgsmål: 80 kort til samtaler der betyder noget",
    metaDescription: "80 dybe spørgsmål om livet, lykke, frygt og mening. Til de sene aftener, hvor samtalen må gå i dybden.",
    intro: "Nogle samtaler husker man i årevis. Spørgsmålene her handler om det, der fylder: hvad der gør os glade, hvad vi er bange for, og hvad vi håber på.",
    passerTil: "Nære venner og par, der har tid og ro til en lang samtale.",
    tips: ["Tag ét spørgsmål ad gangen, og lad tavsheden være.", "Svar ærligt frem for klogt.", "Det er fint at vende tilbage til et kort en anden dag."],
  },
  "filosofiske": {
    seoTitle: "Filosofiske spørgsmål: 80 kort til at tænke højt",
    metaDescription: "80 filosofiske spørgsmål om fri vilje, moral, sandhed og lykke. Gode til middagsselskaber og diskussionslystne venner.",
    intro: "Har vi fri vilje? Kan man være for ærlig? Her er spørgsmål uden facitliste, som får alle til at tænke og ofte til at blive uenige på den gode måde.",
    passerTil: "Middagsselskaber, studiegrupper og venner, der elsker en god diskussion.",
    tips: ["Lad en person argumentere for det modsatte af, hvad de mener.", "Spørg: Hvorfor tror du det?", "Ingen svar er forkerte, men alle skal begrundes."],
  },
  "barndom": {
    seoTitle: "Spørgsmål om barndommen: 80 kort om minder",
    metaDescription: "80 spørgsmål om barndom, legetøj, skoletid og familietraditioner. Vækker minder og gode historier hos alle aldre.",
    intro: "Yndlingsleg, værste straf, første biograftur: barndommens små detaljer siger meget om et menneske. Kortene her får minderne frem og er gode at spille på tværs af generationer.",
    passerTil: "Par, venner og familier, også med bedsteforældre ved bordet.",
    tips: ["Find gamle billeder frem, mens I spiller.", "Sammenlign svarene på tværs af generationer.", "Lad børnene stille spørgsmålene til de voksne."],
  },
  "droemme": {
    seoTitle: "Spørgsmål om drømme og ønsker: 80 kort",
    metaDescription: "80 spørgsmål om drømme, ønsker og det, du altid har haft lyst til. Til samtaler, der giver lyst til at gøre noget ved det.",
    intro: "Hvad ville du lave, hvis ingen stod i vejen? Kortene her handler om de drømme, man går med, store som små, og om hvad der skal til for at komme et skridt nærmere.",
    passerTil: "Par og venner, der vil heppe på hinandens planer.",
    tips: ["Spørg ind til, hvad der holder drømmen tilbage.", "Aftal én lille ting, I hver især gør i næste uge.", "Kombinér med kategorien Fremtid."],
  },
  "venner": {
    seoTitle: "Spørgsmål til venner: 100 kort til vennegruppen",
    metaDescription: "100 spørgsmål til venner, fra sjove til ærlige. Til middagen, festen, sommerhuset eller den lange køretur.",
    intro: "Selv gamle venner har ting, de aldrig har spurgt hinanden om. Spørgsmålene her blander de fælles grin med de samtaler, der gør et venskab stærkere.",
    passerTil: "Vennegrupper, gamle venner og nye venskaber, der skal have fart på.",
    tips: ["Start med de lette kort, og skru op, når stemningen er der.", "Lad kortet gå rundt, så alle får svaret.", "Gem et par af de dybe til slutningen af aftenen."],
  },
  "foerste-date": {
    seoTitle: "Spørgsmål til første date: 100 kort der bryder isen",
    metaDescription: "100 spørgsmål til første date, der hverken er pinlige eller for personlige. Lær hinanden at kende, og undgå de akavede pauser.",
    intro: "Første date går lettere, når man har noget at tale om. Spørgsmålene her er nysgerrige, lette og ærlige, så I hurtigt kommer forbi vejret og jobbet og videre til det, der er interessant.",
    passerTil: "Første og anden date, og alle der vil lære et nyt menneske at kende.",
    tips: ["Hold dig til de lette kort i starten.", "Svar også selv, så det ikke bliver en jobsamtale.", "Følg op på det, der gør den anden glad at tale om."],
  },
  "boern": {
    seoTitle: "Spørgsmål til børn: 100 samtalekort til spisebordet",
    metaDescription: "100 sjove og nysgerrige spørgsmål til børn fra 6 til 12 år. Få mere at vide end 'det var fint' ved aftensmaden.",
    intro: "»Hvordan var din dag?« giver sjældent mere end »fint«. Kortene her er skrevet til børn og får dem til at fortælle, fantasere og grine. Der er også spørgsmål, der åbner for, hvordan de har det.",
    passerTil: "Børnefamilier med børn fra cirka 6 til 12 år.",
    tips: ["Lad barnet trække kortet og stille spørgsmålet til de voksne.", "Svar også selv, så barnet hører dine historier.", "Et kort om dagen ved aftensmaden er nok."],
  },
  "kollegaer": {
    seoTitle: "Spørgsmål til kolleger: 100 kort til teambuilding",
    metaDescription: "100 spørgsmål til kolleger og teams. Gode til teamdage, møder og fredagsbaren, uden at det bliver for privat.",
    intro: "Et team, der kender hinanden, arbejder bedre sammen. Spørgsmålene her er egnede til arbejdspladsen og spænder fra sjove opvarmere til gode samtaler om arbejdsglæde og samarbejde.",
    passerTil: "Teams, afdelinger, nye kolleger og ledere, der vil bryde isen.",
    tips: ["Brug ét kort som opvarmning på teammødet.", "Lad alle sige pas uden forklaring.", "Spørg lederen først, så alle kan se, det er trygt."],
  },
  "hoejtider": {
    seoTitle: "Spørgsmål til jul og højtider: 100 samtalekort",
    metaDescription: "100 spørgsmål til julebordet, nytårsaften, påske og fødselsdage. Skab gode samtaler, når familien er samlet.",
    intro: "Når familien er samlet til jul, påske eller fødselsdag, kører samtalen tit i de samme spor. Kortene her handler om traditioner, minder og året der gik, og giver plads til både grin og eftertanke.",
    passerTil: "Familier og venner, der fejrer noget sammen.",
    tips: ["Læg et kort ved hver tallerken.", "Brug de dybe kort til skåltalen.", "Lad de ældste fortælle om højtider fra deres barndom."],
  },
  "selvindsigt": {
    seoTitle: "Spørgsmål til selvrefleksion: 100 kort til dig selv",
    metaDescription: "100 spørgsmål til selvrefleksion og dagbog. Lær dig selv bedre at kende, alene eller sammen med en, du stoler på.",
    intro: "Nogle spørgsmål er bedst at stille sig selv. Kortene her handler om vaner, værdier og det, der giver energi, og egner sig både til dagbogen og til en ærlig samtale med en, du stoler på.",
    passerTil: "Dig selv, din dagbog eller en fortrolig samtale.",
    tips: ["Skriv svaret ned, før du tænker for meget over det.", "Tag ét spørgsmål om dagen.", "Vend tilbage til de samme spørgsmål om et halvt år."],
  },
  "dilemmaer": {
    seoTitle: "Hvad vil du helst? 120 dilemmaer til bordet",
    metaDescription: "120 dilemmaer uden rigtige svar. Til middagen, bilturen, børnene og fredagsbaren. Vælg, forklar dit valg, og hør hvad de andre siger.",
    intro: "Et dilemma er den hurtigste vej ind i en god diskussion. Der er ingen rigtige svar, men begrundelserne siger meget om, hvem man er. Nogle er fjollede, andre kræver, at man tænker sig om.",
    passerTil: "Alle aldre. Spørgsmålene til børn er markeret som lette.",
    tips: ["Alle skal vælge, og man må ikke sige »begge«.", "Spørg hvorfor. Det er der, snakken begynder.", "Lad den, der svarer sidst, vælge næste kort."],
  },
  "tak": {
    seoTitle: "Taknemmelighed: 70 spørgsmål om at sige tak",
    metaDescription: "70 spørgsmål om taknemmelighed til par, familier og venner. Sig tak for de små ting, og hør hvad de andre sætter pris på ved jer.",
    intro: "Det er let at tage de nære for givet. Kortene her handler om de ting, folk gør for hinanden, og om de mennesker, der har gjort en forskel. Et tak, der bliver sagt højt, glæder ofte mere, end man tror.",
    passerTil: "Par, familier og venner, og en god afslutning på en lang snak.",
    tips: ["Sig tak direkte til den, det handler om, hvis vedkommende sidder ved bordet.", "Vær konkret: sig hvad personen gjorde, og hvad det betød.", "Tag et Tak-kort til sidst, når I har talt om noget svært."],
    forskning: "Taknemmelighed i hverdagen hænger sammen med tættere forhold (Algoe m.fl. 2010), og vi undervurderer, hvor glad modtageren af et tak bliver (Kumar og Epley 2018).",
  },
  "kend-din-partner": {
    seoTitle: "Kend din partner: 70 spørgsmål at gætte på",
    metaDescription: "70 spørgsmål til par, hvor den ene gætter den andens svar. Et let spil, der holder jeres billede af hinanden opdateret.",
    intro: "Man tror, man kender hinanden, indtil man skal gætte. Her gætter den ene, hvad den anden vil svare, og bagefter fortæller den anden, hvordan det egentlig er. Det giver grin, overraskelser og nye ting at spørge ind til.",
    passerTil: "Par, uanset om I har været sammen i et år eller i årtier. Virker også mellem gode venner og søskende.",
    tips: ["Gæt først, så svar, så ét opfølgende spørgsmål.", "Det er fint at gætte forkert. Det er der, I lærer noget nyt.", "Byt roller efter hvert kort."],
    forskning: "Inspireret af parterapeuters øvelser med at kende hinandens indre verden (Gottman) og af forskning i, at det at spørge ind gør os mere vellidte (Huang m.fl. 2017).",
  },
  "gode-nyheder": {
    seoTitle: "Gode nyheder: 70 spørgsmål om det, der går godt",
    metaDescription: "70 spørgsmål der får jer til at fortælle om det, der går godt, og glæde jer over hinandens sejre, små som store.",
    intro: "Vi er ofte gode til at trøste, men glemmer at fejre. Kortene her inviterer til at fortælle om det, der gik godt, og giver den anden en chance for at spørge ind og glæde sig med.",
    passerTil: "Par, familier og venner, også en hurtig runde ved aftensmaden.",
    tips: ["Lytteren stiller to opfølgende spørgsmål, fx »Hvordan føltes det?« og »Hvad betyder det for dig?«.", "Gentag den gode nyhed med dine egne ord, før du fortæller din egen.", "Ingen nyhed er for lille. Det er ofte de små, der fylder mest."],
    forskning: "Hvordan et par reagerer på hinandens gode nyheder, hænger stærkere sammen med forholdets trivsel end reaktionen på dårlige nyheder (Gable m.fl. 2004 og 2006).",
  },
  "nyt-og-ukendt": {
    seoTitle: "Nyt og ukendt: 70 spørgsmål om eventyr sammen",
    metaDescription: "70 spørgsmål om ting, I aldrig har prøvet sammen, fra en ny ret på en tirsdag til den store rejse. Til par og venner, der vil bryde vanen.",
    intro: "Efter nogle år kender man vejen, menuen og hinandens vittigheder. Kortene her handler om det, I endnu ikke har prøvet, og om at gøre hverdagen lidt mindre forudsigelig.",
    passerTil: "Par i lange forhold og venner, der vil finde på noget nyt.",
    tips: ["Vælg ét forslag fra aftenen, og sæt en dato på.", "Små eventyr tæller: en ny gade, en ny ret, en ny bus.", "Spørg, hvordan det føltes at være nybegynder, når I har prøvet det."],
    forskning: "Nye og spændende fælles aktiviteter hænger sammen med højere tilfredshed i lange forhold (Aron m.fl. 2000), og følelsen af at vokse sammen hænger sammen med mere lyst (Muise m.fl. 2019).",
  },
  "svaere-samtaler": {
    seoTitle: "Svære samtaler: 70 spørgsmål med en fast ramme",
    metaDescription: "70 spørgsmål til par, der vil kunne tale om det svære uden at ende i skænderi. Med en fast ramme, pauser og jeg-sprog.",
    intro: "Nogle snakke er svære at tage, men værre at lade være med. Kortene her hjælper jer med at tale om det vigtige på en måde, hvor begge bliver hørt. Tag højst tre kort ad gangen, og start og slut med noget godt.",
    passerTil: "Voksne par og nære venner. Ikke børn og ikke kollegaer.",
    tips: ["Aftal tid og emne på forhånd, og start og slut med et kort fra Tak.", "Sig »jeg føler« og »jeg har brug for« i stedet for »du gør altid«.", "Stop, hvis en af jer bliver overvældet. I kan altid tage resten en anden dag."],
    forskning: "Bygget på forskning i blød opstart og lytning i parforhold (Gottman m.fl. 1998; Reis og Shaver 1988) og på advarslen mod at gruble i ring over de samme problemer (Rose 2002). Det er et samtalespil, ikke terapi.",
  },
  "familiehistorier": {
    seoTitle: "Familiehistorier: 70 spørgsmål til hele familien",
    metaDescription: "70 spørgsmål om familiens historie til spisebordet og familiefesten. Lad børnene interviewe forældre og bedsteforældre.",
    intro: "Hvordan mødtes mormor og morfar? Hvad legede far med som barn? Kortene her får historierne frem, før de bliver glemt. Lad gerne de yngste stille spørgsmålene og de ældste svare.",
    passerTil: "Familier med børn fra cirka 8 år, generationsmøder, højtider og fødselsdage.",
    tips: ["Lad et barn trække kortet og interviewe den ældste ved bordet.", "Spørg videre: »Hvordan så det ud?« og »Hvad sagde de så?«.", "Skriv de bedste historier ned, eller optag dem på telefonen."],
    forskning: "Børn, der kender deres families historier, har det i gennemsnit bedre, og fortællinger, hvor de voksne spørger ind, styrker samtalen (Fivush og kolleger; Fivush, Haden og Reese 2006).",
  },
};
