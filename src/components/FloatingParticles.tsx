"use client";

import { useReducedMotion } from "framer-motion";
import { useMemo, useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  xOffset: number;
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
// Optimized with CSS animations for GPU acceleration
export function FloatingParticles({
  count = 8,
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
      xOffset: Math.random() * 20 - 10,
    }));
  }, [count]);

  return (
    <div 
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <style jsx>{`
        @keyframes floatParticle {
          0%, 100% {
            transform: translateY(0) translateX(0) scale(1);
            opacity: ${particleOpacity};
          }
          50% {
            transform: translateY(-30px) translateX(var(--x-offset)) scale(1.2);
            opacity: ${particleOpacity * 1.5};
          }
        }
      `}</style>
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            backgroundColor: particleColor,
            opacity: particleOpacity,
            willChange: "transform, opacity",
            animation: `floatParticle ${particle.duration}s ease-in-out ${particle.delay}s infinite`,
            // @ts-expect-error CSS custom property
            "--x-offset": `${particle.xOffset}px`,
          }}
        />
      ))}
    </div>
  );
}

// Bubble effect for a more playful feel
// Optimized with CSS animations for GPU acceleration
export function FloatingBubbles({
  count = 6,
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
      <style jsx>{`
        @keyframes floatBubble {
          0% {
            transform: translateY(0);
            opacity: 0;
          }
          10% {
            opacity: 0.5;
          }
          90% {
            opacity: 0.5;
          }
          100% {
            transform: translateY(calc(-100vh - 100px));
            opacity: 0;
          }
        }
      `}</style>
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="absolute rounded-full bg-white/5 border border-white/10"
          style={{
            left: `${bubble.x}%`,
            bottom: -50,
            width: bubble.size,
            height: bubble.size,
            willChange: "transform, opacity",
            animation: `floatBubble ${bubble.duration}s linear ${bubble.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

// Hearts floating up effect (for favorites/love themed)
// Optimized with CSS animations for GPU acceleration
export function FloatingHearts({
  count = 6,
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
      xSwing: Math.sin(i) * 20,
      rotation: i % 2 ? 20 : -20,
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
      <style jsx>{`
        @keyframes floatHeart {
          0% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.6;
          }
          50% {
            transform: translateY(calc(-50vh - 50px)) translateX(var(--x-swing)) rotate(var(--rotation));
          }
          90% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(calc(-100vh - 100px)) translateX(0) rotate(0deg);
            opacity: 0;
          }
        }
      `}</style>
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute text-lg"
          style={{
            left: `${heart.x}%`,
            bottom: -20,
            fontSize: heart.size,
            color: heart.color,
            willChange: "transform, opacity",
            animation: `floatHeart ${heart.duration}s linear ${heart.delay}s infinite`,
            // @ts-expect-error CSS custom properties
            "--x-swing": `${heart.xSwing}px`,
            "--rotation": `${heart.rotation}deg`,
          }}
        >
          ♥
        </div>
      ))}
    </div>
  );
}
