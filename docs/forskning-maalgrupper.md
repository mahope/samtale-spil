# Research til nye bunker, runde 4 (issue #53)

Udarbejdet 20. oktober 2026 til Snakkespil (snakkespil.dk). Formål: give et kildebaseret grundlag for elleve nye eller udvidede bunker: forældre (første barn og flere børn), studerende, gymnasiet, efterskolen, folkeskolens tre trin, spejder, Gilwell og en udvidelse af Første date.

**Sådan læses rapporten.** Hver sektion har (a) fund med kildehenvisning [R-nummer], (b) temaer, (c) hvad bunken skal undgå, (d) dybdefordeling, (e) otte eksempelkort mærket `let`/`medium`/`dyb` som i `src/data/categories.ts`, og (f) navn, beskrivelse, seoTitle og søgeord. Kildelisten står i afsnit 14 med samme statusmærker som `docs/forskning.md`:

- **Original (delvis)**: læst i originalkilden (helt eller de nævnte afsnit).
- **Abstract læst**: abstract eller et resumé af fuldteksten læst direkte (fx PMC).
- **Sekundær**: abstract-uddrag, pressemeddelelse, søgeresumé eller omtale i andre kilder; fuld tekst ikke læst.
- **Metadata**: kun forfattere, titel, tidsskrift, år og DOI verificeret via Crossref. Indhold er fra egen viden og står med forbehold.

Alle DOI'er i kildelisten er slået op i Crossref i denne session. Hvor indholdet ikke er læst, siger teksten det. Kilder, der allerede står i `docs/forskning.md`, henvises til som "forskning.md nr. X".

**Søgeord.** Volumen er månedligt snit i Danmark (OpenSEO/DataForSEO, Google Ads-data, dansk sprog), hentet 20.10.2026. "Ingen data" betyder ingen række i værktøjet, ikke nødvendigvis nul.

**seoTitle-konvention.** Eksisterende seoTitles har antal kort i titlen ("80 samtalekort"), og `categories.test.ts` tjekker at tallet passer. Forslagene nedenfor bruger 80 som pladsholder. Ret tallet til den endelige bunkestørrelse.

---

## 1. Kort resumé på tværs

1. **Overgange er det fælles tema.** Næsten alle målgrupperne står midt i en overgang: første barn, barn nummer to, studiestart, 1.g, efterskoleåret, skoleskift mellem trin, første lejr, første lederrolle, første møde. Forskningen peger på, at det hjælper at gøre det normale ved besværet synligt ("det er svært for de fleste i starten") frem for at love, at alt bliver fedt (Walton & Cohen 2011 [R24]; Juul m.fl. 2014 [R34]).
2. **Pas på fortællingen om at "alle har det godt".** På efterskolen var 42 % enige i, at det er ens egen skyld, hvis man er uden for fællesskabet [R34]. AU-studerende: 43 % har i det mindste nogle gange følt sig ensomme på studiet [R26]. Kortene bør give plads til hjemve, ensomhed og at have det svært, uden at nogen skal udstille sig.
3. **Positive udvekslinger beskytter.** Hos nybagte forældre var fondness, opmærksomhed og at se problemer som noget "vi" kan løse forbundet med mindre fald i tilfredshed (Shapiro, Gottman & Carrère 2000 [R4]). Det passer med taknemmelighedsforskningen i forskning.md (afsnit 3.4).
4. **Børn i en klasse er ikke et par ved et bord.** Folkeskolekort skal fungere i en gruppe, hvor ingen har valgt hinanden, og hvor læreren har ansvaret. Ingen dybe kort, ingen kort om hjemmet, økonomi, krop, religion eller etnicitet, og ingen kort, der rangerer kammerater.
5. **Nysgerrighed slår præsentation.** Ved første møder hænger nysgerrighed sammen med nærhed (Kashdan & Roberts 2004 [R53]; Kashdan m.fl. 2011 [R54]), og vi undervurderer, hvor godt den anden kunne lide os (Boothby m.fl. 2018 [R55]). Kortene skal invitere til opfølgning, ikke til at sælge sig selv.

---

## 2. Forældre for første gang

### (a) Fund

1. **Et lille til middelstort, vedvarende fald efter fødslen.** 218 par fulgt de første otte år af ægteskabet. Forældre viste et pludseligt fald efter fødslen i både observeret og selvrapporteret parforholdsfunktion, sammenlignet med niveauet før fødslen. Faldet var lille til middelstort, holdt sig resten af perioden og var nogenlunde lige stort for mødre og fædre (Doss m.fl. 2009 [R1], sekundær).
2. **Men barnløse par falder også.** En metaanalyse af 37 studier (graviditet til efter fødslen) plus 4 studier af nygifte uden børn fandt små fald i tilfredshed til ca. 11 måneder efter fødslen (samlet g = -0,23), og barnløse nygifte faldt i samme takt. Forfatterne foreslår, at noget af faldet er en almindelig udvikling i nye forhold, ikke kun en "babyeffekt" (Mitnick, Heyman & Smith Slep 2009 [R2], abstract læst).
   **Betydning:** kortene må ikke love at "redde" parforholdet eller sige at et barn gør forholdet dårligere. Budskabet er: det er normalt at det bliver hårdere, og det hjælper at tale sammen.
3. **Hvad der beskytter.** 82 nygifte par fulgt i 4-6 år (43 fik børn). Ifølge universitetets pressemeddelelse var fondness og hengivenhed for partneren, opmærksomhed på partnerens liv, og en tilgang hvor problemer er noget "vi" kan løse, forbundet med mindre fald i hustruens tilfredshed (Shapiro, Gottman & Carrère 2000 [R4], sekundær).
4. **Bringing Baby Home.** Gottman-gruppens workshop til nybagte forældre er evalueret efter ét år (Shapiro & Gottman 2005 [R5]). Tallene der ofte citeres (fx "22,5 % mod 66,5 % fødselsdepression" og "67 % oplever stort fald") stammer fra Gottman Institute og Greater Good [R64], ikke fra et abstract jeg har læst. **Brug dem ikke i markedsføring.** Et australsk randomiseret forsøg er registreret (ANZCTR 2023 [R65]), men uden publicerede resultater.
5. **Parforløb omkring fødslen findes og er afprøvet.** Cowan & Cowan har siden 1990'erne argumenteret for og afprøvet parforløb ved overgangen [R6], og der findes en metaanalyse af parinterventioner i overgangen (Pinquart & Teubert 2010 [R7], kun metadata) samt randomiserede forsøg med "Family Foundations" om samarbejdet som forældre (Feinberg & Kan 2008 [R8], metadata) og korte forløb om coparenting og parforhold (Doss m.fl. 2014 [R9], metadata). Jeg har ikke læst effektstørrelserne. Pointen for Snakkespil: samarbejdet som forældre ("coparenting") er et selvstændigt emne ved siden af kærligheden.
6. **Søvn.** Medina, Lederhos & Lillis (2009) [R10] handler ifølge titlen om forstyrret søvn og fald i tilfredshed i overgangen (kun metadata). Brug det som baggrund for at gøre kortene korte og lette at tage i små bidder, ikke som dokumenteret årsag.
7. **Fødselsdepression rammer begge forældre.** Ifølge VIVE får omkring 11 % af mødre og 7 % af fædre en depression i forbindelse med graviditet og fødsel [R12, sekundær]. Andre danske kilder giver 10-15 % for mødre og 3-10 % for fædre afhængigt af definition. Paulson & Bazemore (2010) [R11] er en metaanalyse af depression hos fædre før og efter fødslen og dens sammenhæng med moderens depression (metadata). Gavin m.fl. (2005) [R13] er en systematisk oversigt over forekomst (metadata).
8. **Overgangen er et vindue for voksnes helbred.** Saxbe, Rossin-Slater & Goldenberg (2018) [R14] beskriver overgangen til forældreskab som et kritisk vindue for voksnes helbred (metadata). Bruges kun som ramme.

### (b) Temaer kortene bør dække

- Glæde og små øjeblikke med barnet (positiv grundtone, kapitalisering).
- Taknemmelighed rettet mod partneren som forælder (fondness).
- Rollefordeling og "hvem husker hvad" (det usynlige arbejde), uden at gøre det til en anklage.
- Identitet: hvem er jeg nu, ud over mor/far/forælder.
- Søvn, træthed og hvordan man spørger om hjælp.
- Familien og egen opvækst: hvad vil vi tage med og lade ligge.
- Parforholdet som "os to": tid alene, nærhed, humor.
- Før fødslen: forventninger og bekymringer (et underspor til par der venter).

### (c) Hvad bunken skal undgå

- **Ingen screening og ingen diagnose.** Kortene må ikke ligne spørgeskemaer om depression ("Har du følt dig håbløs de sidste 14 dage?"). Det er sundhedsplejerskens og lægens arbejde.
- **En ansvarlig henvisning i bunkens intro og vejledning:** "Hvis en af jer i længere tid er meget trist, angst eller ikke kan glæde sig over noget, så tal med sundhedsplejersken eller jeres egen læge. Fødselsdepression rammer både mødre og fædre, og den kan behandles." Navngiv ikke foreninger eller telefonnumre, før de er tjekket på deres egne sider (ikke verificeret i denne research).
- Ingen kort om fødslen som traume eller om tab, abort eller fertilitetsbehandling. Det er for sårbart til en tilfældig trækning.
- Ingen kort der tager parti i hvem der gør mest. Formulér så begge kan svare.
- Ingen løfter om at spillet forebygger fald i tilfredshed (jf. fund 2 og 4).
- Sprog: "forælder" og "partner" frem for kun mor/far, så bunken virker for alle familieformer.

### (d) Dybdefordeling

35 % let, 45 % medium, 20 % dyb. Mange korte, lette kort, fordi spillet tit spilles træt og i småbidder.

### (e) Eksempelkort

- "Hvilken lille ting ved vores barn har fået dig til at smile i dag?" · let
- "Hvad gør jeg som forælder, som du ikke har nået at sige tak for?" · let
- "Hvis vi fik én fri time i aften, hvad skulle vi så bruge den på?" · let
- "Hvordan havde du forestillet dig en almindelig dag med et lille barn, og hvad er blevet anderledes?" · medium
- "Hvornår har du sidst følt dig som dig selv og ikke kun som forælder?" · medium
- "Hvilken opgave derhjemme fylder mest i dit hoved, også når du ikke laver den?" · medium
- "Hvad har du brug for fra mig, når du er helt udmattet og ikke orker at forklare det?" · dyb
- "Hvad er du bange for at miste af os to, og hvad tror du, vi kan holde fast i?" · dyb

