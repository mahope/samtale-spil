# Forskningsgrundlag for Snakkespil (issue #31)

Udarbejdet 20. oktober 2026. Formål: give Snakkespil (snakkespil.dk) et ærligt, kildebaseret grundlag for hvordan spørgsmål, bunker, spilformer og vejledningstekster bør skrives.

**Om kildernes status.** Ingen af kilderne er læst i fuld tekst fra ende til anden. Aron et al. 1997 er læst i original for appendiks (alle 36 spørgsmål), instruktioner og noter. To kilder er læst på abstract-niveau direkte hos udgiveren eller i Europe PMC. Resten bygger på abstracts, laboratoriesider, pressemeddelelser og bibliografiske data (Crossref). Hver kilde er mærket i kildelisten (afsnit 6). Hvor en DOI ikke er set, står der "DOI ikke verificeret". Intet er gættet.

**Format i repoet.** Spørgsmål ligger i `src/data/categories.ts` som `{ id, categoryId, text, depth }` med `depth` = `let` | `medium` | `dyb`. Alle eksempler nedenfor er mærket med dybde, så de kan flyttes direkte ind.

---

## 1. Kort resumé

Forskningen peger samlet på, at samtaler bringer mennesker tættere på hinanden, når fire ting er til stede:

1. **Gensidig og gradvis selvafsløring.** Man deler lidt, den anden deler lidt, og dybden stiger trinvist. Det er kernen i Arons "36 spørgsmål" (Aron et al. 1997), som skabte målbart mere nærhed end small talk på 45 minutter, og som er genfundet med andre kontrolbetingelser (Sprecher 2021). Metaanalysen af Collins & Miller (1994) viser, at vi kan lide dem, der åbner sig, og at vi kommer til at holde af dem, vi har åbnet os for.
2. **Oplevet responsivitet.** Det, der gør selvafsløring til nærhed, er om man føler sig forstået, anerkendt og passet på af den, der lytter (Reis & Shaver 1988; Laurenceau et al. 1998; Reis 2007). Opfølgende spørgsmål er en af de mest konkrete måder at vise det på (Huang et al. 2017).
3. **Positive udvekslinger tæller mindst lige så meget som problemløsning.** Hvordan en partner reagerer på gode nyheder forudsiger forholdets trivsel bedre end reaktionen på dårlige nyheder (Gable et al. 2006). Hverdagstaknemmelighed styrker forholdet dag for dag (Algoe et al. 2010), og især når man roser den anden frem for at tale om sig selv (Algoe et al. 2016). Nye, fælles oplevelser modvirker kedsomhed og øger både tilfredshed og lyst i lange forhold (Aron et al. 2000; Muise et al. 2019).
4. **Vi undervurderer dybe samtaler.** Folk forventer, at dybe spørgsmål bliver akavede, men de bliver varmere og mere forbindende end forventet (Kardas, Kumar & Epley 2022). Folk med flere substantielle samtaler i hverdagen er mere tilfredse med livet (Mehl et al. 2010; replikeret af Milek et al. 2018, dog uden at "mindre small talk" i sig selv hang sammen med trivsel).

Samtidig er der grænser: Gottmans berømte forudsigelser af skilsmisse er ikke krydsvaliderede (Heyman & Slep 2001), og hans "love maps" og "sound relationship house" er kliniske modeller, ikke selvstændigt afprøvede teorier. Dybe samtaler kan skade, når de bliver til fælles grublen over problemer (co-rumination, Rose 2002), eller når nogen presses til at genfortælle traumer (Cochrane-reviewet om psykologisk debriefing, Rose et al. 2002). Derfor skal spillet have frivillighed, en "spring over"-regel og en klar besked om at det ikke er terapi.

---

## 2. Principper for gode samtalespørgsmål

### 2.1 Dybde-progression: start let, gå gradvist dybere
Aron et al. (1997) byggede deres procedure i tre sæt af 12 spørgsmål med stigende intimitet, fra "hvem ville du invitere til middag" til "del et personligt problem og spørg om råd". Studie 1 viste mere nærhed end en small talk-betingelse. Sprecher (2021) sammenlignede procedurens nærhedsopgave med både small talk og fri, ustruktureret selvafsløring, og den strukturerede opgave gav mest nærhed, uanset om samtalen foregik ansigt til ansigt eller via skærm (ifølge abstract).
**For Snakkespil:** behold let/medium/dyb og lad standardrækkefølgen i en runde gå fra let mod dyb (fx 4 lette, 4 medium, 4 dybe), i stedet for ren tilfældighed. Gør "bland alt" til et valg, ikke standard.

### 2.2 Gensidighed: begge svarer på samme kort
Arons instruktion var præcis: den ene læser kortet op og svarer først, så svarer den anden på samme spørgsmål, og man skiftes til at gå først (Aron et al. 1997, appendiks). Sprecher, Treger & Wondra (2013) fandt, at den der kun lyttede kunne lide den anden mere end den der kun fortalte, men forskellen forsvandt når rollerne blev byttet. I et søsterstudie gav gensidig, skiftevis selvafsløring mere sympati end envejs-samtaler (Sprecher et al. 2013, JESP).
**For Snakkespil:** gør "begge svarer" til den eksplicitte regel og vis hvem der starter (skifter for hvert kort).

### 2.3 Opfølgning: det andet spørgsmål er det vigtigste
Huang et al. (2017) fandt i tre studier, at folk der stiller flere spørgsmål, særligt opfølgende spørgsmål, bliver bedre kunne lide, og at effekten går via oplevet responsivitet. Ved speeddating fik de der spurgte mere flere ja til en ny date. Reis' responsivitetsmodel (Reis & Shaver 1988; Laurenceau et al. 1998) siger det samme: nærhed opstår, når den der deler oplever sig forstået og anerkendt.
**For Snakkespil:** tilføj en lille "Spørg videre"-knap eller tekst på kortbagsiden med generiske opfølgere ("Hvordan føltes det?", "Hvad betød det for dig?", "Fortæl mere om ..."). Det er formentlig den enkeltændring med størst effekt pr. kodelinje.

### 2.4 Konkret frem for abstrakt
Konkrete episoder er lettere at svare på og giver stof til opfølgning. Arons spørgsmål er overvejende konkrete ("Hvornår sang du sidst for dig selv?", "Hvad er dit kæreste minde?"). Familieforskningen viser, at børns udbytte afhænger af detaljerede, uddybende fortællinger om bestemte begivenheder (elaborativ erindring, Fivush, Haden & Reese 2006). Dette er en designslutning fra forskningen, ikke et direkte testet princip om spørgekort.
**For Snakkespil:** skriv "Fortæl om en gang hvor ..." og "Hvornår har du sidst ..." frem for "Hvad betyder X for dig?". Abstrakte spørgsmål hører hjemme i Filosofiske og Dybe, gerne parret med et konkret "giv et eksempel".

