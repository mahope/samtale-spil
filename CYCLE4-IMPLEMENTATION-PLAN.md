# Cyklus 4: Implementeringsplan

## Oversigt
- **Samlet tid:** ~4-5 timer
- **Fokus:** Bug fixes + 1 feature (Emoji Reactions)
- **Prioritet:** Kritiske lint errors → Speed Round bugs → A11y → Feature

---

## DEL 1: BUG FIXES (Prioriteret)

### 🔴 Prioritet 1: Kritiske Lint Errors (39 errors)

#### 1.1 `useReducedMotion.ts` - setState i effect
**Fil:** `src/hooks/useReducedMotion.ts`
**Problem:** Kalder `setPrefersReducedMotion(mediaQuery.matches)` direkte i effect body
**Løsning:** Brug lazy initializer i useState + `useSyncExternalStore` pattern

```typescript
// FØR
const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
useEffect(() => {
  setPrefersReducedMotion(mediaQuery.matches); // ❌ setState i effect
  // ...
}, []);

// EFTER
function getSnapshot() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
function getServerSnapshot() {
  return false; // SSR default
}
function subscribe(callback: () => void) {
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  mq.addEventListener('change', callback);
  return () => mq.removeEventListener('change', callback);
}
const prefersReducedMotion = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
```
**Tid:** 15 min

---

#### 1.2 `useRecommendations.ts` - Impure Math.random()
**Fil:** `src/hooks/useRecommendations.ts` (linje 228-229)
**Problem:** `Math.random()` i useMemo er impure

```typescript
// FØR
const sorted = scored.sort((a, b) => {
  const randomA = Math.random() * 0.5; // ❌ Impure
  const randomB = Math.random() * 0.5;
  return (b.score + randomB) - (a.score + randomA);
});

// EFTER
// Brug seeded random baseret på dato (stabil per dag)
const dailySeed = new Date().toDateString();
const seededRandom = (str: string, index: number) => {
  let hash = 0;
  const seed = str + index.toString();
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash) + seed.charCodeAt(i);
    hash |= 0;
  }
  return (hash & 0x7FFFFFFF) / 0x7FFFFFFF * 0.5;
};

const sorted = scored.sort((a, b) => {
  const randomA = seededRandom(dailySeed, scored.indexOf(a));
  const randomB = seededRandom(dailySeed, scored.indexOf(b));
  return (b.score + randomB) - (a.score + randomA);
});
```
**Tid:** 20 min

---

#### 1.3 `useSocialShare.ts` - Missing deps + unused var
**Fil:** `src/hooks/useSocialShare.ts`
**Problemer:**
- Linje 71: Missing deps i useCallback
- Linje 191: Unused `achievements` variable

**Løsning:** Tilføj manglende dependencies + fjern unused var
**Tid:** 10 min

---

#### 1.4 Andre setState i effects (scan for flere)
**Filer at tjekke:**
- `src/app/spil/[categoryId]/CategoryPlayClient.tsx` (linje 73, 103)
- Alle hooks der bruger useEffect med setState

**Løsning:** Migrer til lazy initializers eller event handlers
**Tid:** 30 min

---

### 🟡 Prioritet 2: Speed Round Bugs (3 issues)

#### 2.1 Speed Bonus Timing Race Condition
**Fil:** `src/app/multiplayer/MultiplayerGame.tsx` (linje 81-96)
**Problem:** `questionStartTime` sættes når kort flippes, men kan give forkert timing pga. closure

```typescript
// FØR
const handleFlip = useCallback(() => {
  if (!isCardFlipped && room.settings.speedRound) {
    setQuestionStartTime(Date.now()); // ❌ Kan være forældet i closure
  }
}, [isCardFlipped, room.settings.speedRound, ...]);

// EFTER
const questionStartTimeRef = useRef<number | null>(null);

const handleFlip = useCallback(() => {
  if (!isCardFlipped && room.settings.speedRound) {
    questionStartTimeRef.current = Date.now();
  }
}, [...]);

// Ved next question, brug ref
const calculateSpeedBonus = () => {
  if (!questionStartTimeRef.current) return 0;
  const elapsed = (Date.now() - questionStartTimeRef.current) / 1000;
  // ... bonus calculation
};
```
**Tid:** 25 min

---

#### 2.2 Speed Bonus Display Overflow
**Fil:** `src/components/PlayerList.tsx` (linje ~69)
**Problem:** Store tal (999+) kan overflow layoutet

```typescript
// Tilføj formatering
const formatBonus = (bonus: number) => bonus > 999 ? '999+' : bonus.toString();

// I JSX
<span className="text-xs font-bold min-w-[40px] text-right">
  {getTotalScore(player.id)}
  {(speedBonuses[player.id] || 0) > 0 && (
    <span className="text-orange-500 ml-0.5">+{formatBonus(speedBonuses[player.id])}</span>
  )}
</span>
```
**Tid:** 10 min

---

#### 2.3 Speed Round + Free Mode Konflikt
**Fil:** `src/types/multiplayer.ts` + multiplayer lobby
**Problem:** `turnOrderMode: "free"` + `speedRound: true` er kaotisk

