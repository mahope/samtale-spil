"use client";

import { useEffect, useCallback } from "react";

export interface KeyboardShortcutConfig {
  /** Flip the card */
  onFlip?: () => void;
  /** Go to next question */
  onNext?: () => void;
  /** Toggle favorite */
  onToggleFavorite?: () => void;
  /** Go back */
  onBack?: () => void;
  /** Whether shortcuts are enabled */
  enabled?: boolean;
}

/**
 * Hook for global keyboard shortcuts in the game
 * 
 * Shortcuts:
 * - Space: Flip card
 * - ArrowRight / N: Next question
 * - F: Toggle favorite
 * - Escape / Backspace: Go back
 * 
 * @example
 * ```tsx
 * useKeyboardShortcuts({
 *   onFlip: handleFlip,
 *   onNext: handleNextQuestion,
 *   onToggleFavorite: handleToggleFavorite,
 *   onBack: () => router.push('/spil'),
 * });
 * ```
 */
export function useKeyboardShortcuts({
  onFlip,
  onNext,
  onToggleFavorite,
  onBack,
  enabled = true,
}: KeyboardShortcutConfig) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      // Don't trigger shortcuts when typing in inputs
      const target = event.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }

      // Don't trigger if modifier keys are pressed (except for specific combos)
      if (event.ctrlKey || event.metaKey || event.altKey) {
        return;
      }

      switch (event.key) {
        case " ": // Space - Flip card
          if (onFlip) {
            event.preventDefault();
            onFlip();
          }
          break;

        case "ArrowRight": // Right arrow - Next question
        case "n": // N key - Next question
        case "N":
          if (onNext) {
            event.preventDefault();
            onNext();
          }
          break;

        case "f": // F key - Toggle favorite
        case "F":
          if (onToggleFavorite) {
            event.preventDefault();
            onToggleFavorite();
          }
          break;

        case "Escape": // Escape - Go back
        case "Backspace":
          if (onBack && event.key === "Escape") {
            event.preventDefault();
            onBack();
          }
          break;

        default:
          break;
      }
    },
    [onFlip, onNext, onToggleFavorite, onBack]
  );

  useEffect(() => {
    if (!enabled) return;

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [enabled, handleKeyDown]);
}

/**
 * Component that displays keyboard shortcut hints
 */
export function KeyboardShortcutHints({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap justify-center gap-3 text-xs ${className}`}>
      <ShortcutHint keys={["Space"]} label="Vend kort" />
      <ShortcutHint keys={["→", "N"]} label="Næste" />
      <ShortcutHint keys={["F"]} label="Favorit" />
      <ShortcutHint keys={["Esc"]} label="Tilbage" />
    </div>
  );
}

function ShortcutHint({ keys, label }: { keys: string[]; label: string }) {
  return (
    <div className="flex items-center gap-1">
      {keys.map((key, index) => (
        <span key={key}>
          <kbd className="px-1.5 py-0.5 bg-white/20 dark:bg-white/10 rounded text-[10px] font-mono">
            {key}
          </kbd>
          {index < keys.length - 1 && <span className="mx-0.5 opacity-50">/</span>}
        </span>
      ))}
      <span className="opacity-70 ml-1">{label}</span>
    </div>
  );
}