### 2.5 Positivt fokus som grundtone, problemer med ramme
Gable et al. (2004, 2006) viser værdien af at dele og fejre gode nyheder. Algoe et al. (2010, 2016) viser værdien af udtrykt taknemmelighed, især når man roser den anden. Gottmans forskning peger på, at mangel på positiv affekt forudsiger senere brud (Gottman & Levenson 2000), og at positiv affekt i hverdagen hænger sammen med humor og varme under konflikter (Driver & Gottman 2004). Omvendt viser Rose (2002), at gentagen fælles grublen over problemer hænger sammen med både tætte venskaber og mere angst og depression.
**For Snakkespil:** hovedparten af kortene bør handle om ressourcer, minder, drømme, påskønnelse og nysgerrighed. Problemorienterede kort samles i en særskilt bunke med tydelig ramme (se 4.5), og man afslutter altid med et let eller positivt kort.

### 2.6 Frivillighed og "spring over"
Aron et al. (1997) bad deltagerne om ikke at springe over, men gjorde det i et lukket forskningsforløb med debriefing, og forfatterne skriver selv i note 9, at man skal være varsom med at skabe relationer, der ikke ville opstå naturligt, og at deltagerne ikke skulle føle nogen forpligtelse. I et spil uden forsker skal frivilligheden være eksplicit. Cochrane-reviewet om debriefing (Rose et al. 2002) anbefaler at stoppe med obligatorisk genfortælling af traumer.
**For Snakkespil:** "Spring over" og "Byt kort" skal være synlige og uden straf.

### 2.7 Hvorfor dybe kort ikke skal skjules
Kardas et al. (2022) viste i 12 eksperimenter (over 1.800 deltagere), at folk systematisk forventer at dybe samtaler bliver mere akavede og mindre forbindende end de gør. De undervurderede også hvor meget den anden ville interessere sig for deres svar. Kumar & Epley (2018) fandt samme mønster for taknemmelighed: afsendere overvurderer hvor akavet modtageren vil føle sig.
**For Snakkespil:** en kort tekst ved de dybe kort kan sænke tærsklen: "De fleste synes, de dybe spørgsmål bliver bedre end de troede."

---

## 3. Gennemgang pr. forskningsspor

### 3.1 Aron: de 36 spørgsmål, selvudvidelse og nyere replikationer

**Fund.**
- Aron et al. (1997): 45 minutters skiftevis selvafsløring i tre sæt med stigende intimitet gav mere nærhed end small talk. Studie 2 og 3 fandt ingen effekt af at matche folk på holdninger, af at forvente at blive kunne lide, eller af at gøre nærhed til et eksplicit mål. Formålet var midlertidig nærhed i laboratoriet, ikke forelskelse.
- Selvudvidelsesteorien (Aron & Aron 1986) siger, at vi søger at udvide os selv gennem nære relationer og nye oplevelser. Aron et al. (2000) fandt i spørgeskemaer, at fælles spændende aktiviteter hang sammen med tilfredshed via mindre kedsomhed, og i tre eksperimenter øgede 7 minutters ny og spændende fælles opgave den oplevede kvalitet af forholdet.
- Sprecher (2021) bekræftede, at nærhedsopgaven giver mere nærhed og andre positive udfald end både small talk og ustruktureret samtale, og at effekten ikke afhang af om samtalen foregik ansigt til ansigt eller medieret.
- Ifølge en pressemeddelelse fra Wayne State (Welker, Slatcher m.fl., præsenteret på SPSP-konferencen) øgede en variant med to par, der lavede opgaven sammen, både nærhed mellem parrene og passioneret kærlighed i parret. Ikke verificeret i et fagfællebedømt tidsskrift, så brug det kun som inspiration.

**Betydning for Snakkespil.** Spilmotoren er i forvejen en "36 spørgsmål"-maskine. Det vigtigste er rækkefølgen (let → dyb), turtagning, og at man ikke lover forelskelse. Selvudvidelse begrunder en ny bunke om nyhed og eventyr (4.4) og en "dobbeltdate"-spilform.

**Eksempler (de første fire er oversat fra Aron et al. 1997, appendiks; de øvrige er nye):**
- "Hvis du kunne vælge hvem som helst i verden, hvem ville du så have med til middag?" (Aron 1997, nr. 1) · let
- "Hvordan ser en 'perfekt' dag ud for dig?" (Aron 1997, nr. 4) · let
- "Hvis en krystalkugle kunne fortælle dig sandheden om dig selv, dit liv, fremtiden eller noget helt andet, hvad ville du så vide?" (Aron 1997, nr. 13) · medium
- "Er der noget, du længe har drømt om at gøre? Hvorfor har du ikke gjort det?" (Aron 1997, nr. 14) · medium
- "Hvad har du lært om dig selv i år, som du ikke vidste sidste år?" · medium
- "Hvilken side af dig selv har du først opdaget, efter at du mødte mig?" · dyb

### 3.2 Gottman: love maps, bids, sound relationship house, de fire ryttere, blød opstart

**Fund.**
- Gottman & Levenson (1992): hos 73 par forudsagde et mønster med mere negativitet end positivitet under konfliktsamtaler senere brud. Det mønster blev siden til "de fire ryttere" (kritik, foragt, forsvar, at lukke af).
- Gottman et al. (1998): 130 nygifte par fulgt i seks år; bl.a. forudsagde det, om manden tog imod indflydelse fra konen. (Et andet studie fra samme gruppe med 124 nygifte par fandt ifølge universitetets pressemeddelelse, at de første tre minutter af en konfliktsamtale forudsagde udfaldet; ikke selvstændigt kildebelagt her.)
- Gottman & Levenson (2000): negativ affekt under konflikt forudsagde tidlige skilsmisser, mens manglende positiv affekt forudsagde senere skilsmisser.
- Driver & Gottman (2004): hverdagens små henvendelser ("bids") og om partneren vender sig mod dem, hænger sammen med humor og varme under senere konflikter (titel og metadata verificeret; konkrete tal ikke læst).
- **Kritik:** Heyman & Slep (2001) viste, at forudsigelsesligninger uden krydsvalidering overvurderer træfsikkerheden kraftigt; i deres demonstrationsdatasæt (en amerikansk survey, ikke Gottmans egne data) faldt den positive forudsigelsesværdi fra 65 % til 29 % i en ny stikprøve. De tal på "90 % træfsikkerhed", der ofte citeres, skal derfor ikke bruges i markedsføring.
- "Love maps" (at kende partnerens indre verden) og "sound relationship house" er kliniske modeller fra Gottmans bøger og terapimetode. Jeg fandt ingen fagfællebedømt, uafhængig test af dem. Randomiserede forsøg med Gottman-parterapi er få og små.

**Betydning for Snakkespil.** Gottman er stærkest som inspiration til (a) en "kend din partner"-bunke (opdatér hinandens love maps), (b) en påmindelse om at vende sig mod hinandens små henvendelser, og (c) en "svære samtaler"-bunke med blød opstart ("jeg føler ... om ... og har brug for ..." i stedet for kritik). Undgå at love at spillet "forudsiger" eller "redder" forhold.

