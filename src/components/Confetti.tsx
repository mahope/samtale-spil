"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import { TIMING } from "@/constants";
import { useFocusTrap } from "@/hooks/useFocusTrap";

interface ConfettiPiece {
  id: number;
  x: number;
  color: string;
  delay: number;
  rotation: number;
  scale: number;
}

const COLORS = [
  "#ef4444", // red
  "#f97316", // orange
  "#eab308", // yellow
  "#22c55e", // green
  "#3b82f6", // blue
  "#8b5cf6", // violet
  "#ec4899", // pink
  "#06b6d4", // cyan
];

const SHAPES = ["square", "circle", "triangle"] as const;

function ConfettiShape({ shape, color }: { shape: typeof SHAPES[number]; color: string }) {
  if (shape === "circle") {
    return (
      <div
        className="w-3 h-3 rounded-full"
        style={{ backgroundColor: color }}
      />
    );
  }
  if (shape === "triangle") {
    return (
      <div
        className="w-0 h-0"
        style={{
          borderLeft: "6px solid transparent",
          borderRight: "6px solid transparent",
          borderBottom: `10px solid ${color}`,
        }}
      />
    );
  }
  return (
    <div
      className="w-3 h-3 rounded-sm"
      style={{ backgroundColor: color }}
    />
  );
}

export function Confetti({
  isActive,
  duration = TIMING.CELEBRATION_LONG,
  pieceCount = 50,
}: {
  isActive: boolean;
  duration?: number;
  pieceCount?: number;
}) {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // Skip if user prefers reduced motion
    if (prefersReducedMotion) return;
    
    if (isActive) {
      const newPieces: ConfettiPiece[] = Array.from({ length: pieceCount }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        delay: Math.random() * 0.5,
        rotation: Math.random() * 360,
        scale: 0.5 + Math.random() * 0.5,
      }));
      setPieces(newPieces);

      const timer = setTimeout(() => {
        setPieces([]);
      }, duration);

      return () => clearTimeout(timer);
    }
    return undefined;
  }, [isActive, duration, pieceCount, prefersReducedMotion]);

  // Skip rendering if user prefers reduced motion
  if (prefersReducedMotion) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden" aria-hidden="true">
      <AnimatePresence>
        {pieces.map((piece) => (
          <motion.div
            key={piece.id}
            initial={{
              x: `${piece.x}vw`,
              y: -20,
              rotate: 0,
              scale: piece.scale,
              opacity: 1,
            }}
            animate={{
              y: "110vh",
              rotate: piece.rotation + 720,
              opacity: [1, 1, 0],
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 2.5 + Math.random() * 1.5,
              delay: piece.delay,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="absolute"
          >
            <ConfettiShape
              shape={SHAPES[Math.floor(Math.random() * SHAPES.length)]}
              color={piece.color}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// Hook for easy confetti triggering
export function useConfetti() {
  const [isActive, setIsActive] = useState(false);

  const trigger = useCallback(() => {
    setIsActive(true);
    setTimeout(() => setIsActive(false), TIMING.CONFETTI_DEACTIVATE);
  }, []);

  return { isActive, trigger };
}

// Celebration burst effect (smaller, centered)
export function CelebrationBurst({ isActive }: { isActive: boolean }) {
  const [particles, setParticles] = useState<Array<{
    id: number;
    angle: number;
    distance: number;
    color: string;
    size: number;
  }>>([]);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // Skip if user prefers reduced motion
    if (prefersReducedMotion) return;
    
    if (isActive) {
      const newParticles = Array.from({ length: 12 }).map((_, i) => ({
        id: i,
        angle: (i / 12) * 360,
        distance: 60 + Math.random() * 40,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: 4 + Math.random() * 4,
      }));
      setParticles(newParticles);

      const timer = setTimeout(() => setParticles([]), TIMING.CONFETTI_CLEAR);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [isActive, prefersReducedMotion]);

  // Skip rendering if user prefers reduced motion
  if (prefersReducedMotion) {
    return null;
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{
              x: 0,
              y: 0,
              scale: 0,
              opacity: 1,
            }}
            animate={{
              x: Math.cos((particle.angle * Math.PI) / 180) * particle.distance,
              y: Math.sin((particle.angle * Math.PI) / 180) * particle.distance,
              scale: [0, 1.5, 0],
              opacity: [1, 1, 0],
            }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
            }}
            className="absolute rounded-full"
            style={{
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

// Sparkle effect for hover/tap feedback
export function Sparkle({ 
  isActive, 
  x = 0, 
  y = 0 
}: { 
  isActive: boolean;
  x?: number;
  y?: number;
}) {
  if (!isActive) return null;

  return (
    <motion.div
      initial={{ scale: 0, opacity: 1 }}
      animate={{ scale: 1.5, opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="absolute pointer-events-none"
      style={{ left: x, top: y }}
      aria-hidden="true"
    >
      <svg width="20" height="20" viewBox="0 0 20 20">
        <motion.path
          d="M10 0L12 8L20 10L12 12L10 20L8 12L0 10L8 8L10 0Z"
          fill="#fbbf24"
          initial={{ scale: 0, rotate: 0 }}
          animate={{ scale: [0, 1, 0], rotate: 180 }}
          transition={{ duration: 0.5 }}
        />
      </svg>
    </motion.div>
  );
}

// Full-screen celebration overlay
export function CelebrationOverlay({
  isVisible,
  message = "🎉 Tillykke!",
  subMessage,
  onDismiss,
}: {
  isVisible: boolean;
  message?: string;
  subMessage?: string;
  onDismiss?: () => void;
}) {
  const focusTrapRef = useFocusTrap<HTMLDivElement>({
    isActive: isVisible,
    onEscape: onDismiss,
  });

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur-sm"
        onClick={onDismiss}
        role="dialog"
        aria-modal="true"
        aria-label={message}
      >
        <motion.div
          ref={focusTrapRef}
          initial={{ scale: 0.5, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.5, opacity: 0, y: 50 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-2xl text-center max-w-sm mx-4"
          onClick={(e) => e.stopPropagation()}
        >
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, -10, 10, 0],
            }}
            transition={{ 
              duration: 0.5, 
              repeat: 2,
              repeatType: "reverse",
            }}
            className="text-6xl mb-4"
          >
            🎉
          </motion.div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
            {message}
          </h2>
          {subMessage && (
            <p className="text-slate-600 dark:text-slate-300 mb-6">
              {subMessage}
            </p>
          )}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onDismiss}
            className="px-6 py-3 bg-gradient-to-r from-rose-400 to-violet-500 text-white rounded-xl font-medium"
          >
            Fortsæt
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
