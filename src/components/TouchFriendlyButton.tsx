"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { forwardRef, ReactNode } from "react";

interface TouchFriendlyButtonProps extends Omit<HTMLMotionProps<"button">, "ref" | "children"> {
  children?: ReactNode;
  /** Minimum touch target size (default: 44px for accessibility) */
  minSize?: "sm" | "md" | "lg";
  /** Visual variant */
  variant?: "primary" | "secondary" | "ghost" | "glass";
  /** Icon-only button (square shape) */
  iconOnly?: boolean;
  /** Show ripple effect on touch */
  ripple?: boolean;
}

/**
 * Touch-friendly button component that ensures minimum 44x44px touch target
 * per WCAG 2.1 accessibility guidelines, with enhanced mobile interactions.
 */
export const TouchFriendlyButton = forwardRef<HTMLButtonElement, TouchFriendlyButtonProps>(
  function TouchFriendlyButton(
    {
      children,
      minSize = "md",
      variant = "primary",
      iconOnly = false,
      ripple = true,
      className = "",
      ...props
    },
    ref
  ) {
    const sizeClasses = {
      sm: "min-w-[36px] min-h-[36px] p-2",
      md: "min-w-[44px] min-h-[44px] p-3",
      lg: "min-w-[52px] min-h-[52px] p-4",
    };

    const variantClasses = {
      primary:
        "bg-white dark:bg-slate-800 text-slate-800 dark:text-white shadow-lg hover:shadow-xl",
      secondary:
        "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600",
      ghost:
        "bg-transparent hover:bg-white/10 text-current",
      glass:
        "bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border border-white/20",
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.95 }}
        className={`
          ${sizeClasses[minSize]}
          ${variantClasses[variant]}
          ${iconOnly ? "aspect-square" : ""}
          relative overflow-hidden
          rounded-xl font-medium
          transition-colors duration-200
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500
          disabled:opacity-50 disabled:cursor-not-allowed
          touch-manipulation
          select-none
          ${className}
        `}
        {...props}
      >
        {/* Ripple container */}
        {ripple && (
          <span
            className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none"
            aria-hidden="true"
          >
            <span className="ripple-effect" />
          </span>
        )}
        
        {/* Content */}
        <span className="relative z-10 flex items-center justify-center gap-2">
          {children}
        </span>
      </motion.button>
    );
  }
);

/**
 * Touch-friendly icon button specifically sized for mobile navigation
 */
export function TouchIconButton({
  icon,
  label,
  onClick,
  className = "",
  variant = "glass",
  size = "md",
}: {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary" | "ghost" | "glass";
  size?: "sm" | "md" | "lg";
}) {
  return (
    <TouchFriendlyButton
      onClick={onClick}
      variant={variant}
      minSize={size}
      iconOnly
      aria-label={label}
      className={className}
    >
      {icon}
    </TouchFriendlyButton>
  );
}

/**
 * Large CTA button optimized for thumb-friendly mobile usage
 */
export function MobileCTAButton({
  children,
  onClick,
  className = "",
  disabled = false,
  loading = false,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
}) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`
        w-full
        min-h-[56px] sm:min-h-[52px]
        px-6 py-4 sm:py-3
        bg-white dark:bg-slate-800
        text-slate-800 dark:text-white
        text-base sm:text-lg font-semibold
        rounded-2xl
        shadow-lg hover:shadow-xl
        transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        focus:outline-none focus:ring-4 focus:ring-white/50
        touch-manipulation select-none
        flex items-center justify-center gap-3
        ${className}
      `}
      aria-busy={loading}
    >
      {loading ? (
        <motion.span
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
        />
      ) : (
        children
      )}
    </motion.button>
  );
}