**Eksempler (egne formuleringer, ikke Gottmans kort):**
- "Hvem er din bedste ven lige nu, og hvorfor lige vedkommende?" · let
- "Hvad stresser dig mest i den her tid?" · medium
- "Hvad er en lille ting, jeg kan gøre i hverdagen, som får dig til at føle dig set?" · medium
- "Hvornår har du sidst prøvet at fange min opmærksomhed, uden at jeg opdagede det?" · medium
- "Hvad drømmer du om, som du sjældent siger højt?" · dyb
- "Hvordan vil du gerne have, at jeg tager en svær snak op med dig?" · dyb

### 3.3 Emotionally Focused Therapy (Sue Johnson) og Hold Me Tight

**Fund.**
- EFT bygger på tilknytningsteori: konflikter i parforhold ses som protest over oplevet afstand, og terapien hjælper parret til at udtrykke de sårbare behov bag konflikten.
- Rathgeber et al. (2019, online 2018): metaanalyse af 33 randomiserede forsøg (2.730 deltagere) om EFT og adfærdsorienteret parterapi. Middelstore effekter på tilfredshed ved afslutning (EFT g = 0,73) og stadig moderate efter seks måneder (EFT g = 0,66). Forfatterne advarer om mulig publikationsbias, og der var ingen signifikant forskel mellem de to terapiformer.
- Kennedy et al. (2018/2019): 95 par i Hold Me Tight-gruppeforløb. Tilfredshed, tillid og tilknytningsundgåelse forbedredes efter forløbet, men ifølge afhandlingen bag artiklen var scorerne tilbage på udgangsniveau ved opfølgning. Forfatteren foreslår opfølgningssessioner.

**Betydning for Snakkespil.** EFT er terapi og skal ikke efterlignes. Men to pointer kan bruges: (1) samtaler om behov for nærhed og tryghed ("Hvornår føler du dig tættest på mig?") er centrale, og (2) effekter af enkeltstående samtaleforløb aftager, så spillet bør opfordre til at vende tilbage jævnligt (fx en "ugens kort"-funktion) frem for en engangsoplevelse.

**Eksempler (egne formuleringer, ikke Hold Me Tight-samtalerne):**
- "Hvornår i løbet af en almindelig uge føler du dig tættest på mig?" · medium
- "Hvad gør jeg, der får dig til at føle dig tryg?" · medium
- "Når vi er uenige, hvad har du så mest brug for fra mig?" · dyb
- "Er der noget, du savner fra os, som vi havde før?" · dyb
- "Hvordan kan jeg mærke det, når du har brug for mig, men ikke siger det?" · dyb

### 3.4 Responsivitet, kapitalisering og taknemmelighed

**Fund.**
- Reis & Shaver (1988) beskriver intimitet som en proces: selvafsløring, partnerens respons, og oplevelsen af at være forstået, anerkendt og passet på. Laurenceau et al. (1998) bekræftede i dagbogsstudier, at både selvafsløring og oplevet responsivitet bidrager til intimitet. Reis (2007) foreslår oplevet responsivitet som et samlende begreb for relationsforskningen.
- Gable et al. (2004): at dele gode nyheder ("kapitalisering") gav mere positiv følelse og livstilfredshed, særligt når den anden reagerede aktivt og konstruktivt.
- Gable, Gonzaga & Strachman (2006): 79 kæresterpar. Reaktionen på positive begivenheder forudsagde forholdets trivsel og brud to måneder senere bedre end reaktionen på negative begivenheder.
- Algoe, Gable & Maisel (2010): 67 par. Dagens taknemmelighed hos den ene forudsagde bedre relationskvalitet, også næste dag. Gældsfølelse ("jeg skylder") havde ikke samme effekt.
- Algoe, Haidt & Gable (2008): taknemmelighed fungerer som "find, remind and bind" i nye relationer (kun metadata verificeret).
- Algoe, Kurtz & Hilaire (2016): at rose den anden ("du er så omtænksom") frem for at tale om egen gevinst ("det hjalp mig") er den aktive ingrediens i udtrykt taknemmelighed (kun titel og metadata verificeret; pointen er udledt af titlen).
- Kumar & Epley (2018): folk undervurderer hvor glad modtageren bliver for et taknemmelighedsbrev og overvurderer hvor akavet det bliver.

**Betydning for Snakkespil.** Grundlag for to nye bunker: "Tak" (taknemmelighed) og "Gode nyheder" (kapitalisering). Kortene skal rette taknemmelighed mod den anden person og give plads til at fejre.

**Eksempler:**
- "Hvad er det bedste, der er sket for dig i denne uge?" · let
- "Hvad har jeg gjort for nylig, som du ikke fik sagt tak for?" · let
- "Fortæl om noget, du er stolt af, men som du synes er for lille til at nævne." · medium
- "Hvilken egenskab hos mig er du mest taknemmelig for, og hvornår så du den sidst?" · medium
- "Hvem har gjort en forskel for dig uden at vide det?" · dyb

### 3.5 Selvafsløring, gensidighed og dybe vs. overfladiske samtaler

**Fund.**
- Collins & Miller (1994), metaanalyse: (1) folk der åbner sig mere, bliver bedre kunne lide, (2) vi åbner os mere over for dem vi kan lide, og (3) vi kommer til at holde af dem vi har åbnet os for. Effekterne afhang af bl.a. studiedesign og typen af selvafsløring.
- Sprecher, Treger & Wondra (2013) og Sprecher et al. (2013): lytteren kan bedst lide den anden, indtil rollerne byttes; gensidig turtagning giver mest sympati.
- Mehl et al. (2010): 79 personer optaget i korte klip over fire dage. Højere trivsel hang sammen med mindre tid alene, mere samtale og flere substantielle samtaler (og mindre small talk).
- Milek et al. (2018), poolet replikation med 486 deltagere: sammenhængen mellem livstilfredshed og tid alene, samtaletid og substantielle samtaler blev genfundet (moderat). Sammenhængen med small talk blev ikke genfundet. Small talk er altså ikke skadelig; det er de dybere samtaler, der tæller.
- Kardas, Kumar & Epley (2022): dybe samtaler med fremmede var mindre akavede og mere forbindende end forventet, og fejlvurderingen var størst for de dybe samtaler.

**Betydning for Snakkespil.** Begrunder hele konceptet og et budskab som "Det bliver bedre end du tror". Lette kort er ikke spild: de er opvarmning og tryghed.

**Eksempler:**
- "Hvornår sang du sidst for dig selv? Og for en anden?" (Aron 1997, nr. 5) · let
- "Hvad har du tænkt meget over den seneste tid, som du ikke har fortalt nogen?" · medium
- "Hvad er noget, de fleste ikke ved om dig, men som du godt ville have, at de vidste?" · medium
- "Hvornår græd du sidst foran et andet menneske? Og alene?" (Aron 1997, nr. 30) · dyb
- "Hvad ville du fortryde ikke at have sagt til nogen, hvis du ikke fik chancen igen?" (frit efter Aron 1997, nr. 33) · dyb

### 3.6 Seksuel kommunikation, seksuel "communal strength" og nyhed i lange forhold

