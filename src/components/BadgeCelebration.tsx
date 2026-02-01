"use client";

import { useEffect } from "react";
import { Confetti, useConfetti } from "./Confetti";
import { BadgeUnlockCelebration } from "./CategoryBadge";
import { useCategoryBadges } from "@/hooks/useCategoryBadges";

// Combined badge celebration with confetti
export function BadgeCelebrationWithConfetti() {
  const { newlyUnlockedBadge, dismissCelebration, isLoaded } = useCategoryBadges();
  const { isActive: confettiActive, trigger: triggerConfetti } = useConfetti();

  // Trigger confetti when a new badge is unlocked
  useEffect(() => {
    if (newlyUnlockedBadge) {
      triggerConfetti();
    }
  }, [newlyUnlockedBadge, triggerConfetti]);

  if (!isLoaded) return null;

  return (
    <>
      <Confetti isActive={confettiActive} pieceCount={80} duration={4000} />
      <BadgeUnlockCelebration
        badge={newlyUnlockedBadge}
        onDismiss={dismissCelebration}
      />
    </>
  );
}

// Hook for external components to access badge celebration
export { useCategoryBadges } from "@/hooks/useCategoryBadges";
