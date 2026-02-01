"use client";

import { motion } from "framer-motion";

interface LoadingSpinnerProps {
  /** Size of the spinner: 'sm' (16px), 'md' (24px), 'lg' (40px), 'xl' (56px) */
  size?: "sm" | "md" | "lg" | "xl";
  /** Color variant */
  variant?: "primary" | "white" | "gradient";
  /** Optional label for accessibility and display */
  label?: string;
  /** Show label below spinner */
  showLabel?: boolean;
}

const sizeMap = {
  sm: { spinner: 16, stroke: 2 },
  md: { spinner: 24, stroke: 2.5 },
  lg: { spinner: 40, stroke: 3 },
  xl: { spinner: 56, stroke: 3.5 },
};

/**
 * A polished loading spinner with smooth animations
 */
export function LoadingSpinner({
  size = "md",
  variant = "primary",
  label = "Indlæser...",
  showLabel = false,
}: LoadingSpinnerProps) {
  const { spinner, stroke } = sizeMap[size];
  const radius = (spinner - stroke) / 2;
  const circumference = 2 * Math.PI * radius;

  const colorClass = {
    primary: "text-violet-500 dark:text-violet-400",
    white: "text-white",
    gradient: "text-violet-500", // Will use gradient stroke
  };

  return (
    <div
      className="inline-flex flex-col items-center justify-center gap-2"
      role="status"
      aria-label={label}
    >
      <svg
        width={spinner}
        height={spinner}
        viewBox={`0 0 ${spinner} ${spinner}`}
        className={colorClass[variant]}
        aria-hidden="true"
      >
        {/* Gradient definition for gradient variant */}
        {variant === "gradient" && (
          <defs>
            <linearGradient id="spinnerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="50%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
        )}
        
        {/* Background track */}
        <circle
          cx={spinner / 2}
          cy={spinner / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          opacity={0.2}
        />
        
        {/* Animated spinner arc */}
        <motion.circle
          cx={spinner / 2}
          cy={spinner / 2}
          r={radius}
          fill="none"
          stroke={variant === "gradient" ? "url(#spinnerGradient)" : "currentColor"}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference * 0.75 }}
          animate={{
            strokeDashoffset: [circumference * 0.75, circumference * 0.2, circumference * 0.75],
            rotate: [0, 360],
          }}
          transition={{
            strokeDashoffset: {
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            },
            rotate: {
              duration: 1,
              repeat: Infinity,
              ease: "linear",
            },
          }}
          style={{ originX: "50%", originY: "50%" }}
        />
      </svg>
      
      {showLabel && (
        <span className={`text-sm font-medium ${variant === "white" ? "text-white/80" : "text-slate-500 dark:text-slate-400"}`}>
          {label}
        </span>
      )}
    </div>
  );
}

/**
 * Animated dots loading indicator - great for inline loading states
 */
export function LoadingDots({
  size = "md",
  variant = "primary",
}: Omit<LoadingSpinnerProps, "label" | "showLabel">) {
  const dotSizeMap = { sm: 4, md: 6, lg: 8, xl: 10 };
  const gapMap = { sm: 2, md: 3, lg: 4, xl: 5 };
  const dotSize = dotSizeMap[size];
  const gap = gapMap[size];

  const colorClass = {
    primary: "bg-violet-500 dark:bg-violet-400",
    white: "bg-white",
    gradient: "bg-gradient-to-r from-violet-500 to-pink-500",
  };

  return (
    <div
      className="inline-flex items-center justify-center"
      style={{ gap: `${gap}px` }}
      role="status"
      aria-label="Indlæser..."
    >
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className={`rounded-full ${colorClass[variant]}`}
          style={{ width: dotSize, height: dotSize }}
          animate={{
            y: [0, -dotSize, 0],
            opacity: [0.5, 1, 0.5],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.15,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/**
 * Pulsing card/emoji animation - great for loading questions
 */
export function LoadingPulse({
  emoji = "💭",
  label = "Henter spørgsmål...",
}: {
  emoji?: string;
  label?: string;
}) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center gap-4 p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      role="status"
      aria-label={label}
    >
      <motion.span
        className="text-5xl sm:text-6xl"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        aria-hidden="true"
      >
        {emoji}
      </motion.span>
      <motion.p
        className="text-slate-500 dark:text-slate-400 font-medium"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {label}
      </motion.p>
    </motion.div>
  );
}

/**
 * Full-screen loading overlay with backdrop blur
 */
export function LoadingOverlay({
  label = "Indlæser...",
  variant = "gradient",
}: {
  label?: string;
  variant?: "primary" | "white" | "gradient";
}) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="status"
      aria-label={label}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col items-center gap-4 p-8 rounded-2xl bg-white dark:bg-slate-800 shadow-xl"
      >
        <LoadingSpinner size="xl" variant={variant} />
        <p className="text-lg font-medium text-slate-700 dark:text-slate-200">
          {label}
        </p>
      </motion.div>
    </motion.div>
  );
}

/**
 * Inline loading button content with spinner
 */
export function LoadingButton({
  children,
  isLoading,
  loadingText = "Vent...",
}: {
  children: React.ReactNode;
  isLoading: boolean;
  loadingText?: string;
}) {
  return (
    <span className="inline-flex items-center justify-center gap-2">
      {isLoading ? (
        <>
          <LoadingSpinner size="sm" variant="white" />
          <span>{loadingText}</span>
        </>
      ) : (
        children
      )}
    </span>
  );
}

/**
 * Progress bar with percentage
 */
export function LoadingProgress({
  progress,
  label,
  showPercentage = true,
}: {
  progress: number;
  label?: string;
  showPercentage?: boolean;
}) {
  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className="w-full" role="status" aria-label={label || `${clampedProgress}% færdig`}>
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-2 text-sm">
          {label && (
            <span className="text-slate-600 dark:text-slate-400 font-medium">
              {label}
            </span>
          )}
          {showPercentage && (
            <span className="text-slate-500 dark:text-slate-400 tabular-nums">
              {Math.round(clampedProgress)}%
            </span>
          )}
        </div>
      )}
      <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-violet-500 to-purple-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${clampedProgress}%` }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