**Fund.**
- Mallory, Stanton & Handy (2019), metaanalyse af 48 studier (12.145 deltagere): seksuel kommunikation hænger sammen med bedre seksuel funktion (r ca. 0,12-0,35), stærkest for samlet funktion og hos gifte par. Korrelationelt, så årsagsretningen er uklar.
- Mallory (2022), metaanalyse af 93 studier (ca. 38.500 personer, abstract læst): seksuel kommunikation hænger sammen med relationstilfredshed (r = 0,37) og seksuel tilfredshed (r = 0,43). **Kvaliteten** af kommunikationen hænger stærkere sammen med tilfredshed (r = 0,43 og 0,52) end **hyppigheden** (r = 0,31). Også korrelationelt.
- Muise et al. (2013): personer der er motiverede for at imødekomme partnerens seksuelle behov (seksuel "communal strength") bevarede lysten over fire måneder (kilde: sekundære beskrivelser; DOI fra en referenceliste).
- Muise et al. (2019): nye, selvudvidende aktiviteter med partneren hænger sammen med mere seksuel lyst, som igen hænger sammen med tilfredshed; dagbogs-, forløbs- og eksperimentelle data.

**Betydning for Snakkespil.** 18+-bunken bør handle om ønsker, grænser, nysgerrighed og hvad der føles godt, formuleret respektfuldt og med fokus på kvalitet (lytte, spørge ind) frem for "hvor tit". Den bør også rumme kort om nyhed og leg. Holdes udelukkende i 18+-bunken med aldersmarkering.

**Eksempler (kun til 18+-bunken):**
- "Hvad er noget, jeg gør, som får dig til at føle dig attraktiv?" · let
- "Hvornår har du sidst haft lyst til mig midt i en helt almindelig hverdag?" · medium
- "Er der noget nyt, du er nysgerrig på at prøve sammen, stort eller småt?" · medium
- "Hvordan vil du helst have, at vi taler om det, hvis en af os ikke har lyst?" · dyb
- "Hvad er en grænse, du gerne vil have, at jeg kender, uden at du skal forklare den hver gang?" · dyb

### 3.7 Familiesamtaler med børn: fortællinger, "Do you know" og måltider

**Fund.**
- Fivush, Haden & Reese (2006), oversigtsartikel: forældre der taler uddybende om fælles oplevelser (stiller åbne spørgsmål, bygger videre på barnets svar, taler om følelser), har børn med bedre hukommelse, sprog, følelsesforståelse og tilknytning.
- Fivush, Duke & Bohanek ("Do You Know?", arbejdspapir fra Emory, ca. 2008; ikke fagfællebedømt): 66 unge på 14-16 år. Unge der kendte mere til familiens historie (fx hvordan forældrene mødtes, hvor de voksede op), havde højere trivsel og identitetsudvikling, også kontrolleret for familiefunktion. Forfatterne understreger, at det er processen med at fortælle, ikke viden om fakta, der betyder noget.
- Fivush & Zaman (2011): unge der kunne genfortælle forældrenes barndomshistorier med forælderens perspektiv, havde højere trivsel, men kun for piger og mødres historier (lille studie, ikke DOI-verificeret). Bohanek & Fivush (2010) beskriver samtidig, at forskningen i unges egne fortællinger og trivsel er sparsom og uensartet, så fundene bør læses forsigtigt.
- Harrison et al. (2015), systematisk review af 14 studier: hyppige familiemåltider hang sammen med mindre risikoadfærd, færre spiseforstyrrelser og mindre depression hos unge, stærkest for piger. Overvejende korrelationelt.

**Betydning for Snakkespil.** Grundlag for en ny "Familiehistorier"-bunke på tværs af generationer og en "aftensmad"-spilform. Børnebunken (6-12) bør handle om barnets egne oplevelser og følelser i et sprog børn forstår, ikke om forældrenes problemer. Forældre bør have en lille vejledning i at spørge ind (uddybende stil).

**Eksempler (familie/børn):**
- "Hvad var det sjoveste, der skete for dig i dag?" · let (børn 6-12)
- "Hvis du kunne bestemme alt i en hel dag, hvad ville vi så lave?" · let (børn 6-12)
- "Ved du, hvordan mor og far (eller dine voksne) mødte hinanden? Gæt, og hør så historien." · let
- "Fortæl om en gang, hvor du var modig, selvom du var bange." · medium (børn 6-12)
- "Hvad var noget svært, som vores familie kom igennem sammen?" · dyb (voksne og større børn)

### 3.8 Venskab, ensomhed, kollegaer og icebreakers

**Fund.**
- Holt-Lunstad, Smith & Layton (2010), metaanalyse af 148 studier (308.849 deltagere): stærkere sociale relationer gav ca. 50 % højere sandsynlighed for overlevelse i opfølgningsperioden, på niveau med kendte risikofaktorer. Begrunder hvorfor venskab er værd at investere i.
- Hall (2018): det kræver ca. 40-60 timer sammen at blive afslappede venner, 80-100 timer at blive venner og over 200 timer at blive gode venner; timer der kun bruges på arbejde tæller mindre.
- Edmondson (1999): psykologisk tryghed i teams, en fælles tro på at det er trygt at tage interpersonelle risici, hang sammen med læringsadfærd og præstation i 51 teams. Frazier et al. (2017), metaanalyse af 136 stikprøver (over 22.000 personer): psykologisk tryghed hænger sammen med opgavepræstation og hjælpsom adfærd ud over beslægtede forhold som godt forhold til lederen og arbejdsengagement.
- **Icebreakers:** jeg fandt ingen fagfællebedømt evidens for, at icebreakers i sig selv forbedrer teams. Et lille kontrolleret studie (master-afhandling, Utrecht 2024) fandt ingen effekt af en selvafslørende icebreaker på åben kommunikation. Evidensen for strukturerede samtaler gælder primært par af personer (Aron, Sprecher).

**Betydning for Snakkespil.** Venner-bunken kan legitimt tale om at investere tid. Kollega-bunken bør holde sig til let og medium, undgå privatliv der kan bruges imod en, og fokusere på arbejdsliv, styrker, læring og fejl man har lært af. Ingen dybe personlige kort på arbejdet, og en tydelig "alle må springe over".

**Eksempler (venner og kollegaer):**
- "Hvad er det bedste råd, du har fået i dit arbejdsliv?" · let (kollegaer)
- "Hvad er du god til, som vi andre måske ikke ved?" · let (kollegaer)
- "Fortæl om en fejl, du lærte noget vigtigt af." · medium (kollegaer)
- "Hvad gør det let for dig at sige det højt, når du er uenig?" · medium (kollegaer)
- "Hvornår har du sidst følt, at vores venskab virkelig betød noget for dig?" · medium (venner)
- "Er der noget, du gerne ville have, at vi to gjorde mere sammen?" · dyb (venner)

### 3.9 Risici: hvornår dybe spørgsmål kan skade