### (f) Navn og SEO

- **Titel:** Nye forældre
- **Beskrivelse:** Til jer, der venter eller lige har fået jeres første barn
- **seoTitle-forslag:** Spørgsmål til nybagte forældre: 80 kort til jer to
- **Søgeord:** nybagte forældre (70), parforhold efter fødsel (10), samtalekort par (390, bredt). "fødselsdepression" (1.000) er ikke et mål for en spilbunke, men kan få en henvisning i vejledningsteksten. "parforhold efter baby" og "spørgsmål til gravide": ingen data.

---

## 3. Forældre igen (flere børn)

### (a) Fund

1. **Søskendeovergangen er ikke en krise for de fleste.** Et review af 30 studier fandt ikke støtte for en "krisemodel". Den førstefødte blev typisk mindre kærlig og lydhør over for mor, men for søvn, angst, aggression og tilbagefald var resultaterne blandede. For nogle børn er overgangen svær, for andre et udviklingsskridt, og for andre sker der ikke meget (Volling 2012 [R15], sekundær).
2. **Samarbejdet som forældre bliver sværere.** 241 familier fulgt over fødslen af barn nummer to: mere konflikt og mindre samarbejde i forældreskabet. Fædre med højere tilfredshed i parforholdet samarbejdede mere fire måneder efter fødslen, og en førstefødt med et vanskeligt temperament trak samarbejdet ned (Kuo, Volling & Gonzalez 2017 [R16], sekundær).
3. **Parforholdet kommer sig ofte.** Ifølge University of Michigans pressemeddelelse om samme forskningsprojekt faldt tilfredsheden i de første uger, men kom hos mange tilbage på niveauet før fødslen efter ca. fire måneder, og faldet hang sammen med parrets kommunikation [R17, sekundær; artiklen er ikke identificeret]. Brug det som opmuntring, ikke som løfte.
4. **Retfærdighed handler om forklaring, ikke ens fordeling.** Børn tager ikke nødvendigvis skade af at blive behandlet forskelligt, hvis de forstår og oplever forskellen som fair (Kowal & Kramer 1997 [R18], sekundær). Når børn opfattede forældrenes forskelsbehandling som fair, hang det sammen med færre indadvendte problemer og højere selvværd (Kowal, Kramer, Krull & Crick 2002 [R19], sekundær).
5. **Søskendeforholdet betyder noget for børnenes trivsel.** En metaanalyse fandt sammenhæng mellem kvaliteten af søskendeforholdet og psykiske vanskeligheder hos børn og unge (Buist, Deković & Prinzie 2013 [R22], metadata). Feinberg, Solmeyer & McHale (2012) [R23] kalder søskendeforholdet "the third rail" og argumenterer for forebyggelse (metadata).
6. **Søskendeforhold kan styrkes.** Kramer & Gottman (1992) [R20] undersøgte, hvordan den førstefødtes venskaber og sociale færdigheder hang sammen med forholdet til det nye søskende, og Kennedy & Kramer (2008) [R21] afprøvede et kort forløb om følelsesregulering og søskendeforhold (begge metadata).

### (b) Temaer

- Tid alene med hvert barn (og at det er svært at få til at gå op).
- Hvad "retfærdigt" betyder hos os, og hvordan man forklarer forskelle.
- Logistik og fordeling: hvem gør hvad, hvad kan droppes.
- At være et hold som forældre (coparenting), også når man er uenige.
- Søskendedynamik: jalousi, stolthed, roller (den store, den lille, mellembarnet).
- Parforholdet med flere børn: små pauser, humor, at se hinanden.
- Det man har lært fra første gang, og det der er anderledes.

### (c) Hvad bunken skal undgå

- Kort der beder forældrene om at sammenligne børnene ("Hvem er nemmest?", "Hvem ligner mig mest?"). Det kan blive hørt, og det er netop den form for forskelsbehandling, børn reagerer på.
- Kort der kan læses som "hvem af børnene kan du bedst lide".
- Kort der antager to forældre, samme husstand eller biologiske søskende. Formulér, så bonusfamilier og delebørn også kan bruge dem.
- Ingen kort om tab af et barn eller om ufrivillig barnløshed med det næste barn.
- Bunken er til de voksne. Lav evt. en lille børnevariant ("Til storebror og storesøster") senere, med kun lette kort.

### (d) Dybdefordeling

40 % let, 45 % medium, 15 % dyb.

### (e) Eksempelkort

- "Hvad overraskede dig mest ved at blive forældre igen, sammenlignet med første gang?" · let
- "Hvad gør vores ældste lige nu, som du gerne ville have, vi lagde mere mærke til?" · let
- "Hvilken del af logistikken ville du helst bytte væk, og hvilken tager du gerne?" · let
- "Hvornår har du sidst haft tid alene med hvert af børnene, og hvad lavede I?" · medium
- "Hvad betyder retfærdigt hjemme hos os: at alle får det samme, eller at alle får det, de har brug for?" · medium
- "Hvad kan vi sige til børnene, når de oplever, at den ene får mere end den anden?" · medium
- "Hvad savner du fra tiden, hvor vi var færre, og hvad ville du aldrig bytte tilbage?" · medium
- "Hvor trækker vi i hver sin retning som forældre, og hvor er vi et godt hold?" · dyb

### (f) Navn og SEO

- **Titel:** Forældre igen
- **Beskrivelse:** Til forældre med flere børn: søskende, retfærdighed og tid til jer to
- **seoTitle-forslag:** Spørgsmål til forældre med flere børn: 80 kort
- **Søgeord:** søskende (880), storebror (590, mest produkter og bøger), søskendejalousi (70). Bunken bør nok lande på en side om søskende og "storebror/storesøster" frem for et forældre-søgeord.

---

## 4. Studerende på videregående uddannelse

### (a) Fund

1. **Ensomhed er udbredt, også efter corona.** På Aarhus Universitet svarede 43 % i 2023, at de "nogle gange", "ofte" eller "altid" har følt sig ensomme på studiet (12 % ofte, 2 % altid; n = 10.753). Kvinder 46 %, mænd 39 %. Internationale studerende 62 % mod 41 % blandt danske. Andelen var 40 % i 2018 og 46 % i 2020 (AU Studiemiljøundersøgelse 2023 [R26], original læst). Det er AU-tal, ikke landstal.
2. **Unge voksne er de mest ensomme.** I 2022 følte 9 % af de 16-29-årige sig ensomme hele eller det meste af tiden, den højeste andel af alle aldersgrupper (Danmarks Statistik, Levevilkårsundersøgelsen [R28], sekundær).
3. **Det sociale i studiestarten har selvstændig betydning for frafald.** EVA's forløbsstudie (14.660 studerende optaget 2016): et stærkt socialt aspekt i studiestarten hang sammen med mindre frafald i første semester, også når der blev taget højde for varighed (ca. -1,9 procentpoint på universiteterne pr. indekspoint). Længere studiestart hjalp op til ca. ti dage på universiteter. På aggregeret niveau havde dannelse af studiegrupper, studieteknik og alkoholforbrug ingen påviselig sammenhæng med det kortsigtede frafald. EVA understreger, at de godt kan have betydning for trivsel og integration (EVA 2017 [R27], resultatafsnit læst).
   **Betydning:** rusture og tutorforløb er det rigtige sted for kortene, og det sociale er det, der tæller.
4. **Tvivl om at høre til er normalt, og det hjælper at vide det.** I et randomiseret forsøg fik førsteårsstuderende en kort øvelse, hvor bekymring for at høre til blev fremstillet som almindelig og forbigående. Det forbedrede karakterer og helbred over de følgende år for sorte studerende (Walton & Cohen 2011 [R24], metadata + egen viden; se også Walton & Cohen 2007 [R25]).
   **Betydning:** kort som "Hvornår har du følt, at du ikke helt hørte til?" virker bedst, når flere svarer, så man hører at det er fælles.
5. **Gode samtaler med fremmede er bedre end forventet.** Dybe samtaler bliver mindre akavede og mere forbindende end folk tror (Kardas, Kumar & Epley 2022, forskning.md nr. 8), og "36 spørgsmål" blev oprindeligt brugt mellem studerende, der ikke kendte hinanden (Aron m.fl. 1997, forskning.md nr. 1). Det taler for kort til rusture og studiegrupper.
6. **Pas på fælles grublen.** Hos studerende er fælles grublen (co-rumination) forbundet med mere angst og nedtrykthed (Calmes & Roberts 2008, forskning.md nr. 42b; Rose 2002, nr. 42). Kort om eksamen og pres skal pege mod det, der hjælper, ikke mod at gentage bekymringerne.

### (b) Temaer

- Første tid: forventninger mod virkelighed, de første mennesker man mødte.
- At høre til, og at tvivlen er fælles.
- Faglig passion og nysgerrighed (hvorfor valgte du det her?).
- At bo for sig selv, hverdagsliv, mad, søvn.
- Fremtid og identitet ud over karakterer.
- Studiegruppen: hvordan vi arbejder sammen, forventninger til hinanden.
- Økonomi på et generelt niveau (SU-livet, prioriteringer), aldrig konkrete tal.

### (c) Hvad bunken skal undgå

- Drukkort og "jeg har aldrig"-varianter. Ikke alle drikker, og bunken skal også fungere for internationale og ældre studerende.
- Kort om karakterer, gennemsnit eller konkret økonomi, der skaber sammenligning i en gruppe af fremmede.
- Dybe kort om psykisk sygdom, familiekonflikter eller seksualitet i rustursversionen. Lav i stedet to spor: "Rustur" (let/medium) og "Venner på studiet" (med dybe kort).
- Antagelser om at alle er 20, danske og nye i byen. Internationale studerende og ældre studerende er også i målgruppen.
- Henvisning i vejledningen: studievejledningen på uddannelsen og egen læge. Navngiv kun rådgivningstilbud, når de er tjekket på deres egne sider.

### (d) Dybdefordeling

45 % let, 40 % medium, 15 % dyb (rustur-sporet uden dyb).

### (e) Eksempelkort

- "Hvad troede du, studielivet ville være, før du startede, og hvad er det i virkeligheden?" · let
- "Hvilket emne kan du blive ved med at tale om, selv når ingen har spurgt?" · let
- "Hvem var den første, du faldt i snak med herinde, og hvad snakkede I om?" · let
- "Hvad er det sværeste ved at bo for dig selv, som ingen fortalte dig på forhånd?" · medium
- "Hvornår har du sidst følt, at du ikke helt hørte til, og hvad hjalp?" · medium
- "Hvis du kunne give dig selv ét råd på første studiedag, hvad skulle det så være?" · medium
- "Hvad ville du læse, hvis karakterer og jobmuligheder ikke fandtes?" · medium
- "Hvem håber du at være, når du er færdig her, ud over en med et eksamensbevis?" · dyb

