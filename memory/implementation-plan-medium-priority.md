# Implementeringsplan: Medium Prioritet Fixes
**Dato:** 2026-02-01
**Estimeret total tid:** 4-6 timer
**Agent:** Plan subagent

---

## 🎯 Prioriteret Rækkefølge

| # | Task | Kompleksitet | Tid | Impact |
|---|------|-------------|-----|--------|
| 1 | Logger utility | 🟢 Nem | 15 min | Høj |
| 2 | Erstat console statements | 🟢 Nem | 30 min | Høj |
| 3 | Constants struktur | 🟢 Nem | 20 min | Medium |
| 4 | Erstat setTimeout magic numbers | 🟡 Medium | 45 min | Medium |
| 5 | Route error boundaries | 🟢 Nem | 30 min | Høj |
| 6 | Komponent error boundaries | 🟡 Medium | 45 min | Medium |
| 7 | Framer Motion constants | 🔴 Stor | 2+ timer | Lav |

---

## Task 1: Logger Utility
**Kompleksitet:** 🟢 Nem (15 min)
**Blokerer:** Task 2

### Fil-ændringer
```
OPRET: src/utils/logger.ts
```

### Implementation
```typescript
// src/utils/logger.ts
const isDev = process.env.NODE_ENV === 'development';

export const logger = {
  log: (...args: unknown[]) => isDev && console.log('[DEV]', ...args),
  warn: (...args: unknown[]) => isDev && console.warn('[DEV]', ...args),
  error: (...args: unknown[]) => console.error(...args), // Behold i prod
  debug: (...args: unknown[]) => isDev && console.debug('[DEBUG]', ...args),
};

export default logger;
```

### Definition of Done
- [ ] `src/utils/logger.ts` eksisterer
- [ ] Eksporterer `logger` objekt med log/warn/error/debug
- [ ] `console.log` og `console.warn` kun kører i development
- [ ] `console.error` kører altid (prod fejl skal logges)

---

## Task 2: Erstat Console Statements
**Kompleksitet:** 🟢 Nem (30 min)
**Afhænger af:** Task 1

### Fil-ændringer (9 filer)
```
ÆNDRE: src/hooks/useLocalStorage.ts (linje 17, 30)
ÆNDRE: src/components/ServiceWorkerRegistration.tsx (linje 11, 14)
ÆNDRE: src/components/ShareButton.tsx (linje 41)
ÆNDRE: src/hooks/useSocialShare.ts (linje 141, 179, 343, 376)
ÆNDRE: src/app/multiplayer/page.tsx (linje 31, 34, 37, 40, 43)
```

### Strategi per fil
| Fil | Handling |
|-----|----------|
| `useLocalStorage.ts` | `console.warn` → `logger.warn` |
| `ServiceWorkerRegistration.tsx` | `console.log` → `logger.log` |
| `ShareButton.tsx` | `console.error` → `logger.error` (behold) |
| `useSocialShare.ts` | `console.error` → `logger.error` (behold) |
| `multiplayer/page.tsx` | Debug logs → `logger.debug`, errors → `logger.error` |

### Definition of Done
- [ ] Ingen rå `console.log` eller `console.warn` i production code
- [ ] Alle imports tilføjet: `import { logger } from '@/utils/logger'`
- [ ] Error boundary logs (`error.tsx`, `ErrorBoundary.tsx`) UÆNDREDE
- [ ] `npm run build` uden console warnings

---

## Task 3: Constants Struktur
**Kompleksitet:** 🟢 Nem (20 min)
**Blokerer:** Task 4

### Fil-ændringer
```
OPRET: src/constants/index.ts
OPRET: src/constants/timing.ts
OPRET: src/constants/animations.ts
```

### Implementation

