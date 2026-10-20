# Snakkespil

Free Danish conversation cards for couples, families, friends and colleagues. Draw a card, read the question out loud, talk.

Live at **https://snakkespil.dk**.

## What it is

- Over 2,000 cards in 23 decks plus an 18+ deck, each marked light, medium or deep (counts are derived from `src/data/`)
- Play screen per deck, "shuffle all", pass-the-phone, Trappen (light to deep), Aftensmad, "Spørg videre" follow-ups and your own question sets
- Server-rendered question pages under `/spoergsmaal/<deck>/` and party/season games under `/lege/` for search
- "Rapportér" on every card and a public stats page (`/statistik/samlet/`), served by the Cloudflare Worker in `worker/`
- No accounts and no cookies: favourites, progress and custom questions live in `localStorage`
- Cookieless analytics with self-hosted Plausible (`src/utils/track.ts`)
- Installable PWA and native iOS/Android apps (Capacitor) built from the same export

## Stack

Next.js 16 (App Router, `output: "export"`, `trailingSlash: true`), React 19, TypeScript, Tailwind CSS 4, Motion, Vitest.

The static export is served by nginx in Docker (`Dockerfile`, `deploy/nginx.conf`) on Dokploy.

## Layout

```
src/app/                 routes (play screens are noindex; content pages are indexed)
src/app/spoergsmaal/     landing page per deck, with every question in the HTML
src/components/deck/     card face, card back, deck tiles
src/components/site/     header, footer, text pages
src/data/categories.ts   all questions (ids are stable: localStorage depends on them)
src/data/decks.ts        deck colours, patterns and marks: the single colour source
src/data/categoryTexts.ts  copy for the landing pages
src/config/site.ts       site URL, name and derived counts
scripts/generate-icons.mjs  renders favicon, PWA and store icons from assets/icon*.svg
```

## Design

"Spillebordet": a green felt table, white playing cards and one coloured, patterned box per deck. Tokens live in `src/app/globals.css` (`papir`, `flade`, `blaek`, `bord`, `kridt`). Tailwind's `slate`, `violet` and `rose` scales are remapped to the palette so older screens follow along. Display type is Bricolage Grotesque, body type Atkinson Hyperlegible Next.

## Development

The repo lives on Forgejo (`git.mahoje.dk/mahope/samtale-spil`); GitHub is a push mirror.

```bash
npm ci
npm run dev        # local dev server
npm run typecheck
npm run lint
npm run test:run
npm run build      # static export to out/
```

CI (`.forgejo/workflows/ci.yml`) runs typecheck, lint, tests, build, checks the export (noindex on play screens, questions in landing-page HTML, canonical URLs) and validates the nginx config.

## Deploy

Every push to `master` triggers a Dokploy deploy through a Forgejo webhook. Dokploy builds the Dockerfile and serves the export on port 3000 behind Traefik and Cloudflare.

After deploy, check the live site directly: `/`, `/spil/`, `/spil/parforhold/`, `/spoergsmaal/parforhold/`, a missing path (should be 404) and the response headers.

## API worker

`worker/` is a Cloudflare Worker on `snakkespil.dk/api/*`: `POST /api/flag` mails reports to the owner via Resend (Turnstile, honeypot, rate limit, known card ids only) and `GET /api/stats` serves cached Plausible totals. `scripts/export-cards.ts` generates the card list it validates against. Deploy with wrangler from agent-worker; secrets live in Bitwarden and as worker secrets.

## Research

`docs/forskning.md` (relationship and conversation research behind decks, game modes and guidance) and `docs/butik-og-seo.md` (store-bought conversation games and SEO page plan).

## Native apps

`capacitor.config.ts` wraps `out/` as `dk.snakkespil.app`. Native-only code lives in `src/lib/platform.ts` (haptics, share sheet; no-ops on the web), `src/lib/native.ts` ("Dagens spørgsmål" local notifications, loaded on demand) and `src/components/NativeBoot.tsx` (status bar, splash, Android back button, notification taps, deep-reload guard). The service worker is disabled inside the apps.

- `android/`: signed `.aab`/`.apk` from `.forgejo/workflows/android.yml` (upload key in repo secrets and in Bitwarden, "Snakkespil: Android upload-keystore"). Google Play App Signing holds the app key.
- `ios/`: Swift Package Manager project; `.forgejo/workflows/ios.yml` compiles it unsigned on the Mac runner. Signing and TestFlight need the Apple team's certificates.
- After changing web code for the apps: `npm run cap:sync` (builds with `APP_BUILD=1`, which leaves out the 18+ deck so the apps can carry a 13+ rating). Icons and splash screens: `npm run cap:assets`.

## Licence

Code and questions © Mahope. Bricolage Grotesque is used under the SIL Open Font License (`assets/fonts/OFL-bricolage.txt`).