### (f) Navn og SEO

- **Titel:** Studieliv
- **Beskrivelse:** Til rusturen, studiegruppen og vennerne fra studiet
- **seoTitle-forslag:** Spørgsmål til studiestart og rustur: 80 kort
- **Søgeord:** studiestart (260), rustur (140), studiegruppe (70), icebreaker spørgsmål (30). "ensomhed studerende": ingen data.

---

## 5. Gymnasiet (STX, HHX, HTX, HF)

### (a) Fund

1. **Alle elever oplever svære perioder.** EVA interviewede elever, lærere, ledere, elevcoaches og vejledere på seks gymnasiale uddannelser. Alle elever havde oplevet perioder, hvor de havde brug for hjælp. Mange beskriver en ond cirkel, hvor de kommer bagud med skolearbejde og søvn og ikke føler, de slår til (EVA 2019 [R29], resumé læst).
2. **Forskellige grunde til mistrivsel.** Nogle elever er ensomme, andre presset af de faglige krav, andre i krise derhjemme. Ensomme elever har ikke nødvendigvis højt fravær, så de opdages sent [R29].
3. **Opstarten er vigtig men ofte svær, og fællesskaber skal have plads til at være sig selv** (kapiteloverskrifter 4.1 og 4.2 i [R29]). Eleverne peger på, at læreren skal styre gruppedannelsen og sætte rammer for klasserumskulturen [R29].
4. **Lærer-elev-relationen bærer trivslen.** Eleverne oplever en god relation, når de bliver set og hørt som hele mennesker. Forskellige feedbackformer kan modvirke oplevelsen af præstationspres [R29]. En systematisk oversigt fandt også, at skolens miljø, især relationen til lærerne, hænger sammen med unges følelsesmæssige trivsel (Kidger m.fl. 2012 [R33], metadata).
5. **Trivsel måles hvert år.** Med gymnasiereformen fra 2017 er elevtrivsel et af tre retningsgivende mål, og alle gymnasiale uddannelser gennemfører en årlig national trivselsmåling med lokal handlingsplan [R29]. Skolers egne rapporter viser bl.a. et delindeks for "arbejdspres" (enkelte skolers rapporter, ikke landstal).
6. **Pres og stress er et kendt tema.** Center for Ungdomsforskning har afsnit om præstationskultur og karakterer i sine kommunale ungdomsprofiler (fx Gentofte 2020 [R66]), og et folketingsbilag citerer en ungdomsprofil fra 2014 om, at 39 % af gymnasie- og hf-elever følte sig stressede ugentligt [R67] (sekundær, ikke selvstændigt tjekket).
7. **Identitet bygges i fortællinger.** Unge udvikler deres selvforståelse ved at fortælle om deres oplevelser til andre og få respons (McLean, Pasupathi & Pals 2007 [R32], metadata). Det taler for kort om konkrete oplevelser frem for abstrakte "hvem er du"-spørgsmål.
8. **Fælles grublen igen.** Piger i teenageårene taler mere om problemer med veninder, hvilket giver nærhed, men også mere angst og nedtrykthed, når det bliver til grublen (Rose 2002, forskning.md nr. 42; Rose & Rudolph 2006 [R31], metadata).

### (b) Temaer

- Start og grundforløb: nye mennesker, klassen, at finde sin plads.
- Pres og "godt nok": balance mellem skole, fritid, job og søvn.
- Venskaber og fællesskaber med plads til at være sig selv.
- Studievalg og fremtid: interesse mod karakterkrav.
- Fag og læring: hvad tænder dig, hvad har overrasket.
- Små glæder i hverdagen og fester/traditioner.

### (c) Hvad bunken skal undgå

- Kort, der lægger op til at sammenligne karakterer, gennemsnit eller planer om adgangskvotient.
- Kort om krop, udseende, seksualitet, alkohol eller hjemmeforhold i en klassesituation.
- Dybe kort i klassebrug. Lav vejledningen sådan, at **klassen/mentorgruppen** bruger let og medium, og at dybe kort er til venner, der selv vælger det.
- Kort, der får en bekymring til at vokse ("Hvad er du mest bange for at dumpe i?"). Peg mod det, der hjælper.
- Henvisning i vejledningen: "Tal med din studievejleder, kontaktlærer eller elevcoach, hvis noget fylder for meget."

### (d) Dybdefordeling

50 % let, 40 % medium, 10 % dyb. De dybe kort skal handle om værdier og fremtid, aldrig om familie, krop eller svære oplevelser.

### (e) Eksempelkort

- "Hvilket fag overraskede dig mest, da du startede, positivt eller negativt?" · let
- "Hvad er det bedste, der er sket i klassen i år?" · let
- "Hvad laver du, når du skal koble helt af fra skolen?" · let
- "Hvornår lærer du mest: når det er sjovt, når det er svært, eller når nogen tror på dig?" · medium
- "Hvad ville du sige til en ny elev, der er bange for ikke at få venner?" · medium
- "Hvornår er godt nok faktisk godt nok for dig?" · medium
- "Hvad ved du nu om dig selv, som du ikke vidste, da du startede?" · medium
- "Hvis du skulle vælge uddannelse efter, hvad der gør dig glad, og ikke efter karaktererne, hvad ville du så vælge?" · dyb

### (f) Navn og SEO

- **Titel:** Gymnasiet
- **Beskrivelse:** Til klassen, mentorgruppen og vennerne i gymnasiet og på HF
- **seoTitle-forslag:** Spørgsmål til gymnasieelever: 80 samtalekort
- **Søgeord:** "spørgsmål til unge" (10), "spørgsmål til teenager" (10), "samtalekort til teenagere" (ingen data). Lav volumen. Bunken bør mest bygge på interne links fra en "trivsel i klassen"-side (20) og "klassens tid" (90).

---

## 6. Efterskolen

### (a) Fund

1. **At turde være sig selv er den vigtigste værdi.** I en undersøgelse af 9. klasse på otte efterskoler (eftermåling, N = 257) svarede 47 %, at "at man tør være sig selv" var den værdi, der var mest respekt om blandt eleverne. 26 % nævnte "at man kan tale med alle". Karakterer og kæreste lå på 2 og 0 % (Juul m.fl. 2014, CeFU og DAMVAD [R34], original kap. 6-7 læst).
2. **De fleste har det godt socialt, men ikke alle.** 88 % havde haft det godt socialt, 9 % hverken godt eller dårligt og 3 % dårligt. 27 % var uenige i, at ingen er uden for fællesskabet [R34].
3. **"Din egen skyld, hvis du er udenfor."** 42 % var enige i, at man selv er skyld i det, hvis man er uden for fællesskabet. Rapporten advarer om, at den stærke fortælling om det gode fællesskab kan individualisere eksklusion og ensomhed, og spørger, om der også skal være rammer for at trække sig tilbage [R34].
   **Betydning:** bunken må ikke forstærke "alle har det fedt". Den skal gøre det normalt at have hjemve og dårlige dage og give fællesskabet et ansvar ("Hvad kan vi gøre, så ingen sidder alene?").
4. **Rammerne er døgnet rundt.** Skolerne blander bevidst eleverne via faste pladser, sammensætning af værelser, klasser og kontaktgrupper, og der er mange aktiviteter i starten, hvor man "tvinges" til at møde hinanden [R34]. Eleverne kan ikke lægge en rolle fra sig efter skoletid, hvilket både skaber nærhed og pres.
5. **Kontaktgruppen og kontaktlæreren er den centrale ramme.** Kontaktgrupper med en lærer (én elev nævner "højst 10"), ofte med ugentlige møder, hvor fx det at være kærester på efterskolen tages op. Kontaktlæreren holder øje med trivslen uden for skoletiden [R34].
6. **Også de ressourcestærke kan have det svært.** Lærere beskriver elever, der ser ud til at klare sig, men "har ondt i sjælen" eller er overambitiøse [R34].
7. **Fællesskab og relation til lærerne går igen.** Idrætsefterskoleundersøgelsen 2022 (FIIBL og SDU, 5.333 elever) dækker fællesskab, relationen til lærerne, livskompetencer og trivsel [R35, sekundær; tal ikke læst].
8. **Begrænsninger.** [R34] er fra 2014 og handler kun om 9. klasse på otte skoler. Jeg fandt ingen undersøgelse specifikt om hjemve. Søgeordet "hjemve" har dog 1.300 søgninger om måneden, hvilket viser behovet.

### (b) Temaer

Tre spor, som kan være tre minibunker eller filtre:

- **Værelset:** at lære en værelseskammerat at kende, vaner, grænser, aftentimer.
- **Kontaktgruppen:** fællesskab, traditioner, ansvar for hinanden, hjemve, at sige fra.
- **Hjemme bagefter:** hvad tager man med, hvordan har man forandret sig, hvordan er det at komme hjem til familien og de gamle venner.

Plus efterskolens egne temaer: fællessang, aftenvagt, temauger, idræt, gallafest, "efterskoleåret".

### (c) Hvad bunken skal undgå

- Kort, der presser til at sige noget om andre elever ("Hvem på gangen er …?") eller til at rangere.
- Kort om kærester, sex, alkohol eller regler, der kan bryde skolens ordensregler.
- Kort om forældre og hjemmet i kontaktgruppesporet (ikke alle har et godt hjem at vende tilbage til). Hjemmesporet er til familien selv.
- Den implicitte besked om at hjemve er et nederlag.
- Henvisning i vejledningen: "Tal med din kontaktlærer, hvis noget fylder." For børn og unge under 18 kan BørneTelefonen nævnes (Børns Vilkår, anonym og gratis rådgivning). Tjek nummer og åbningstider på bornetelefonen.dk, før de skrives ind.

### (d) Dybdefordeling

50 % let, 40 % medium, 10 % dyb. Eleverne er 14-18 år. Dybe kort kun i hjemme-sporet eller til venner, og kun om værdier og forandring.

### (e) Eksempelkort

- "Hvad var det første, du lagde mærke til ved din værelseskammerat?" · let
- "Hvilken efterskoletradition vil du huske resten af livet?" · let
- "Hvad er det bedste og det mest irriterende ved at bo så tæt sammen med andre?" · let
- "Hvornår har du haft hjemve, og hvad hjalp dig igennem?" · medium
- "Hvem herpå har du lært at kende, som du aldrig var faldet i snak med derhjemme?" · medium
- "Hvad kan vi gøre i kontaktgruppen, så ingen sidder alene en fredag aften?" · medium
- "Hvad tager du med hjem fra efterskolen, som ikke kan pakkes i en kuffert?" · medium
- "Hvad har efterskoleåret lært dig om, hvem du er, når ingen fra din gamle klasse kigger?" · dyb

