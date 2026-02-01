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
  spring: { type: "spring", stiffness: 300, damping: 30 },
  smooth: { duration: MOTION.NORMAL, ease: "easeOut" },
  fade: { duration: MOTION.FAST },
  entrance: { duration: MOTION.ENTRANCE, ease: [0.25, 0.1, 0.25, 1] },
} as const;
