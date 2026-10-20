# Snakkespil

Gratis danske samtalekort: https://snakkespil.dk. Mads' eget produkt uden kunder (egne interne systemer, jf. global CLAUDE.md).

## Hvor ting bor

- **Repo:** Forgejo `git.mahoje.dk/mahope/samtale-spil` (primær). GitHub `mahope/samtale-spil` er push-spejl uden Actions. PR'er og issues med `tea` (login `mahoje`).
- **CI:** `.forgejo/workflows/ci.yml` på Forgejo-runneren: tsc, lint, vitest, build, eksporttjek, `nginx -t`.
- **Deploy:** push til `master` -> Forgejo-webhook -> Dokploy-appen `snakkespil` (worker1) bygger `Dockerfile` (Node 24 -> nginx). Detaljer i wikien (`samtale-spil`).
- **Analytics:** Plausible CE på analytics.holstjensen.eu, events via `src/utils/track.ts` (danske eventnavne; goals skal oprettes i Plausible).
- **Gammel adresse:** mahope.github.io/samtale-spil er en redirect-stub til snakkespil.dk.

## Apps (Capacitor)

- `dk.snakkespil.app`, iOS og Android fra samme `out/`. Native kode kun i `src/lib/platform.ts`, `src/lib/native.ts` og `src/components/NativeBoot.tsx`; alt andet skal virke uændret på web.
- Android bygges og signeres i `.forgejo/workflows/android.yml` (upload-nøgle i repo-secrets + Bitwarden). iOS kompileres i `ios.yml` på `mahope-mac`; signering/TestFlight kræver Mads' Apple-certifikater.
- `android/` og `ios/` genereres/synkes på agent-worker (`npx cap sync`), ikke på PC'en.
- App-builds kører med `APP_BUILD=1`: `next.config.ts` aliaser `@/data/questions/voksne` til den tomme `voksne.app.ts`, så appen er uden 18+ og kan mærkes 12+ (#54). Workflowene fejler, hvis et voksenkort findes i `out/`. Butikstekster: `docs/app-butikker.md`.

## Arbejdsgang uden aftryk på PC'en

Byg aldrig lokalt. Rediger og commit lokalt; byg og test på agent-worker (Tailscale) eller i CI:
- Preview: tar arbejdstræet til `agent-worker:/home/mads/snakkespil-preview`, kør `npm ci` (kun ved ny lockfil), `npm run build`, og server `out/` på `http://agent-worker:3100`.
- Lockfil: generér den på Linux (`npm install --package-lock-only` på agent-worker), ellers mangler Linux-optionals.
- Ikoner: `node scripts/generate-icons.mjs` på agent-worker, kopiér PNG/ICO tilbage.

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
