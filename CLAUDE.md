# Snakkespil

Gratis danske samtalekort: https://snakkespil.dk. Mads' eget produkt uden kunder (egne interne systemer, jf. global CLAUDE.md).

## Hvor ting bor

- **Repo:** Forgejo `git.mahoje.dk/mahope/samtale-spil` (primær). GitHub `mahope/samtale-spil` er push-spejl uden Actions. PR'er og issues med `tea` (login `mahoje`).
- **CI:** `.forgejo/workflows/ci.yml` på Forgejo-runneren: tsc, lint, vitest, build, eksporttjek, `nginx -t`.
- **Deploy:** push til `master` -> Forgejo-webhook -> Dokploy-appen `snakkespil` (worker1) bygger `Dockerfile` (Node 24 -> nginx). Detaljer i wikien (`samtale-spil`).
- **Analytics:** Plausible CE på analytics.holstjensen.eu, events via `src/utils/track.ts` (danske eventnavne; goals skal oprettes i Plausible).
- **Gammel adresse:** mahope.github.io/samtale-spil er en redirect-stub til snakkespil.dk.

## Apps (Capacitor)

- `dk.snakkespil.app`, iOS og Android fra samme `out/`. Native kode kun i `src/lib/platform.ts`, `src/lib/native.ts`, `src/components/NativeBoot.tsx` og `NativeReminders.tsx`; alt andet skal virke uændret på web.
- Snakkespil-appen er en app-skal, ikke hjemmesiden: `APP_BUILD=1` med `SITE_LOCALE=da` bygger kun ruterne `src/app/**/*.app.tsx` (`pageExtensions` i `next.config.ts`). Fire faner (Spil `/`, I dag, Favoritter, Mere), navigationsbjælke og liste-komponenter i `src/components/app/` (generiske, så Goodtalk og 18+ kan flyttes over senere). `<html data-platform="ios|android|web">` vælger udseende; Tailwind-varianten `android:` giver Material, standarden er iOS. Preview i browser: `?platform=ios|android`. Web-sider og app-skærme deler indholdskomponenter (fx `FavoritterIndhold`, `OmIndhold`, `Statistik`); web-markup må ikke ændre sig. `@/locale/ui` peger på `ui.app.ts` i app-buildet, så spillenes tilbage-link går til `/`. CI kører `npm run check:links` på app-buildet: intet internt link må pege på en side, der ikke findes i appen.
- Android bygges og signeres i `.forgejo/workflows/android.yml` (upload-nøgle i repo-secrets + Bitwarden). iOS kompileres i `ios.yml` på `mahope-mac`; signering/TestFlight kræver Mads' Apple-certifikater.
- `android/` og `ios/` genereres/synkes på agent-worker (`npx cap sync`), ikke på PC'en.
- Goodtalk-appen (`com.goodtalkcards.app`, #74) bygges fra samme `android/`/`ios/` med `SITE_LOCALE=en`: `capacitor.config.ts` vælger id og navn, og CI giver `APP_ID`/`APP_NAME` til Gradle og `PRODUCT_BUNDLE_IDENTIFIER`/`APP_DISPLAY_NAME` til Xcode (matrix i `android.yml` og `ios.yml`).
- Snakkespil 18+ (`dk.snakkespil.voksen`, #57) bygges med `APP_VARIANT=voksen`: kun ruterne `src/app/**/*.voksen.tsx`, bunkerne i `src/voksen/decks.ts` og en alderskontrol. Udfordringerne (`src/data/questions/udfordringer.ts`, id `hot-N`) findes kun i den app. Indholdsgrænsen står i `docs/app-butikker.md`.
- App-builds kører med `APP_BUILD=1`: `next.config.ts` aliaser `@/data/questions/voksne` til den tomme `voksne.app.ts`, så appen er uden 18+ og kan mærkes 12+ (#54). Workflowene fejler, hvis et voksenkort findes i `out/`. Butikstekster: `docs/app-butikker.md`.

- Hjemmesiderne viser appen på `/app/` og i footeren. Butiks-URL'erne står i `src/locales/<sprog>/site.ts` (`apps`), men vises først, når `APPS_LIVE` i `src/config/site.ts` er `true`; indtil da står der "Kommer snart". Goodtalk har endnu ingen URL'er (`null`).
- Menuen på hjemmesiderne (`src/components/site/SiteNav.tsx`) deles af den danske header og Goodtalks `src/intl/Chrome.tsx`: menupunkter inline fra `lg`, ellers et fuldskærmsark (modal `<dialog>`). Spilskærmene har deres egen header.

## Arbejdsgang uden aftryk på PC'en

Byg aldrig lokalt. Rediger og commit lokalt; byg og test på agent-worker (Tailscale) eller i CI:
- Preview: tar arbejdstræet til `agent-worker:/home/mads/snakkespil-preview`, kør `npm ci` (kun ved ny lockfil), `npm run build`, og server `out/` på `http://agent-worker:3100`.
- Lockfil: generér den på Linux (`npm install --package-lock-only` på agent-worker), ellers mangler Linux-optionals.
- Ikoner: `node scripts/generate-icons.mjs` på agent-worker, kopiér PNG/ICO tilbage.

## Internationale sites (#30)

- `SITE_LOCALE` (build-argument, standard `da`) vælger site: `da` er snakkespil.dk, `en` er Goodtalk på goodtalkcards.com. Andre værdier fejler buildet.
- Internationale sites bygges kun af rutefilerne `src/app/**/*.intl.tsx` (`pageExtensions`), så den danske site er uændret. Sprogbestemte tekster og kort kommer i `src/locales/<sprog>/` med samme kort-id'er som dansk.
- Goodtalk er lanceret (indekseres). hreflang mellem bunker på begge sprog kommer fra `src/locales/alternates.ts`. CI bygger den engelske variant på hver PR.

## Regler for koden

- Spørgsmåls-id'er må aldrig ændres eller genbruges: favoritter og fremskridt i localStorage peger på dem. Nye spørgsmål får nye id'er.
- localStorage-nøglerne hedder stadig `samtale-spil-*`. Lad dem være.
- Farver pr. kategori kommer kun fra `src/data/decks.ts`. Testen kræver AA-kontrast mellem `bg` og `ink`.
- Spilskærme (`/spil/...`, favoritter, statistik, egne spørgsmål, send rundt) er `noindex` via `appScreenMetadata`. Indhold til søgning hører under `/spoergsmaal/`.
- Canonical sættes pr. side, aldrig i et layout (Next arver `alternates` til alle børn).
- Antal spørgsmål i tekster afledes af data (`src/config/site.ts`), aldrig hardkodet.
- Dansk UI-tekst: ingen anglicismer, ingen pointtal eller emoji-pynt i UI (undtagen gættetilstandens point i /spil/gaet/, som spillerne selv slår til), ingen "→" i knapper.

## Kommandoer

```bash
npm run typecheck && npm run lint && npm run test:run && npm run build
```
