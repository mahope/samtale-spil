# Research Rapport: Medium Prioritet Issues
**Dato:** 2026-02-01
**Projekt:** samtale-spil
**Agent:** Research subagent

---

## 📋 Oversigt

| Issue | Antal fundne | Prioritet |
|-------|-------------|-----------|
| Console statements i production | 20 | Medium-Høj |
| Magic numbers (timeouts/animationer) | 33+ setTimeout + 150+ Framer Motion | Medium |
| Manglende error boundaries | 4 routes | Medium |

---

## 1. 🖥️ Console Statements i Production

### Kritiske (skal fjernes/wrapes)

| Fil | Linje | Type | Beskrivelse |
|-----|-------|------|-------------|
| `src/hooks/useLocalStorage.ts` | 17 | `console.warn` | ⚠️ Kører i production ved localStorage fejl |
| `src/hooks/useLocalStorage.ts` | 30 | `console.warn` | ⚠️ Kører i production ved localStorage fejl |
| `src/components/ServiceWorkerRegistration.tsx` | 11 | `console.log` | SW registration success |
| `src/components/ServiceWorkerRegistration.tsx` | 14 | `console.log` | SW registration failed |
| `src/components/ShareButton.tsx` | 41 | `console.error` | Share fejl |
| `src/hooks/useSocialShare.ts` | 141 | `console.error` | Share progress fejl |
| `src/hooks/useSocialShare.ts` | 179 | `console.error` | Share category completion fejl |
| `src/hooks/useSocialShare.ts` | 343 | `console.error` | Stats image generation fejl |
| `src/hooks/useSocialShare.ts` | 376 | `console.error` | Stats image share fejl |

### Debug/Development (OK men bør wrapes)

| Fil | Linje | Type | Beskrivelse |
|-----|-------|------|-------------|
| `src/app/multiplayer/page.tsx` | 31 | `console.log` | Player joined (debug) |
| `src/app/multiplayer/page.tsx` | 34 | `console.log` | Player left (debug) |
| `src/app/multiplayer/page.tsx` | 37 | `console.log` | Game started (debug) |
| `src/app/multiplayer/page.tsx` | 40 | `console.log` | Next question (debug) |
| `src/app/multiplayer/page.tsx` | 43 | `console.error` | Multiplayer error |
| `src/utils/performance.ts` | 133 | `console.debug` | ✅ Allerede wrapped i debug |

### Error Boundary Logs (Acceptabelt)

| Fil | Linje | Type | Beskrivelse |
|-----|-------|------|-------------|
| `src/app/spil/error.tsx` | 18 | `console.error` | Error logging i error page |
| `src/app/error.tsx` | 19 | `console.error` | Error logging i global error |
| `src/components/ErrorBoundary.tsx` | 43 | `console.error` | Error boundary catch log |

### Anbefalet Løsning

```typescript
// src/utils/logger.ts
const isDev = process.env.NODE_ENV === 'development';

export const logger = {
  log: (...args: unknown[]) => isDev && console.log(...args),
  warn: (...args: unknown[]) => isDev && console.warn(...args),
  error: (...args: unknown[]) => console.error(...args), // Behold i prod
  debug: (...args: unknown[]) => isDev && console.debug(...args),
};
```

---

## 2. 🔢 Magic Numbers

### setTimeout/setInterval (33 tilfælde)

#### UI Feedback Delays (100-500ms)
| Fil | Linje | Værdi | Formål |
|-----|-------|-------|--------|
| `src/components/SearchOverlay.tsx` | 61 | `100` | Focus input delay |
| `src/components/Confetti.tsx` | 132 | `100` | Deactivate confetti |
| `src/hooks/useMultiplayer.ts` | 152 | `100` | Room state sync delay |
| `src/components/AchievementToast.tsx` | 28 | `300` | Dismiss animation |
| `src/components/QuestionForm.tsx` | 65 | `500` | Shake animation reset |
| `src/hooks/useStreak.ts` | 108 | `500` | Milestone delay |

#### Copy/Share Feedback (2000ms)
| Fil | Linje | Værdi | Formål |
|-----|-------|-------|--------|
| `src/components/MultiplayerLobby.tsx` | 44 | `2000` | Copy feedback reset |
| `src/components/ShareButton.tsx` | 38 | `2000` | Share feedback reset |
| `src/hooks/useShare.ts` | 30 | `2000` | Copy feedback reset |
| `src/hooks/useShare.ts` | 43 | `2000` | Copy feedback reset |

#### Celebration Timeouts (2000-3000ms)
| Fil | Linje | Værdi | Formål |
|-----|-------|-------|--------|
| `src/app/spil/shuffle-all/ShuffleAllClient.tsx` | 314 | `2000` | Hide celebration |
| `src/app/spil/[categoryId]/CategoryPlayClient.tsx` | 157 | `2000` | Hide celebration |
| `src/app/multiplayer/MultiplayerGame.tsx` | 156 | `3000` | Hide celebration |
| `src/hooks/useStreak.ts` | 113 | `3000` | Reset broken state |

