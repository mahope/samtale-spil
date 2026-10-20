"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ReactNode, useId } from "react";

/**
 * Props for the EmptyState component
 */
export interface EmptyStateProps {
  /** Large emoji icon displayed at the top */
  icon: string;
  /** Main title/heading */
  title: string;
  /** Description text below the title */
  description: string | ReactNode;
  /** Optional action button configuration */
  action?: {
    /** Link URL to navigate to */
    href: string;
    /** Button label text */
    label: string;
    /** Accessible label for the link */
    ariaLabel?: string;
  };
  /** Visual variant affecting colors */
  variant?: "default" | "favorites" | "custom";
  /** Whether to use section element (for standalone) or div (for inline) */
  as?: "section" | "div";
  /** Custom className for additional styling */
  className?: string;
  /** Whether to show the arrow icon in the action button */
  showArrow?: boolean;
  /** ID for the heading element (for aria-labelledby) */
  headingId?: string;
}

/**
 * Arrow icon SVG component
 */
function ArrowIcon() {
  return (
    <svg 
      className="w-5 h-5" 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor" 
      strokeWidth={2}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
    </svg>
  );
}

/**
 * Get variant-specific styles for the action button
 */
function getActionStyles(variant: EmptyStateProps["variant"]) {
  switch (variant) {
    case "favorites":
      return "bg-gradient-to-r from-rose-400 to-pink-500 text-white hover:opacity-90 focus:ring-4 focus:ring-rose-300";
    case "custom":
      return "bg-white text-violet-600 hover:bg-white/90 shadow-lg";
    default:
      return "bg-gradient-to-r from-violet-500 to-purple-600 text-white hover:opacity-90 focus:ring-4 focus:ring-violet-300";
  }
}

/**
 * EmptyState - A unified component for displaying empty/no-content states
 * 
 * Used for:
 * - Empty favorites list
 * - No search results
 * - No custom questions
 * - Any other "nothing to show" scenario
 * 
 * @example
 * // Basic usage
 * <EmptyState
 *   icon="💝"
 *   title="Ingen favoritter endnu"
 *   description="Tryk på hjertet på et spørgsmål for at gemme det"
 * />
 * 
 * @example
 * // With action button
 * <EmptyState
 *   icon="✍️"
 *   title="Ingen egne spørgsmål"
 *   description="Opret dine egne spørgsmål for at komme i gang"
 *   action={{
 *     href: "/mine-spoergsmaal",
 *     label: "Opret spørgsmål"
 *   }}
 *   variant="custom"
 * />
 */
export function EmptyState({
  icon,
  title,
  description,
  action,
  variant = "default",
  as = "div",
  className = "",
  showArrow = true,
  headingId,
}: EmptyStateProps) {
  const Component = as === "section" ? motion.section : motion.div;
  const reactId = useId();
  const generatedHeadingId = headingId || `empty-heading-${reactId}`;

  return (
    <Component
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`text-center py-12 ${className}`}
      aria-labelledby={as === "section" ? generatedHeadingId : undefined}
    >
      {/* Animated Icon */}
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="text-6xl mb-6"
        aria-hidden="true"
      >
        {icon}
      </motion.div>

      {/* Title */}
      <h2 
        id={as === "section" ? generatedHeadingId : undefined}
        className="text-xl font-semibold text-slate-700 dark:text-slate-200 mb-2"
      >
        {title}
      </h2>

      {/* Description */}
      <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-sm mx-auto">
        {description}
      </p>

      {/* Optional Action Button */}
      {action && (
        <Link
          href={action.href}
          className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-opacity ${getActionStyles(variant)}`}
          aria-label={action.ariaLabel || action.label}
        >
          <span>{action.label}</span>
          {showArrow && <ArrowIcon />}
        </Link>
      )}
    </Component>
  );
}

/**
 * Preset configurations for common empty states
 */
export const EmptyStatePresets = {
  /** Empty favorites list */
  favorites: {
    icon: "💝",
    title: "Ingen favoritter endnu",
    description: (
      <>
        Tryk på hjertet <span aria-hidden="true">❤️</span> på et spørgsmål for at gemme det her
      </>
    ),
    action: {
      href: "/spil",
      label: "Start et spil",
      ariaLabel: "Gå til kategorivalg og start et spil",
    },
    variant: "favorites" as const,
    as: "section" as const,
    className: "py-16",
    headingId: "empty-heading",
  },

  /** No custom questions created yet */
  customQuestions: {
    icon: "✍️",
    title: "Ingen spørgsmål endnu",
    description: "Opret dit første spørgsmål ovenfor for at komme i gang!",
  },

  /** No custom questions to play (in game context) */
  noQuestionsToPlay: {
    icon: "✍️",
    title: "Ingen egne spørgsmål endnu",
    description: "Opret dine egne spørgsmål for at spille med dem her!",
    action: {
      href: "/mine-spoergsmaal",
      label: "Opret spørgsmål",
    },
    variant: "custom" as const,
  },

  /** No search results found */
  noSearchResults: (query: string) => ({
    icon: "🔍",
    title: "Ingen resultater",
    description: `Ingen spørgsmål matcher "${query}"`,
  }),
} as const;

export default EmptyState;