**Fund.**
- **Grublen sammen (co-rumination).** Rose (2002), 608 børn og unge: at tale meget og gentagent om problemer og negative følelser hang sammen med tætte venskaber, men også med flere symptomer på angst og depression, især hos piger. Calmes & Roberts (2008) fandt ifølge et søgeresumé, at sammenhængen med belastning skyldtes overlappet med grublen, mens sammenhængen med venskabstilfredshed skyldtes overlappet med selvafsløring. Det er altså grubleriet og ikke selve åbenheden, der ser ud til at være problemet.
- **Pres for at genfortælle traumer.** Cochrane-reviewet om psykologisk debriefing (Rose, Bisson, Churchill & Wessely 2002) fandt ingen gavnlig effekt af en enkelt samtale kort efter en traumatisk hændelse og en mulig risiko for forværring, og anbefaler at obligatorisk debriefing ophører. Overført til et spil: ingen bør presses til at fortælle om traumatiske oplevelser.
- **Konflikt uden ramme.** Gottmans forskning viser, at hård opstart og kritik i konfliktsamtaler hænger sammen med dårligere udfald. Et kort der åbner et ømt emne uden ramme kan starte en konflikt, som ikke kan afsluttes ved bordet.
- **Ulige magt og pres.** Aron et al. (1997, note 9) skriver selv, at de var varsomme med at skabe relationer der ikke ville opstå naturligt, og at deltagerne ikke skulle føle forpligtelse. Gælder især for kollegaer, førstedates og i familier, hvor børn ikke frit kan sige fra.
- **Midlertidig nærhed.** Arons procedure skabte nærhed på 45 minutter, men nærhed bygget over tid (Hall 2018) er noget andet. Undgå at love "forelskelse på 45 minutter".

**Betydning for Snakkespil.** Indbyg "spring over"/"byt kort" overalt, mærk dybe kort, læg problemfokuserede kort i en særskilt bunke med ramme, afslut med et let kort, og skriv en tydelig, kort note om at spillet ikke er terapi (afsnit 5).

**Eksempler på sikre formuleringer af dybe kort (fokus på ressourcer, ikke traume):**
- "Hvad har hjulpet dig igennem en svær periode?" · dyb
- "Hvem var der for dig, da du havde brug for det?" · dyb
- "Hvad ved du nu, som du gerne ville have vidst for fem år siden?" · medium
- "Hvad ville du sige til en ven, der stod i noget af det samme som dig?" · medium

### 3.10 Nyere forskning 2020-2026

Med de søgninger der var til rådighed fandt jeg følgende nyere, fagfællebedømte arbejder: Sprecher (2021) om at nærhedsopgaven også virker medieret, Kardas, Kumar & Epley (2022) om undervurderede dybe samtaler, og Mallory (2022) om at kvaliteten af seksuel kommunikation betyder mere end hyppigheden. Muise et al. (2019) og Rathgeber et al. (2019) er lige på kanten. Jeg fandt ingen verificeret replikation af de 36 spørgsmål med langvarige par fra 2023-2026. En omtalt 2024-undersøgelse fra Amsterdam om "14 spørgsmål" mellem forældre og børn kunne ikke verificeres i en primærkilde og er udeladt.

---

## 4. Forslag til nye bunker og spilformer

Alle forslag kan bygges i det eksisterende format. Navne er forslag.

### 4.1 "Tak" (taknemmelighed)
- **Beskrivelse:** Kort der får jer til at sige tak for konkrete ting og rose den anden for hvem de er.
- **Målgruppe:** Par, familier, venner, kollegaer (variant uden privatliv).
- **Forskning:** Algoe et al. 2010 (dagens taknemmelighed styrker forholdet), Algoe et al. 2016 (ros af den anden er den aktive ingrediens), Kumar & Epley 2018 (vi undervurderer hvor glad modtageren bliver).
- **Eksempler:**
  - "Hvad gjorde jeg i denne uge, som gjorde din dag lidt lettere?" · let
  - "Sig tre ting, du sætter pris på ved personen til venstre for dig." · let
  - "Hvilken egenskab hos mig er du mest glad for, og hvornår så du den sidst?" · medium
  - "Hvem i dit liv har du aldrig fået takket ordentligt? Hvad ville du sige?" · medium
  - "Hvad har jeg givet dig, som du først har forstået værdien af senere?" · dyb

### 4.2 "Kend din partner" (love maps)
- **Beskrivelse:** Gætteleg: den ene gætter den andens svar, den anden afslører og fortæller. Holder jeres billede af hinanden opdateret.
- **Målgruppe:** Par i længere forhold; variant til venner og familie.
- **Forskning:** Gottmans kliniske love map-begreb (ikke selvstændigt testet), Reis' responsivitet, Huang et al. 2017 (opfølgning øger sympati). Ærlig formulering: "inspireret af parterapeuters øvelser", ikke "videnskabeligt bevist".
- **Spilregel:** Gæt først, få svaret, stil ét opfølgende spørgsmål.
- **Eksempler:**
  - "Gæt: hvad er min yndlingsmåde at slappe af på lige nu?" · let
  - "Gæt: hvem ville jeg ringe til først med en god nyhed?" · let
  - "Gæt: hvad bekymrer mig mest for tiden?" · medium
  - "Gæt: hvad drømmer jeg om at nå inden for de næste fem år?" · medium
  - "Gæt: hvornår har jeg sidst følt mig misforstået af dig?" · dyb

### 4.3 "Gode nyheder" (kapitalisering)
- **Beskrivelse:** Del noget godt, og den anden øver sig i at reagere aktivt og konstruktivt: spørge ind, glæde sig, genfortælle.
- **Målgruppe:** Par, familier, venner.
- **Forskning:** Gable et al. 2004 og 2006: reaktionen på gode nyheder forudsiger forholdets trivsel bedre end reaktionen på dårlige.
- **Spilregel:** Efter svaret stiller lytteren to spørgsmål, fx "Hvordan føltes det?" og "Hvad betyder det for dig?".
- **Eksempler:**
  - "Hvad gik bedre end forventet i denne uge?" · let
  - "Fortæl om et lille øjeblik i dag, der gjorde dig glad." · let
  - "Hvad er du lykkedes med for nylig, som ingen har lagt mærke til?" · medium
  - "Hvilken nyhed ville du allerhelst kunne fortælle mig om et år?" · medium
  - "Hvad er du stoltest af i dit liv indtil nu, og hvem ville du helst fortælle det til?" · dyb

### 4.4 "Nyt og ukendt" (nyhed og eventyr)
- **Beskrivelse:** Kort der sætter gang i drømme om nye fælles oplevelser, med en lille "prøv det i denne uge"-udfordring på nogle af kortene.
- **Målgruppe:** Par i lange forhold, venner.
- **Forskning:** Aron et al. 2000 (nye og spændende fælles aktiviteter øger relationskvalitet), Muise et al. 2019 (selvudvidelse øger lyst og tilfredshed), Aron & Aron 1986 (selvudvidelsesteori).
- **Eksempler:**
  - "Hvad er noget, ingen af os har prøvet, som vi kunne gøre næste weekend?" · let
  - "Hvilket sted i Danmark har vi aldrig været sammen, men burde se?" · let
  - "Hvilken færdighed ville du gerne lære sammen med mig?" · medium
  - "Hvornår følte du dig sidst rigtig levende sammen med mig?" · medium
  - "Hvilken side af livet har du lyst til at udforske, som jeg ikke kender så godt?" · dyb