#### Rating/Status Feedback (1000ms)
| Fil | Linje | Værdi | Formål |
|-----|-------|-------|--------|
| `src/components/RatingStars.tsx` | 49 | `1000` | Just rated reset |
| `src/components/Confetti.tsx` | 159 | `1000` | Clear particles |
| `src/components/ShareStatsModal.tsx` | 74 | `1000` | Revoke object URL |

### Framer Motion Durations (150+ tilfælde)

Kategoriseret efter brug:

#### Spin/Loading Animations
- `duration: 1` - Loading spinners (hyppigst)
- `duration: 1.5` - Pulserende elementer
- `duration: 2` - Langsom rotation

#### Fade/Slide Transitions
- `duration: 0.2-0.3` - Hurtige micro-interactions
- `duration: 0.5-0.6` - Standard page transitions
- `duration: 0.8` - Langsomme entrancer

#### Stagger Delays
- `delay: 0.1 * index` - Liste-animations
- `delay: 0.3` - Sekundære elementer
- `delay: 0.5-0.7` - Tertiære elementer

### Anbefalet Løsning

```typescript
// src/constants/animations.ts
export const ANIMATION_DURATIONS = {
  // Micro-interactions
  INSTANT: 100,
  FAST: 200,
  NORMAL: 300,
  SLOW: 500,
  
  // Feedback
  COPY_FEEDBACK: 2000,
  CELEBRATION: 2000,
  CELEBRATION_LONG: 3000,
  RATING_FEEDBACK: 1000,
  
  // Framer Motion (seconds)
  MOTION: {
    MICRO: 0.15,
    FAST: 0.2,
    NORMAL: 0.3,
    SLOW: 0.5,
    ENTRANCE: 0.6,
    LOADING_SPIN: 1,
    PULSE: 1.5,
    SLOW_SPIN: 2,
  },
  
  // Stagger
  STAGGER: {
    ITEM: 0.1,
    SECONDARY: 0.3,
    TERTIARY: 0.5,
  },
} as const;
```

---

## 3. 🛡️ Error Boundaries

### Eksisterende Coverage

| Scope | Fil | Status |
|-------|-----|--------|
| Global | `src/app/error.tsx` | ✅ Next.js error boundary |
| /spil routes | `src/app/spil/error.tsx` | ✅ Next.js error boundary |
| Reusable | `src/components/ErrorBoundary.tsx` | ✅ Class component + HOC |

### Manglende Coverage

| Route | Fil | Risiko |
|-------|-----|--------|
| `/favoritter` | `src/app/favoritter/page.tsx` | Medium - localStorage fejl |
| `/mine-spoergsmaal` | `src/app/mine-spoergsmaal/page.tsx` | Medium - CRUD operationer |
| `/statistik` | `src/app/statistik/page.tsx` | Lav - kun læsning |
| `/multiplayer` | `src/app/multiplayer/` | Høj - WebSocket, async state |

### Komponenter uden Error Boundaries

Kritiske features der bruger async/localStorage uden wrapping:

| Komponent | Risiko | Grund |
|-----------|--------|-------|
| `DailyChallenge.tsx` | Medium | LocalStorage + beregninger |
| `StreakDisplay.tsx` | Medium | Complex state fra hooks |
| `ShareStatsModal.tsx` | Høj | Canvas API, blob generation |
| `SearchOverlay.tsx` | Lav | Async søgning |
| `Recommendations.tsx` | Lav | Beregninger baseret på data |

### Anbefalet Løsning

1. **Opret route-specifikke error pages:**
```
src/app/favoritter/error.tsx
src/app/mine-spoergsmaal/error.tsx
src/app/statistik/error.tsx
src/app/multiplayer/error.tsx
```

2. **Wrap kritiske features:**
```tsx
// Eksempel for ShareStatsModal
import { ErrorBoundary } from '@/components/ErrorBoundary';

function ShareStatsWrapper(props: ShareStatsModalProps) {
  return (
    <ErrorBoundary 
      fallback={<p>Kunne ikke generere statistik billede</p>}
    >
      <ShareStatsModal {...props} />
    </ErrorBoundary>
  );
}
```

3. **Brug withErrorBoundary HOC:**
```tsx
import { withErrorBoundary } from '@/components/ErrorBoundary';

export default withErrorBoundary(DailyChallenge, <DailyChallengeFallback />);
```

---

## 📊 Prioriteret Handlingsplan

### Fase 1: Hurtige Wins (1-2 timer)
1. ✅ Opret `src/utils/logger.ts` 
2. ✅ Erstat console.warn i `useLocalStorage.ts`
3. ✅ Wrap multiplayer debug logs

### Fase 2: Constants (2-3 timer)
1. ✅ Opret `src/constants/animations.ts`
2. ✅ Erstat setTimeout magic numbers (33 steder)
3. ⏳ Gradvis erstat Framer Motion durations (kan gøres løbende)

### Fase 3: Error Boundaries (2-3 timer)
1. ✅ Opret 4 route error pages
2. ✅ Wrap DailyChallenge, StreakDisplay, ShareStatsModal
3. ✅ Test error recovery

---

## 🎯 Næste Skridt

Spawn **PLAN agent** med denne rapport for at:
1. Opret implementation plan
2. Prioriter baseret på impact
3. Estimér tidsforbruget
4. Koordinér med andre agents

---

*Research afsluttet af subagent: samtale-spil-cycle-research*