**src/constants/timing.ts**
```typescript
/** UI timing constants in milliseconds */
export const TIMING = {
  // Input/Focus delays
  INPUT_FOCUS_DELAY: 100,
  DEBOUNCE_DEFAULT: 100,
  
  // Animation resets
  SHAKE_RESET: 500,
  
  // User feedback
  COPY_FEEDBACK: 2000,
  SHARE_FEEDBACK: 2000,
  RATING_FEEDBACK: 1000,
  
  // Celebrations
  CELEBRATION_SHORT: 2000,
  CELEBRATION_LONG: 3000,
  
  // State resets
  ACHIEVEMENT_DISMISS: 300,
  MILESTONE_DELAY: 500,
  STREAK_BROKEN_RESET: 3000,
  CONFETTI_DEACTIVATE: 100,
  CONFETTI_CLEAR: 1000,
  OBJECT_URL_REVOKE: 1000,
  
  // Multiplayer
  ROOM_SYNC_DELAY: 100,
} as const;
```

**src/constants/animations.ts**
```typescript
/** Framer Motion duration constants in seconds */
export const MOTION = {
  // Micro-interactions
  INSTANT: 0.1,
  MICRO: 0.15,
  FAST: 0.2,
  NORMAL: 0.3,
  
  // Transitions
  SLOW: 0.5,
  ENTRANCE: 0.6,
  PAGE: 0.8,
  
  // Loading/Spinning
  LOADING_SPIN: 1,
  PULSE: 1.5,
  SLOW_SPIN: 2,
  
  // Stagger delays
  STAGGER_ITEM: 0.1,
  STAGGER_SECONDARY: 0.3,
  STAGGER_TERTIARY: 0.5,
} as const;

/** Common Framer Motion transition presets */
export const TRANSITIONS = {
  spring: { type: 'spring', stiffness: 300, damping: 30 },
  smooth: { duration: MOTION.NORMAL, ease: 'easeOut' },
  fade: { duration: MOTION.FAST },
  entrance: { duration: MOTION.ENTRANCE, ease: [0.25, 0.1, 0.25, 1] },
} as const;
```

**src/constants/index.ts**
```typescript
export * from './timing';
export * from './animations';
```

### Definition of Done
- [ ] `src/constants/` mappe eksisterer med 3 filer
- [ ] Alle timing værdier har beskrivende navne
- [ ] TypeScript `as const` for type safety
- [ ] Barrel export via `index.ts`

---

## Task 4: Erstat setTimeout Magic Numbers
**Kompleksitet:** 🟡 Medium (45 min)
**Afhænger af:** Task 3

### Fil-ændringer (15 filer, 33 steder)
```
ÆNDRE: src/components/SearchOverlay.tsx (100 → INPUT_FOCUS_DELAY)
ÆNDRE: src/components/Confetti.tsx (100 → CONFETTI_DEACTIVATE, 1000 → CONFETTI_CLEAR)
ÆNDRE: src/components/AchievementToast.tsx (300 → ACHIEVEMENT_DISMISS)
ÆNDRE: src/components/QuestionForm.tsx (500 → SHAKE_RESET)
ÆNDRE: src/components/MultiplayerLobby.tsx (2000 → COPY_FEEDBACK)
ÆNDRE: src/components/ShareButton.tsx (2000 → SHARE_FEEDBACK)
ÆNDRE: src/components/RatingStars.tsx (1000 → RATING_FEEDBACK)
ÆNDRE: src/components/ShareStatsModal.tsx (1000 → OBJECT_URL_REVOKE)
ÆNDRE: src/hooks/useShare.ts (2000 → COPY_FEEDBACK)
ÆNDRE: src/hooks/useStreak.ts (500 → MILESTONE_DELAY, 3000 → STREAK_BROKEN_RESET)
ÆNDRE: src/hooks/useMultiplayer.ts (100 → ROOM_SYNC_DELAY)
ÆNDRE: src/app/spil/shuffle-all/ShuffleAllClient.tsx (2000 → CELEBRATION_SHORT)
ÆNDRE: src/app/spil/[categoryId]/CategoryPlayClient.tsx (2000 → CELEBRATION_SHORT)
ÆNDRE: src/app/multiplayer/MultiplayerGame.tsx (3000 → CELEBRATION_LONG)
```

