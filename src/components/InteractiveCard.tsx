"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { forwardRef, ReactNode } from "react";

interface InteractiveCardProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: ReactNode;
  /** Enable hover lift effect */
  hover?: boolean;
  /** Enable press/tap effect */
  press?: boolean;
  /** Glow color on hover (tailwind color, e.g., "violet" | "rose" | "emerald") */
  glowColor?: "violet" | "rose" | "emerald" | "blue" | "amber" | "slate";
  /** Base variant for different styles */
  variant?: "default" | "glass" | "gradient";
  /** Additional className */
  className?: string;
}

const glowColorMap = {
  violet: "group-hover:ring-violet-200 dark:group-hover:ring-violet-900/50",
  rose: "group-hover:ring-rose-200 dark:group-hover:ring-rose-900/50",
  emerald: "group-hover:ring-emerald-200 dark:group-hover:ring-emerald-900/50",
  blue: "group-hover:ring-blue-200 dark:group-hover:ring-blue-900/50",
  amber: "group-hover:ring-amber-200 dark:group-hover:ring-amber-900/50",
  slate: "group-hover:ring-slate-200 dark:group-hover:ring-slate-700/50",
};

const variantStyles = {
  default: "bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700",
  glass: "bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg border border-white/20 dark:border-slate-700/50",
  gradient: "bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-850 border border-slate-100 dark:border-slate-700",
};

/**
 * InteractiveCard - A reusable card component with micro-interactions
 * 
 * Features:
 * - Subtle hover lift effect with enhanced shadow
 * - Gentle glow ring on hover
 * - Smooth press/tap feedback
 * - Multiple style variants
 */
export const InteractiveCard = forwardRef<HTMLDivElement, InteractiveCardProps>(
  function InteractiveCard(
    {
      children,
      hover = true,
      press = true,
      glowColor = "slate",
      variant = "default",
      className = "",
      ...motionProps
    },
    ref
  ) {
    return (
      <motion.div
        ref={ref}
        whileHover={hover ? {
          y: -4,
          transition: { type: "spring", stiffness: 400, damping: 25 }
        } : undefined}
        whileTap={press ? { 
          scale: 0.98,
          transition: { type: "spring", stiffness: 400, damping: 25 }
        } : undefined}
        className={`
          group relative rounded-2xl p-5 shadow-md
          transition-all duration-300 ease-out
          hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50
          ring-0 ring-transparent
          hover:ring-2 ${glowColorMap[glowColor]}
          ${variantStyles[variant]}
          ${className}
        `}
        {...motionProps}
      >
        {/* Subtle inner highlight on hover */}
        <div 
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-gradient-to-b from-white/5 to-transparent"
          aria-hidden="true"
        />
        
        {/* Content */}
        <div className="relative">
          {children}
        </div>
      </motion.div>
    );
  }
);

/**
 * Interactive button card - for clickable cards like categories
 */
interface InteractiveButtonCardProps {
  children: ReactNode;
  hover?: boolean;
  press?: boolean;
  glowColor?: "violet" | "rose" | "emerald" | "blue" | "amber" | "slate";
  variant?: "default" | "glass" | "gradient";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  "aria-label"?: string;
}

export const InteractiveButtonCard = forwardRef<HTMLButtonElement, InteractiveButtonCardProps>(
  function InteractiveButtonCard(
    {
      children,
      hover = true,
      press = true,
      glowColor = "violet",
      variant = "default",
      className = "",
      onClick,
      disabled = false,
      "aria-label": ariaLabel,
    },
    ref
  ) {
    return (
      <motion.button
        ref={ref}
        type="button"
        onClick={onClick}
        disabled={disabled}
        whileHover={hover && !disabled ? {
          y: -6,
          scale: 1.02,
          transition: { type: "spring", stiffness: 400, damping: 25 }
        } : undefined}
        whileTap={press && !disabled ? { 
          scale: 0.97,
          transition: { type: "spring", stiffness: 400, damping: 25 }
        } : undefined}
        aria-label={ariaLabel}
        className={`
          group relative w-full rounded-2xl p-5 shadow-md
          transition-all duration-300 ease-out
          hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50
          ring-0 ring-transparent
          hover:ring-2 ${glowColorMap[glowColor]}
          ${variantStyles[variant]}
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500
          disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none
          touch-manipulation
          ${className}
        `}
      >
        {/* Shine effect on hover */}
        <motion.div
          className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none"
          aria-hidden="true"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full"
            initial={false}
            whileHover={{ translateX: "200%" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </motion.div>
        
        {/* Content */}
        <div className="relative">
          {children}
        </div>
      </motion.button>
    );
  }
);

export default InteractiveCard;
