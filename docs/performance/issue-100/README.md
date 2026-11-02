# #100: målinger og PR-grundlag, 2. november 2026

Forsidens refererede JavaScript er reduceret med **52.341 bytes gzip (21,37 %)**.
25 %-målet nås ikke med alle script-tags medregnet. Den målte begrundelse pr.
kandidat nedenfor opfylder issuets alternative acceptkriterium. HTML falder kun
292 bytes; indhold, spørgsmål, analytics og CSP er bevaret.

## Før og efter

Før er `origin/master` ved `eb59641bb2d978773d8e0edb078668d40823b7b4`.
Efter er arbejdet fra `2f7f4e3e182937d67401e082a4b261b2771bed4d` og
`04fc32bb38011c47408289ddf1520b7d84a735b0`, plus testmarkør og test-/dokumentationsrettelser
fra denne genkørsel. De eksisterende ændringer er ikke skrevet om.

Alle størrelser er bytes, ikke afrundede kB. JS er summen af `gzipSync` med
standardniveau 6 for hver unik lokal `/_next/*.js` i HTML'ens script-tags,
inklusive `noModule`. HTML er ukomprimeret UTF-8. Det er samme definition på begge
builds; issuets ældre curl-tal på ca. 283 kB bruges ikke som sammenligningsgrundlag.

| Side | JS gzip før | JS gzip efter | Ændring | HTML før | HTML efter | LCP før/efter (ms) | TBT før/efter (ms) |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| `/` | 244.927 | 192.586 | −21,37 % | 148.718 | 148.426 | 3.771 / 3.460 | 55,5 / 34 |
| `/spoergsmaal/parforhold/` | 192.915 | 189.865 | −1,58 % | 131.653 | 131.653 | 3.155 / 3.155 | 9,5 / 34 |
| `/spil/` | 321.379 | 318.329 | −0,95 % | 138.746 | 138.746 | 3.903 / 3.905 | 13 / 18 |

LCP/TBT er medianen af tre Lighthouse 12.8.2-kørsler pr. side og build på denne
Linux-agent, Chrome 151.0.0.0, Node 24.22.1, Next 16.4.2, statisk eksport serveret
lokalt med gzip. Lighthouse bruger standard mobilprofil og simuleret langsom 4G:
150 ms RTT, 1.638,4 Kbit/s og 4× CPU-slowdown. 390 px gælder skærmbillederne;
Lighthouse beholder sin standard mobilskærm. Der er ingen ændring af prod.

Rå resultater er de 18 `*-lh-*.json.gz`-filer. `before-metrics.json` og
`after-metrics.json` indeholder alle tre kørsler og hver script-chunks gzip-størrelse.
LCP på forsiden forbedres i denne prøve; TBT på de øvrige sider forbedres ikke.
Det er laboratoriemålinger, ikke dokumentation for forbedrede Core Web Vitals hos
brugerne. En indledende eftermåling overlappede andre tjek og blev kasseret;
de gemte eftermålinger er genkørt efter build, analyse og tests.

## Bundle-analyse pr. kandidat

Nexts egen Turbopack-analyse er kørt med `next analyze --output` og eksporteret med
`next analyze export --route /`. Kun JS-outputs i forsidens `bootstrap`- og
`render_dependent`-grupper tælles som første indlæsning. Globale modulposter og
`async`-grupper er ikke bevis på, at et modul hentes i første indlæsning.
Resultaterne er gemt i `before-home-bundle.json` og `home-bundle.json`.
`spil-bundle.json` viser kontrolmålingen på spilvælgeren.