### 4.5 "Svære samtaler med ramme"
- **Beskrivelse:** En særskilt, tydeligt mærket bunke til et aftalt emne. Fast struktur: aftal tid og emne, brug blød opstart, lyt og genfortæl, afslut med noget I er enige om eller værdsætter. Max 3 kort pr. gang.
- **Målgruppe:** Voksne par og voksne venner. Ikke børn, ikke kollegaer.
- **Forskning:** Gottmans blød opstart og fokus på positiv affekt (Gottman et al. 1998; Driver & Gottman 2004), responsivitet (Reis & Shaver 1988), og risikoforskningen (Rose 2002 om grublen; Rose et al. 2002 om tvungen genfortælling).
- **Spilregel:** Start og slut med et kort fra "Tak". Spring over er altid tilladt. Stop hvis en af jer bliver overvældet.
- **Eksempler:**
  - "Hvad er et emne, vi undgår, som du gerne vil kunne tale om en dag? Vælg om det skal være nu." · medium
  - "Fuldend sætningen: 'Jeg føler mig ... når ..., og jeg har brug for ...'" · medium
  - "Hvad tror du, jeg har mest brug for, når vi er uenige?" · dyb
  - "Hvad kan vi gøre anderledes næste gang, vi skændes om det samme?" · dyb
  - "Afslut: hvad sætter du pris på ved den måde, vi talte sammen på i dag?" · let

### 4.6 "Familiehistorier"
- **Beskrivelse:** Kort til børn, forældre og bedsteforældre om familiens historie, med mulighed for at "interviewe" den ældste ved bordet.
- **Målgruppe:** Familier med børn fra ca. 8 år, generationsmøder, højtider.
- **Forskning:** Fivush, Duke & Bohanek (Do You Know?), Fivush & Zaman 2011, Fivush, Haden & Reese 2006 (uddybende fortælling), Harrison et al. 2015 (familiemåltider). Egne spørgsmål, ikke en kopi af "Do You Know"-skalaen.
- **Eksempler:**
  - "Hvor voksede du op, og hvad legede man dengang?" · let
  - "Hvordan mødte dine forældre (eller bedsteforældre) hinanden?" · let
  - "Hvilken tradition i vores familie kan du bedst lide, og hvor kommer den fra?" · let
  - "Fortæl om noget svært, nogen i familien kom igennem, og hvad de gjorde." · medium
  - "Hvad håber du, at børnene i vores familie vil huske om os?" · dyb

### 4.7 Nye spilformer
- **"Spørg videre"-tilstand:** efter hvert svar vises et tilfældigt opfølgende spørgsmål (Huang et al. 2017; Reis & Shaver 1988).
- **"Trappen"-tilstand:** 12 kort, 4 lette, 4 medium, 4 dybe, i rækkefølge, begge svarer (Aron et al. 1997; Sprecher 2021).
- **"Dobbeltdate":** to par spiller trappen sammen (pressemeddelelse fra Welker/Slatcher, ikke fagfællebedømt; brug som eksperiment).
- **"Ugens kort":** ét kort om ugen, fordi effekter af enkeltstående forløb aftager (Kennedy et al. 2018/2019).
- **"Aftensmad":** 3 lette kort til familiebordet, uden skærm (Harrison et al. 2015; Fivush, Haden & Reese 2006).

---

## 5. Vejledningstekster klar til sitet

(Skrevet uden tankestreger og uden løfter om effekt. Kan bruges som de er.)

### Sådan får I mest ud af spillet

Find et roligt øjeblik, hvor I ikke bliver afbrudt. Læg telefonerne væk, undtagen den I spiller på.

Start med de lette kort. Gå først videre til de dybere, når I har lyst. Det er helt normalt, at de første par spørgsmål føles lidt kunstige.

Svar begge to på hvert kort. Den ene læser op og svarer først, og næste gang er det den anden, der starter.

Spørg videre. Det bedste spørgsmål er ofte det andet: "Hvordan føltes det?" eller "Fortæl lidt mere." Lyt for at forstå, ikke for at svare.

I må altid springe et kort over eller tage et nyt. Ingen skal forklare hvorfor.

Mange bliver overraskede over, hvor gode de dybe snakke bliver. Giv dem en chance, men pres ikke nogen.

Slut af med et let eller glad kort, og sig gerne tak for snakken.

Kom tilbage til spillet igen. Et par kort en gang om ugen giver mere end en lang aften en gang om året.

### Når en snak bliver svær

Nogle gange rammer et spørgsmål noget ømt. Det er ikke et tegn på, at noget er galt. Her er et par gode greb:

Hold en pause. I må gerne sige: "Det her vil jeg gerne tale om, men ikke lige nu."

Tal om dig selv. Sig "jeg føler" og "jeg har brug for" i stedet for "du gør altid".

Lyt først, og gentag med dine egne ord, hvad du hørte, før du svarer.

Det er ikke meningen, at I skal løse alt ved bordet. Det er nok at have hørt hinanden.

Skift til et lettere kort, hvis stemningen bliver for tung, og vend tilbage til emnet en anden dag.

Ingen skal fortælle om oplevelser, de ikke er klar til at dele. Det gælder især børn.

Hvis den samme svære snak bliver ved med at gå i ring, kan det være en god idé at få hjælp udefra.

### En vigtig note

Snakkespil er et samtalespil til hygge og nærvær. Det er ikke terapi og kan ikke erstatte professionel hjælp.

Søg hjælp, hvis I oplever konflikter, der ofte ender i skænderier, hvis nogen føler sig utrygge, bange eller presset, hvis der er vold, trusler eller kontrol i forholdet, eller hvis en af jer har det psykisk dårligt over længere tid.

I Danmark kan du blandt andet tale med din egen læge, som kan henvise videre. Mange kommuner tilbyder gratis og anonym familierådgivning. Der findes parterapeuter og psykologer, anonyme rådgivninger for børn og unge, og rådgivning til dig, der oplever vold i et nært forhold. Har du tanker om selvmord, findes der anonyme telefonlinjer, du kan ringe til. Er nogen i akut fare, så ring 112.

(Note til Mads: inden publicering bør konkrete navne og numre på danske rådgivninger tjekkes på deres egne sider og evt. linkes. Jeg har bevidst ikke skrevet numre, der ikke er verificeret.)

---

## 6. Kildeliste

Statusmærker:
- **Original (delvis)**: læst i originalkilden (her: appendiks og noter).
- **Abstract læst**: abstract læst direkte hos udgiver eller i Europe PMC.
- **Sekundær**: abstract-uddrag, laboratorieside, pressemeddelelse eller søgeresumé; fuld tekst ikke læst.
- **Metadata**: kun titel, tidsskrift, år og DOI verificeret via Crossref; indhold fra egen viden eller sekundær omtale.

