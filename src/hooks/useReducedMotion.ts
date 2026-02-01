"use client";

import { useSyncExternalStore } from "react";

/**
 * Get current value of prefers-reduced-motion
 */
function getSnapshot(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Server-side fallback for SSR
 */
function getServerSnapshot(): boolean {
  return false;
}

/**
 * Subscribe to changes in prefers-reduced-motion
 */
function subscribe(callback: () => void): () => void {
  if (typeof window === 'undefined') return () => {};
  
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  
  // Modern browsers
  if (mediaQuery.addEventListener) {
    mediaQuery.addEventListener('change', callback);
    return () => mediaQuery.removeEventListener('change', callback);
  }

  // Fallback for older browsers
  mediaQuery.addListener(callback);
  return () => mediaQuery.removeListener(callback);
}

/**
 * Hook to detect if user prefers reduced motion
 * Used to disable animations for accessibility
 */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/**
 * Returns animation variants that respect reduced motion preferences
 */
export function useAnimationVariants() {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.01 },
    };
  }

  return {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3, ease: "easeOut" },
  };
}
