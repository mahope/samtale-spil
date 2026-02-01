"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

// Page transition wrapper
export function PageTransition({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        duration: 0.3,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Fade transition
export function FadeTransition({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Scale transition (good for modals/cards)
export function ScaleTransition({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 25,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Slide transition (good for page navigation)
export function SlideTransition({
  children,
  direction = "right",
  className = "",
}: {
  children: ReactNode;
  direction?: "left" | "right" | "up" | "down";
  className?: string;
}) {
  const variants = {
    left: { initial: { x: -100 }, animate: { x: 0 }, exit: { x: 100 } },
    right: { initial: { x: 100 }, animate: { x: 0 }, exit: { x: -100 } },
    up: { initial: { y: -100 }, animate: { y: 0 }, exit: { y: 100 } },
    down: { initial: { y: 100 }, animate: { y: 0 }, exit: { y: -100 } },
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...variants[direction].initial }}
      animate={{ opacity: 1, ...variants[direction].animate }}
      exit={{ opacity: 0, ...variants[direction].exit }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Stagger container for list items
export function StaggerContainer({
  children,
  className = "",
  staggerDelay = 0.1,
}: {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Stagger item (child of StaggerContainer)
export function StaggerItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20, scale: 0.95 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            type: "spring",
            stiffness: 100,
            damping: 12,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
