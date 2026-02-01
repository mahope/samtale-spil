# Cyklus 4: Research & Brainstorm

## DEL 1: RESEARCH - Issues & Forbedringer

### 🔴 Kritiske Lint-Fejl (39 errors)

#### 1. `setState` i effects (Cascading Renders)
**Filer:**
- `src/app/spil/[categoryId]/CategoryPlayClient.tsx` (linje 73, 103)
- `src/hooks/useReducedMotion.ts` (linje 19)
- Flere andre hooks

**Problem:** Kalder `setState` direkte i effect body, som kan forårsage cascading renders.

**Fix:** Brug enten:
- `useSyncExternalStore` for media queries
- Initialiser state med lazy initializer: `useState(() => getInitialValue())`
- Flyt logik til event handlers

#### 2. Impure Function Call i `useMemo`
**Fil:** `src/hooks/useRecommendations.ts` (linje 228-229)
```typescript
const randomA = Math.random() * 0.5;
const randomB = Math.random() * 0.5;
```
**Problem:** `Math.random()` er impure og må ikke kaldes i render/useMemo.

**Fix:** 
- Brug seeded random baseret på dato/question ID
- Eller shuffle udenfor useMemo med useRef

#### 3. Missing/Unused Dependencies
**Filer:**
- `src/hooks/useSocialShare.ts` - missing deps i useCallback
- `src/hooks/useSocialShare.ts` - `achievements` unused variable

### 🟡 Performance Issues

#### 1. Timer Tick Sound Spam
**Fil:** `src/components/TimerDisplay.tsx`

I Speed Mode spiller tick-lyd HVER sekund (10 sekunder = 10 lydafspilninger).
**Fix:** Reducer til kun de sidste 5 sekunder, eller gør det konfigurerbart.

#### 2. Multiplayer BroadcastChannel Memory
**Fil:** `src/hooks/useMultiplayer.ts`

Heartbeat interval kører hvert 5. sekund uden throttling.
**Fix:** Implementer presence protocol med optimeret ping/pong.

### 🟡 Speed Round Edge Cases

#### 1. Bonus Timing Race Condition
**Fil:** `src/app/multiplayer/MultiplayerGame.tsx` (linje 81-96)

Hvis card flippes lige før timeout, kan bonus beregning give forkert værdi.
**Fix:** Capture `questionStartTime` når kort flippes, ikke i useCallback closure.

#### 2. Speed Bonus Display Overflow
**Fil:** `src/components/PlayerList.tsx` (linje 69)

Hvis `speedBonuses` > 999, kan det overflow layoutet.
**Fix:** Tilføj max-width eller truncate store tal.

#### 3. Speed Round + Free Mode Konflikt
**Fil:** `src/types/multiplayer.ts`

`turnOrderMode: "free"` + `speedRound: true` er tilladt, men giver kaotisk UX med flere spillere der svarer samtidigt.
**Fix:** Enten disable free mode i speed round, eller implementer "first to answer" mekanik.

### 🟡 Accessibility Issues

#### 1. Timer Display mangler proper live region
**Fil:** `src/components/TimerDisplay.tsx`

`aria-live="polite"` på timer, men opdaterer hver sekund = spam for screen readers.
**Fix:** Kun announce ved 10, 5, 3, 2, 1 sekunder.

#### 2. Speed Bonus popup mangler focus trap
**Fil:** `src/app/multiplayer/MultiplayerGame.tsx` (linje 254-274)

Speed bonus popup har ingen focus management.
**Fix:** Tilføj `useFocusTrap` eller brug AlertDialog pattern.

### 🟢 Minor Issues

1. **Toast z-index:** Kan blive dækket af modaler
2. **PWA offline:** Service worker cacher ikke alle fonts
3. **LocalStorage quota:** Ingen håndtering af storage quota exceeded
4. **History limit:** Fast 50 entries, burde være konfigurerbar

---

## DEL 2: BRAINSTORM - Nye Features

### 🌟 Prioritet: HØJ

#### 1. Onboarding Tutorial Flow
**Beskrivelse:** Interaktiv tutorial for nye brugere
- Step 1: "Velkommen! Vælg hvem du spiller med"
- Step 2: "Sådan virker kortene" (animated flip demo)
- Step 3: "Gem dine favoritter med ❤️"
- Step 4: "Prøv et spørgsmål nu!"

**Implementering:**
- `useOnboarding` hook med localStorage state
- `OnboardingOverlay` komponent med spotlight/tooltip
- Skip-mulighed
- ~3-4 timers arbejde

**Værdi:** Reducerer churn, øger engagement for nye brugere

---

