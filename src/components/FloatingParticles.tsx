"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

// Subtle floating particles for ambient background effects
export function FloatingParticles({
  count = 15,
  className = "",
  color = "white",
  opacity = 0.1,
}: {
  count?: number;
  className?: string;
  color?: string;
  opacity?: number;
}) {
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
            backgroundColor: color,
            opacity: opacity,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            scale: [1, 1.2, 1],
            opacity: [opacity, opacity * 1.5, opacity],
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
  const bubbles = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: 10 + Math.random() * 30,
      duration: 8 + Math.random() * 12,
      delay: Math.random() * 10,
    }));
  }, [count]);

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