### (f) Navn og SEO

- **Titel:** Efterskolen
- **Beskrivelse:** Til værelset, kontaktgruppen og snakken derhjemme efter efterskoleåret
- **seoTitle-forslag:** Spørgsmål til efterskolen: 80 kort til værelset
- **Søgeord:** hjemve (1.300) er det oplagte, fx en side om "hjemve på efterskole" med kortene. "efterskole" (18.100) har en anden hensigt (valg af skole) og bør ikke være målet. "efterskole spørgsmål": ingen data.

---

## 7. Folkeskolen: fælles grundlag for de tre trin

### Fund der gælder alle tre trin

1. **Trivslen falder.** I den nationale trivselsmåling for 4.-9. klasse lå den generelle trivsel på 3,6 af 5 i 2023/24 mod 3,8 i 2015/16 [R36, sekundær]. En analyse fra Cepos (2025) beskriver et fald i social trivsel fra 4,1 til 3,9 [R68, sekundær].
2. **Indskolingen har sin egen måling.** 0.-3. klasse besvarer 20 spørgsmål med svarene "Nej", "Ja, lidt" og "Ja, meget", fx "Er du glad for din skole?" [R37, sekundær; kommunerapporter]. Kortsproget for de små bør ligne det: korte, konkrete, ja/nej-venlige spørgsmål, der kan uddybes.
3. **Mobning er udbredt, og noget af den handler om etnicitet.** Børns Vilkår skrev 6. august 2024, at "12,1 procent af eleverne i 4. til 9. klasse har inden for det seneste skoleår oplevet mobning", med henvisning til de nationale trivselsmålinger [R39, original læst; målingens årgang er ikke angivet]. En rapport fra Børns Vilkår og Institut for Menneskerettigheder (2024) fandt, at halvdelen af elever med etnisk minoritetsbaggrund var blevet mobbet på grund af hudfarve, nationalitet, religion eller kultur [R38, sekundær].
   **Betydning:** klassekort må aldrig få en elevs kultur, religion, sprog eller familiebaggrund til at stå frem.
4. **Klassens tid.** Med folkeskolereformen blev "klassens time" til "klassens tid". Ifølge et udvalgsbilag fra Københavns Kommune svarer den til 30 timer årligt, varetaget af klasselæreren, men skolerne organiserer den forskelligt [R44, sekundær]. Samtalekort passer ind her.
5. **Klassemøder virker, når de bliver brugt ordentligt.** I et randomiseret forsøg med Responsive Classroom (24 skoler, 2.904 elever fulgt fra 2. til 5. klasse; at tilgangen bl.a. har et dagligt morgenmøde, er egen viden) klarede skolerne sig ikke bedre samlet, men brug af praksisserne hang sammen med bedre resultater i matematik og læsning (Rimm-Kaufman m.fl. 2014 [R41], sekundær). Effekten afhang af, at lærerne faktisk brugte metoden.
6. **Fri for Mobberi bruger samtaletavler.** Red Barnet og Mary Fondens program til 3-8-årige bruger bl.a. billeder til samtale om leg, konflikter og gode stunder. Evalueringerne, jeg fandt, er ledernes egne vurderinger, ikke effektmålinger [R40, sekundær].
7. **Udviklingspsykologi pr. alder** (Eccles 1999 [R42], metadata + egen viden; Piaget og Selman som almindelig lærebogsviden):
   - **6-9 år:** konkret tænkning, her og nu, egne oplevelser. Selvbilledet er ofte positivt og bliver mere realistisk hen mod 8-9 år, hvor sammenligning med andre tager til. Kan sætte sig i andres sted i enkle situationer.
   - **10-12 år:** begynder at kunne tænke over regler, retfærdighed og andres synspunkter på samme tid. Venskaber bliver mere gensidige og loyale. Sammenligning og gruppepres vokser.
   - **13-16 år:** abstrakt tænkning, identitet, værdier og fremtid. Stor følsomhed over for jævnaldrendes blik, så det er risikabelt at afsløre noget personligt i en hel klasse.

### Fælles regler for klassebunker (gælder 6, 7 og 8)

- **Ingen dybe kort.** Kun let og medium.
- **Ikke spørge om:** hjemmet og familien (skilsmisse, søskende, forældres arbejde), økonomi (ferie, gaver, lommepenge, mobiltelefon), krop og udseende, sygdom, religion, etnicitet, sprog derhjemme, og kærester.
- **Ingen rangering af kammerater:** ikke "hvem er din bedste ven i klassen", "hvem er sjovest", "hvem ville du sidde ved siden af".
- **Altid "pas" uden forklaring,** og læreren starter selv.
- **Kort om fællesskabet frem for den enkelte,** fx "Hvad kan man sige til en, der står alene?" i stedet for "Har du nogensinde stået alene?".
- **Fiktion og fantasi** er en god vej ind for de små: man kan svare personligt uden at udstille sig.

---

## 8. Indskoling (0.-3. klasse, 6-9 år)

### (a) Fund

1. **Sproget i målingen er enkelt.** Indskolingens trivselsmåling har 20 spørgsmål med svarene "Nej", "Ja, lidt" og "Ja, meget" [R37]. Kortene bør være lige så korte og kunne besvares med et ord, som læreren så kan spørge videre til.
2. **Samtaletavler bruges allerede.** Fri for Mobberi (3-8 år) bruger billeder til samtaler om leg, konflikter og gode stunder [R40]. Kort med et lille billede eller en tegning vil passe ind i den praksis.
3. **Konkret og her og nu.** 6-9-årige tænker konkret og om egne oplevelser, og selvbilledet bliver mere realistisk hen mod 8-9 år, når sammenligning med andre tager til (Eccles 1999 [R42], metadata + egen viden).
4. **Fortællinger om konkrete episoder giver mest.** Børns udbytte af samtaler afhænger af detaljerede, uddybende fortællinger om bestemte begivenheder (Fivush, Haden & Reese 2006, forskning.md nr. 33).
5. **Klassemøder virker, når de bruges.** I Responsive Classroom-forsøget kom gevinsten kun, når lærerne faktisk brugte praksisserne [R41]. Små, faste samtalerunder slår et stort engangsforløb.

### (b) Temaer

- Leg og frikvarter.
- Venskab: hvad er en god legekammerat, hvordan man hjælper.
- Følelser: hvordan kan man se, at nogen er glade, kede af det, vrede.
- At blive bedre til noget.
- Fantasi og opfindelser.
- Klassen som "os": navne, maskot, regler vi er enige om.

### (c) Hvad bunken skal undgå

Fællesreglerne i afsnit 7, plus: ingen kort, der kræver læsning af lange sætninger (læreren læser op), ingen ord, børn ikke kender, og ingen spørgsmål om "hvad laver din far/mor".

### (d) Dybdefordeling

75 % let, 25 % medium, 0 % dyb.

### (e) Eksempelkort

- "Hvilken leg fra frikvarteret skulle hele klassen prøve?" · let
- "Hvis vores klasse havde et maskotdyr, hvad skulle det så hedde?" · let
- "Hvad er du blevet bedre til, siden du startede i skole?" · let
- "Hvad ville du opfinde, hvis du kunne opfinde hvad som helst?" · let
- "Fortæl om en gang, hvor nogen hjalp dig. Hvad gjorde de?" · let
- "Hvad gør en god legekammerat?" · medium
- "Hvad kan man sige til en, der står alene i frikvarteret?" · medium
- "Hvordan kan man se på en ven, at han eller hun er ked af det?" · medium

### (f) Navn og SEO

- **Titel:** Indskolingen
- **Beskrivelse:** Korte, trygge spørgsmål til 0.-3. klasse og klassens tid
- **seoTitle-forslag:** Spørgsmål til børn i indskolingen: 80 samtalekort
- **Søgeord:** samtalekort børn (260), spørgsmål til børn (50), sjove spørgsmål til børn (20), trivselslege (30). Bemærk at den eksisterende bunke "Børn" (6-12 år, spisebordet) dækker "spørgsmål til børn" i dag. Skolebunkerne bør målrettes klassen.

---

## 9. Mellemtrin (4.-6. klasse, 10-12 år)

### (a) Fund

1. **Trivslen falder, og målingen starter her.** Den nationale måling for 4.-9. klasse viste generel trivsel på 3,6 af 5 i 2023/24 mod 3,8 i 2015/16 [R36], og social trivsel er faldet [R68].
2. **Mobning er udbredt.** 12,1 % af eleverne i 4.-9. klasse havde oplevet mobning i det seneste skoleår ifølge Børns Vilkår (2024) [R39]. Noget af den handler om etnicitet, religion og kultur [R38].
3. **Retfærdighed og perspektiv.** 10-12-årige kan i stigende grad holde flere synspunkter i hovedet på én gang og tænke over regler og retfærdighed. Venskaber bliver mere gensidige, og sammenligning og gruppepres vokser (Eccles 1999 [R42], metadata + egen viden).
4. **Klassens tid er rammen.** Ca. 30 timer om året med klasselæreren, organiseret forskelligt fra skole til skole [R44].
5. **Betydning:** mellemtrinnet er alderen, hvor gruppepres, drillerier og klassens chat begynder at fylde. Kortene kan tage fat i retfærdighed og forskellen på sjov og drilleri, så længe de handler om klassen og ikke om en bestemt elev.

### (b) Temaer

- Interesser og talenter, som andre ikke kender.
- Retfærdighed og regler: hvad er fair i klassen.
- Drilleri, sjov og grænser.
- Klassens chat og god tone online.
- At ændre mening og forstå andres synspunkt.
- Fantasi: hvis du bestemte over skolen.

### (c) Hvad bunken skal undgå

Fællesreglerne i afsnit 7, plus: ingen kort om at have/ikke have telefon, spillekonsol eller sociale medier (økonomi og forældreregler), og ingen kort om kærester.

### (d) Dybdefordeling

60 % let, 40 % medium, 0 % dyb.

### (e) Eksempelkort

- "Hvilken superkraft ville gøre skoledagen sjovere?" · let
- "Hvad ville du ændre, hvis du bestemte over skolen i en dag?" · let
- "Hvad er noget, du er god til, som de fleste i klassen ikke ved?" · let
- "Hvilken bog, film eller spil ville du anbefale til hele klassen, og hvorfor?" · let
- "Hvordan kan man mærke, at en spøg er gået for langt?" · medium
- "Hvad gør en klasse til et godt sted at være?" · medium
- "Hvornår har du ændret mening om noget, efter du havde hørt en andens forklaring?" · medium
- "Hvad er en god regel for, hvordan vi skriver til hinanden i klassens chat?" · medium

