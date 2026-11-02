# Analysemål (events)

Alle eventnavne, der sendes med `track(...)` fra `src/utils/track.ts`. Samme event går til både Plausible og Umami. Alle events får desuden propen `platform` (`ios`, `android` eller `web`).

Plausible viser kun events, der er oprettet som mål (goal). Kolonnen "Mål i Plausible" siger, om målet skal oprettes. Mads opretter dem i Plausible. Testen `src/__tests__/analyseMaal.test.ts` fejler, hvis et eventnavn i koden ikke står i tabellen, så den skal opdateres, når et nyt event tilføjes.

| Event | Hvor i koden | Props | Mål i Plausible |
|-------|--------------|-------|-----------------|
| `Spil startet` | `src/app/spil/[categoryId]/CategoryPlayClient.tsx`, `src/app/spil/voksne/AdultPlayClient.tsx`, `src/app/spil/shuffle-all/ShuffleAllClient.tsx`, `src/app/spil/gaet/GaetSpil.tsx`, `src/app/multiplayer/PassThePhone.tsx`, `src/app/lege/[slug]/kort/LegeKortSpil.tsx`, `src/components/SequenceGame.tsx`, `src/intl/PlayDeck.tsx`, `src/intl/YearInReview.tsx` | `kategori`, `tilstand`, `spillere` (varierer pr. sted) | ja |
| `Spil gennemført` | `src/app/spil/[categoryId]/CategoryPlayClient.tsx`, `src/components/SequenceGame.tsx`, `src/intl/YearInReview.tsx` | `kategori`, `dybde`, `tilstand` | ja |
| `Kort vendt` | `src/components/QuestionCard.tsx` | `kort`, `kategori` | ja |
| `Spørg videre` | `src/components/QuestionCard.tsx` | `kategori` | ja |
| `Peg nedtælling` | `src/components/QuestionCard.tsx` | `kort` | nej |
| `Favorit gemt` | `src/app/spil/[categoryId]/CategoryPlayClient.tsx` | `kategori`, `dybde` | ja |
| `Del` | `src/hooks/useShare.ts` | `måde` | ja |
| `Generator` | `src/app/generator/Generator.tsx`, `src/app/question-generator/IntlGenerator.tsx` | `gruppe`, `dybde`, `familie` | ja |
| `Kort rapporteret` | `src/components/ReportCard.tsx` | `aarsag` | ja |
| `Kort trukket` | `src/components/home/CardDraw.tsx` | `kilde` | ja |
| `Påmindelse slået til` | `src/app/indstillinger/ReminderSettings.tsx` | `time`, `rytme` | ja |

Der findes endnu ingen events for app-klik (butikslinks) eller installation. Kommer de, skal de tilføjes her.
