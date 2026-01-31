# Samtalekort - Projekt Dokumentation

## Oversigt
Et web-baseret samtale/spørgsmålsspil inspireret af Vertellis og Big Questions. Designet til par, familier og venner der ønsker dybere samtaler.

## Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Sprog:** TypeScript
- **Styling:** Tailwind CSS
- **Animationer:** Framer Motion
- **Hosting:** TBD (sandsynligvis Vercel)

## Projektstruktur
```
src/
├── app/
│   ├── layout.tsx      # Root layout med dansk metadata
│   ├── page.tsx        # Landing page
│   └── spil/
│       └── page.tsx    # Spil-side (kategori-vælger kommer her)
├── data/
│   └── categories.ts   # Kategori-data og spørgsmål
├── types/
│   └── index.ts        # TypeScript interfaces
└── components/         # (skal oprettes)
```

## Kategorier
1. **Parforhold** 💑 - Styrker forbindelsen mellem par
2. **Familie** 👨‍👩‍👧‍👦 - På tværs af generationer
3. **Intimitet** 🔥 - Dybe, personlige spørgsmål for par
4. **Fremtid** 🚀 - Drømme og mål
5. **Fortid** 📜 - Minder og livslærdom
6. **Sjove** 😂 - Lette og underholdende
7. **Dybe** 🌊 - Filosofiske spørgsmål

## Spørgsmåls-dybde
Hver spørgsmål har en dybde:
- `let` - Gode ice-breakers
- `medium` - Lidt mere personlige
- `dyb` - Kræver refleksion og sårbarhed

## Design
- Gradient baggrunde (rose → amber → violet)
- Kortbaseret UI med animationer
- Mobil-first responsive design
- Mørk tilstand understøttet

## Næste Skridt
1. ✅ Foundation opsat
2. 🔲 Kategori-vælger UI
3. 🔲 Spørgsmåls-kort med swipe/flip animation
4. 🔲 Spørgsmålsbank per kategori
5. 🔲 Session-håndtering
6. 🔲 Mulighed for at gemme favoritter

## Kommandoer
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## GitHub
Repository: https://github.com/mahope/samtale-spil
