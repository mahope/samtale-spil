"use client";

import { motion, AnimatePresence, HTMLMotionProps } from "framer-motion";
import { useState, useCallback, ReactNode } from "react";

interface RippleProps {
  x: number;
  y: number;
  id: number;
}

type MotionButtonProps = Omit<HTMLMotionProps<"button">, "children"> & {
  children: ReactNode;
};

// Button with ripple effect on click
export function RippleButton({
  children,
  className = "",
  rippleColor = "rgba(255, 255, 255, 0.4)",
  onClick,
  ...props
}: MotionButtonProps & {
  rippleColor?: string;
}) {
  const [ripples, setRipples] = useState<RippleProps[]>([]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const id = Date.now();

      setRipples((prev) => [...prev, { x, y, id }]);

      // Remove ripple after animation
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 600);

      if (onClick) {
        onClick(e as React.MouseEvent<HTMLButtonElement, MouseEvent>);
      }
    },
    [onClick]
  );

  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`relative overflow-hidden ${className}`}
      onClick={handleClick}
      {...props}
    >
      {children}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            initial={{ 
              scale: 0, 
              opacity: 0.5,
              x: ripple.x - 50,
              y: ripple.y - 50,
            }}
            animate={{ 
              scale: 4, 
              opacity: 0,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute w-[100px] h-[100px] rounded-full pointer-events-none"
            style={{ backgroundColor: rippleColor }}
            aria-hidden="true"
          />
        ))}
      </AnimatePresence>
    </motion.button>
  );
}

// Pulse button for attention-grabbing CTAs
export function PulseButton({
  children,
  className = "",
  pulseColor = "rgba(99, 102, 241, 0.4)",
  ...props
}: MotionButtonProps & {
  pulseColor?: string;
}) {
  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`relative ${className}`}
      {...props}
    >
      {/* Pulse rings */}
      <motion.span
        className="absolute inset-0 rounded-full"
        style={{ backgroundColor: pulseColor }}
        animate={{
          scale: [1, 1.5, 1.5],
          opacity: [0.4, 0, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeOut",
        }}
        aria-hidden="true"
      />
      <motion.span
        className="absolute inset-0 rounded-full"
        style={{ backgroundColor: pulseColor }}
        animate={{
          scale: [1, 1.3, 1.3],
          opacity: [0.3, 0, 0],
        }}
        transition={{
          duration: 2,
          delay: 0.5,
          repeat: Infinity,
          ease: "easeOut",
        }}
        aria-hidden="true"
      />
      <span className="relative">{children}</span>
    </motion.button>
  );
}

// Bounce button for playful interactions
export function BounceButton({
  children,
  className = "",
  ...props
}: MotionButtonProps) {
  return (
    <motion.button
      type="button"
      whileHover={{ 
        scale: 1.05,
        y: -2,
      }}
      whileTap={{ 
        scale: 0.95,
        y: 2,
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 15,
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.button>
  );
}

// Glow button for premium feel
export function GlowButton({
  children,
  className = "",
  glowColor = "#6366f1",
  ...props
}: MotionButtonProps & {
  glowColor?: string;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      type="button"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`relative ${className}`}
      style={{
        boxShadow: isHovered 
          ? `0 0 20px ${glowColor}40, 0 0 40px ${glowColor}20` 
          : "none",
        transition: "box-shadow 0.3s ease",
      }}
      {...props}
    >
      {children}
    </motion.button>
  );
}