### Definition of Done
- [ ] Ingen hardcoded setTimeout værdier (100, 500, 1000, 2000, 3000)
- [ ] Alle imports: `import { TIMING } from '@/constants'`
- [ ] Kode er mere læsbar med beskrivende konstanter
- [ ] Ingen funktionalitetsændringer

---

## Task 5: Route Error Boundaries
**Kompleksitet:** 🟢 Nem (30 min)

### Fil-ændringer
```
OPRET: src/app/favoritter/error.tsx
OPRET: src/app/mine-spoergsmaal/error.tsx
OPRET: src/app/statistik/error.tsx
OPRET: src/app/multiplayer/error.tsx
```

### Template (alle 4 filer følger samme mønster)
```typescript
'use client';

import { useEffect } from 'react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log til error tracking service (Sentry etc.) i fremtiden
    console.error('Route error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Noget gik galt
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Der opstod en fejl. Prøv igen.
        </p>
        <button
          onClick={reset}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Prøv igen
        </button>
      </div>
    </div>
  );
}
```

### Customizations per route
| Route | Ekstra UI element |
|-------|-------------------|
| `/favoritter` | "Gå til forsiden" link |
| `/mine-spoergsmaal` | "Mine ændringer er gemt automatisk" note |
| `/statistik` | "Statistik nulstilles ikke" note |
| `/multiplayer` | "Forlad spil" + "Prøv igen" buttons |

### Definition of Done
- [ ] 4 nye `error.tsx` filer oprettet
- [ ] Alle routes har error recovery UI
- [ ] Multiplayer har ekstra "forlad spil" handling
- [ ] Konsistent styling med resten af app

---

## Task 6: Komponent Error Boundaries
**Kompleksitet:** 🟡 Medium (45 min)

### Fil-ændringer
```
ÆNDRE: src/components/DailyChallenge.tsx (wrap med ErrorBoundary)
ÆNDRE: src/components/StreakDisplay.tsx (wrap med ErrorBoundary)
ÆNDRE: src/components/ShareStatsModal.tsx (wrap med ErrorBoundary)
OPRET: src/components/fallbacks/DailyChallengeFallback.tsx
OPRET: src/components/fallbacks/StreakDisplayFallback.tsx
OPRET: src/components/fallbacks/ShareStatsFallback.tsx
```

### Strategi
Brug eksisterende `withErrorBoundary` HOC fra `src/components/ErrorBoundary.tsx`:

```typescript
// Eksempel: DailyChallenge.tsx
import { withErrorBoundary } from '@/components/ErrorBoundary';
import { DailyChallengeFallback } from '@/components/fallbacks/DailyChallengeFallback';

function DailyChallenge({ ... }) {
  // eksisterende kode
}

export default withErrorBoundary(DailyChallenge, <DailyChallengeFallback />);
```

### Fallback komponenter
| Komponent | Fallback UI |
|-----------|-------------|
| DailyChallenge | "Dagens udfordring kunne ikke indlæses" + refresh button |
| StreakDisplay | Simpel "🔥 Streak" uden tal |
| ShareStatsModal | "Kunne ikke generere billede - prøv at kopiere tekst i stedet" |

### Definition of Done
- [ ] 3 kritiske komponenter wrapped med ErrorBoundary
- [ ] 3 fallback komponenter oprettet
- [ ] Fejl i DailyChallenge crasher IKKE hele siden
- [ ] Fejl i ShareStatsModal viser venlig besked

---

## Task 7: Framer Motion Constants (OPTIONAL)
**Kompleksitet:** 🔴 Stor (2+ timer)
**Prioritet:** Lav - kan gøres løbende