### (f) Navn og SEO

- **Titel:** Mellemtrinnet
- **Beskrivelse:** Spørgsmål til 4.-6. klasse om venskab, retfærdighed og god tone
- **seoTitle-forslag:** Spørgsmål til klassens tid på mellemtrinnet: 80 kort
- **Søgeord:** klassens tid (90), klassens time (140), trivsel i klassen (20), klassens time ideer (10). "spørgsmål til klassen": ingen data.

---

## 10. Udskoling (7.-9. klasse, 13-16 år)

### (a) Fund

1. **Identitet og værdier fylder.** 13-16-årige tænker mere abstrakt om sig selv, værdier og fremtid, og de er meget følsomme over for jævnaldrendes blik (Eccles 1999 [R42], metadata + egen viden). Unge bygger deres selvforståelse ved at fortælle om oplevelser og få respons (McLean, Pasupathi & Pals 2007 [R32], metadata).
2. **Fælles grublen er en risiko,** især i venindegrupper (Rose 2002, forskning.md nr. 42; Rose & Rudolph 2006 [R31]). Kort om pres skal pege mod det, der hjælper.
3. **Skolemiljøet og lærerrelationen hænger sammen med unges følelsesmæssige trivsel** (Kidger m.fl. 2012 [R33], metadata).
4. **Mobning og etnicitet.** Mere end halvdelen af elever med minoritetsbaggrund i undersøgelsen fra Børns Vilkår og Institut for Menneskerettigheder var blevet mobbet på grund af hudfarve, nationalitet, religion eller kultur [R38]. Ingen kort må lægge op til at fortælle om netop det foran klassen.
5. **Betydning:** psykologisk tryghed i grupper (Edmondson 1999, forskning.md nr. 40) er et godt mål: at det er sikkert at sige noget forkert. Kortene skal give plads til meninger og værdier uden at kræve personlige afsløringer foran klassen.

### (b) Temaer

- Meninger og værdier: at sige sin mening, at være uenig ordentligt.
- Fremtid, uddannelsesvalg og drømmejob (uden karakterer).
- Venskab i teenageårene, og hvordan det ændrer sig.
- Unge og voksne: hvad voksne misforstår.
- Skærm, pauser og fritid.
- Klassen som fællesskab, sidste år sammen, afslutning.

### (c) Hvad bunken skal undgå

Fællesreglerne i afsnit 7, plus: ingen kort om kærester, sex, alkohol, rygning eller vægt; ingen kort om at blive "set" på sociale medier (likes, følgere); og ingen kort om psykisk mistrivsel i klassebrug. Overlappet med efterskolen (14-18) er stort, men udskolingsbunken er til hele klassen og har derfor ingen dybe kort.

### (d) Dybdefordeling

50 % let, 50 % medium, 0 % dyb.

### (e) Eksempelkort

- "Hvilken sang ville du vælge som klassens kendingsmelodi?" · let
- "Hvad laver du, når du har brug for en pause fra telefonen?" · let
- "Hvilket job ville du prøve i en uge, hvis du kunne vælge frit?" · let
- "Hvad tror du, voksne tager mest fejl af, når det gælder unge i dag?" · medium
- "Hvad er en god ven, når man går i 8. klasse og ikke i 3.?" · medium
- "Hvornår har du sidst sagt din mening, selvom ikke alle var enige?" · medium
- "Hvad kan vi gøre i klassen, så det er nemmere at sige noget forkert højt?" · medium
- "Hvad håber du, klassen husker fra udskolingen, når I er gået ud af 9.?" · medium

### (f) Navn og SEO

- **Titel:** Udskolingen
- **Beskrivelse:** Spørgsmål til 7.-9. klasse om meninger, venskab og fremtid
- **seoTitle-forslag:** Spørgsmål til udskolingen: 80 kort til klassens tid
- **Søgeord:** som mellemtrinnet, plus "spørgsmål til teenager" (10). Lav volumen. Værdien er en samlet side "Samtalekort til klassens tid" med de tre trin som faner.

---

## 11. Spejder

### (a) Fund

1. **Spejderloven (DDS).** "Den, der er med i spejdernes fællesskab, gør sit bedste for: at finde sin egen tro og have respekt for andres; at værne om naturen; at være en god kammerat; at være hensynsfuld og hjælpe andre; at være til at stole på; at høre andres meninger og danne sine egne; at tage medansvar i familie og samfund." Løftet: "Jeg lover at holde spejderloven." (DDS, Spejderidéen [R45], original læst).
2. **Spejdermetodens syv elementer (DDS):** spejderlov og -løfte, patruljer, learning by doing, samfundsengagement, medbestemmelse, friluftsliv og personlig udvikling [R45]. Kortene kan ordnes efter dem.
3. **De grønne pigespejdere har en anden lov.** "Som spejder lover jeg at gøre mit bedste for at ære Gud ved at leve efter hans vilje. Derfor skal en spejder: tale sandhed, stifte fred, dele med andre, være en god kammerat, værne om naturen, vise hensyn og hjælpe andre, leve i hjem og samfund med kærlighed og omtanke." (Vedtægter 2022 [R46], original læst). **KFUM-Spejdernes og FDF's ordlyd er ikke verificeret** i denne research (ikke fundet på deres sider). Kort, der citerer en lov, skal derfor enten citere DDS' og være mærket som sådan, eller være formuleret generelt ("jeres spejderlov").
4. **Spejder hænger sammen med bedre mental sundhed senere.** I den britiske fødselskohorte fra 1958 (9.603 personer, 28 % havde været spejdere) havde tidligere spejdere 18 % lavere odds for et resultat, der tyder på angst eller depression ved 50 år, og den sociale gradient i mental sundhed sås ikke blandt spejderne (Dibben, Playford & Mitchell 2017 [R47], sekundær). Det er en sammenhæng, ikke bevis for årsag.
5. **De tre principper.** WOSM's forfatning bygger på pligt over for Gud (bredt forstået som åndelige principper), pligt over for andre og pligt over for sig selv. Nationale korps formulerer dem forskelligt [R48, sekundær]. DDS beskriver tre principper om forholdet til sig selv, omgivelserne og det åndelige [R70, sekundær].
6. **Patruljen som ramme.** Patruljesystemet og medbestemmelse betyder, at kortene skal kunne bruges af en patrulje uden en voksen, med en patruljeleder der læser op.

### (b) Temaer

- Patruljen: roller, samarbejde, at stole på hinanden.
- Lejrliv: mad over bål, telt, vejr, når ting går galt.
- Mod og udfordring: natløb, hike, første gang man var bange.
- Natur og at værne om den.
- Ansvar for de yngre og for hinanden.
- Spejderloven i hverdagen: hvilket punkt er nemt og svært.
- Lejrbålet: historier, sange, taknemmelighed.
- Ledere: hvorfor er vi her, hvad giver vi videre.

### (c) Hvad bunken skal undgå

- Kort, der kræver en bestemt tro. "Finde sin egen tro" (DDS) og "ære Gud" (De grønne pigespejdere) er forskellige. Formulér, så begge kan svare.
- Kort, der presser til at fortælle om frygt eller svære hjemmeforhold ved lejrbålet. Mod-kort skal handle om konkrete situationer på tur.
- Kort, der rangerer patruljemedlemmer.
- Spejdere spænder fra 6 til 17 år og op. Lav filtre: mini/familiespejder (kun let), junior/trop (let og medium), senior/rover og ledere (med dyb).
- Bunken skal pege mod korpsets egne retningslinjer for trivsel og børnesikkerhed i vejledningen, uden at gentage dem.

### (d) Dybdefordeling

50 % let, 40 % medium, 10 % dyb (dybe kun i seniorfilteret).

### (e) Eksempelkort

- "Hvad er det bedste måltid, du har lavet over bål?" · let
- "Hvilken opgave i patruljen er du bedst til, og hvilken vil du gerne lære?" · let
- "Hvad er det sjoveste, der er gået galt på en tur?" · let
- "Fortæl om et natløb eller en tur, hvor du var lidt bange. Hvad fik dig videre?" · medium
- "Hvad betyder det at være til at stole på, når man er i patrulje?" · medium
- "Hvornår har du sidst taget ansvar for en, der var yngre end dig?" · medium
- "Hvilket punkt i spejderloven synes du er sværest at leve op til?" · medium
- "Hvad har du lært om dig selv ude i naturen, som du ikke kunne have lært indenfor?" · dyb

### (f) Navn og SEO

- **Titel:** Spejder
- **Beskrivelse:** Til patruljen, lejrbålet og lederne: om ansvar, mod og spejderloven
- **seoTitle-forslag:** Spørgsmål til spejdere: 80 kort til patrulje og lejrbål
- **Søgeord:** lejrbål (170), patrulje (140), spejderloven (110), lejrbål sange (90), natløb (50), spejder aktiviteter (50), spejder lege (30). "spejder lejrbål lege": ingen data.

---

## 12. Gilwell

### (a) Fund

