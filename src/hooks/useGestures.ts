"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import type { PanInfo } from "framer-motion";

export type SwipeDirection = "left" | "right" | "up" | "down" | null;

export interface SwipeConfig {
  /** Minimum distance in pixels to register a swipe */
  threshold?: number;
  /** Maximum time in ms for a swipe gesture */
  maxDuration?: number;
  /** Enable haptic feedback on swipe */
  hapticFeedback?: boolean;
  /** Velocity threshold for quick swipes (pixels/second) */
  velocityThreshold?: number;
}

export interface SwipeState {
  direction: SwipeDirection;
  offset: { x: number; y: number };
  velocity: { x: number; y: number };
  isDragging: boolean;
}

export interface SwipeHandlers {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
}

const DEFAULT_CONFIG: Required<SwipeConfig> = {
  threshold: 50,
  maxDuration: 500,
  hapticFeedback: true,
  velocityThreshold: 500,
};

/**
 * Custom hook for handling swipe gestures with framer-motion
 * Provides swipe detection, visual feedback calculations, and haptic feedback
 */
export function useGestures(
  handlers: SwipeHandlers,
  config: SwipeConfig = {}
) {
  const mergedConfig = { ...DEFAULT_CONFIG, ...config };
  const startTimeRef = useRef<number>(0);
  const [swipeState, setSwipeState] = useState<SwipeState>({
    direction: null,
    offset: { x: 0, y: 0 },
    velocity: { x: 0, y: 0 },
    isDragging: false,
  });

  // Haptic feedback function
  const triggerHaptic = useCallback((type: "light" | "medium" | "heavy" = "medium") => {
    if (!mergedConfig.hapticFeedback) return;
    
    // Navigator vibrate API
    if ("vibrate" in navigator) {
      const patterns = {
        light: [10],
        medium: [20],
        heavy: [30, 10, 30],
      };
      navigator.vibrate(patterns[type]);
    }
  }, [mergedConfig.hapticFeedback]);

  // Detect swipe direction based on offset and velocity
  const detectSwipeDirection = useCallback(
    (offset: { x: number; y: number }, velocity: { x: number; y: number }): SwipeDirection => {
      const { threshold, velocityThreshold } = mergedConfig;
      
      const absX = Math.abs(offset.x);
      const absY = Math.abs(offset.y);
      const velX = Math.abs(velocity.x);
      const velY = Math.abs(velocity.y);

      // Check if swipe is primarily horizontal or vertical
      const isHorizontal = absX > absY;
      
      // Quick swipe detection (high velocity, lower threshold)
      const isQuickSwipe = isHorizontal 
        ? velX > velocityThreshold 
        : velY > velocityThreshold;
      
      const effectiveThreshold = isQuickSwipe ? threshold * 0.5 : threshold;

      if (isHorizontal) {
        if (absX >= effectiveThreshold) {
          return offset.x > 0 ? "right" : "left";
        }
      } else {
        if (absY >= effectiveThreshold) {
          return offset.y > 0 ? "down" : "up";
        }
      }
      
      return null;
    },
    [mergedConfig]
  );

  // Handle drag start
  const handleDragStart = useCallback(() => {
    startTimeRef.current = Date.now();
    setSwipeState((prev) => ({
      ...prev,
      isDragging: true,
      direction: null,
    }));
  }, []);

  // Handle drag (for live updates during drag)
  const handleDrag = useCallback(
    (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      const direction = detectSwipeDirection(info.offset, info.velocity);
      setSwipeState({
        direction,
        offset: info.offset,
        velocity: info.velocity,
        isDragging: true,
      });
    },
    [detectSwipeDirection]
  );

  // Handle drag end
  const handleDragEnd = useCallback(
    (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      const duration = Date.now() - startTimeRef.current;
      
      // Reset state
      setSwipeState({
        direction: null,
        offset: { x: 0, y: 0 },
        velocity: { x: 0, y: 0 },
        isDragging: false,
      });

      // Check if swipe was too slow
      if (duration > mergedConfig.maxDuration) {
        return;
      }

      const direction = detectSwipeDirection(info.offset, info.velocity);
      
      if (direction) {
        triggerHaptic("medium");
        
        switch (direction) {
          case "left":
            handlers.onSwipeLeft?.();
            break;
          case "right":
            handlers.onSwipeRight?.();
            break;
          case "up":
            handlers.onSwipeUp?.();
            break;
          case "down":
            handlers.onSwipeDown?.();
            break;
        }
      }
    },
    [detectSwipeDirection, handlers, mergedConfig.maxDuration, triggerHaptic]
  );

  // Calculate visual feedback values for animations
  const getVisualFeedback = useCallback(() => {
    const { offset, isDragging } = swipeState;
    
    if (!isDragging) {
      return {
        rotation: 0,
        scale: 1,
        opacity: 1,
        x: 0,
        y: 0,
      };
    }

    // Rotation based on horizontal movement (max ±15 degrees)
    const rotation = Math.min(Math.max(offset.x * 0.1, -15), 15);
    
    // Scale down slightly during drag (max 0.95)
    const distance = Math.sqrt(offset.x ** 2 + offset.y ** 2);
    const scale = Math.max(1 - distance * 0.0005, 0.95);
    
    // Opacity for directional indication
    const opacity = Math.max(1 - Math.abs(offset.x) * 0.002, 0.8);

    return {
      rotation,
      scale,
      opacity,
      x: offset.x,
      y: offset.y,
    };
  }, [swipeState]);

  // Get indicator visibility for UI overlays
  const getIndicatorState = useCallback(() => {
    const { offset, isDragging } = swipeState;
    const threshold = mergedConfig.threshold * 0.5; // Show indicators earlier

    return {
      showLeft: isDragging && offset.x < -threshold,
      showRight: isDragging && offset.x > threshold,
      showUp: isDragging && offset.y < -threshold,
      showDown: isDragging && offset.y > threshold,
      leftProgress: isDragging ? Math.min(Math.abs(Math.min(offset.x, 0)) / mergedConfig.threshold, 1) : 0,
      rightProgress: isDragging ? Math.min(Math.max(offset.x, 0) / mergedConfig.threshold, 1) : 0,
      upProgress: isDragging ? Math.min(Math.abs(Math.min(offset.y, 0)) / mergedConfig.threshold, 1) : 0,
      downProgress: isDragging ? Math.min(Math.max(offset.y, 0) / mergedConfig.threshold, 1) : 0,
    };
  }, [swipeState, mergedConfig.threshold]);

  return {
    // Framer motion handlers
    dragHandlers: {
      onDragStart: handleDragStart,
      onDrag: handleDrag,
      onDragEnd: handleDragEnd,
    },
    // Current swipe state
    swipeState,
    // Visual feedback values
    visualFeedback: getVisualFeedback(),
    // Indicator state for overlays
    indicatorState: getIndicatorState(),
    // Manual trigger for haptic
    triggerHaptic,
    // Config
    config: mergedConfig,
  };
}

/**
 * Hook for keyboard-based gesture alternatives (accessibility)
 */
export function useKeyboardGestures(handlers: SwipeHandlers) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle if no input is focused
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }

      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          handlers.onSwipeLeft?.();
          break;
        case "ArrowRight":
          e.preventDefault();
          handlers.onSwipeRight?.();
          break;
        case "ArrowUp":
          e.preventDefault();
          handlers.onSwipeUp?.();
          break;
        case "ArrowDown":
          e.preventDefault();
          handlers.onSwipeDown?.();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlers]);
}

/**
 * Combined hook that provides both touch and keyboard gestures
 */
export function useUnifiedGestures(
  handlers: SwipeHandlers,
  config: SwipeConfig = {}
) {
  const gestures = useGestures(handlers, config);
  useKeyboardGestures(handlers);
  return gestures;
}
