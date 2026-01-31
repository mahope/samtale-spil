# Samtalekort - Projekt Dokumentation

## 🎉 Status: LIVE!
**URL:** https://mahope.github.io/samtale-spil/
**GitHub:** https://github.com/mahope/samtale-spil

## Oversigt
Et web-baseret samtale/spørgsmålsspil inspireret af Vertellis og Big Questions. Designet til par, familier og venner der ønsker dybere samtaler.

## Tech Stack
- **Framework:** Next.js 16 (App Router)
- **Sprog:** TypeScript
- **Styling:** Tailwind CSS
- **Animationer:** Framer Motion
- **Hosting:** GitHub Pages (auto-deploy via Actions)

## Features
- 🎴 **7 kategorier** med 134 spørgsmål total
- 🎨 **3D kort-flip animation** - tryk for at vende kortet
- 📊 **Depth-indikator** - grøn/gul/rød dots (let/medium/dyb)
- ❤️ **Favorit-funktion** - gem dine yndlingsspørgsmål
- 📈 **Progress tracking** - husker hvor du er i LocalStorage
- 🔊 **Lyd-effekter** - Web Audio API (flip, tap, success)
- 🌙 **Dark mode** - toggle med smooth transitions
- 📤 **Del-funktion** - Web Share API / clipboard fallback
- 📱 **PWA** - installérbar, offline support

## Projektstruktur
```
src/
├── app/
│   ├── layout.tsx              # Root layout med dansk metadata
│   ├── page.tsx                # Landing page
│   ├── favoritter/page.tsx     # Favoritter side
│   └── spil/
│       ├── page.tsx            # Kategori-vælger
│       └── [categoryId]/
│           ├── page.tsx        # Server component wrapper
│           └── CategoryPlayClient.tsx  # Selve spillet
├── components/
│   ├── ShareButton.tsx         # Del-knap
│   └── ThemeToggle.tsx         # Dark mode toggle
├── data/
│   └── categories.ts           # Kategori-data og spørgsmål
├── hooks/
│   ├── useLocalStorage.ts      # Favorites & Progress hooks
│   └── useSound.ts             # Web Audio API hook
├── types/
│   └── index.ts                # TypeScript interfaces
└── providers/
    └── ThemeProvider.tsx       # Dark mode context
```

## Kategorier
| Kategori | Emoji | Spørgsmål | Beskrivelse |
|----------|-------|-----------|-------------|
| Parforhold | 💑 | 20 | Styrker forbindelsen mellem par |
| Familie | 👨‍👩‍👧‍👦 | 20 | På tværs af generationer |
| Intimitet | 🔥 | 18 | Dybe, personlige spørgsmål for par |
| Fremtid | 🚀 | 18 | Drømme og mål |
| Fortid | 📜 | 20 | Minder og livslærdom |
| Sjove | 😂 | 20 | Lette og underholdende |
| Dybe | 🌊 | 20 | Filosofiske spørgsmål |

## Spørgsmåls-dybde
- `let` - Gode ice-breakers (grøn dot)
- `medium` - Lidt mere personlige (gul dot)
- `dyb` - Kræver refleksion og sårbarhed (rød dot)

## Deployment
Auto-deploy via GitHub Actions:
1. Push til `master`
2. GitHub Actions bygger med `npm run build` (GITHUB_PAGES=true)
3. Deployer `out/` folder til GitHub Pages

## Kommandoer
```bash
npm run dev      # Start development server
npm run build    # Build for production (static export)
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Bygget af
6 AI-agents natten 31. jan - 1. feb 2026 🤖

## Idéer til næste version
- Custom domain
- Flere spørgsmål
- Multi-player mode
- Temaer/skins
- Analytics