1. **Gilwell er Wood Badge.** Siden 1919 har voksne frivillige ledere fået Wood Badge efter afsluttet lederuddannelse. Kurserne har typisk teori- og praksisfaser efterfulgt af et projekt, og deltagerne får Gilwell-tørklædet og træperlerne (Wikipedia om Wood Badge [R69]; Pfadi Schweiz [R51]; sekundær).
2. **Nordisk forløb.** Den nordiske Treklöver Gilwell (Scouterna, Sverige) starter med forberedende opgaver hjemme, har i alt otte kursusdage (en anden side nævner mindst ni dage fordelt på to-tre kursusdele) og et individuelt udviklingsprojekt knyttet til egen lederrolle. Fra forberedelse til slutpræsentation strækker forløbet sig over ti måneder [R50, sekundær]. I Schweiz arbejder deltagerne på en "ticket", et projekt om et bestemt aspekt af spejderarbejdet, og reflekterer over egen ledelse, vision og engagement [R51, sekundær].
3. **KFUM-Spejdernes Gilwell.** Kurset er for "den erfarne leder, som har deltaget i korpsets øvrige lederuddannelse eller tilsvarende". "Omdrejningspunktet for kurset er, at den enkelte deltager lærer sig selv at kende." Deltagerne sætter et personligt udviklingsmål ("Gilwelludfordring"), planlægger og gennemfører et læringsforløb og evaluerer det med en vejleder og andre deltagere. Kurset følger spejdermetoden, og patruljen er central, suppleret af samtaler med tutorer og refleksion [R71, original (delvis)]. **Antal dage, kursusuge/weekend og lederteams er ikke verificeret** (hverken hos KFUM-Spejderne eller DDS). Ret beskrivelsen i bunkens intro til det danske forløb før udgivelse.
4. **De tre pligter.** WOSM: pligt over for Gud (åndelige principper, bredt forstået), pligt over for andre og pligt over for sig selv [R48, sekundær]. Kort kan grupperes efter de tre, men "Duty to God" skal formuleres, så den passer både til "at finde sin egen tro" (DDS) og "at ære Gud" (De grønne pigespejdere). KFUM-Spejdernes ordlyd er ikke verificeret.
5. **"Leave this world a little better than you found it."** Fra Baden-Powells sidste budskab til spejderne, 1941. WOSM gengiver det som "Try and leave this world a little better than you found it" [R49, original læst]. Dansk gengivelse til kort: "Prøv at efterlade verden lidt bedre, end du fandt den."
6. **Refleksion er kursets kerne.** Både det svenske og det schweiziske forløb lægger vægt på at reflektere over egen ledelse og eget engagement [R50, R51]. Det passer med forskning.md 2.3 om opfølgende spørgsmål: Gilwell-kort kan med fordel have en fast opfølger ("Hvad betyder det for dit næste møde?").

### (b) Temaer

- Hvorfor jeg er leder (motivation, egne forbilleder).
- At være rollemodel, også når ingen ser det.
- Pligt over for sig selv: at passe på sig selv, grænser, at lære.
- Pligt over for andre: holdet, lederteamet, de unge, samfundet.
- Pligt over for det åndelige: mening, ro, værdier, tro (bredt).
- Lederskab i praksis: svære samtaler, at give ansvar fra sig, at fejle.
- Projektet og det, man vil efterlade.
- Lederteamet: hvordan vi arbejder sammen, giver feedback.

### (c) Hvad bunken skal undgå

- Private navne og citater fra konkrete kurser og staber.
- Kort, der forudsætter kristen tro.
- Kort, der kan bruges til at bedømme andre deltagere ("Hvem i teamet …?").
- Ingen detaljer om kursets program. Spørg en Gilwell-stab før udgivelse, om noget bør holdes hemmeligt for kommende deltagere.

### (d) Dybdefordeling

20 % let, 50 % medium, 30 % dyb. Voksne ledere, der selv har valgt refleksion.

### (e) Eksempelkort

- "Hvad fik dig til at blive spejderleder i første omgang?" · let
- "Hvilken leder havde du selv som barn, og hvad gjorde vedkommende rigtigt?" · let
- "Hvornår har du sidst lært noget af en af dine spejdere?" · medium
- "Hvad gør du for at passe på dig selv, så du stadig har noget at give?" · medium
- "Hvad giver dig ro og mening, når lederopgaven bliver tung?" · medium
- "Hvornår har du været et forbillede uden at vide det, og hvornår var du det ikke?" · dyb
- "Hvad står du for som leder, som du ikke vil gå på kompromis med?" · dyb
- "Hvad vil du gerne have efterladt lidt bedre, end du fandt det, når du stopper som leder?" · dyb

### (f) Navn og SEO

- **Titel:** Gilwell
- **Beskrivelse:** Refleksion for spejderledere på Gilwell, i lederteamet og alene
- **seoTitle-forslag:** Gilwell-spørgsmål til spejderledere: 80 kort
- **Søgeord:** gilwell (70). Lille, men næsten uden konkurrence, og målgruppen er præcis.

---

## 13. Første date (udvidelse af eksisterende bunke)

Den eksisterende bunke `foerste-date` har 100 kort: 40 let, 35 medium og 25 dyb. Udvidelsen bør fylde hullerne: nysgerrighed og opfølgning, humor og datingapps. Den bør være lettere end resten af bunken, og 25 dybe kort er mange til et første møde (jf. fund 3 om gradvis selvafsløring), så overvej at flytte nogle af dem til "Venner" eller "Kend din partner".

### (a) Fund

1. **Nysgerrighed skaber nærhed.** I en opgave med gensidig selvafsløring med stigende dybde forudsagde nysgerrighed som træk, at partneren følte mere tiltrækning og nærhed, også når der var taget højde for social angst og humør (Kashdan & Roberts 2004 [R53], sekundær). Nysgerrige mennesker følte sig tæt på den anden både i dybe samtaler og i small talk, mens mindre nysgerrige kun gjorde det, når situationen lagde op til det (Kashdan m.fl. 2011 [R54], sekundær).
   **Betydning:** strukturerede kort hjælper mest dem, der ikke selv er naturligt nysgerrige.
2. **Spørgsmål og opfølgning virker.** Folk der stiller flere opfølgende spørgsmål bliver bedre kunne lide, og ved speeddating fik de flere ja til en ny date (Huang m.fl. 2017, forskning.md nr. 11).
3. **Gradvis og gensidig selvafsløring.** Struktureret, gradvis selvafsløring giver mere nærhed end small talk og end fri snak (Aron m.fl. 1997; Sprecher 2021; forskning.md nr. 1 og 4). Wortman m.fl. (1976) [R62] undersøgte, hvordan tidspunktet for intim selvafsløring påvirker indtrykket af den, der deler (metadata; konklusionen er ikke læst, så den bruges ikke).
4. **Humor signalerer interesse.** Begge køn tog oftere initiativ til humor og fandt den anden sjovere, når de var tiltrukket af personen. Forfatterne ser humor som en måde at vise og aflæse interesse på (Li m.fl. 2009 [R52], sekundær).
5. **Vi undervurderer, hvor godt den anden kunne lide os.** Folk har en tendens til at undervurdere, hvor godt den anden kunne lide dem efter en samtale med en fremmed (Boothby m.fl. 2018 [R55], metadata + egen viden; studiet handler om samtaler med fremmede, ikke dates). Kan bruges forsigtigt i bunkens intro.
6. **Oplevet lighed betyder mere end faktisk lighed.** Ved speeddating forudsagde oplevet lighed tiltrækning, men faktisk lighed gjorde ikke (Tidwell, Eastwick & Finkel 2013 [R58], metadata; fundet står i titlen). Og hvem man bliver tiltrukket af, er svært at forudsige ud fra træk og præferencer på forhånd (Joel, Eastwick & Finkel 2017 [R57], metadata + egen viden). Kort skal derfor skabe en fælles oplevelse i samtalen, ikke tjekke en liste af.
7. **Datingapps er almindelige, men ikke uden ulemper.** Tre ud af ti amerikanske voksne har brugt en datingapp eller -side, og 53 % af de under 30-årige har (Pew Research Center 2023 [R61], sekundær, USA). Et review fra 2012 konkluderede, at online dating udvider puljen af mulige partnere, men at profiler og matchningsalgoritmer forudsiger relationens succes dårligt (Finkel m.fl. 2012 [R56], metadata + egen viden). Selvpræsentation i profiler er en balance mellem at virke attraktiv og at være ærlig (Ellison, Heino & Gibbs 2006 [R63], metadata).
8. **Ens sprogstil hænger sammen med tiltrækning.** Ved speeddating forudsagde en ens måde at tale på, om parret ville ses igen (Ireland m.fl. 2011 [R59], metadata + egen viden). Støtter kort, der får begge til at fortælle frem for at interviewe.

### (b) Temaer (nye i forhold til de 100 eksisterende kort)

- Nysgerrighed: hvad er du optaget af lige nu.
- Humor: hvad griner du af.
- Appen og mødet: hvordan man endte her, uden at gøre det pinligt.
- Små holdningsskift og ting man er ved at lære (viser udvikling uden at være tungt).
- Venskab og værdier på et let medium-niveau.
- Opfølgerkort: "Fortæl mere om …", "Hvad var det bedste ved det?".

### (c) Hvad bunken skal undgå

- Ekskærester, tidligere forhold og hvorfor de endte (for tidligt).
- Sex, børneønsker, økonomi, løn og politik/religion som direkte spørgsmål på første date.
- Kort, der føles som et jobinterview eller en tjekliste ("Hvor ser du dig selv om fem år?").
- Kort om traumer, sygdom eller familiekonflikter.
- Kort, der presser til at rate den anden eller daten ("Hvad giver du den her date ud af 10?").
- Sikkerhed: bunkens vejledning kan nævne at mødes et offentligt sted, men kortene selv skal ikke handle om det.

### (d) Dybdefordeling for udvidelsen

55 % let, 40 % medium, 5 % dyb.

### (e) Eksempelkort

- "Hvad har du været nysgerrig på for nylig, som du endnu ikke har fundet svaret på?" · let
- "Hvad er det bedste spørgsmål, nogen har stillet dig på en date?" · let
- "Hvad fik dig til at sige ja til at mødes i dag?" · let
- "Hvad griner du af, som andre ikke altid forstår er sjovt?" · let
- "Hvad gør du, når du vil gøre noget rigtig godt for dig selv?" · let
- "Hvad er du begyndt at kunne lide, som du før ikke brød dig om?" · medium
- "Hvad øver du dig på for tiden, også selvom ingen ser det?" · medium
- "Hvad betyder venskab for dig, og hvem har lært dig det?" · medium

### (f) Navn og SEO

- **Titel:** Første date (uændret)
- **Beskrivelse (uændret eller ny):** Nysgerrige spørgsmål, når I skal lære hinanden at kende
- **seoTitle-forslag:** Behold den eksisterende ("Spørgsmål til første date: 100 kort der bryder isen") og ret tallet til den nye størrelse
- **Søgeord:** spørgsmål til date (260), date spørgsmål (260), spørgsmål til første date (50), lære hinanden at kende spørgsmål (ingen data), "første date spørgsmål" (ingen data). De to varianter med 260 bør stå i H1 eller intro.

---

## 14. Kildeliste

Kilder fra `docs/forskning.md`, der er brugt her, står ikke igen: Aron m.fl. 1997 (nr. 1), Sprecher 2021 (nr. 4), Kardas, Kumar & Epley 2022 (nr. 8), Huang m.fl. 2017 (nr. 11), Fivush, Haden & Reese 2006 (nr. 33), Edmondson 1999 (nr. 40), Rose 2002 (nr. 42), Calmes & Roberts 2008 (nr. 42b).

