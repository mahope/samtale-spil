# Snakkespil

Free Danish conversation cards for couples, families, friends and colleagues. Draw a card, read the question out loud, talk.

Live at **https://snakkespil.dk**.

## What it is

- About 2,700 cards in 35 decks grouped by audience (couples, family, friends, school, scouts, deep talks) plus an 18+ deck on the website and in the separate Snakkespil 18+ app; counts are derived from `src/data/`
- Card types: question, task, point-at, never-have-I-ever and joker (`src/data/cardTypes.ts`), and a "family friendly" filter
- Play screen per deck, "shuffle all", pass-the-phone, Trappen, Aftensmad, Året der gik, Gæt svaret (secret answers and points), "Spørg videre" follow-ups and your own question sets
- Server-rendered pages for search: decks and curated pages under `/spoergsmaal/`, party games under `/lege/`, guides under `/guide/`, `/dagens-spoergsmaal/` and `/generator/`
- Free print-yourself PDFs for every deck under `/print/`, built at export time (`src/lib/printPdf.ts`)
- "Rapportér" on every card and a public stats page (`/statistik/samlet/`), served by the Cloudflare Worker in `worker/`
- No accounts and no cookies: favourites, progress and custom questions live in `localStorage`
- Cookieless analytics with self-hosted Plausible and Umami side by side during a transition period (`src/utils/track.ts` sends every event to both)
- Installable PWA and native iOS/Android apps (Capacitor) built from the same export; the Snakkespil app holds Danish and English (Goodtalk) in one build and leaves out the 18+ deck; `APP_VARIANT=voksen` builds the separate Snakkespil 18+ app (adult and couple decks only, behind an age check)

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
bun install --frozen-lockfile
bun run dev        # local dev server
bun run typecheck
bun run lint
bun run test:run
bun run build      # static export to out/
```

CI (`.forgejo/workflows/ci.yml`) runs as three parallel jobs (`checks`, `app`, `variants`) plus a gate job named `check`, which is the required status check and fails unless all three succeeded (`scripts/ci-parallel.sh` runs independent checks side by side; `scripts/build-in-tree.sh` and `APP_BUILD_JOBS` run the differently configured builds in private copies of the tree) and runs typecheck, lint, tests, build, checks the export (noindex on play screens, questions in landing-page HTML, canonical URLs) and validates the nginx config.

The Danish website footer links to Natsnak (18+). It uses the existing `APP_BUILD` flag to omit the link from native builds; the English website uses its own footer. CI requires the link and age label in the Danish web export and checks that no `natsnak` text exists anywhere in the bilingual app export or English web export.

## Deploy

Every push to `master` triggers a Dokploy deploy through a Forgejo webhook. Dokploy builds the Dockerfile and serves the export on port 3000 behind Traefik and Cloudflare.

After deploy, check the live site directly: `/`, `/spil/`, `/spil/parforhold/`, `/spoergsmaal/parforhold/`, a missing path (should be 404) and the response headers.

## API worker

`worker/` is a Cloudflare Worker on `snakkespil.dk/api/*`: `POST /api/flag` mails reports to the owner via Resend (Turnstile, honeypot, rate limit, known card ids only) and `GET /api/stats` serves cached Plausible totals. `scripts/export-cards.ts` generates the card list it validates against. Deploy with wrangler from agent-worker; secrets live in Bitwarden and as worker secrets.

## Research

`docs/forskning.md` (relationship and conversation research behind decks, game modes and guidance) and `docs/butik-og-seo.md` (store-bought conversation games and SEO page plan).

## International sites

`SITE_LOCALE=en bun run build` builds Goodtalk (goodtalkcards.com) from the `*.intl.tsx` route files only; the Danish site is unchanged. Unknown locales fail the build. See issue #30.

## Native apps

`capacitor.config.ts` wraps `out/` as `dk.snakkespil.app`. The app speaks every language in `src/locales/appLocales.ts` (Danish, English as Goodtalk, Swedish as Pratspel, Norwegian Bokmål as Pratespill, German as Plauderspiel, Dutch as Praatspel, French as Goodtalk, Spanish as Charlando): `bun run build:app` (`scripts/build-app.sh`) exports one app shell per language to `out/<code>/` (basePath `/<code>`) and writes `out/index.html`, which opens the stored language or else the device language (Danish gets Danish, Swedish gets Swedish, Norwegian `nb`/`nn`/`no` gets Norwegian Bokmål, German gets German, Dutch gets Dutch, French gets French, Spanish gets Spanish, everyone else English; `src/lib/appLang.ts`). Users pick a language from the list under Mere / More. Languages with `web: false` exist in the app only and cannot be built as a website. Adding a language: `docs/app-butikker.md`, "Et nyt sprog i appen". Apple rejected the separate Goodtalk app (`com.goodtalkcards.app`) under guideline 4.3 on 10 November 2026, so it is no longer built. Native-only code lives in `src/lib/platform.ts` (haptics, share sheet; no-ops on the web), `src/lib/native.ts` ("Dagens spørgsmål" local notifications, loaded on demand) and `src/components/NativeBoot.tsx` (status bar, splash, Android back button, notification taps, deep-reload guard). The service worker is disabled inside the apps.

- `android/`: signed `.aab`/`.apk` from `.forgejo/workflows/android.yml` (upload key in repo secrets and in Bitwarden, "Snakkespil: Android upload-keystore"). Google Play App Signing holds the app key.
- `ios/`: Swift Package Manager project; `.forgejo/workflows/ios.yml` compiles it unsigned on the Mac runner. Signing and TestFlight need the Apple team's certificates.
- After changing web code for the apps: `bun run cap:sync` (runs `scripts/build-app.sh` with `APP_BUILD=1`, which leaves out the 18+ deck so the app can carry a 13+ rating). Icons and splash screens: `bun run cap:assets`.

### Ratings (system dialog)

Goal: the first ratings in the App Store and Play (anb:051). The app asks with the system's own dialog (StoreKit on iOS, Play In-App Review on Android), via `@capacitor-community/in-app-review` 8.0.0.

**Plugin choice.** The package is the community plugin, peer `@capacitor/core >=8.0.0`, so it matches Capacitor 8. 8.0.0 was published 26 December 2025 and is the latest on npm. It has no dependencies and no install scripts, and is pinned to an exact version (installed with `--ignore-scripts`). It is not an official Ionic plugin, but it has been on npm since April 2024 with releases for Capacitor 4, 6, 7 and 8. `cap sync` added it to `ios/App/CapApp-SPM/Package.swift`, `android/capacitor.settings.gradle` and `android/app/capacitor.build.gradle`; nothing else in `ios/` or `android/` changed.

**When it asks.** Only in the native apps (`Capacitor.isNativePlatform()`); on the web nothing is stored and nothing shows. Only at a finished game: a category played through (`CategoryPlayClient`), a sequence game or Year in review played to the end, or an English-site deck played through (`PlayDeck`). The request comes 2.5 seconds after, when the celebration has played, never on a screen the player is in the middle of a game on. And only when all of this holds (`src/lib/reviewPrompt.ts`, pure and tested):

- at least 3 different days of use or 5 finished games
- at least 7 days since the first launch (so never on the first open)
- at least 90 days since the last request
- at most once per app version (the marketing version, `App.getInfo().version`)
- no error screen in the last 10 minutes

There is no "do you like the app?" question first and nobody is sorted into happy and unhappy players (App Store Review Guideline 5.6.1). The state (first launch, up to 10 day stamps, a game count capped at 5, time and version of the last request) lives in `localStorage` under `samtale-spil-review`: no personal data, no server. Every call to the plugin is wrapped, so a failure shows the player nothing. The request is recorded before the call, so a failing call is not retried on the same version.

Apple and Google decide whether the dialog actually shows (Apple at most three times per 365 days per user, and never if the user has switched it off or already rated this version) and tell the app nothing. So "we asked" is not "it appeared".

**"Rate the app" row** on Mere / More (`AppRateRow`, text `screens.more.rate`; Danish "Bedøm appen") opens the store's write-a-review page. It is hidden in a browser, on iOS while `APPLE_APP_ID` is empty, and on Android until `STORES_LIVE.android` is `true` (`src/config/site.ts`).

**Mads fills in:** `APPLE_APP_ID` in `src/config/review.ts`, the digits after `id` in the App Store URL of Snakkespil. It ships empty on purpose and nothing guesses it. (`src/locales/da/site.ts` has an App Store link with an id; confirm in App Store Connect that it is this app's before copying it.)

**Testing.** Unit tests: `bun x vitest run src/__tests__/reviewPrompt.test.ts src/__tests__/review.test.ts` (boundaries: 6 vs 7 days, 89 vs 90 days, same version twice, first open; the integration with a mocked plugin). On a device the dialog is hard to see:

- A development build (Xcode, run from the IDE) shows the dialog every time it is asked, but the dialog's stars do nothing and no review is sent. This is the way to see the dialog.
- TestFlight builds do not show it reliably: Apple suppresses the dialog there, and the TestFlight review flow is a separate, different one. A missing dialog in TestFlight does not mean a bug.
- In production the system decides (see above), so the dialog may not show even when all rules pass.
- To force a request on a device, clear `samtale-spil-review` in the web view (Safari Web Inspector on iOS, `chrome://inspect` on Android), open the app, then finish a game; or set `firstOpenAt` back 8 days and `days` to three dates in that key, and finish a game.
- The 18+ app (`dk.snakkespil.voksen`) does not ask: it has no finished-game moment of its own.

## Licence

Code and questions © Mahope. Bricolage Grotesque is used under the SIL Open Font License (`assets/fonts/OFL-bricolage.txt`).

Store promotion uses per-platform `STORES_LIVE` flags in `src/config/site.ts`: Danish iOS is live, Android and English stores are coming soon. On iOS only the App Store link appears; Android shows its coming-soon notice; desktop shows the live link and Android notice. Native builds omit store promotion. The Danish website also includes Safari’s Smart App Banner.
