# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.2.0] - 2026-10-21

### Added
- Ten audience decks (new parents, parents again, student life, upper secondary, boarding school, three school levels, scouts, Gilwell) and Følelseskort for children; 30 more first-date cards
- Decks grouped by audience on the chooser, the home page and /spoergsmaal/
- Card types (task, point-at with a 3-2-1 countdown, never-have-I-ever, joker) and a "family friendly" filter
- Game modes: Gæt svaret (secret answers and points for Kend din partner), Året der gik (four rounds), a joker about every tenth card and a closing card
- /dagens-spoergsmaal/ (same card as the app reminder), /generator/, four guides under /guide/, crush, date night and Valentine's pages, five alcohol-free party games and wedding games under /lege/
- Free A4 print PDFs for every deck under /print/
- snakkespil.com redirects to snakkespil.dk

### Changed
- The native apps no longer contain the 18+ deck (rated for a younger audience); CI fails if an adult card leaks into the app build
- Tests guard: no alcohol on any card outside 18+, curated page counts, print font coverage

## [2.1.0] - 2026-10-20

### Added
- Six research-based decks (Tak, Kend din partner, Gode nyheder, Nyt og ukendt, Svære samtaler with a fixed frame, Familiehistorier), 70 cards each
- More cards in every deck and a frank, consent-aware 18+ deck (125 cards); "I må altid sige pas" on the adult screen
- Game modes: Trappen, Aftensmad, "Spørg videre" follow-ups, weekly reminder ("Ugens kort")
- `/lege/` with Christmas, office party, New Year and dinner party games, each with a playable 30-card deck
- `/saadan-spiller-i/` with guidance and verified Danish help lines; `docs/forskning.md` with 46 sources
- "Rapportér" button on cards and `/statistik/samlet/` with public totals, via a Cloudflare Worker
- Native iOS and Android apps (Capacitor) with haptics, share sheet and local reminders; signed Android builds in CI

### Changed
- Content-Security-Policy is enforced; `npm audit` in CI; Renovate replaces Dependabot
- `useLocalStorage` uses `useSyncExternalStore` (no hydration errors) and keeps working when storage is unavailable

## [2.0.0] - 2026-10-20

### Changed
- New name and look: Snakkespil, "spillebordet" design with a deck colour and pattern per category
- Question pages under `/spoergsmaal/<deck>/` with every question in the HTML; play screens are `noindex`
- Pass-the-phone mode replaces the BroadcastChannel "multiplayer", which only worked between tabs in one browser
- Points, streak and badge pop-ups removed from the play screen; statistics are still recorded
- Next.js 16.4, React 19.3, Motion 14, TypeScript 6, Vitest 5, Node 24
- Repo moved to Forgejo; CI on Forgejo, deploy to Dokploy on push

### Added
- 6 decks (Venner, Første date, Børn, Kollegaer og team, Højtider, Selvindsigt): 1,035 questions in total
- PNG favicon, PWA and store icons; PNG share images per page
- Privacy and about pages
- Plausible events for game start, completion, favourites and card draws
- Security headers (HSTS, nosniff, referrer and permissions policy, CSP report-only)

### Fixed
- Direct links to subpages returned 403 or redirected to port 3000
- Canonical URLs, sitemap and robots pointed to the old GitHub Pages address
- 82 questions with anglicisms, awkward phrasing or wrong depth

## [1.0.0] - 2026-02-01

First version: 10 decks with 500 questions, card flip, favourites, progress, statistics and PWA support.