### Omfang
150+ Framer Motion duration værdier spredt over hele codebase.

### Anbefaling
**UDSKYD** denne task. Gør det gradvist når du alligevel rører ved filer:
1. Ved hver fil-ændring: Erstat lokale magic numbers med MOTION constants
2. Focus på nye features, ikke refactoring

### Tracking
Når Task 7 startes, opret issue eller TODO:
```
[ ] src/components/LoadingSpinner.tsx - duration: 1 → MOTION.LOADING_SPIN
[ ] src/components/CategoryCard.tsx - duration: 0.3 → MOTION.NORMAL
... (generér liste når påbegyndt)
```

---

## 📁 Foreslået Constants Struktur

```
src/
├── constants/
│   ├── index.ts          # Barrel export
│   ├── timing.ts         # setTimeout/setInterval values (ms)
│   ├── animations.ts     # Framer Motion values (seconds)
│   └── (fremtidige)
│       ├── routes.ts     # Route paths
│       ├── storage.ts    # localStorage keys
│       └── limits.ts     # Max values, pagination etc.
```

---

## 🛡️ Error Boundary Strategi

### Hierarki
```
app/error.tsx (Global fallback)
├── app/spil/error.tsx (Spil routes)
├── app/favoritter/error.tsx (Favoritter)
├── app/mine-spoergsmaal/error.tsx (Mine spørgsmål)
├── app/statistik/error.tsx (Statistik)
└── app/multiplayer/error.tsx (Multiplayer)

Komponent-niveau:
├── DailyChallenge → DailyChallengeFallback
├── StreakDisplay → StreakDisplayFallback
└── ShareStatsModal → ShareStatsFallback
```

### Principper
1. **Route-niveau først** - Next.js error.tsx fanger route crashes
2. **Kritiske features** - Wrap komponenter der bruger localStorage/async
3. **Graceful degradation** - Fallbacks viser "noget" frem for blank
4. **Recovery mulighed** - Altid "Prøv igen" eller "Gå tilbage" knap
5. **Logging** - console.error i alle error boundaries (til fremtidig Sentry)

---

## ✅ Execution Checklist

```
[ ] Task 1: Logger utility (15 min)
    [ ] Opret src/utils/logger.ts
    [ ] Test i development vs production
    
[ ] Task 2: Erstat console statements (30 min)
    [ ] useLocalStorage.ts
    [ ] ServiceWorkerRegistration.tsx
    [ ] ShareButton.tsx
    [ ] useSocialShare.ts
    [ ] multiplayer/page.tsx
    [ ] Verify build succeeds
    
[ ] Task 3: Constants struktur (20 min)
    [ ] Opret src/constants/timing.ts
    [ ] Opret src/constants/animations.ts
    [ ] Opret src/constants/index.ts
    
[ ] Task 4: setTimeout magic numbers (45 min)
    [ ] 15 filer opdateret
    [ ] Ingen hardcoded værdier
    [ ] Test at timing stadig virker
    
[ ] Task 5: Route error boundaries (30 min)
    [ ] favoritter/error.tsx
    [ ] mine-spoergsmaal/error.tsx
    [ ] statistik/error.tsx
    [ ] multiplayer/error.tsx
    
[ ] Task 6: Komponent error boundaries (45 min)
    [ ] DailyChallenge wrapped
    [ ] StreakDisplay wrapped
    [ ] ShareStatsModal wrapped
    [ ] 3 fallback komponenter

[ ] Final: Verify
    [ ] npm run build - no errors
    [ ] npm run lint - no new warnings
    [ ] Test kritiske flows manuelt
```

---

## 🚀 Klar til Execution

**Spawn UDFØR agent med:**
- Denne plan som reference
- Start med Task 1 → Task 6 i rækkefølge
- Skip Task 7 (Framer Motion) - det er optional

---

*Plan afsluttet af subagent: samtale-spil-cycle-plan*
