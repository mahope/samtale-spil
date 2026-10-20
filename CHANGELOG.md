# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