| # | Forfatter(e), år | Titel | Tidsskrift / udgiver | DOI / URL | Status |
|---|---|---|---|---|---|
| R1 | Doss, B. D., Rhoades, G. K., Stanley, S. M., & Markman, H. J. (2009) | The effect of the transition to parenthood on relationship quality: An 8-year prospective study | Journal of Personality and Social Psychology, 96, 601-619 | 10.1037/a0013969 | Sekundær (abstract-uddrag) |
| R2 | Mitnick, D. M., Heyman, R. E., & Smith Slep, A. M. (2009) | Changes in relationship satisfaction across the transition to parenthood: A meta-analysis | Journal of Family Psychology, 23, 848-852 | 10.1037/a0017004 (PMC2812012) | Abstract læst (PMC) |
| R4 | Shapiro, A. F., Gottman, J. M., & Carrère, S. (2000) | The baby and the marriage: Identifying factors that buffer against decline in marital satisfaction after the first baby arrives | Journal of Family Psychology, 14, 59-70 | 10.1037/0893-3200.14.1.59 | Sekundær (University of Washington, pressemeddelelse 2000) |
| R5 | Shapiro, A. F., & Gottman, J. M. (2005) | Effects on marriage of a psycho-communicative-educational intervention with couples undergoing the transition to parenthood, evaluation at 1-year post intervention | Journal of Family Communication, 5, 1-24 | 10.1207/s15327698jfc0501_1 | Metadata; tal kun fra Gottman Institute/Greater Good (ikke verificeret) |
| R6 | Cowan, C. P., & Cowan, P. A. (1995) | Interventions to ease the transition to parenthood: Why they are needed and what they can do | Family Relations, 44, 412ff | 10.2307/584997 | Metadata |
| R7 | Pinquart, M., & Teubert, D. (2010) | A meta-analytic study of couple interventions during the transition to parenthood | Family Relations, 59, 221-231 | 10.1111/j.1741-3729.2010.00597.x | Metadata |
| R8 | Feinberg, M. E., & Kan, M. L. (2008) | Establishing family foundations: Intervention effects on coparenting, parent/infant well-being, and parent-child relations | Journal of Family Psychology, 22, 253-263 | 10.1037/0893-3200.22.2.253 | Metadata |
| R9 | Doss, B. D., Cicila, L. N., Hsueh, A. C., Morrison, K. R., & Carhart, K. (2014) | A randomized controlled trial of brief coparenting and relationship interventions during the transition to parenthood | Journal of Family Psychology, 28, 483-494 | 10.1037/a0037311 | Metadata |
| R10 | Medina, A. M., Lederhos, C. L., & Lillis, T. A. (2009) | Sleep disruption and decline in marital satisfaction across the transition to parenthood | Families, Systems, & Health, 27, 153-160 | 10.1037/a0015762 | Metadata |
| R11 | Paulson, J. F., & Bazemore, S. D. (2010) | Prenatal and postpartum depression in fathers and its association with maternal depression | JAMA, 303, 1961ff | 10.1001/jama.2010.605 | Metadata |
| R12 | VIVE (u.å.) | Indsatser i forhold til fødselsdepression | VIVE | https://vive.dk/da/udgivelser/indsatser-i-forhold-til-foedselsdepression-dx3kq0zb | Sekundær (søgeresumé; tal 11 % / 7 %) |
| R13 | Gavin, N. I., Gaynes, B. N., Lohr, K. N., Meltzer-Brody, S., Gartlehner, G., & Swinson, T. (2005) | Perinatal depression: A systematic review of prevalence and incidence | Obstetrics & Gynecology, 106, 1071-1083 | 10.1097/01.aog.0000183597.31630.db | Metadata |
| R14 | Saxbe, D., Rossin-Slater, M., & Goldenberg, D. (2018) | The transition to parenthood as a critical window for adult health | American Psychologist, 73, 1190-1200 | 10.1037/amp0000376 | Metadata |
| R15 | Volling, B. L. (2012) | Family transitions following the birth of a sibling: An empirical review of changes in the firstborn's adjustment | Psychological Bulletin, 138, 497-528 | 10.1037/a0026921 (PMC3341504) | Sekundær (abstract-uddrag) |
| R16 | Kuo, P. X., Volling, B. L., & Gonzalez, R. (2017) | His, hers, or theirs? Coparenting after the birth of a second child | Journal of Family Psychology, 31, 710-720 | 10.1037/fam0000321 | Sekundær (søgeresumé) |
| R17 | University of Michigan (2015) | Pressemeddelelse om parforhold efter barn nummer to ("Go for second baby …"/"Marriages still resilient after the second child") | University of Michigan, LSA/ISR | https://rcgd.isr.umich.edu/?p=2174 | Sekundær; den bagvedliggende artikel er ikke identificeret |
| R18 | Kowal, A., & Kramer, L. (1997) | Children's understanding of parental differential treatment | Child Development, 68, 113ff | 10.2307/1131929 | Sekundær (omtale i senere artikler) |
| R19 | Kowal, A., Kramer, L., Krull, J. L., & Crick, N. R. (2002) | Children's perceptions of the fairness of parental preferential treatment and their socioemotional well-being | Journal of Family Psychology, 16, 297-306 | 10.1037/0893-3200.16.3.297 | Sekundær |
| R20 | Kramer, L., & Gottman, J. M. (1992) | Becoming a sibling: "With a little help from my friends" | Developmental Psychology, 28, 685-699 | 10.1037/0012-1649.28.4.685 | Metadata |
| R21 | Kennedy, D. E., & Kramer, L. (2008) | Improving emotion regulation and sibling relationship quality: The More Fun With Sisters and Brothers Program | Family Relations, 57, 567-578 | 10.1111/j.1741-3729.2008.00523.x | Metadata |
| R22 | Buist, K. L., Deković, M., & Prinzie, P. (2013) | Sibling relationship quality and psychopathology of children and adolescents: A meta-analysis | Clinical Psychology Review, 33, 97-106 | 10.1016/j.cpr.2012.10.007 | Metadata |
| R23 | Feinberg, M. E., Solmeyer, A. R., & McHale, S. M. (2012; online 2011) | The third rail of family systems: Sibling relationships, mental and behavioral health, and preventive intervention in childhood and adolescence | Clinical Child and Family Psychology Review, 15, 43-57 | 10.1007/s10567-011-0104-5 | Metadata |
| R24 | Walton, G. M., & Cohen, G. L. (2011) | A brief social-belonging intervention improves academic and health outcomes of minority students | Science, 331, 1447-1451 | 10.1126/science.1198364 | Metadata (indhold fra egen viden) |
| R25 | Walton, G. M., & Cohen, G. L. (2007) | A question of belonging: Race, social fit, and achievement | Journal of Personality and Social Psychology, 92, 82-96 | 10.1037/0022-3514.92.1.82 | Metadata |
| R26 | Aarhus Universitet (2023/24) | AU's Studiemiljøundersøgelse 2023, tema: Ensomhed | Aarhus Universitet | https://studerende.au.dk/fileadmin/studerende.au.dk/Studiemiljoeundersoegelse/Ensomhed_SMU2023_til_web.pdf | Original (hele notatet læst) |
| R27 | Danmarks Evalueringsinstitut (2017) | Studiestartens betydning for frafald på videregående uddannelser | EVA | https://eva.dk/Media/638409032988712806/Studiestartens%20betydning%20for%20frafald%20p%C3%A5%20videreg%C3%A5ende%20uddannelser.pdf | Original (delvis): resultatafsnit læst |
| R28 | Danmarks Statistik (2023) | Levevilkårsundersøgelsen 2022: ensomhed (NYT) | Danmarks Statistik | https://www.dst.dk/nyt/51004 | Sekundær (søgeresumé) |
| R29 | Danmarks Evalueringsinstitut (2019) | Elevtrivsel på de gymnasiale uddannelser | EVA / Undervisningsministeriet | https://uvm.dk/media/11gojxyt/190116-elevtrivsel-paa-de-gymnasiale-uddannelser.pdf | Original (delvis): resumé og indholdsfortegnelse læst |
| R31 | Rose, A. J., & Rudolph, K. D. (2006) | A review of sex differences in peer relationship processes: Potential trade-offs for the emotional and behavioral development of girls and boys | Psychological Bulletin, 132, 98-131 | 10.1037/0033-2909.132.1.98 | Metadata |
| R32 | McLean, K. C., Pasupathi, M., & Pals, J. L. (2007) | Selves creating stories creating selves: A process model of self-development | Personality and Social Psychology Review, 11, 262-278 | 10.1177/1088868307301034 | Metadata |
| R33 | Kidger, J., Araya, R., Donovan, J., & Gunnell, D. (2012) | The effect of the school environment on the emotional health of adolescents: A systematic review | Pediatrics, 129, 925-949 | 10.1542/peds.2011-2248 | Metadata |
| R34 | Juul, T. M., Madsen, D. C., Damgård, C. B., Sørensen, N. U., & Havelund, M. (2014) | 9. klasse på efterskole: Fem udfordringer til udviklingen af efterskolernes 9. klasse | Center for Ungdomsforskning og DAMVAD, for Efterskoleforeningen | https://www.cefu.dk/media/417460/rapport_til_efterskoleforeningen_cefu_og_damvad_endelig.pdf | Original (delvis): kap. 6 og 7 læst |
| R35 | FIIBL og SDU (2022) | Idrætsefterskoleundersøgelsen 2022 | Idrætsefterskolerne / SDU | https://www.idan.dk/media/nrflejev/idraetsefterskoleundersoegelsen2022.pdf | Sekundær (kun søgeresumé; PDF for stor at hente) |
| R36 | Børne- og Undervisningsministeriet (2024) | Nationale trivselsmåling i folkeskolen 2023/24 | uvm.dk / uddannelsesstatistik.dk | https://ft.dk/samling/20231/almdel/BUU/bilag/192/2873579.pdf | Sekundær (søgeresumé) |
| R37 | Kommunerapporter (fx Silkeborg 2023, Hillerød 2022/23) | Trivselsmåling 0.-3. klasse | Kommuner | https://skolestyrelse.silkeborg.dk/p/Subsites/Skolestyrelse/Bilag1_Overordnet_styring/Trivselsmaaling/2023_Trivsel_0_3_klasse_Silkeborg_Kommune.pdf | Sekundær |
| R38 | Børns Vilkår & Institut for Menneskerettigheder (2024) | Etnicitet og mobbedynamikker | Børns Vilkår | https://migrant-integration.ec.europa.eu/system/files/2024-06/Etnicitet-og-mobbedynamikker_DK_2024.pdf | Sekundær (antal respondenter uklart: 1.568 eller 7.568) |
| R39 | Børns Vilkår (2024) | Organisationer i opråb: Børn og unge tager hul på et nyt skoleår (nyhed 06.08.2024) | Børns Vilkår | https://bornsvilkar.dk/?p=105524 | Original (delvis): citatet læst |
| R40 | Red Barnet & Mary Fonden; Svinth, L. (2024) | Fri for Mobberi: Inspirerende praksis i daginstitutioner | Mary Fonden | https://www.maryfonden.dk/wp-content/uploads/2024/04/Fri-for-Mobberi_Inspirerende-Praksis-i-Daginstitutioner_Lone-Svinth_Marts2024.pdf | Sekundær |
| R41 | Rimm-Kaufman, S. E., Larsen, R. A. A., Baroody, A. E., Curby, T. W., Ko, M., Thomas, J. B., m.fl. (2014) | Efficacy of the Responsive Classroom approach: Results from a 3-year, longitudinal randomized controlled trial | American Educational Research Journal, 51, 567-603 | 10.3102/0002831214523821 | Sekundær (abstract-uddrag via AERA) |
| R42 | Eccles, J. S. (1999) | The development of children ages 6 to 14 | The Future of Children, 9(2), 30ff | 10.2307/1602703 | Metadata (indhold fra egen viden) |
| R44 | Københavns Kommune, udvalgsbilag (u.å.) | Om klassens tid (30 timer årligt) | kk.dk | https://www.kk.dk/sites/default/files/agenda/b39ed323-7ba6-4423-ae64-554e25de1525/4141fc90-9bab-4de3-a177-8e1831516998-bilag-12.pdf | Sekundær |
| R45 | Det Danske Spejderkorps (u.å.) | Spejderidéen | dds.dk | https://dds.dk/artikel/spejderideen | Original (delvis): lov, løfte og metode læst |
| R46 | De grønne pigespejdere (2022) | Vedtægter for De grønne pigespejdere | pigespejder.dk | https://pigespejder.dk/haderslev/wp-content/uploads/sites/48/2023/09/Vedtaegter-for-De-groenne-pigespejdere-2022.pdf | Original (delvis): løfte, lov og § 2-3 læst |
| R47 | Dibben, C., Playford, C., & Mitchell, R. (2017; online 2016) | Be(ing) prepared: Guide and Scout participation, childhood social position and mental health at age 50 — a prospective birth cohort study | Journal of Epidemiology and Community Health, 71, 275-281 | 10.1136/jech-2016-207898 | Sekundær (abstract-uddrag) |
| R48 | WOSM-forfatningen (gengivet på Wikipedia, "Scout Promise") | Principper: Duty to God, Duty to others, Duty to self | Wikipedia | https://en.wikipedia.org/wiki/Scout_Promise | Sekundær |
| R49 | WOSM (u.å.) | Celebrating the life and legacy of Baden-Powell | scout.org | https://www.scout.org/node/2697 | Original (delvis): citat og datering læst |
| R50 | Scouternas folkhögskola (u.å.) | Treklöver Gilwell Nordic | scouternasfolkhogskola.se | https://scouternasfolkhogskola.se/kurser-utbildningar/264/treklver-gilwell-nordic | Sekundær |
| R51 | Pfadibewegung Schweiz (u.å.) | Educational structures (Gilwell) | pfadi.swiss | https://pfadi.swiss/en/educational-structures/ | Sekundær |
| R52 | Li, N. P., Griskevicius, V., Durante, K. M., Jonason, P. K., Pasisz, D. J., & Aumer, K. (2009) | An evolutionary perspective on humor: Sexual selection or interest indication? | Personality and Social Psychology Bulletin, 35, 923-936 | 10.1177/0146167209334786 | Sekundær (abstract-uddrag) |
| R53 | Kashdan, T. B., & Roberts, J. E. (2004) | Trait and state curiosity in the genesis of intimacy: Differentiation from related constructs | Journal of Social and Clinical Psychology, 23, 792-816 | 10.1521/jscp.23.6.792.54800 | Sekundær (abstract-uddrag) |
| R54 | Kashdan, T. B., McKnight, P. E., Fincham, F. D., & Rose, P. (2011) | When curiosity breeds intimacy: Taking advantage of intimacy opportunities and transforming boring conversations | Journal of Personality, 79, 1369-1402 | 10.1111/j.1467-6494.2010.00697.x | Sekundær |
| R55 | Boothby, E. J., Cooney, G., Sandstrom, G. M., & Clark, M. S. (2018) | The liking gap in conversations: Do people like us more than we think? | Psychological Science, 29, 1742-1756 | 10.1177/0956797618783714 | Metadata (indhold fra egen viden) |
| R56 | Finkel, E. J., Eastwick, P. W., Karney, B. R., Reis, H. T., & Sprecher, S. (2012) | Online dating: A critical analysis from the perspective of psychological science | Psychological Science in the Public Interest, 13, 3-66 | 10.1177/1529100612436522 | Metadata (indhold fra egen viden) |
| R57 | Joel, S., Eastwick, P. W., & Finkel, E. J. (2017) | Is romantic desire predictable? Machine learning applied to initial romantic attraction | Psychological Science, 28, 1478-1489 | 10.1177/0956797617714580 | Metadata (indhold fra egen viden) |
| R58 | Tidwell, N. D., Eastwick, P. W., & Finkel, E. J. (2013; online 2012) | Perceived, not actual, similarity predicts initial attraction in a live romantic context: Evidence from the speed-dating paradigm | Personal Relationships, 20, 199-215 | 10.1111/j.1475-6811.2012.01405.x | Metadata |
| R59 | Ireland, M. E., Slatcher, R. B., Eastwick, P. W., Scissors, L. E., Finkel, E. J., & Pennebaker, J. W. (2011; online 2010) | Language style matching predicts relationship initiation and stability | Psychological Science, 22, 39-44 | 10.1177/0956797610392928 | Metadata (indhold fra egen viden) |
| R61 | Pew Research Center (2023) | Key findings about online dating in the U.S. | Pew Research Center | https://www.pewresearch.org/short-reads/2023/02/02/key-findings-about-online-dating-in-the-u-s/ | Sekundær |
| R62 | Wortman, C. B., Adesman, P., Herman, E., & Greenberg, R. (1976) | Self-disclosure: An attributional perspective | Journal of Personality and Social Psychology, 33, 184-191 | 10.1037/0022-3514.33.2.184 | Metadata (konklusion ikke læst og ikke brugt) |
| R63 | Ellison, N., Heino, R., & Gibbs, J. (2006) | Managing impressions online: Self-presentation processes in the online dating environment | Journal of Computer-Mediated Communication, 11, 415-441 | 10.1111/j.1083-6101.2006.00020.x | Metadata |
| R64 | Gottman Institute / Greater Good Science Center (u.å.) | Omtale af Bringing Baby Home ("bring baby home"; "new research study confirms Bringing Baby Home workshop effectiveness") | gottman.com; greatergood.berkeley.edu | https://greatergood.berkeley.edu/article/item/bring_baby_home | Sekundær (tal ikke verificeret) |
| R65 | ANZCTR (2023) | Registrering af australsk randomiseret forsøg med Bringing Baby Home (ACTRN12623000102673) | Australian New Zealand Clinical Trials Registry | https://anzctr.org.au/ACTRN12623000102673.aspx | Sekundær |
| R66 | Center for Ungdomsforskning (2021) | Ungdomsprofil 2020, Gentofte Kommune | CeFU / Aalborg Universitet | https://vbn.aau.dk/ws/files/407157875/UNGDOMSPROFIL_2020_GENTOFTE_KOMMUNE_FINAL_23_FEB_2021.pdf | Sekundær (kun indholdsfortegnelse set) |
| R67 | Folketingets Undervisningsudvalg 2016-17, bilag 127 | Om præstationspres og stress i gymnasiet (citerer ungdomsprofil 2014) | ft.dk | https://www.ft.dk/samling/20161/almdel/UNU/bilag/127/1771991/index.htm | Sekundær |
| R68 | Cepos (2025) | Trivsel i folkeskolen | Cepos | https://cepos.dk/wp-content/uploads/2025/11/Trivsel_i_folkeskolen_031125-1.pdf | Sekundær |
| R69 | Wikipedia (u.å.) | Wood Badge | Wikipedia | https://en.wikipedia.org/wiki/Wood_Badge | Sekundær |
| R70 | Det Danske Spejderkorps (u.å.) | Spejderprincipperne / Den gode gruppe | dds.dk | https://dds.dk/artikel/spejderprincipperne | Sekundær (søgeuddrag) |
| R71 | KFUM-Spejderne (u.å.) | Uddannelse (Gilwell) | kfumspejderne.dk | https://kfumspejderne.dk/uddannelse | Original (delvis): Gilwell-afsnittet læst |