| Kandidat | Forsidens modulkode før → efter, ukomprimeret | Målt begrundelse / handling |
| --- | ---: | --- |
| Søgeoverlay | 0 → 0 B | `SearchOverlay` bruges på `/spil/`, ikke i forsidens første chunks. På `/spil/` identificerer analysen 7.331 B overlay-kode og 180.005 B spørgsmålsfiler. En dynamisk søgning dér kan forbedre den side, men kan ikke fjerne flere bytes fra den målte forside. |
| Statistik | 0 → 0 B | Både `Statistik` og `StatsHeatMap` har 0 moduldele i forsidens første JS. Statistik ligger på sin egen rute. Ingen forsidegevinst ved yderligere opdeling. |
| Konfetti | 0 → 0 B | `Confetti` har 0 moduldele i forsidens første JS. Det bruges under spil, ikke i hero eller kortoversigten. Ingen forsidegevinst ved at udskyde det yderligere. |
| Motion og andre motion-brugere | 144.499 → 0 B | 270 motion-moduldele før, 0 efter. `CardStack` er flyttet til en async-gruppe; de andre motion-komponenter bidrager ikke til de synkrone forside-outputs. Der er derfor ingen yderligere motion-kode at flytte ud af disse chunks. |
| Fulde spørgsmålsfiler | 0 → 0 B | Ingen `questions/`-moduldele i forsidens første JS, hverken før eller efter. `heroCards()` vælger allerede på serveren: præcis 12 kort, 1.678 B JSON i HTML/RSC. Hele datasættet sendes ikke som hero-props. At fjerne kort her ville ændre udvalget og spare HTML, ikke den målte JS. |
| Capacitor core | 8.092 → 0 B | Core og plugins importeres nu ved brug på native. Den fælles platformskode læser den injicerede bridge. Den fælles layout-chunk falder fra 7.570 til 4.520 B gzip, også på de øvrige målte sider. |

Analysens størrelser er modulbidrag, ikke summérbare gzip-besparelser. Fx er
motion-bibliotekets faktiske fælles chunk 49.305 B gzip, selv om summen af
enkeltkomprimerede motion-moduler er større. De faktiske chunk-tal i tabellen
øverst kommer fra produktionsbuildet, ikke analysebuildets filnavne.

Der mangler yderligere 8.891 B for at nå 25 % med alle script-tags. Syv uændrede
framework-/bootstrap-/polyfill-chunks udgør tilsammen 175.849 af de resterende
192.586 B gzip; de øvrige tre chunks udgør 16.737 B og deler blandt andet menu,
tema, links, kortvisning, native-opstart og fejlskærm. De efterspurgte kandidater
ovenfor giver alle 0 yderligere bytes at fjerne fra første indlæsning. En større
ombygning af navigation, fælles UI-data eller Next-runtime er ikke nødvendig for
disse kandidater og er ikke gennemført for at presse et procentmål.

Den uændrede `noModule`-polyfill alene er 39.627 B gzip. Uden den er resultatet
205.300 → 152.959 B, **25,49 %**, men hovedresultatet forbliver **21,37 %** efter
den konservative definition med alle tags.

**Grænse for besparelsen:** Motion hentes stadig ved tomgang (eller ved fokus,
pointer eller tryk). Lighthouse-netværkslisten bekræfter, at motion-chunken hentes
senere. Dette er en reduktion af den synkrone startpakke, ikke en tilsvarende
reduktion af alle bytes efter tomgang. Next kan desuden prefetch'e linkede ruter,
herunder spilvælgerens søgning/data; de bytes indgår ikke i script-tag-målet.
Analytics er uændret og indgår i Lighthouse, men ikke i den lokale Next-JS-sum.

## Visuel kontrol og kendt timingforskel

Skærmbillederne er fulde sider ved 390 × 844 CSS-pixels, deviceScaleFactor 1,
efter netværkstomgang og `document.fonts.ready`, med samme browser og standardtema.

| Side | Før | Efter | Kontrol |
| --- | --- | --- | --- |
| `/` | [før](before-home-390.png) | [efter](after-home-390.png) | 390 × 8.606, pixelidentiske |
| `/spoergsmaal/parforhold/` | [før](before-spoergsmaal-parforhold-390.png) | [efter](after-spoergsmaal-parforhold-390.png) | 390 × 8.899, pixelidentiske |
| `/spil/` | [før](before-spil-390.png) | [efter](after-spil-390.png) | 390 × 7.414, 7.494 forskellige pixels (0,26 %), kun rasterisering af gentagne baggrundsmønstre på kort; samme tekst og layout |

Der var ingen ufangede browserfejl på de tre sider; `hydration.test.tsx` er grøn.
Statiske skærmbilleder beviser ikke animationer eller alle interaktioner.
**Kendt timingforskel fra den tidligere ændring:** Hvis brugeren trykker før
`CardStack` er hentet og monteret, skifter første kort straks uden animation.
Efter monteringen animerer kortskift. Genkørslen bevarer denne opførsel og nævner
den udtrykkeligt; animation ved første kolde tryk er ikke verificeret som uændret.

`cardDraw.test.tsx` beviser nu monteringen med `data-card-stack` og kontrollerer
både det oprindelige og det næste kort, ikke kun tekst som også findes i
pladsholderen. `platform.test.ts` dækker server, manglende bridge, manglende metode
og både web/native-resultatet fra bridgen. CLAUDE.md beskriver bridge-antagelsen.
Opstart på fysisk iOS/Android er ikke testet; ingen filer i `ios/` eller `android/`
er ændret, og ingen app er bygget til udgivelse.

