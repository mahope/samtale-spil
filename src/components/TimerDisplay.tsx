"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useCallback, useRef } from "react";

interface TimerDisplayProps {
  duration: number;
  isActive: boolean;
  onTimeout: () => void;
  onTick?: (secondsLeft: number) => void;
  isPaused?: boolean;
}

export function TimerDisplay({
  duration,
  isActive,
  onTimeout,
  onTick,
  isPaused = false,
}: TimerDisplayProps) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const hasTimedOut = useRef(false);

  // Reset timer when duration changes or when isActive becomes true
  useEffect(() => {
    if (isActive) {
      setTimeLeft(duration);
      hasTimedOut.current = false;
    }
  }, [duration, isActive]);

  // Timer countdown logic
  useEffect(() => {
    if (!isActive || isPaused) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        const newTime = prev - 1;
        
        // Notify parent of tick (for sound effects)
        if (onTick && newTime <= 5 && newTime > 0) {
          onTick(newTime);
        }
        
        // Time's up!
        if (newTime <= 0 && !hasTimedOut.current) {
          hasTimedOut.current = true;
          setTimeout(() => onTimeout(), 0);
          return 0;
        }
        
        return Math.max(0, newTime);
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isActive, isPaused, onTimeout, onTick]);

  if (!isActive) return null;

  const progress = timeLeft / duration;
  const circumference = 2 * Math.PI * 45; // radius = 45
  const strokeDashoffset = circumference * (1 - progress);
  
  // Color based on time left
  const getColor = () => {
    if (timeLeft <= 5) return "text-red-500";
    if (timeLeft <= 15) return "text-yellow-500";
    return "text-white";
  };

  const getStrokeColor = () => {
    if (timeLeft <= 5) return "#ef4444";
    if (timeLeft <= 15) return "#eab308";
    return "rgba(255, 255, 255, 0.9)";
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="relative inline-flex items-center justify-center"
        role="timer"
        aria-label={`${timeLeft} sekunder tilbage`}
        aria-live="polite"
      >
        {/* Background circle */}
        <svg
          className="w-20 h-20 -rotate-90"
          viewBox="0 0 100 100"
          aria-hidden="true"
        >
          {/* Track */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth="6"
          />
          {/* Progress */}
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={getStrokeColor()}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: 0 }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 0.3, ease: "linear" }}
          />
        </svg>
        
        {/* Time display */}
        <motion.div
          className={`absolute inset-0 flex items-center justify-center font-bold text-xl ${getColor()}`}
          animate={timeLeft <= 5 ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 0.3, repeat: timeLeft <= 5 ? Infinity : 0 }}
        >
          {timeLeft}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

interface TimerSettingsPanelProps {
  isEnabled: boolean;
  duration: 30 | 60 | 90;
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  onToggle: () => void;
  onDurationChange: (duration: 30 | 60 | 90) => void;
  onSoundToggle: () => void;
  onVibrationToggle: () => void;
}

export function TimerSettingsPanel({
  isEnabled,
  duration,
  soundEnabled,
  vibrationEnabled,
  onToggle,
  onDurationChange,
  onSoundToggle,
  onVibrationToggle,
}: TimerSettingsPanelProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Timer toggle button */}
      <motion.button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`p-2 rounded-xl backdrop-blur-sm transition-colors focus:ring-2 focus:ring-white/50 ${
          isEnabled 
            ? "bg-white/30 text-white" 
            : "bg-white/10 text-white/80 hover:bg-white/20"
        }`}
        aria-label={isOpen ? "Luk timer indstillinger" : "Åbn timer indstillinger"}
        aria-expanded={isOpen}
      >
        <svg 
          className="w-5 h-5" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth={2}
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <polyline points="12,6 12,12 16,14" />
        </svg>
      </motion.button>

      {/* Settings dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute top-full right-0 mt-2 w-64 bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-4 z-50"
            role="dialog"
            aria-label="Timer indstillinger"
          >
            {/* Enable/disable toggle */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-slate-700 dark:text-slate-200 font-medium">
                Timer Mode
              </span>
              <button
                type="button"
                onClick={onToggle}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  isEnabled ? "bg-green-500" : "bg-slate-300 dark:bg-slate-600"
                }`}
                role="switch"
                aria-checked={isEnabled}
                aria-label="Aktiver timer mode"
              >
                <motion.div
                  className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-sm"
                  animate={{ x: isEnabled ? 24 : 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </button>
            </div>

            {/* Duration selection */}
            <div className="mb-4">
              <label className="block text-sm text-slate-500 dark:text-slate-400 mb-2">
                Tid per spørgsmål
              </label>
              <div className="flex gap-2">
                {([30, 60, 90] as const).map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => onDurationChange(d)}
                    disabled={!isEnabled}
                    className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                      duration === d
                        ? "bg-blue-500 text-white"
                        : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
                    } ${!isEnabled && "opacity-50 cursor-not-allowed"}`}
                    aria-pressed={duration === d}
                  >
                    {d}s
                  </button>
                ))}
              </div>
            </div>

            {/* Sound and vibration toggles */}
            <div className="space-y-3 pt-3 border-t border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600 dark:text-slate-300">
                  🔊 Lyd ved timeout
                </span>
                <button
                  type="button"
                  onClick={onSoundToggle}
                  disabled={!isEnabled}
                  className={`relative w-10 h-5 rounded-full transition-colors ${
                    soundEnabled && isEnabled ? "bg-green-500" : "bg-slate-300 dark:bg-slate-600"
                  } ${!isEnabled && "opacity-50 cursor-not-allowed"}`}
                  role="switch"
                  aria-checked={soundEnabled}
                  aria-label="Lyd ved timeout"
                >
                  <motion.div
                    className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-sm"
                    animate={{ x: soundEnabled ? 20 : 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600 dark:text-slate-300">
                  📳 Vibration ved timeout
                </span>
                <button
                  type="button"
                  onClick={onVibrationToggle}
                  disabled={!isEnabled}
                  className={`relative w-10 h-5 rounded-full transition-colors ${
                    vibrationEnabled && isEnabled ? "bg-green-500" : "bg-slate-300 dark:bg-slate-600"
                  } ${!isEnabled && "opacity-50 cursor-not-allowed"}`}
                  role="switch"
                  aria-checked={vibrationEnabled}
                  aria-label="Vibration ved timeout"
                >
                  <motion.div
                    className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-sm"
                    animate={{ x: vibrationEnabled ? 20 : 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                </button>
              </div>
            </div>

            {/* Close button */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="mt-4 w-full py-2 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
            >
              Luk
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop to close dropdown */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