(Numrene R3, R30, R43 og R60 er ikke i brug.)

Antal nye kilder: 67. Heraf 38 fagfællebedømte artikler, metaanalyser og reviews, og 29 rapporter, myndighedsdata, organisationssider, opslagsværker og pressemeddelelser. 9 er læst i original (helt eller delvist), 1 på abstract-niveau, 31 sekundært og 26 kun som metadata.

### Huller, der bør lukkes før udgivelse

- KFUM-Spejdernes og FDF's spejderlov/formål (ordlyd ikke fundet).
- Det danske Gilwell-forløbs format (antal dage, kursusuge/weekend, lederteams) hos DDS og KFUM-Spejderne. KFUM's indhold og målgruppe er læst.
- Kontaktoplysninger på rådgivningstilbud (BørneTelefonen er bekræftet som tilbud; nummer og åbningstider skal tjekkes på bornetelefonen.dk). Studenterrådgivningen og foreninger for fødselsdepression er ikke tjekket.
- Landsdækkende tal for ensomhed blandt studerende fra Danmarks Studieundersøgelse (kun AU-tal læst).
- Nationale tal fra elevtrivselsmålingen i gymnasiet (kun EVA's kvalitative rapport læst).
- Mobbetal: Børns Vilkårs 12,1 % angiver ikke trivselsmålingens årgang.

### Forbrug

- WebSearch: 37 af 40 kald.
- WebFetch: ca. 19 hentninger (PMC, AU, EVA x2, CeFU/DAMVAD, DDS, De grønne pigespejdere, WOSM, KFUM-Spejderne x3, Børns Vilkår m.fl.). Fem PDF'er blev konverteret lokalt med MarkItDown.
- Crossref API: ca. 68 forespørgsler via eget script (inkl. nogle afvist med 429 og gentaget), ingen credits.
- OpenSEO `get_keyword_metrics`: 2 kald med 60 søgeord i alt (Danmark, dansk). Saldoen returneres ikke af værktøjet, så credit-forbruget kan ikke oplyses præcist.
