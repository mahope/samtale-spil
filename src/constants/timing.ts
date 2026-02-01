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
  TOAST_DURATION: 4000,

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
