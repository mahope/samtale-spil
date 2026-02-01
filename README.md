# 🎴 Samtale-Spil

Et moderne, dansk samtalekort-spil bygget med Next.js. Inspireret af Vertellis og Big Questions — designet til par, familier og venner der ønsker dybere samtaler.

🌐 **[Prøv det live →](https://mahope.github.io/samtale-spil/)**

![GitHub Pages Deploy](https://github.com/mahope/samtale-spil/actions/workflows/deploy.yml/badge.svg)

## ✨ Features

### 🎴 Spilmekanik
- **9 kategorier** med 400+ unikke spørgsmål
- **3D kort-flip animationer** med Framer Motion
- **Dagligt spørgsmål** — nyt spørgsmål hver dag
- **Sværhedsgrader** — Let (grøn), Medium (gul), Dyb (rød)
- **Shuffle All** mode — bland alle kategorier

### 👥 Multiplayer
- **Lokal multiplayer** — spil sammen på samme enhed
- **Spillerliste** med turbaseret visning
- **Score tracking** og statistik

### 📊 Statistik & Achievements
- **Progress tracking** — se hvor mange spørgsmål du har besvaret
- **10 achievements** at låse op
- **Historik** over besvarede spørgsmål
- **Favoritter** — gem dine yndlingsspørgsmål

### 🎨 Design & UX
- **Dark mode** med smooth transitions
- **Floating particles** baggrund
- **Confetti** ved achievements
- **Reduceret motion** support (a11y)
- **Skeleton loaders** for bedre perceived performance

### 🔊 Lyd & Feedback
- **Web Audio API** lydeffekter
  - Kort-flip lyd
  - Success/achievement ding
  - Timer tick og timeout warning
- **Vibration feedback** på mobil

### 📱 PWA & Offline
- **Installérbar** som app på mobil/desktop
- **Offline support** via Service Worker
- **Caching** af alle assets

### ⚡ Performance
- **Lazy loading** af komponenter
- **React.memo** optimering
- **Bundle analysis** med @next/bundle-analyzer
- **Debounce/throttle** utilities

## 🚀 Kom i gang

### Prerequisites
- Node.js 18+
- npm, yarn, pnpm eller bun

### Installation

```bash
# Clone repository
git clone https://github.com/mahope/samtale-spil.git
cd samtale-spil

# Installer dependencies
npm install

# Start development server
npm run dev
```

Åbn [http://localhost:3000](http://localhost:3000) i din browser.

### Scripts

| Kommando | Beskrivelse |
|----------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Kør ESLint |
| `npm run test` | Kør tests i watch mode |
| `npm run test:run` | Kør tests én gang |
| `npm run test:coverage` | Kør tests med coverage |
| `npm run analyze` | Analysér bundle størrelse |

## 📁 Projektstruktur

```
src/
├── app/                      # Next.js App Router
│   ├── layout.tsx            # Root layout med metadata
│   ├── page.tsx              # Landing page
│   ├── favoritter/           # Favoritter side
│   ├── multiplayer/          # Multiplayer spil
│   ├── spil/                 # Spil-sider
│   │   ├── [categoryId]/     # Kategori spil
│   │   └── shuffle-all/      # Shuffle alle kategorier
│   └── statistik/            # Statistik & achievements
├── components/               # React komponenter
│   ├── AchievementToast.tsx  # Achievement notifikationer
│   ├── Confetti.tsx          # Konfetti animation
│   ├── DailyQuestion.tsx     # Dagligt spørgsmål widget
│   ├── DifficultyFilter.tsx  # Sværhedsgrad filter
│   ├── FloatingParticles.tsx # Animeret baggrund
│   ├── LazyComponents.tsx    # Lazy-loaded komponenter
│   ├── OptimizedComponents.tsx # Memoized komponenter
│   ├── PageTransition.tsx    # Side transitions
│   ├── RippleButton.tsx      # Material Design ripple
│   ├── ServiceWorkerRegistration.tsx
│   ├── ShareButton.tsx       # Del-funktionalitet
│   ├── SkeletonLoader.tsx    # Loading skeletons
│   ├── ThemeToggle.tsx       # Dark mode toggle
│   └── TimerDisplay.tsx      # Nedtællingstimer
├── data/
│   └── categories.ts         # Alle kategorier og spørgsmål
├── hooks/
│   ├── useAchievements.ts    # Achievement tracking
│   ├── useLocalStorage.ts    # LocalStorage hooks
│   ├── useMultiplayer.ts     # Multiplayer logik
│   ├── useReducedMotion.ts   # A11y motion preference
│   ├── useShare.ts           # Web Share API
│   ├── useSocialShare.ts     # Social sharing
│   └── useSound.ts           # Web Audio API
├── types/
│   ├── index.ts              # Core types
│   └── multiplayer.ts        # Multiplayer types
├── utils/
│   ├── canvasPolyfill.ts     # Canvas polyfill til PWA
│   ├── dailyQuestion.ts      # Dagligt spørgsmål logik
│   └── performance.ts        # Performance utilities
└── __tests__/                # Vitest tests
    ├── setup.ts              # Test setup
    ├── categories.test.ts
    ├── dailyQuestion.test.ts
    ├── hooks.test.tsx
    └── performance.test.ts
```

## 🎯 Kategorier

| Kategori | Emoji | Spørgsmål | Beskrivelse |
|----------|-------|-----------|-------------|
| Parforhold | 💑 | 50 | Styrker jeres forbindelse |
| Familie | 👨‍👩‍👧‍👦 | 50 | På tværs af generationer |
| Intimitet | 🔥 | 50 | Dybe, personlige spørgsmål for par |
| Fremtid | 🚀 | 50 | Drømme og mål |
| Fortid | 📜 | 50 | Minder og livslærdom |
| Sjove | 😂 | 50 | Lette og underholdende |
| Dybe | 🌊 | 50 | Filosofiske spørgsmål |
| Filosofiske | 🧠 | 50 | Eksistentielle tanker |
| Barndom | 👶 | 50+ | Minder fra barndommen |

## 🧪 Testing

Projektet bruger [Vitest](https://vitest.dev/) med React Testing Library.

```bash
# Kør alle tests
npm run test:run

# Kør tests i watch mode
npm run test

# Generer coverage rapport
npm run test:coverage
```

### Test coverage
- **55+ unit tests** for utilities og hooks
- **Data validation** for alle kategorier og spørgsmål
- **Hook testing** med React Testing Library

## 🛠 Tech Stack

| Teknologi | Version | Beskrivelse |
|-----------|---------|-------------|
| [Next.js](https://nextjs.org/) | 16.1.6 | React framework med App Router |
| [React](https://react.dev/) | 19.2.3 | UI library |
| [TypeScript](https://www.typescriptlang.org/) | 5.x | Type safety |
| [Tailwind CSS](https://tailwindcss.com/) | 4.x | Styling |
| [Framer Motion](https://www.framer.com/motion/) | 12.x | Animationer |
| [Vitest](https://vitest.dev/) | 4.x | Unit testing |

## 🚀 Deployment

Projektet deployes automatisk til GitHub Pages via GitHub Actions:

1. Push til `master` branch
2. GitHub Actions bygger med `npm run build`
3. Deployer `out/` folder til GitHub Pages

### Manuel deploy

```bash
# Build for GitHub Pages
GITHUB_PAGES=true npm run build

# Resultat ligger i out/ mappen
```

## 🎨 Accessibility

- **Reduceret motion** — respekterer `prefers-reduced-motion`
- **Keyboard navigation** — fuld keyboard support
- **ARIA labels** — screen reader venlig
- **Color contrast** — WCAG 2.1 kompatibel
- **Focus indicators** — synlige focus states

## 📱 PWA Features

- **Manifest** med app ikoner
- **Service Worker** til offline caching
- **Add to Home Screen** prompt
- **Splash screens** for iOS/Android

## 🤝 Bygget af

Skabt af 10 AI-agenter i en kæde, januar-februar 2026 🤖

- **Agent 1-3:** Core game mechanics, kategorier, multiplayer
- **Agent 4-5:** UI polish, animationer, accessibility
- **Agent 6-7:** PWA, service worker, offline support
- **Agent 8:** Statistics, achievements, sound effects
- **Agent 9:** Performance optimizations, lazy loading
- **Agent 10:** Testing, dokumentation, JSDoc

## 📄 Licens

MIT © [Mahope](https://github.com/mahope)

---

<p align="center">
  Lavet med ❤️ i Danmark
</p>