#### 2. Themes & Skins System
**Beskrivelse:** Valgbare visuelle temaer
- **Temaer:** Classic, Dark Mode Pro, Cozy (varm), Ocean (blå), Forest (grøn)
- **Skins:** Kort-bagsider, animationer, lyd-pakker
- Unlock via achievements eller køb

**Implementering:**
- `ThemeContext` med CSS custom properties
- `themes.ts` konfiguration
- Theme picker modal
- ~4-5 timers arbejde

**Værdi:** Personalisering, engagement, potentiel monetization

---

#### 3. Emoji Reactions i Multiplayer
**Beskrivelse:** Real-time emoji reactions på spørgsmål
- Floating reactions (😂❤️🔥🤔😮)
- Vises over kortet når sendt
- Animerede bobler der forsvinder

**Implementering:**
- Tilføj `reaction` message type til BroadcastChannel
- `ReactionOverlay` komponent med Framer Motion
- Reaction picker under kortet
- ~2-3 timers arbejde

**Værdi:** Øget social interaktion, sjovere multiplayer

---

### 🔵 Prioritet: MELLEM

#### 4. Achievement System Udvidelse
**Nye achievements:**
- "Night Owl" - Spil efter kl. 22
- "Early Bird" - Spil før kl. 8
- "Marathon" - 50 spørgsmål i én session
- "Social Butterfly" - Spil med 4+ spillere
- "Speed Demon" - 10 hurtige svar i Speed Round
- "Deep Diver" - 20 dybe spørgsmål i træk
- "Category Master" - Alle spørgsmål i én kategori
- "Perfectionist" - 5★ rating på 10 spørgsmål

**Implementering:**
- Udvid `ACHIEVEMENTS` array
- Tilføj tracking i relevante hooks
- ~2 timers arbejde

---

#### 5. Social Sharing & Invites
**Beskrivelse:** Del resultater og inviter venner
- "Inviter til multiplayer" - Generer link med room code
- "Del min statistik" - Shareable cards med stats
- "Del favorit spørgsmål" - Deep links til specifikke spørgsmål
- QR kode til room join

**Implementering:**
- `ShareableCard` canvas generator
- Dynamic OG meta tags
- Deep link routing
- ~4-5 timers arbejde

**Værdi:** Viral growth, word-of-mouth

---

#### 6. Nye Spil-Modes

##### A. "Hot Seat" Mode
- Én enhed, flere spillere
- Rotation efter hvert spørgsmål
- Leaderboard til sidst

##### B. "Truth or Dare" Variant
- Tilføj "udfordring" option til hvert spørgsmål
- Skip = penalty points

##### C. "Category Roulette"
- Tilfældig kategori hver runde
- Surprise element

**Implementering:** ~3-4 timer per mode

---

### 🟢 Prioritet: LAV (Nice-to-have)

#### 7. PWA Forbedringer
- Push notifications for daily challenge
- Background sync for multiplayer
- App shortcuts (Quick Play, Daily Challenge)
- Better offline indicator
- ~3 timers arbejde

#### 8. Enhanced Offline Mode
- Full game playable offline
- Sync queue for multiplayer actions
- Offline favorites sync
- ~4 timers arbejde

#### 9. Voice Mode (Experimental)
- Text-to-speech for spørgsmål
- Voice input for svar
- Accessibility + hands-free brug
- ~5-6 timers arbejde

#### 10. Analytics Dashboard
- Session duration tracking
- Popular questions heatmap
- Category completion funnels
- ~4-5 timers arbejde

---

## Anbefalet Implementeringsrækkefølge

### Cyklus 4: Bug Fixes (Denne cyklus)
1. Fix alle 39 lint errors ✓
2. Fix Speed Round edge cases ✓
3. Fix accessibility issues ✓

### Cyklus 5: Quick Wins
1. Achievement System Udvidelse
2. Emoji Reactions i Multiplayer
3. PWA Forbedringer

### Cyklus 6: Major Features
1. Onboarding Tutorial Flow
2. Themes & Skins System

### Cyklus 7: Social & Growth
1. Social Sharing & Invites
2. Nye Spil-Modes

---

## Teknisk Gæld at Adressere

1. **State Management:** Overvej Zustand/Jotai for global state
2. **Testing:** Øg coverage til >80% (pt. ~60%)
3. **Code Splitting:** Lazy load multiplayer bundle
4. **TypeScript:** Strengere tsconfig (noUncheckedIndexedAccess)
5. **Error Tracking:** Implementer Sentry/LogRocket

---

*Genereret af Research & Brainstorm Agent - Cyklus 4*
*Dato: 2026-02-02*