| # | Forfatter(e), år | Titel | Tidsskrift / udgivelse | DOI | Status |
|---|---|---|---|---|---|
| 1 | Aron, A., Melinat, E., Aron, E. N., Vallone, R. D., & Bator, R. J. (1997) | The experimental generation of interpersonal closeness: A procedure and some preliminary findings | Personality and Social Psychology Bulletin, 23(4), 363-377 | 10.1177/0146167297234003 | Original (delvis): appendiks, instruktioner og noter læst; abstract via sekundær |
| 2 | Aron, A., & Aron, E. N. (1986) | Love and the expansion of self: Understanding attraction and satisfaction | Bog, Hemisphere, New York | Ingen DOI (bog) | Kun reference set i Aron 1997 |
| 3 | Aron, A., Norman, C. C., Aron, E. N., McKenna, C., & Heyman, R. E. (2000) | Couples' shared participation in novel and arousing activities and experienced relationship quality | Journal of Personality and Social Psychology, 78(2), 273-284 | 10.1037/0022-3514.78.2.273 | Sekundær |
| 4 | Sprecher, S. (2021) | Closeness and other affiliative outcomes generated from the Fast Friends procedure: A comparison with a small-talk task and unstructured self-disclosure and the moderating role of mode of communication | Journal of Social and Personal Relationships, 38, 1452-1471 | 10.1177/0265407521996055 | Sekundær (abstract-uddrag) |
| 5 | Sprecher, S., Treger, S., & Wondra, J. D. (2013) | Effects of self-disclosure role on liking, closeness, and other impressions in get-acquainted interactions | Journal of Social and Personal Relationships, 30, 497-514 | 10.1177/0265407512459033 | Sekundær |
| 6 | Sprecher, S., Treger, S., Wondra, J. D., Hilaire, N., & Wallpe, K. (2013) | Taking turns: Reciprocal self-disclosure promotes liking in initial interactions | Journal of Experimental Social Psychology, 49, 860-866 | 10.1016/j.jesp.2013.03.017 | Metadata + sekundær |
| 7 | Collins, N. L., & Miller, L. C. (1994) | Self-disclosure and liking: A meta-analytic review | Psychological Bulletin, 116(3), 457-475 | 10.1037/0033-2909.116.3.457 | Sekundær (abstract via PubMed-resumé) |
| 8 | Kardas, M., Kumar, A., & Epley, N. (2022) | Overly shallow?: Miscalibrated expectations create a barrier to deeper conversation | Journal of Personality and Social Psychology, 122, 367-398 | 10.1037/pspa0000281 | Metadata + sekundær (APA-pressemeddelelse) |
| 9 | Mehl, M. R., Vazire, S., Holleran, S. E., & Clark, C. S. (2010) | Eavesdropping on happiness: Well-being is related to having less small talk and more substantive conversations | Psychological Science, 21(4), 539-541 | 10.1177/0956797610362675 | Sekundær |
| 10 | Milek, A., m.fl. (2018) | "Eavesdropping on happiness" revisited: A pooled, multisample replication of the association between life satisfaction and observed daily conversation quantity and quality | Psychological Science, 29(9), 1451-1462 | 10.1177/0956797618774252 | Abstract læst (APS); medforfattere efter førsteforfatter ikke verificeret |
| 11 | Huang, K., Yeomans, M., Brooks, A. W., Minson, J., & Gino, F. (2017) | It doesn't hurt to ask: Question-asking increases liking | Journal of Personality and Social Psychology, 113(3), 430-452 | 10.1037/pspi0000097 | Sekundær |
| 12 | Reis, H. T., & Shaver, P. (1988) | Intimacy as an interpersonal process | I S. W. Duck (red.), Handbook of Personal Relationships (s. 367-389). Wiley | Ingen DOI (bogkapitel) | Sekundær (reference bekræftet i Aron 1997) |
| 13 | Laurenceau, J.-P., Barrett, L. F., & Pietromonaco, P. R. (1998) | Intimacy as an interpersonal process: The importance of self-disclosure, partner disclosure, and perceived partner responsiveness in interpersonal exchanges | Journal of Personality and Social Psychology, 74(5), 1238-1251 | 10.1037/0022-3514.74.5.1238 | Metadata + sekundær |
| 14 | Reis, H. T., Clark, M. S., & Holmes, J. G. (2004) | Perceived partner responsiveness as an organizing construct in the study of intimacy and closeness | I D. Mashek & A. Aron (red.), Handbook of Closeness and Intimacy (s. 201-225). Erlbaum | Ingen DOI (bogkapitel) | Sekundær |
| 15 | Reis, H. T. (2007) | Steps toward the ripening of relationship science | Personal Relationships, 14(1) | 10.1111/j.1475-6811.2006.00139.x | Metadata |
| 16 | Gable, S. L., Reis, H. T., Impett, E. A., & Asher, E. R. (2004) | What do you do when things go right? The intrapersonal and interpersonal benefits of sharing positive events | Journal of Personality and Social Psychology, 87(2), 228ff. (slutside ikke verificeret) | 10.1037/0022-3514.87.2.228 | Sekundær |
| 17 | Gable, S. L., Gonzaga, G. C., & Strachman, A. (2006) | Will you be there for me when things go right? Supportive responses to positive event disclosures | Journal of Personality and Social Psychology, 91(5), 904-917 | 10.1037/0022-3514.91.5.904 | Sekundær (abstract-uddrag) |
| 18 | Algoe, S. B., Gable, S. L., & Maisel, N. C. (2010) | It's the little things: Everyday gratitude as a booster shot for romantic relationships | Personal Relationships, 17, 217-233 | 10.1111/j.1475-6811.2010.01273.x | Metadata + sekundær |
| 19 | Algoe, S. B., Haidt, J., & Gable, S. L. (2008) | Beyond reciprocity: Gratitude and relationships in everyday life | Emotion, 8(3), 425-429 | 10.1037/1528-3542.8.3.425 | Metadata (sidetal efter 425 ikke verificeret) |
| 20 | Algoe, S. B., Kurtz, L. E., & Hilaire, N. M. (2016) | Putting the "you" in "thank you": Examining other-praising behavior as the active relational ingredient in expressed gratitude | Social Psychological and Personality Science | 10.1177/1948550616651681 | Metadata |
| 21 | Kumar, A., & Epley, N. (2018) | Undervaluing gratitude: Expressers misunderstand the consequences of showing appreciation | Psychological Science | 10.1177/0956797618772506 | Sekundær |
| 22 | Gottman, J. M., & Levenson, R. W. (1992) | Marital processes predictive of later dissolution: Behavior, physiology, and health | Journal of Personality and Social Psychology, 63(2), 221ff. (slutside ikke verificeret) | 10.1037/0022-3514.63.2.221 | Sekundær |
| 23 | Gottman, J. M., Coan, J., Carrere, S., & Swanson, C. (1998) | Predicting marital happiness and stability from newlywed interactions | Journal of Marriage and the Family, 60 | 10.2307/353438 | Metadata + sekundær |
| 24 | Gottman, J. M., & Levenson, R. W. (2000) | The timing of divorce: Predicting when a couple will divorce over a 14-year period | Journal of Marriage and the Family, 62, 737-745 | DOI ikke verificeret | Sekundær |
| 25 | Driver, J. L., & Gottman, J. M. (2004) | Daily marital interactions and positive affect during marital conflict among newlywed couples | Family Process, 43(3), 301-314 | 10.1111/j.1545-5300.2004.00024.x | Metadata |
| 26 | Heyman, R. E., & Smith Slep, A. M. (2001) | The hazards of predicting divorce without crossvalidation | Journal of Marriage and Family, 63(2), 473-479 | DOI ikke verificeret | Sekundær |
| 27 | Rathgeber, M., Bürkner, P.-C., Schiller, E.-M., & Holling, H. (2019; online 2018) | The efficacy of emotionally focused couples therapy and behavioral couples therapy: A meta-analysis | Journal of Marital and Family Therapy, 45(3) | 10.1111/jmft.12336 | Metadata + sekundær (abstract-uddrag) |
| 28 | Kennedy, N., Johnson, S. M., Wiebe, S. A., Willett, J. B., & Tasca, G. A. (2018/2019) | Conversations for connection: An outcome assessment of the Hold-Me-Tight relationship-education program for couples | Journal of Marital and Family Therapy | 10.1111/jmft.12356 | Metadata + sekundær (afhandlingens resumé, uOttawa) |
| 29 | Mallory, A. B., Stanton, A. M., & Handy, A. B. (2019) | Couples' sexual communication and dimensions of sexual function: A meta-analysis | The Journal of Sex Research, 56(7) | 10.1080/00224499.2019.1568375 | Metadata + sekundær |
| 30 | Mallory, A. B. (2022) | Dimensions of couples' sexual communication, relationship satisfaction, and sexual satisfaction: A meta-analysis | Journal of Family Psychology | 10.1037/fam0000946 | Abstract læst (Europe PMC) |
| 31 | Muise, A., Impett, E. A., Kogan, A., & Desmarais, S. (2013) | Keeping the spark alive: Being motivated to meet a partner's sexual needs sustains sexual desire in long-term romantic relationships | Social Psychological and Personality Science, 4, 267-273 | 10.1177/1948550612457185 (fra referenceliste, ikke Crossref-tjekket) | Sekundær |
| 32 | Muise, A., Harasymchuk, C., Day, L. C., Bacev-Giles, C., Gere, J., & Impett, E. A. (2019) | Broadening your horizons: Self-expanding activities promote desire and satisfaction in established romantic relationships | Journal of Personality and Social Psychology, 116(2), 237-258 | 10.1037/pspi0000148 | Sekundær (abstract-uddrag via PubMed-resumé) |
| 33 | Fivush, R., Haden, C. A., & Reese, E. (2006) | Elaborating on elaborations: Role of maternal reminiscing style in cognitive and socioemotional development | Child Development, 77, 1568-1588 | 10.1111/j.1467-8624.2006.00960.x | Sekundær |
| 34 | Fivush, R., Duke, M., & Bohanek, J. G. (ca. 2008) | "Do you know...": The power of family history in adolescent identity and well-being | Arbejdspapir, Emory University (ikke fagfællebedømt); år og serie ikke verificeret | Ingen DOI | Sekundær |
| 35 | Fivush, R., & Zaman, W. (2011) | Intergenerational narratives: How collective family stories relate to adolescents' emotional well-being | Aurora (PUC-SP), nr. 10 | DOI ikke verificeret | Sekundær |
| 36 | Bohanek, J. G., & Fivush, R. (2010) | Personal narratives, well-being, and gender in adolescence | Cognitive Development, 25(4), 368-379 | 10.1016/j.cogdev.2010.08.003 | Sekundær (kun nævnt som baggrund) |
| 37 | Harrison m.fl. (2015) | Systematic review of the effects of family meal frequency on psychosocial outcomes in youth | Canadian Family Physician, 61(2), e96-e106 | DOI ikke verificeret; PMCID PMC4325878 | Sekundær; medforfattere efter førsteforfatter ikke verificeret |
| 38 | Hall, J. A. (2018) | How many hours does it take to make a friend? | Journal of Social and Personal Relationships | 10.1177/0265407518761225 | Metadata + sekundær |
| 39 | Holt-Lunstad, J., Smith, T. B., & Layton, J. B. (2010) | Social relationships and mortality risk: A meta-analytic review | PLoS Medicine, 7(7), e1000316 | 10.1371/journal.pmed.1000316 | Sekundær (abstract-uddrag) |
| 40 | Edmondson, A. (1999) | Psychological safety and learning behavior in work teams | Administrative Science Quarterly, 44(2), 350-383 | 10.2307/2666999 | Sekundær |
| 41 | Frazier, M. L., Fainshmidt, S., Klinger, R. L., Pezeshkan, A., & Vracheva, V. (2017) | Psychological safety: A meta-analytic review and extension | Personnel Psychology, 70(1), 113-165 | 10.1111/peps.12183 | Sekundær |
| 42 | Rose, A. J. (2002) | Co-rumination in the friendships of girls and boys | Child Development, 73(6), 1830-1843 | 10.1111/1467-8624.00509 | Sekundær (abstract via PubMed-resumé) |
| 42b | Calmes, C. A., & Roberts, J. E. (2008) | Rumination in interpersonal relationships: Does co-rumination explain gender differences in emotional distress and relationship satisfaction among college students? | Cognitive Therapy and Research | DOI ikke verificeret | Sekundær (søgeresumé); titel efter kolon ikke verificeret |
| 43 | Rose, S., Bisson, J., Churchill, R., & Wessely, S. (2002) | Psychological debriefing for preventing post traumatic stress disorder (PTSD) | Cochrane Database of Systematic Reviews, CD000560 | 10.1002/14651858.CD000560 | Sekundær (plain language summary og abstract-uddrag) |
| 44 | Welker, Slatcher m.fl. (ca. 2014-2015) | Fast Friends med to par (konferencebidrag, SPSP) | Pressemeddelelse, Wayne State University; ikke verificeret som tidsskriftsartikel | Ingen | Sekundær; bruges kun som inspiration |
| 45 | (Grå litteratur) Master-afhandling, Utrecht Universitet (2024) | Icebreaker med selvafsløring og åben kommunikation i små grupper | studenttheses.uu.nl (handle 20.500.12932/47301) | Ingen | Sekundær; ikke fagfællebedømt, kun nævnt for at vise svag evidens |

Antal kilder: 46, heraf 40 fagfællebedømte tidsskriftsartikler, metaanalyser og reviews, 3 bøger/bogkapitler (nr. 2, 12, 14) og 3 grå litteratur (nr. 34 arbejdspapir, nr. 44 pressemeddelelse, nr. 45 master-afhandling).

### Søgebudget
41 af 45 WebSearch-kald brugt. Derudover WebFetch mod Crossref, Europe PMC, APS og originalen af Aron et al. 1997 (tæller ikke i budgettet).