**Løsning A (Recommended):** Disable free mode når speed round er aktivt
```typescript
// I lobby settings UI
const handleSpeedRoundToggle = () => {
  if (!settings.speedRound) {
    // Enabling speed round - force round-robin
    updateSettings({ 
      speedRound: true, 
      turnOrderMode: settings.turnOrderMode === 'free' ? 'round-robin' : settings.turnOrderMode 
    });
  } else {
    updateSettings({ speedRound: false });
  }
};

// Vis warning/info i UI
{settings.speedRound && settings.turnOrderMode === 'free' && (
  <p className="text-amber-500 text-sm">⚠️ Free mode deaktiveret i Speed Round</p>
)}
```
**Tid:** 20 min

---

### 🟡 Prioritet 3: Accessibility Issues (2 issues)

#### 3.1 Timer aria-live Spam
**Fil:** `src/components/TimerDisplay.tsx`
**Problem:** `aria-live="polite"` opdaterer hver sekund = screen reader spam

```typescript
// Tilføj conditional aria-live announcements
const announceSeconds = [10, 5, 3, 2, 1];
const shouldAnnounce = announceSeconds.includes(timeLeft);

// I JSX - separat hidden announcer
{shouldAnnounce && (
  <span className="sr-only" role="status" aria-live="assertive">
    {timeLeft} sekunder tilbage
  </span>
)}

// Fjern aria-live fra selve timeren
<motion.div
  role="timer"
  aria-label={`Timer: ${timeLeft} sekunder`}
  // aria-live fjernet herfra
>
```
**Tid:** 15 min

---

#### 3.2 Speed Bonus Popup Focus Trap
**Fil:** `src/app/multiplayer/MultiplayerGame.tsx` (linje 254-274)
**Problem:** Speed bonus popup har ingen focus management

```typescript
// Brug eksisterende useFocusTrap hook
import { useFocusTrap } from "@/hooks/useFocusTrap";

// I component
const speedBonusRef = useFocusTrap<HTMLDivElement>({
  isActive: showSpeedBonus !== null,
  onEscape: () => setShowSpeedBonus(null),
});

// I JSX
{showSpeedBonus !== null && (
  <motion.div
    ref={speedBonusRef}
    role="alertdialog"
    aria-label={`Speed bonus: +${showSpeedBonus}`}
    tabIndex={-1}
    // ...
  >
```
**Tid:** 15 min

---

## DEL 2: FEATURE - Emoji Reactions (2-3 timer)

### Hvorfor Emoji Reactions?
- **Hurtigst at implementere** (2-3t vs 3-5t for andre)
- **Høj synlighed** - umiddelbar forbedring af multiplayer UX
- **Bygger på eksisterende infra** - BroadcastChannel allerede på plads
- **Engagement boost** - øger social interaktion

### Implementation Steps

#### 2.1 Tilføj reaction type til multiplayer types
**Fil:** `src/types/multiplayer.ts`

```typescript
// Tilføj til MultiplayerMessageType
export type MultiplayerMessageType =
  | ... existing types
  | "reaction";

// Ny interface
export interface ReactionPayload {
  emoji: string;
  playerId: string;
  playerName: string;
  questionId: string;
}

// Reaction emojis
export const REACTION_EMOJIS = ["😂", "❤️", "🔥", "🤔", "😮", "👏", "💯", "🙈"];
```
**Tid:** 10 min

---

#### 2.2 Opret ReactionOverlay komponent
**Fil:** `src/components/ReactionOverlay.tsx` (ny fil)

```typescript
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface Reaction {
  id: string;
  emoji: string;
  playerName: string;
  x: number; // Random horizontal position (0-100%)
}

interface ReactionOverlayProps {
  reactions: Reaction[];
}

export function ReactionOverlay({ reactions }: ReactionOverlayProps) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <AnimatePresence>
        {reactions.map((reaction) => (
          <motion.div
            key={reaction.id}
            initial={{ y: 100, opacity: 0, scale: 0.5 }}
            animate={{ y: -200, opacity: [0, 1, 1, 0], scale: [0.5, 1.2, 1, 0.8] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute bottom-0"
            style={{ left: `${reaction.x}%` }}
          >
            <div className="flex flex-col items-center">
              <span className="text-4xl">{reaction.emoji}</span>
              <span className="text-xs text-white/80 bg-black/30 px-2 py-0.5 rounded-full">
                {reaction.playerName}
              </span>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
```
**Tid:** 30 min

---

#### 2.3 Opret ReactionPicker komponent
**Fil:** `src/components/ReactionPicker.tsx` (ny fil)

