"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo, useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

// Hook to detect dark mode
function useIsDarkMode() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check initial state
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    
    checkDarkMode();

    // Watch for changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          checkDarkMode();
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, []);

  return isDark;
}

// Subtle floating particles for ambient background effects
// Now theme-aware: uses light particles on dark backgrounds and vice versa
export function FloatingParticles({
  count = 15,
  className = "",
  color,
  opacity = 0.1,
  themeAware = true,
}: {
  count?: number;
  className?: string;
  color?: string;
  opacity?: number;
  /** When true, automatically picks contrasting colors for light/dark mode */
  themeAware?: boolean;
}) {
  const isDarkMode = useIsDarkMode();
  const prefersReducedMotion = useReducedMotion();

  // Return null if user prefers reduced motion
  if (prefersReducedMotion) {
    return null;
  }
  
  // Determine particle color based on theme
  const particleColor = useMemo(() => {
    if (color) return color; // Use explicit color if provided
    if (!themeAware) return "white"; // Default fallback
    // In dark mode, use light particles; in light mode, use darker particles
    return isDarkMode ? "rgba(255, 255, 255, 1)" : "rgba(99, 102, 241, 1)"; // white or indigo
  }, [color, themeAware, isDarkMode]);

  // Adjust opacity for better visibility in each mode
  const particleOpacity = useMemo(() => {
    if (color) return opacity; // Use explicit opacity if color is provided
    if (!themeAware) return opacity;
    return isDarkMode ? opacity : opacity * 1.5; // Slightly more visible in light mode
  }, [color, themeAware, isDarkMode, opacity]);

  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 2 + Math.random() * 4,
      duration: 15 + Math.random() * 20,
      delay: Math.random() * 5,
    }));
  }, [count]);

  return (
    <div 
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            backgroundColor: particleColor,
            opacity: particleOpacity,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            scale: [1, 1.2, 1],
            opacity: [particleOpacity, particleOpacity * 1.5, particleOpacity],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// Bubble effect for a more playful feel
export function FloatingBubbles({
  count = 10,
  className = "",
}: {
  count?: number;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();

  const bubbles = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: 10 + Math.random() * 30,
      duration: 8 + Math.random() * 12,
      delay: Math.random() * 10,
    }));
  }, [count]);

  // Return null if user prefers reduced motion
  if (prefersReducedMotion) {
    return null;
  }

  return (
    <div 
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="absolute rounded-full bg-white/5 border border-white/10"
          style={{
            left: `${bubble.x}%`,
            width: bubble.size,
            height: bubble.size,
          }}
          initial={{ bottom: -50, opacity: 0 }}
          animate={{
            bottom: "110%",
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: bubble.duration,
            delay: bubble.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

// Hearts floating up effect (for favorites/love themed)
export function FloatingHearts({
  count = 8,
  className = "",
}: {
  count?: number;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();

  const hearts = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: 10 + Math.random() * 80,
      size: 8 + Math.random() * 8,
      duration: 10 + Math.random() * 10,
      delay: Math.random() * 15,
      color: ["#fca5a5", "#f472b6", "#fb7185", "#fda4af"][Math.floor(Math.random() * 4)],
    }));
  }, [count]);

  // Return null if user prefers reduced motion
  if (prefersReducedMotion) {
    return null;
  }

  return (
    <div 
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute text-lg"
          style={{
            left: `${heart.x}%`,
            fontSize: heart.size,
            color: heart.color,
          }}
          initial={{ bottom: -20, opacity: 0 }}
          animate={{
            bottom: "110%",
            opacity: [0, 0.6, 0],
            x: [0, Math.sin(heart.id) * 20, 0],
            rotate: [0, heart.id % 2 ? 20 : -20, 0],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          ♥
        </motion.div>
      ))}
    </div>
  );
}
