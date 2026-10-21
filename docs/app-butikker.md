# Snakkespil i App Store og Google Play

Tekster og svar til butikkerne. Kopiér felterne direkte. Tegnloft står ved hvert felt.

Appen bygges uden voksen-bunken (`APP_BUILD=1`, issue #54), så den kan få en lav aldersmærkning (forventet 13+ hos Apple) og bruges af skoler og spejdergrupper. Voksen-bunken findes på snakkespil.dk og i den særskilte app Snakkespil 18+ (se nederst).

## Fælles

- **Navn:** Snakkespil
- **Bundle-/pakke-id:** dk.snakkespil.app
- **Kategori:** Livsstil (iOS: Lifestyle, sekundær: Games > Card) / Google Play: Spil > Kort
- **Privatlivspolitik:** https://snakkespil.dk/privatliv/
- **Support-URL:** https://snakkespil.dk/om/
- **Marketing-URL:** https://snakkespil.dk/
- **Kontakt:** mads@mahoje.dk
- **Pris:** gratis, ingen køb i appen, ingen reklamer

## App Store

**Undertitel** (max 30): `Samtalekort til de gode snakke`

**Reklametekst** (max 170):
`Træk et kort, læs spørgsmålet højt, og lad snakken gå. Over 2.500 spørgsmål til kæresten, familien, klassen og vennerne. Gratis og uden reklamer.`

**Søgeord** (max 100, kommasepareret, uden mellemrum efter komma):
`samtalekort,samtalespil,spørgsmål,par,kæreste,familie,venner,date,dybe spørgsmål,hvad vil du helst`

**Nyheder i denne version:**
`Første version af Snakkespil som app: alle bunker til par, familie, venner, skole og spejder, spil uden internet og påmindelse om dagens spørgsmål.`

## Google Play

**Kort beskrivelse** (max 80):
`Gratis samtalekort på dansk til par, familie, venner og kolleger.`

## Beskrivelse (begge butikker, max 4.000)

```
Snakkespil er samtalekort på telefonen. Træk et kort, læs spørgsmålet højt, og lad snakken gå.

Der er over 2.500 spørgsmål fordelt på bunker til hvem I er sammen med:
• Parforhold, intimitet og første date
• Familie, børn, nye forældre og familiehistorier
• Skolen fra indskoling til udskoling, efterskolen, gymnasiet og studielivet
• Spejder og Gilwell
• Venner, kolleger og højtider
• Dybe og filosofiske spørgsmål, drømme, fortid og fremtid
• Tak, gode nyheder og nyt og ukendt
• Hvad vil du helst, med 120 dilemmaer
• Svære samtaler, med en fast ramme for de vigtige snakke

Hvert kort er mærket let, medium eller dyb, så I selv vælger, hvor langt ind I vil.

Spilformer:
• Trappen: tolv kort fra let til dyb, bygget på Arthur Arons forskning i nærhed
• Send telefonen rundt: I skiftes, og telefonen holder styr på, hvis tur det er
• Aftensmad: tre lette kort til familiebordet
• Spørg videre: få et opfølgende spørgsmål, når snakken skal et lag dybere

Og så:
• Dagens spørgsmål som påmindelse, hver dag eller én gang om ugen
• Gem dine favoritter og skriv dine egne kort
• Virker uden internet
• Ingen konto, ingen reklamer, ingen cookies. Det du gemmer, bliver på telefonen

Snakkespil er et samtalespil til hygge og nærvær. Det er ikke terapi.
Lavet i Danmark af Mahope.
```

## Aldersmærkning

Appen indeholder ingen voksenkort. Et par kort i de almindelige bunker nævner dog alkohol (fx »det dummeste du har gjort fuld?«) og sex i forbifarten, og det skal svares ærligt.

**App Store** (skalaen 4+/9+/13+/16+/18+; Apple beregner mærkningen ud fra svarene):
- Vold, rædsel, våben, gambling, konkurrencer, ubegrænset web, brugergenereret indhold delt med andre: **Ingen/Nej**
- Alkohol, tobak eller stoffer (omtale): **Sjælden/mild**
- Moden eller antydende tematik: **Sjælden/mild**
- Seksuelt indhold eller nøgenhed: **Ingen** (kun ord som »sex« i forbifarten; ingen beskrivelser)
- Forventet resultat: **13+**

**Google Play (IARC):** vold nej, seksuelt indhold nej (ingen beskrivelser), groft sprog nej, omtale af alkohol **ja** (tekst, ingen opfordring), gambling nej, brugerinteraktion nej (en anonym rapport om et kort er ikke kommunikation mellem brugere). Forventet resultat: **PEGI 12 / USK 12**.

**Målgruppe i Play Console:** 13 år og opefter. Bunkerne til børn og skoleklasser er skrevet til, at en voksen læser højt, og appen er ikke lavet primært til børn. Bliver det udfordret af Google, er planen at fjerne alkoholkortene fra app-buildet og vælge Familiepolitikken.

## Datasikkerhed (Google Play) og privatlivsoplysninger (App Store)

- **Indsamlede data:** App-aktivitet: anonym brugsstatistik (hvilke bunker der spilles, antal kort). Ikke koblet til brugeren, ikke brugt til sporing, ikke delt med tredjeparter til reklame.
- **Rapportér-knappen:** sender kortets id, en årsag og en valgfri kommentar. Ingen navne, mails eller enheds-id'er.
- **Ikke indsamlet:** navn, mail, telefon, lokation, kontakter, fotos, enheds-id, reklame-id.
- **Kryptering under overførsel:** ja (HTTPS).
- **Sletning:** ingen konto og ingen data hos os at slette; lokale data slettes ved at afinstallere appen.
- App Store "Data Not Linked to You": Usage Data (Product Interaction). Ikke "Tracking".

## Screenshots

Ligger i `assets/store/screenshots/` (iPhone 6,9" 1290×2796 og Android 1080×2340). Rækkefølge: forside, valg af spil, et vendt kort, Spørg videre, Trappen.

## Goodtalk (engelsk app, issue #74)

Samme native projekt bygget med `SITE_LOCALE=en`: CI sætter app-id og navn (`APP_ID`/`APP_NAME` til Gradle, `PRODUCT_BUNDLE_IDENTIFIER`/`APP_DISPLAY_NAME` til Xcode). Artefaktet hedder `goodtalk-android-<nr>`. Aldersmærkning, datasikkerhed og screenshots-rækkefølge som ovenfor.

- **Navn:** Goodtalk
- **Bundle-/pakke-id:** com.goodtalkcards.app
- **Kategori:** Lifestyle (sekundær: Games > Card) / Google Play: Games > Card
- **Privatlivspolitik:** https://goodtalkcards.com/privacy/
- **Support-URL:** https://goodtalkcards.com/about/
- **Marketing-URL:** https://goodtalkcards.com/
- **Sprog:** English (U.S.) og English (U.K.)

**Undertitel** (App Store, max 30): `Cards for better conversations`

**Reklametekst** (max 170):
`Draw a card, read the question out loud, and let the conversation flow. Over 2,500 questions for couples, families, friends and classrooms. Free, no ads.`

**Søgeord** (max 100):
`conversation cards,questions,couples,date night,family,deep questions,would you rather,icebreakers`

**Kort beskrivelse** (Google Play, max 80):
`Free conversation cards for couples, families, friends and coworkers.`

**Beskrivelse** (max 4.000):

```
Goodtalk is conversation cards on your phone. Draw a card, read the question out loud, and let the conversation flow.

Over 2,500 questions in decks for whoever you're with:
• Couples, intimacy and first dates
• Family, kids, new parents and family stories
• School, college and student life
• Friends, coworkers and holidays
• Deep and philosophical questions, dreams, the past and the future
• Would you rather, with 120 dilemmas
• Hard talks, for the conversations that matter

Every card is marked light, medium or deep, so you choose how far in you want to go.

Ways to play:
• Guess the answer: one person answers in secret, the next one guesses, with points if you like
• Year in review: four rounds for New Year's Eve and birthdays
• Party games with ready-made cards
• A daily question, the same for everyone that day

And:
• Joker cards now and then, such as "ask a question of your own"
• Works offline
• No account, no ads, no cookies. What you save stays on your phone

Goodtalk is a conversation game for fun and closeness. It is not therapy.
Made in Denmark by Mahope.
```

## Snakkespil 18+ (voksenapp, issue #57)

Særskilt app med kun voksen- og parbunker, bygget fra samme native projekt med `APP_VARIANT=voksen` (ruterne `src/app/**/*.voksen.tsx`, bunkerne i `src/voksen/decks.ts`). CI-artefakt: `snakkespil-voksen-android-<nr>`. Appen spørger om alder ved første start (`src/voksen/AgeGate.tsx`).

**Indholdsgrænse (fra butikkernes regler, læst 21/10-2026):**
- Apple 1.1.4 afviser "overtly sexual or pornographic material", dvs. eksplicitte beskrivelser af kønsdele eller seksuelle handlinger, der skal vække erotiske følelser.
- Google Play afviser indhold "intended to be sexually gratifying", sexguides og eksplicit tekst, også i butiksteksten.
- Derfor: kortene må være flirtende, frække og nære (kys, berøring, lyst, fantasier som emne), men aldrig beskrive sex, kroppe eller give instruktioner. Testen `voksen.test.ts` afviser eksplicitte ord i udfordringerne. Ingen frække ord i butiksteksten.

- **Navn:** Snakkespil 18+
- **Bundle-/pakke-id:** dk.snakkespil.voksen
- **Kategori:** Lifestyle / Google Play: Livsstil
- **Privatlivspolitik:** https://snakkespil.dk/privatliv/

**Undertitel** (max 30): `Samtalekort for par`

**Reklametekst** (max 170):
`Kort til jer to: modige spørgsmål, nærhed og små udfordringer. Skiftes til at trække, og lær hinanden at kende på ny. Gratis og uden reklamer.`

**Søgeord** (max 100): `par,kæreste,parforhold,samtalekort,date night,intimitet,spørgsmål til par,udfordringer`

**Kort beskrivelse** (Google Play, max 80): `Samtalekort og små udfordringer for par. Kun for voksne.`

**Beskrivelse:**

```
Snakkespil 18+ er samtalekort for par. Træk et kort, og lad det tage jer et sted hen, I ikke kommer hver dag.

Bunker:
• Udfordringer: kys, berøring og små opgaver, kun i appen
• Kun for voksne: modige spørgsmål om lyst, fantasier og jer to
• Intimitet og Parforhold
• Kend din partner
• Første date

Hvert kort er mærket let, medium eller dyb. Ingen konto, ingen reklamer, ingen cookies. Det, du gemmer, bliver på telefonen.

Kun for voksne over 18. Snakkespil 18+ er et samtalespil til par. Det er ikke terapi.
Lavet i Danmark af Mahope.
```

**Aldersmærkning:**
- App Store: Moden eller antydende tematik **hyppig/intens**, seksuelt indhold eller nøgenhed **sjælden/mild** (antydende tekst, ingen beskrivelser). Forventet **18+** på Apples aldersskala. Ingen brugerindhold.
- Google Play (IARC): seksuelt indhold **ja, antydende tekst uden nøgenhed eller beskrivelser**, groft sprog nej, vold nej. Forventet **PEGI 16/18**. Målgruppe: **18 år og opefter**.
- Datasikkerhed: som Snakkespil ovenfor.
