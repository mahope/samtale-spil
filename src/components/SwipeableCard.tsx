"use client";

import { memo, type ReactNode } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { useUnifiedGestures, type SwipeHandlers, type SwipeConfig } from "@/hooks/useGestures";

interface SwipeIndicatorProps {
  direction: "left" | "right" | "up" | "down";
  progress: number;
  show: boolean;
  icon: string;
  label: string;
  color: string;
}

const SwipeIndicator = memo(function SwipeIndicator({
  direction,
  progress,
  show,
  icon,
  label,
  color,
}: SwipeIndicatorProps) {
  const positionStyles = {
    left: "left-4 top-1/2 -translate-y-1/2",
    right: "right-4 top-1/2 -translate-y-1/2",
    up: "top-4 left-1/2 -translate-x-1/2",
    down: "bottom-4 left-1/2 -translate-x-1/2",
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: progress, scale: 0.8 + progress * 0.2 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className={`absolute ${positionStyles[direction]} z-20 pointer-events-none`}
        >
          <div
            className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl backdrop-blur-sm ${color}`}
          >
            <span className="text-2xl" aria-hidden="true">
              {icon}
            </span>
            <span className="text-xs font-medium text-white/90 whitespace-nowrap">
              {label}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

SwipeIndicator.displayName = "SwipeIndicator";

interface SwipeableCardProps {
  children: ReactNode;
  /** Called when swiped right */
  onSwipeRight?: () => void;
  /** Called when swiped left */
  onSwipeLeft?: () => void;
  /** Called when swiped up */
  onSwipeUp?: () => void;
  /** Called when swiped down */
  onSwipeDown?: () => void;
  /** Custom swipe configuration */
  config?: SwipeConfig;
  /** Whether swipe is enabled */
  enabled?: boolean;
  /** Custom class name */
  className?: string;
  /** Show visual indicators during swipe */
  showIndicators?: boolean;
  /** Custom indicator labels */
  indicatorLabels?: {
    left?: string;
    right?: string;
    up?: string;
    down?: string;
  };
  /** Custom indicator icons */
  indicatorIcons?: {
    left?: string;
    right?: string;
    up?: string;
    down?: string;
  };
}

/**
 * SwipeableCard component with gesture support for mobile navigation.
 * 
 * Features:
 * - Swipe gestures: left, right, up, down
 * - Visual feedback during drag (rotation, scale)
 * - Indicator overlays showing swipe direction
 * - Keyboard navigation support (arrow keys)
 * - Haptic feedback on swipe completion
 * - Reduced motion support for accessibility
 */
export const SwipeableCard = memo(function SwipeableCard({
  children,
  onSwipeRight,
  onSwipeLeft,
  onSwipeUp,
  onSwipeDown,
  config,
  enabled = true,
  className = "",
  showIndicators = true,
  indicatorLabels = {
    left: "Forrige",
    right: "Næste",
    up: "Favorit",
    down: "Spring over",
  },
  indicatorIcons = {
    left: "←",
    right: "→",
    up: "❤️",
    down: "⏭️",
  },
}: SwipeableCardProps) {
  const prefersReducedMotion = useReducedMotion();
  
  const handlers: SwipeHandlers = {
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
  };

  const {
    dragHandlers,
    visualFeedback,
    indicatorState,
  } = useUnifiedGestures(handlers, config);

  // Determine if any handler is provided
  const hasHandlers = onSwipeLeft || onSwipeRight || onSwipeUp || onSwipeDown;

  if (!enabled || !hasHandlers) {
    return <div className={className}>{children}</div>;
  }

  // Calculate drag constraints based on which handlers are available
  const dragConstraints = {
    left: onSwipeLeft ? -150 : 0,
    right: onSwipeRight ? 150 : 0,
    top: onSwipeUp ? -150 : 0,
    bottom: onSwipeDown ? 150 : 0,
  };

  // Determine drag direction based on available handlers
  const dragDirection = (() => {
    const hasHorizontal = onSwipeLeft || onSwipeRight;
    const hasVertical = onSwipeUp || onSwipeDown;
    if (hasHorizontal && hasVertical) return true; // Both
    if (hasHorizontal) return "x";
    if (hasVertical) return "y";
    return false;
  })();

  return (
    <div className={`relative ${className}`}>
      {/* Swipe indicators */}
      {showIndicators && (
        <>
          {onSwipeLeft && (
            <SwipeIndicator
              direction="left"
              progress={indicatorState.leftProgress}
              show={indicatorState.showLeft}
              icon={indicatorIcons.left!}
              label={indicatorLabels.left!}
              color="bg-slate-800/70"
            />
          )}
          {onSwipeRight && (
            <SwipeIndicator
              direction="right"
              progress={indicatorState.rightProgress}
              show={indicatorState.showRight}
              icon={indicatorIcons.right!}
              label={indicatorLabels.right!}
              color="bg-emerald-600/70"
            />
          )}
          {onSwipeUp && (
            <SwipeIndicator
              direction="up"
              progress={indicatorState.upProgress}
              show={indicatorState.showUp}
              icon={indicatorIcons.up!}
              label={indicatorLabels.up!}
              color="bg-rose-500/70"
            />
          )}
          {onSwipeDown && (
            <SwipeIndicator
              direction="down"
              progress={indicatorState.downProgress}
              show={indicatorState.showDown}
              icon={indicatorIcons.down!}
              label={indicatorLabels.down!}
              color="bg-amber-500/70"
            />
          )}
        </>
      )}

      {/* Swipeable content */}
      <motion.div
        drag={dragDirection}
        dragConstraints={dragConstraints}
        dragElastic={0.2}
        onDragStart={dragHandlers.onDragStart}
        onDrag={dragHandlers.onDrag}
        onDragEnd={dragHandlers.onDragEnd}
        animate={
          prefersReducedMotion
            ? {}
            : {
                rotate: visualFeedback.rotation,
                scale: visualFeedback.scale,
              }
        }
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
        style={{
          touchAction: "pan-y", // Allow vertical scrolling on the page
          cursor: "grab",
        }}
        whileDrag={{ cursor: "grabbing" }}
        className="select-none"
      >
        {children}
      </motion.div>

      {/* Drag hint for first-time users */}
      <SwipeHint show={!prefersReducedMotion} />
    </div>
  );
});

SwipeableCard.displayName = "SwipeableCard";

interface SwipeHintProps {
  show: boolean;
}

const SwipeHint = memo(function SwipeHint({ show }: SwipeHintProps) {
  if (!show) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2 }}
      className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-slate-400 dark:text-slate-500 whitespace-nowrap pointer-events-none"
    >
      <span className="hidden sm:inline">← → piltaster eller </span>
      <span>swipe for at navigere</span>
    </motion.div>
  );
});

SwipeHint.displayName = "SwipeHint";

// Export wrapper for integrating with existing QuestionCard
interface SwipeableQuestionWrapperProps {
  children: ReactNode;
  onNext?: () => void;
  onPrevious?: () => void;
  onFavorite?: () => void;
  onSkip?: () => void;
  enabled?: boolean;
}

export const SwipeableQuestionWrapper = memo(function SwipeableQuestionWrapper({
  children,
  onNext,
  onPrevious,
  onFavorite,
  onSkip,
  enabled = true,
}: SwipeableQuestionWrapperProps) {
  return (
    <SwipeableCard
      onSwipeRight={onNext}
      onSwipeLeft={onPrevious}
      onSwipeUp={onFavorite}
      onSwipeDown={onSkip}
      enabled={enabled}
      indicatorLabels={{
        left: "Forrige spørgsmål",
        right: "Næste spørgsmål",
        up: "Gem som favorit",
        down: "Spring over",
      }}
      indicatorIcons={{
        left: "⬅️",
        right: "➡️",
        up: "❤️",
        down: "⏭️",
      }}
      config={{
        threshold: 60,
        hapticFeedback: true,
        velocityThreshold: 400,
      }}
    >
      {children}
    </SwipeableCard>
  );
});

SwipeableQuestionWrapper.displayName = "SwipeableQuestionWrapper";

export default SwipeableCard;
