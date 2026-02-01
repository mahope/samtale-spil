/**
 * Centralized localStorage keys for the application.
 * All storage keys should be imported from here to ensure consistency
 * and make it easy to track/change storage usage.
 */
export const STORAGE_KEYS = {
  /** User's favorite questions */
  FAVORITES: "samtale-spil-favorites",
  /** Session progress per category */
  PROGRESS: "samtale-spil-progress",
  /** Unlocked achievements */
  ACHIEVEMENTS: "samtale-spil-achievements",
  /** Category badges/completion */
  BADGES: "samtale-spil-badges",
  /** User-created custom questions */
  CUSTOM_QUESTIONS: "samtale-spil-custom-questions",
  /** Daily challenge state */
  DAILY_CHALLENGE: "samtale-spil-daily-challenge",
  /** Timer preferences */
  TIMER_SETTINGS: "samtale-spil-timer-settings",
  /** Current difficulty filter */
  DIFFICULTY_FILTER: "samtale-spil-difficulty-filter",
  /** History of answered questions */
  QUESTION_HISTORY: "samtale-spil-question-history",
  /** User ratings for questions */
  QUESTION_RATINGS: "samtale-spil-question-ratings",
  /** Daily streak data */
  STREAK: "samtale-spil-streak",
  /** Multiplayer player info */
  PLAYER: "samtale-spil-player",
  /** Multiplayer room state */
  ROOM: "samtale-spil-room",
  /** Recent search queries */
  RECENT_SEARCHES: "samtale-spil-recent-searches",
  /** Dismissed recommendation cards */
  DISMISSED_RECOMMENDATIONS: "samtale-spil-dismissed-recommendations",
} as const;

/** Type for storage key values */
export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];
