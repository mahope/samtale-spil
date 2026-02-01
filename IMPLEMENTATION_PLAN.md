# Samtale-spil Implementation Plan
> Genereret: 2026-02-01 | Cyklus 2 af Refactor Session

---

## 🔴 KRITISKE TASKS (Accessibility)

### Task 1: Implementer useReducedMotion i animerede komponenter
**Estimat:** 25 min | **Prioritet:** P0

**Problem:** `useReducedMotion` hook findes men bruges KUN i `PageTransition.tsx`. 
Alle andre animerede komponenter ignorerer brugerens reduced motion præference.

**Filer der skal ændres:**
1. `src/components/FloatingParticles.tsx` - 3 komponenter (FloatingParticles, FloatingBubbles, FloatingHearts)
2. `src/components/QuestionCard.tsx` - flip animation + pulserende effekter
3. `src/components/Confetti.tsx` - celebration animations
4. `src/components/DepthBadge.tsx` - hvis den har animationer

**Implementering:**
```tsx
// I hver komponent:
import { useReducedMotion } from "@/hooks/useReducedMotion";

// Tidligt i komponenten:
const prefersReducedMotion = useReducedMotion();

// Conditional:
if (prefersReducedMotion) return null; // For FloatingParticles
// ELLER brug instant transitions uden bevægelse
```

**Definition of Done:**
- [ ] FloatingParticles returnerer null eller static dots når reduced motion
- [ ] QuestionCard flip er instant (duration: 0.01) med reduced motion
- [ ] Confetti deaktiveret med reduced motion
- [ ] Test med `prefers-reduced-motion: reduce` i DevTools

---

### Task 2: Fix Backspace keyboard shortcut
**Estimat:** 5 min | **Prioritet:** P0

**Problem:** I `useKeyboardShortcuts.tsx` linje 87-91 er Backspace i switch-casen, men kalder IKKE `onBack()`:
```tsx
case "Escape":
case "Backspace":
  if (onBack && event.key === "Escape") { // <-- BUG: Kun Escape!
    event.preventDefault();
    onBack();
  }
```

**Fil der skal ændres:**
- `src/hooks/useKeyboardShortcuts.tsx` (linje 87-91)

**Fix:**
```tsx
case "Escape":
case "Backspace":
  if (onBack) {
    event.preventDefault();
    onBack();
  }
  break;
```

**Definition of Done:**
- [ ] Backspace navigerer tilbage i spillet
- [ ] Dokumentationen (kommentar linje 25) matcher virkeligheden
- [ ] Test manuelt i browser

---

### Task 3: Tilføj focus traps til modals
**Estimat:** 30 min | **Prioritet:** P0

**Problem:** Ingen modals har focus traps. Keyboard-brugere kan Tab ud af modalen.

**Filer der skal ændres:**
1. `src/components/SearchOverlay.tsx` - search modal
2. `src/components/ShareStatsModal.tsx` - stats sharing modal
3. `src/components/CategoryBadge.tsx` - badge celebration modal (linje 259+)
4. `src/components/Confetti.tsx` - celebration modal (linje 257+)

**Implementering (vælg én):**

**Option A: Custom hook (anbefalet - ingen dependencies)**
Opret `src/hooks/useFocusTrap.ts`:
```tsx
import { useEffect, useRef } from "react";

export function useFocusTrap(isActive: boolean) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!isActive || !containerRef.current) return;
    
    const container = containerRef.current;
    const focusableEls = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstEl = focusableEls[0] as HTMLElement;
    const lastEl = focusableEls[focusableEls.length - 1] as HTMLElement;
    
    firstEl?.focus();
    
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl?.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl?.focus();
      }
    };
    
    container.addEventListener("keydown", handleKeydown);
    return () => container.removeEventListener("keydown", handleKeydown);
  }, [isActive]);
  
  return containerRef;
}
```

**Option B: Use `inert` attribute på baggrund**
```tsx
useEffect(() => {
  if (isOpen) {
    document.body.querySelectorAll(':not(.modal-container)')
      .forEach(el => el.setAttribute('inert', ''));
  }
  return () => { /* remove inert */ };
}, [isOpen]);
```

**Definition of Done:**
- [ ] Tab i SearchOverlay cycler kun inden for modalen
- [ ] Tab i ShareStatsModal cycler kun inden for modalen
- [ ] Focus starter på første interaktive element
- [ ] Escape lukker stadig modalen
- [ ] Test med kun keyboard

---

## 🟡 VIGTIGE TASKS (Performance/DX)

### Task 4: Optimer FloatingParticles
**Estimat:** 20 min | **Prioritet:** P1

**Problem:** 15+ animerede divs med continuous framer-motion animations.

**Fil:** `src/components/FloatingParticles.tsx`

**Optimeringer:**
1. Reducer default count: `count = 15` → `count = 8`
2. Brug CSS animations i stedet for framer-motion (GPU-accelerated)
3. Tilføj `will-change: transform` hint
4. Conditional rendering baseret på device capability

**Definition of Done:**
- [ ] Default particle count reduceret
- [ ] Performance målt før/efter i DevTools (Lighthouse eller Performance tab)
- [ ] Ingen janky animations på mobile

---

### Task 5: Memo QuestionCard
**Estimat:** 10 min | **Prioritet:** P1

**Problem:** QuestionCard re-rendrer ved parent updates selvom props er uændrede.

**Fil:** `src/components/QuestionCard.tsx`

**Implementering:**
```tsx
import { memo } from "react";

function QuestionCardInner({ ... }) { /* eksisterende kode */ }

export const QuestionCard = memo(QuestionCardInner);
```