```typescript
"use client";

import { motion } from "framer-motion";
import { REACTION_EMOJIS } from "@/types/multiplayer";

interface ReactionPickerProps {
  onReact: (emoji: string) => void;
  disabled?: boolean;
}

export function ReactionPicker({ onReact, disabled }: ReactionPickerProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex gap-1 justify-center flex-wrap"
    >
      {REACTION_EMOJIS.map((emoji) => (
        <motion.button
          key={emoji}
          type="button"
          onClick={() => onReact(emoji)}
          disabled={disabled}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          className="text-2xl p-1 rounded-full hover:bg-white/20 transition-colors disabled:opacity-50"
          aria-label={`React with ${emoji}`}
        >
          {emoji}
        </motion.button>
      ))}
    </motion.div>
  );
}
```
**Tid:** 20 min

---

#### 2.4 Integrer i useMultiplayer hook
**Fil:** `src/hooks/useMultiplayer.ts`

```typescript
// Tilføj reaction handling
const sendReaction = useCallback((emoji: string) => {
  if (!room || !currentPlayer) return;
  
  const message: MultiplayerMessage = {
    type: "reaction",
    senderId: currentPlayer.id,
    roomCode: room.roomCode,
    timestamp: Date.now(),
    payload: {
      emoji,
      playerId: currentPlayer.id,
      playerName: currentPlayer.name,
      questionId: room.gameState.currentQuestionId,
    } as ReactionPayload,
  };
  
  channel.current?.postMessage(message);
}, [room, currentPlayer]);

// Return fra hook
return {
  ...existing,
  sendReaction,
};
```
**Tid:** 25 min

---

#### 2.5 Integrer i MultiplayerGame
**Fil:** `src/app/multiplayer/MultiplayerGame.tsx`

```typescript
// State for reactions
const [activeReactions, setActiveReactions] = useState<Reaction[]>([]);

// Handler for incoming reactions
useEffect(() => {
  // Subscribe to reaction messages
  const handleReaction = (payload: ReactionPayload) => {
    const newReaction = {
      id: `${payload.playerId}-${Date.now()}`,
      emoji: payload.emoji,
      playerName: payload.playerName,
      x: 20 + Math.random() * 60, // 20-80% horizontal
    };
    setActiveReactions(prev => [...prev, newReaction]);
    
    // Auto-remove after animation
    setTimeout(() => {
      setActiveReactions(prev => prev.filter(r => r.id !== newReaction.id));
    }, 2500);
  };
  // ... subscribe logic
}, []);

// I JSX - under kortet
<ReactionOverlay reactions={activeReactions} />
<ReactionPicker onReact={sendReaction} disabled={!isCardFlipped} />
```
**Tid:** 40 min

---

#### 2.6 Lyd-effekt (optional)
**Fil:** `src/hooks/useSound.ts`

Tilføj `playReaction()` lyd - kort "pop" sound
**Tid:** 15 min

---

## Samlet Tidsestimat

| Del | Opgave | Tid |
|-----|--------|-----|
| 1.1 | useReducedMotion fix | 15 min |
| 1.2 | useRecommendations impure fix | 20 min |
| 1.3 | useSocialShare deps/unused | 10 min |
| 1.4 | Andre setState fixes | 30 min |
| 2.1 | Speed timing race | 25 min |
| 2.2 | Bonus display overflow | 10 min |
| 2.3 | Speed + Free mode konflikt | 20 min |
| 3.1 | Timer aria-live | 15 min |
| 3.2 | Speed bonus focus trap | 15 min |
| **Bug fixes total** | | **~2.5 timer** |
| Feature | Emoji Reactions | **~2.5 timer** |
| **TOTAL** | | **~5 timer** |

---

## Filer der ændres

### Bug Fixes
1. `src/hooks/useReducedMotion.ts` - komplet rewrite
2. `src/hooks/useRecommendations.ts` - seeded random
3. `src/hooks/useSocialShare.ts` - deps + cleanup
4. `src/app/spil/[categoryId]/CategoryPlayClient.tsx` - setState fixes
5. `src/app/multiplayer/MultiplayerGame.tsx` - timing ref + focus trap
6. `src/components/PlayerList.tsx` - overflow format
7. `src/components/TimerDisplay.tsx` - aria-live fix
8. `src/types/multiplayer.ts` - speed+free validation

### Feature (Emoji Reactions)
1. `src/types/multiplayer.ts` - reaction types
2. `src/components/ReactionOverlay.tsx` - NY
3. `src/components/ReactionPicker.tsx` - NY
4. `src/hooks/useMultiplayer.ts` - sendReaction
5. `src/app/multiplayer/MultiplayerGame.tsx` - integration
6. `src/hooks/useSound.ts` - playReaction (optional)

---

## Test Plan

Efter implementation:
1. `npm run lint` - skal være 0 errors
2. `npm run test` - alle tests skal passe
3. Manuel test:
   - [ ] Reduced motion respekteres
   - [ ] Recommendations viser varieret rækkefølge
   - [ ] Speed round timing er præcis
   - [ ] Bonus display håndterer store tal
   - [ ] Speed round disabler free mode
   - [ ] Screen readers får kun vigtige timer updates
   - [ ] Emoji reactions vises og animerer
   - [ ] Reactions synkroniserer mellem spillere

---

*Plan genereret: 2026-02-02*
*Klar til UDFØR agent*