## Verifikation

- `npm run typecheck`: exit 0.
- `npm run lint`: exit 0, 0 fejl og 11 eksisterende advarsler i uberørte filer.
- `npm run test:run`: 28 testfiler, 163 tests bestået, inklusive hydration.
- `npm run build`: exit 0 og statisk eksport; før/efter-buildoutput er vedlagt.
- CI's fulde `Verify static export`-blok: exit 0, herunder metadata, kort, PDF'er og OG-filer.
- `npm run check:links`: 4.988 interne links, alle peger på sider i `out/`.

Eksisterende build-advarsel: Next mangler font-override-værdier for Atkinson
Hyperlegible Next. Eksisterende Vite-advarsel: ESM-syntaks i CommonJS-config.
Den første kørsel fejlede på en ufuldstændig eksisterende `node_modules` uden
`@testing-library/dom`; geninstallation fra uændret lockfil rettede miljøet.
Ingen test eller gate blev slået fra. Forgejo-CI og fresh-context review fra
Mads' PC er ikke kørt her, jf. kø-jobbets instruktion om ét samlet review dér.

## Reproduktion og værktøjstjek

De to builds bruger samme lockfil og almindelig `npm run build`. Før-buildet er
et isoleret `git archive` af det angivne master-commit, ikke en ændring af denne
branch. Produktionsbuilds bruger Turbopack; `next build` udskriver ruter og
eksportstatus, ikke de gamle First Load JS-tabeller, så chunk-størrelserne måles
direkte på eksporten.

`measure.mjs` er målescriptet. Det starter og stopper selv en lokal gzip-server
og Chrome i samme forgrundsproces. Kopiér scriptet til en separat værktøjsmappe
med Lighthouse installeret og kør fx:

```bash
node /tmp/issue100-tools/measure.mjs /sti/til/out /sti/til/resultater after
npx --no-install next analyze --output
npx --no-install next analyze export --route / > home-graph.jsonl
```

Ingen pakker er føjet til repoet. Til måling blev Lighthouse **12.8.2** installeret
i `/tmp/issue100-tools`, vedligeholdt af Lighthouse/Chrome-teamet (projekt siden
2016; npm-posten siden 2012). Den valgte version blev udgivet 28/8-2025, efter
12.8.1 den 1/8-2025; ikke en nylig eller mistænkeligt tæt udgivelse. Seneste
version ved opslag var 13.6.0 fra 27/10-2026; begge builds blev målt med samme
fastlåste 12.8.2, ikke med skiftende `npx latest`.

Værktøjs-lockfilen tilføjede 200 pakker, inklusive Puppeteer Core og Chrome
Launcher. Ingen af dem markerer installationsscripts i lockfilen. Lighthouse's
udgivelsesscripts er ikke installationshooks. Kildekoden blev inspiceret ved
indgangen og Sentry-modulet: fejlrapportering kan sende netværksdata og er
eksplicit slået fra med `enableErrorReporting: false`. Browser-værktøjerne læser
miljø til browser-/configstier og bruger netværk/CDP under måling; de køres her
kun mod den lokale eksport og sidens uændrede eksterne tags. De skal ikke have
kundedata eller credentials. **Konklusion: installér med `--ignore-scripts`**, i
separat midlertidig mappe. Repoets `npm ci --ignore-scripts` brugte kun den
eksisterende lockfil. Dets advarsler om ældre pakker/audit ændrer ikke lockfilen.

## Foreslået PR

Titel: **Reducer forsidens startpakke og dokumentér mobilmålinger**

Forsidens synkrone JavaScript falder fra 244.927 til 192.586 B gzip (−21,37 %),
fordi kortanimation og native-plugins indlæses senere. Bundle-analysen dokumenterer
0 B fra søgning, statistik, konfetti og fulde spørgsmålsfiler i den resterende
startpakke; rapporten begrunder derfor alternativet til 25 %-målet.

Før/efter-tal for alle tre sider, rå Lighthouse-kørsler, 390 px-skærmbilleder og
verifikation står i `docs/performance/issue-100/README.md`. Første kortskift kan
ske uden animation, hvis motion endnu ikke er monteret. Alle 163 tests,
typecheck, lint, build, eksporttjek og interne links passerer med de dokumenterede
eksisterende advarsler. Ingen deploy eller app-udgivelse.

Fixes #100