**Definition of Done:**
- [ ] Komponent wrapped i memo
- [ ] React DevTools Profiler viser færre renders
- [ ] Funktionalitet uændret

---

### Task 6: Centraliser storage keys
**Estimat:** 15 min | **Prioritet:** P1

**Problem:** 12+ hardcoded storage keys spredt over mange filer.

**Ny fil:** `src/constants/storage.ts`
```tsx
export const STORAGE_KEYS = {
  FAVORITES: "samtale-spil-favorites",
  PROGRESS: "samtale-spil-progress",
  ACHIEVEMENTS: "samtale-spil-achievements",
  BADGES: "samtale-spil-badges",
  CUSTOM_QUESTIONS: "samtale-spil-custom-questions",
  DAILY_CHALLENGE: "samtale-spil-daily-challenge",
  TIMER_SETTINGS: "samtale-spil-timer-settings",
  DIFFICULTY_FILTER: "samtale-spil-difficulty-filter",
  QUESTION_HISTORY: "samtale-spil-question-history",
  QUESTION_RATINGS: "samtale-spil-question-ratings",
  STREAK: "samtale-spil-streak",
  PLAYER: "samtale-spil-player",
  ROOM: "samtale-spil-room",
  RECENT_SEARCHES: "samtale-spil-recent-searches",
  DISMISSED_RECOMMENDATIONS: "samtale-spil-dismissed-recommendations",
} as const;
```

**Opdater:** `src/constants/index.ts` med `export * from "./storage";`

**Filer der skal opdateres:**
- `src/hooks/useLocalStorage.ts`
- `src/hooks/useAchievements.ts`
- `src/hooks/useCategoryBadges.ts`
- `src/hooks/useCustomQuestions.ts`
- `src/hooks/useDailyChallenge.ts`
- `src/hooks/useMultiplayer.ts`
- `src/hooks/useQuestionRatings.ts`
- `src/hooks/useRecommendations.ts`
- `src/hooks/useStreak.ts`
- `src/components/SearchOverlay.tsx`
- `src/app/multiplayer/error.tsx`

**Definition of Done:**
- [ ] Alle storage keys importeres fra `@/constants`
- [ ] Ingen hardcoded "samtale-spil-" strings i hooks/components
- [ ] TypeScript autocomplete virker for keys

---

### Task 7: Centraliser date utilities
**Estimat:** 10 min | **Prioritet:** P1

**Problem:** `toISOString().split("T")[0]` pattern gentaget 5+ steder.

**Ny fil:** `src/utils/date.ts`
```tsx
/** Returns YYYY-MM-DD string for a date */
export function toDateKey(date: Date = new Date()): string {
  return date.toISOString().split("T")[0];
}

/** Returns today's date key */
export function getTodayKey(): string {
  return toDateKey(new Date());
}
```

**Filer der skal opdateres:**
- `src/hooks/useDailyChallenge.ts` (linje med `toISOString().split`)
- `src/hooks/useStreak.ts` (linje med `toISOString().split`)
- `src/components/DailyChallenge.tsx`
- `src/components/DailyQuestion.tsx`
- `src/app/favoritter/page.tsx`

**Definition of Done:**
- [ ] `toDateKey()` bruges overalt
- [ ] Ingen direkte `.toISOString().split("T")[0]` kald
- [ ] Alle tests passerer

---

## 🟢 NICE-TO-HAVE TASKS

### Task 8: Haptic feedback på mobile
**Estimat:** 15 min | **Prioritet:** P2

**Implementering:** Opret `src/hooks/useHaptics.ts`
```tsx
export function useHaptics() {
  const vibrate = (pattern: number | number[] = 10) => {
    if ('vibrate' in navigator) {
      navigator.vibrate(pattern);
    }
  };
  return { vibrate };
}
```

**Brug i:** QuestionCard (flip), FavoriteButton (toggle), næste spørgsmål

**Definition of Done:**
- [ ] Kort vibration ved card flip
- [ ] Kort vibration ved favorite toggle
- [ ] Ingen effekt på desktop (graceful degradation)

---

### Task 9: PWA update prompts
**Estimat:** 20 min | **Prioritet:** P2

**Note:** Kræver service worker setup. Check `next.config.js` for PWA config først.

**Definition of Done:**
- [ ] Toast vises når ny version er tilgængelig
- [ ] "Opdater" knap refresher til ny version

---

### Task 10: Recent searches ✅ ALLEREDE IMPLEMENTERET
**Status:** Findes allerede i `SearchOverlay.tsx` (linje 10-11, 159-180)

**Ingen action nødvendig** - recent searches gemmes i localStorage og vises i UI.

---

## 📊 Opsummering

| Prioritet | Tasks | Total tid |
|-----------|-------|-----------|
| 🔴 P0 (Kritisk) | 3 | ~60 min |
| 🟡 P1 (Vigtig) | 4 | ~55 min |
| 🟢 P2 (Nice) | 2 | ~35 min |
| **Total** | **9** | **~2.5 timer** |

## 🚀 Anbefalet rækkefølge

1. **Task 2** - Backspace fix (5 min, hurtig gevinst)
2. **Task 1** - useReducedMotion (25 min, accessibility)
3. **Task 3** - Focus traps (30 min, accessibility)
4. **Task 5** - Memo QuestionCard (10 min, performance)
5. **Task 6** - Storage keys (15 min, DX)
6. **Task 7** - Date utilities (10 min, DX)
7. **Task 4** - FloatingParticles (20 min, performance)
8. **Task 8** - Haptics (15 min, polish)
9. **Task 9** - PWA updates (20 min, polish)

---

*Plan klar til UDFØR agent*
