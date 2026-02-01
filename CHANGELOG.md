# Changelog

Alle bemærkelsesværdige ændringer i dette projekt dokumenteres i denne fil.

Formatet er baseret på [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
og dette projekt følger [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0] - 2026-02-01

### 🎉 Initial Release

Første fulde version af Samtale-Spil, bygget af 10 AI-agenter i en kæde.

### Added

#### Core Game (Agent 1-3)
- **9 kategorier** med 400+ unikke spørgsmål på dansk
  - Parforhold (50 spørgsmål)
  - Familie (50 spørgsmål)
  - Intimitet (50 spørgsmål)
  - Fremtid (50 spørgsmål)
  - Fortid (50 spørgsmål)
  - Sjove (50 spørgsmål)
  - Dybe (50 spørgsmål)
  - Filosofiske (50 spørgsmål)
  - Barndom (50+ spørgsmål)
- **Sværhedsgrader** for alle spørgsmål (let/medium/dyb)
- **Favorit-system** med LocalStorage persistens
- **Progress tracking** per kategori
- **Shuffle All mode** — bland alle kategorier
- **Dagligt spørgsmål** — deterministisk baseret på dato

#### Multiplayer (Agent 3)
- **Lokal multiplayer** på samme enhed
- **Spillerliste** med turbaseret visning
- **Lobby system** med spiller-tilføjelse
- **Score tracking** per spiller

#### UI & Animationer (Agent 4-5)
- **3D kort-flip animationer** med Framer Motion
- **Floating particles** animeret baggrund
- **Page transitions** mellem sider
- **Ripple buttons** med Material Design effekt
- **Confetti** ved achievement unlock
- **Skeleton loaders** for bedre perceived performance
- **Dark mode** med smooth CSS transitions

#### Accessibility (Agent 5)
- **Reduceret motion support** via `prefers-reduced-motion`
- **Keyboard navigation** for alle interaktive elementer
- **ARIA labels** for screen readers
- **Focus indicators** synlige og tydelige
- **Color contrast** WCAG 2.1 kompatibel

#### PWA & Offline (Agent 6-7)
- **Web App Manifest** med ikoner
- **Service Worker** med caching strategier
- **Offline support** — spil uden internet
- **Add to Home Screen** på mobil
- **Canvas polyfill** for kompatibilitet

#### Statistics & Achievements (Agent 8)
- **Statistik side** med overblik
- **10 achievements** at låse op:
  - Første spørgsmål
  - 10 spørgsmål besvaret
  - 50 spørgsmål besvaret
  - 100 spørgsmål besvaret
  - Første kategori færdig
  - 3 kategorier færdige
  - Alle kategorier færdige
  - Første favorit
  - 10 favoritter
  - Deep Diver (10 dybe spørgsmål)
- **Achievement toast** notifikationer

#### Sound Effects (Agent 8)
- **Web Audio API** baserede lydeffekter
- **Kort-flip lyd** — soft whoosh
- **Success ding** — behageligt to-tone pling
- **Button tap** — subtil klik
- **Timer tick** — countdown warning
- **Timeout alarm** — urgent double beep
- **Vibration feedback** på mobile enheder

#### Performance (Agent 9)
- **React.memo** på tunge komponenter
- **Lazy loading** af ikke-kritiske komponenter
- **Debounce/throttle** utilities
- **Bundle analyzer** integration
- **requestIdleCallback** polyfill
- **Low-end device detection**
- **Prefetch** af routes

#### Testing & Documentation (Agent 10)
- **Vitest** test framework setup
- **55+ unit tests** for utilities og hooks
- **React Testing Library** integration
- **JSDoc comments** på alle utility funktioner
- **Omfattende README** med fuld dokumentation
- **CHANGELOG** med alle features

### Technical

- **Next.js 16** med App Router
- **React 19** med concurrent features
- **TypeScript** for type safety
- **Tailwind CSS 4** for styling
- **Framer Motion** for animationer
- **GitHub Actions** CI/CD pipeline
- **GitHub Pages** hosting

### Infrastructure

- **Automatisk deploy** til GitHub Pages
- **Static export** for hosting fleksibilitet
- **ESLint** for code quality

---

## Agenter

| Agent | Fokus | Bidrag |
|-------|-------|--------|
| 1 | Core Setup | Next.js projekt, basic UI |
| 2 | Data | Alle kategorier og spørgsmål |
| 3 | Multiplayer | Spillogik, lobby, tur-system |
| 4 | UI Polish | Animationer, transitions |
| 5 | Accessibility | A11y, reduced motion, ARIA |
| 6 | PWA Basics | Manifest, service worker |
| 7 | Offline | Caching, offline support |
| 8 | Gamification | Stats, achievements, lyd |
| 9 | Performance | Optimering, lazy loading |
| 10 | Quality | Tests, docs, JSDoc |

---

[Unreleased]: https://github.com/mahope/samtale-spil/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/mahope/samtale-spil/releases/tag/v1.0.0
