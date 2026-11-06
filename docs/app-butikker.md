# Snakkespil i App Store og Google Play

Tekster og svar til butikkerne. Kopiér felterne direkte. Tegnloft står ved hvert felt.

Appen bygges uden voksen-bunken (`APP_BUILD=1`, issue #54), så den kan få en lav aldersmærkning (forventet 13+ hos Apple) og bruges af skoler og spejdergrupper. Voksen-bunken findes på snakkespil.dk og i den særskilte app Snakkespil 18+ (se nederst).

## App-skallen

Appene er ikke hjemmesiden i en ramme. Alle tre har en bundmenu med fire faner, navigationsbjælker med tilbage-knap og indstillinger som lister. Udseendet følger platformen (iOS: store titler, gennemsigtig fanebjælke, swipe fra venstre kant; Android: Material 3 med pille om den aktive fane, ripple og systemets tilbage-knap). Privatlivspolitikken ligger under Mere/More, som Apple kræver. Hjemmesidens forside, FAQ, sidefod og SEO-sider findes ikke i appene.

- **Snakkespil** (`APP_BUILD=1`, rutetræet `src/app/**/*.app.tsx`): Spil, I dag, Favoritter og Mere (indstillinger med påmindelse, dine egne spørgsmål, statistik, sådan spiller I, lege, ikke-terapi, om, privatliv, del).
- **Goodtalk** (`APP_BUILD=1 SITE_LOCALE=en`, `*.intlapp.tsx`): Play, Today, Favorites og More (settings med jokere og udseende, how to play, party games, about, privacy, share). Al tekst er engelsk. Der er endnu ingen påmindelser og ingen egne spørgsmål på engelsk.
- **Snakkespil 18+** (`APP_VARIANT=voksen`, `*.voksen.tsx`): alderskontrollen ligger foran alt, også fanerne. Bunker, I aften (et tilfældigt kort eller en udfordring), Favoritter og Mere (indstillinger med udseende og »spørg om alder igen«, når det bliver svært, om, privatliv, del). Mørkt tema som standard.

Butiks-screenshots i `assets/store/screenshots/` viser den gamle app og skal tages om fra app-skallen. iPad-billederne i App Store Connect er fra 22/10 og viser fejlene, som PR #93 rettede (klemt titel, usynlig del-knap, tastaturgenveje på touch), så de skal skiftes ud før næste indsendelse (Apple 2.3.3).

## Automatiske builds til butikkerne

- **Android:** `android.yml` bygger alle tre apps. Builds fra master uploades til det lukkede testspor (`alpha`) med `scripts/store/play-upload.py` og service-kontoen `play-publisher@mahoje.iam.gserviceaccount.com` (repo-secret `PLAY_SERVICE_ACCOUNT_JSON_B64`, Bitwarden "Google Play: service-konto play-publisher"). Apps, der ikke findes i Play Console endnu, springes over. Så længe en app er kladde i Play, oprettes udgivelsen som kladde.
- **iOS:** `ios.yml` kører på `mahope-mac`. Builds fra master signeres med Apple Distribution-certifikatet (team P7698GU4AV, Bitwarden "Apple Distribution-certifikat Mads Holst Jensen") og uploades til App Store Connect med `scripts/store/ios-release.sh` (secrets `ASC_KEY_ID`, `ASC_ISSUER_ID`, `ASC_KEY_P8_B64`, `IOS_DIST_P12_B64`, `IOS_DIST_P12_PASSWORD`). Build-nummer er 1000 + kørselsnummer (over den håndlavede build 300). Apps uden app-post i App Store Connect springes over.
- Selve app-posterne oprettes én gang i hånden. Indsendelse til review sker stadig med vilje (Apple: `asc review submit`, Play: Udgivelsesoversigt).

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

- **Indsamlede data:** App-aktivitet: anonym brugsstatistik (hvilke bunker der spilles, antal kort) via selvhostet Plausible (analytics.holstjensen.eu) og selvhostet Umami (stats.mahoje.dk), begge uden cookies. Ikke koblet til brugeren, ikke brugt til sporing, ikke delt med tredjeparter til reklame.
- **Rapportér-knappen:** sender kortets id, en årsag og en valgfri kommentar til egen server (`/api`, Worker), beskyttet af Cloudflare Turnstile. Ingen navne, mails eller enheds-id'er. Findes i alle tre apps.
- **Ikke indsamlet:** navn, mail, telefon, lokation, kontakter, fotos, enheds-id, reklame-id.
- **Kryptering under overførsel:** ja (HTTPS).
- **Sletning:** ingen konto og ingen data hos os at slette; lokale data slettes ved at afinstallere appen.
- App Store "Data Not Linked to You": Usage Data (Product Interaction, formål Analytics) og User Content (Other User Content, formål App Functionality, for rapportkommentaren). Ikke "Tracking", så ingen ATT-prompt.
- Google Play Datasikkerhed: App-aktivitet (Interaktioner med appen, Analyse) og App-aktivitet (Andet brugergenereret indhold, App-funktionalitet, valgfrit). Ingen data deles.

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
`Draw a card, read the question out loud, and let the conversation flow. Nearly 2,500 questions for couples, families, friends and classrooms. Free, no ads.`

**Søgeord** (max 100):
`conversation cards,questions,couples,date night,family,deep questions,would you rather,icebreakers`

**Kort beskrivelse** (Google Play, max 80):
`Free conversation cards for couples, families, friends and coworkers.`

**Beskrivelse** (max 4.000):

```
Goodtalk is conversation cards on your phone. Draw a card, read the question out loud, and let the conversation flow.

Nearly 2,500 questions in decks for whoever you're with:
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

## Indsendelse til review (status 6/11-2026)

**Status:**
- App Store: Snakkespil 2.0.0 blev afvist 22/10 efter 2.1 (Information Needed). Apple vil have en skærmoptagelse fra en fysisk iPhone og svar på syv punkter. Goodtalk og Snakkespil 18+ har app-poster med version 2.0.0, men mangler metadata, aldersmærkning, App Privacy og screenshots. Builds i App Store Connect: 1245 (Snakkespil, Goodtalk) og 1234 (18+, kørsel 245 døde under 18+-buildet).
- Google Play: alle tre apps har 2.0.0 (243) på lukket test (alpha). Produktion er tom. En personlig udviklerkonto skal have 12 testere i 14 dage, før produktion kan søges.

**Lært af Ovardos afvisning 27/10 (2.1(a) Sign in with Apple på iPad, 5.1.1(v) kontosletning):** ingen af de tre apps har login eller konto, så kontosletning og Sign in with Apple gælder ikke. iPad testes alligevel på en rigtig iPad eller en iPad-simulator før indsendelse, og iPad-screenshots skal vise den nuværende app.

**Version og build:** ingen af apps'ene er udgivet nogen steder, så versionen bliver 2.0.0. iOS bruger nyeste CI-build fra master (over 1245), Android nyeste versionCode (over 243). Første master-build efter merge af ændringer i `src/` uploades automatisk til TestFlight og Play-alpha.

**Klik for Mads, App Store Connect (Snakkespil, app 6825365746):**
1. Installér nyeste build fra TestFlight på en iPhone med nyeste iOS.
2. Optag skærmen fra appen åbnes: vælg en bunke, vend to-tre kort, del et kort, gem en favorit, åbn I dag, slå påmindelsen til i Mere, åbn Rapportér på et kort (vis at formularen indlæses), og vis Privatliv under Mere.
3. Under App Review: svar på beskeden i Resolution Center med optagelsen og teksten fra *Notes for review* nedenfor. Lav samme upload som vedhæftning under App Review Information.
4. Tjek App Privacy: Usage Data (Product Interaction) og User Content (Other User Content), begge "Not linked", ingen tracking.
5. Skift iPad-screenshots ud (13", 2064×2752).
6. Vælg den nye build og send til review (eller giv go, så kører agenten `asc review submit`).

**Klik for Mads, Goodtalk (6826397017) og Snakkespil 18+ (6826397377):**
1. Aldersmærkning i App Store Connect (spørgeskemaet under App Information): Goodtalk som Snakkespil ovenfor; 18+ som beskrevet under Snakkespil 18+.
2. App Privacy som Snakkespil. Det kan ikke sættes via API.
3. Resten (beskrivelse, søgeord, kategori, pris, tilgængelighed, review-noter, screenshots) sættes med `new_app_asc.py` på Mac'en. Agenten kan køre den.
4. Indsend først, når Snakkespil er godkendt, så Apple ikke behandler tre nye apps fra en ny konto på én gang.

**Klik for Mads, Google Play Console:**
1. Erklær trader-status under Konto > Kontooplysninger > Om dig (frist 1/2-2027). Som trader vises adresse og telefon offentligt i Play.
2. Tjek under Test > Lukket test, om der er 12 testere, som har været med i 14 dage. Søg derefter om produktionsadgang (spørgeskemaet om testen).
3. Opdatér Datasikkerhed, hvis rapportkommentaren ikke allerede står der (se ovenfor).

## Notes for review (App Store Connect, engelsk)

Teksterne ligger i App Store Connect under App Review Information (sat 6/11-2026). De dækker Apples syv punkter fra 2.1-afvisningen.

**Snakkespil:**

```
Snakkespil is a free Danish conversation card game for couples, families, friends, school classes and scout groups who want better conversations than small talk. The app contains thousands of question cards in more than 30 themed decks (couples, family dinner, friends, school, scouts, deep talks) that people take turns answering, plus game modes such as Trappen (questions that get deeper step by step), Aftensmad (dinner), Gæt svaret (guess the answer) and Året der gik (the year that was). Target audience: Danish-speaking families, couples and teachers; content is suitable for ages 12+. The 18+ deck from the website is NOT included in this app.

How to use: no account, no login, no setup. Spil tab: pick a deck, tap the card to flip it, tap "Næste kort" for the next card. Heart icon saves a favourite on the device (Favoritter tab). I dag tab: question of the day. Mere tab: settings, how to play, privacy policy, about, and an optional daily reminder (local notification, asked only when the user turns it on). The share button opens the native share sheet. Haptic feedback on card flips.

Offline: all cards and game modes are bundled in the app and work without a network connection.

iPad: the app supports iPad in all orientations with the same features as on iPhone.

External services:
- Cookieless, anonymous usage statistics (which decks are played, number of cards) via self-hosted Plausible Analytics (analytics.holstjensen.eu) and self-hosted Umami (stats.mahoje.dk). No personal data, no device identifiers, no advertising IDs, no tracking across apps or websites.
- The optional "Rapportér" button on a card sends the card id, a reason and an optional comment to the developer's own server (snakkespil.dk/api), protected against spam by Cloudflare Turnstile. No names, emails or device identifiers are sent.
No login provider, payment processor, advertising SDK or AI service is used.

Accounts: none. There is no account creation, so account deletion does not apply. All data (favourites, settings, progress) is stored locally on the device and removed when the app is deleted.
User-generated content: users can write their own questions, but they are stored only on their own device and are never shown to other users.
Regional differences: none, the app works the same everywhere; content is in Danish.
Regulated industry / third-party material: not applicable, all questions are written by the developer. Help lines shown in "Sådan spiller I" are public Danish crisis lines.
In-App Purchase: none. No subscriptions, no ads, no paid content.

A screen recording from a physical iPhone running the latest iOS is attached to this submission.
```

**Goodtalk:**

```
Goodtalk is a free conversation card game in English for couples, families and friends who want better conversations than small talk. It is the English edition of the Danish app Snakkespil (same developer). The app contains about 1,800 question cards in 22 themed decks (couples, family dinner, friends, deep talks) that people take turns answering, plus the game modes Guess the answer and Year in review. Target audience: English-speaking families, couples and friends; content is suitable for ages 12+. There is no adult content in this app.

How to use: no account, no login, no setup. Play tab: pick a deck, tap the card to flip it, tap "Next card" for the next one. The heart icon saves a favourite on the device (Favorites tab). Today tab: question of the day. More tab: settings, how to play, party games, about and privacy policy. The share button opens the native share sheet. Haptic feedback on card flips.

Offline: all cards and game modes are bundled in the app and work without a network connection.

iPad: the app supports iPad in all orientations with the same features as on iPhone.

External services:
- Cookieless, anonymous usage statistics (which decks are played, number of cards) via self-hosted Plausible Analytics (analytics.holstjensen.eu) and self-hosted Umami (stats.mahoje.dk). No personal data, no device identifiers, no advertising IDs, no tracking across apps or websites.
- The optional "Report" button on a card sends the card id, a reason and an optional comment to the developer's own server (goodtalkcards.com/api), protected against spam by Cloudflare Turnstile. No names, emails or device identifiers are sent.
No login provider, payment processor, advertising SDK or AI service is used.

Accounts: none. There is no account creation, so account deletion does not apply. Favourites and settings are stored locally on the device and removed when the app is deleted.
Regional differences: none, the app works the same everywhere; content is in English.
Regulated industry / third-party material: not applicable, all questions are written by the developer.
In-App Purchase: none. No subscriptions, no ads, no paid content.
```

**Snakkespil 18+:**

```
Snakkespil 18+ is a free Danish conversation card game for adult couples (18+). It is the adult companion to the Danish app Snakkespil (same developer), which is rated 12+/13+ and has no adult content. Couples take turns drawing cards: daring questions about attraction, intimacy and their relationship, plus small playful couple tasks such as a kiss or a compliment. Decks: Udfordringer (couple tasks), Kun for voksne, Intimitet, Parforhold, Kend din partner and Første date. Target audience: Danish-speaking adult couples. The content is flirtatious and personal but never explicit: no descriptions of sexual acts or bodies, no nudity, no instructions (guideline 1.1.4). The age rating questionnaire is answered accordingly (frequent/intense mature or suggestive themes, infrequent/mild sexual content).

Age gate: on first launch the app asks the user to confirm they are 18 or older before any card is shown.

How to use: no account, no login, no setup. Pick a deck, tap the card to flip it, tap "Næste kort" for the next. The heart icon saves a favourite on the device. Mere tab: settings, about and privacy policy. The share button opens the native share sheet. Haptic feedback on card flips.

Offline: all cards are bundled in the app and work without a network connection.

iPad: the app supports iPad in all orientations with the same features as on iPhone.

External services: cookieless, anonymous usage statistics (which decks are played) via self-hosted Plausible Analytics (analytics.holstjensen.eu) and self-hosted Umami (stats.mahoje.dk). No personal data, no device identifiers, no advertising IDs, no tracking. The optional "Rapportér" button on a card sends the card id, a reason and an optional comment to the developer's own server (snakkespil.dk/api), protected against spam by Cloudflare Turnstile; no names, emails or device identifiers are sent. No login provider, payment processor, advertising SDK or AI service is used.

Accounts: none. There is no account creation, so account deletion does not apply. Favourites and settings are stored locally on the device and removed when the app is deleted.
User-generated content: none.
Regional differences: none; content is in Danish.
Regulated industry / third-party material: not applicable, all cards are written by the developer.
In-App Purchase: none. No subscriptions, no ads, no paid content.
```
