"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useCallback } from "react";

export type ToastType = "success" | "error" | "info" | "warning";

export interface ToastData {
  id: string;
  type: ToastType;
  message: string;
  emoji?: string;
  duration?: number;
}

interface ToastProps {
  toast: ToastData;
  onDismiss: (id: string) => void;
}

const toastConfig: Record<ToastType, { bg: string; border: string; defaultEmoji: string }> = {
  success: {
    bg: "bg-gradient-to-r from-emerald-400 to-green-500",
    border: "border-emerald-300",
    defaultEmoji: "✅",
  },
  error: {
    bg: "bg-gradient-to-r from-red-400 to-rose-500",
    border: "border-red-300",
    defaultEmoji: "❌",
  },
  info: {
    bg: "bg-gradient-to-r from-blue-400 to-indigo-500",
    border: "border-blue-300",
    defaultEmoji: "ℹ️",
  },
  warning: {
    bg: "bg-gradient-to-r from-amber-400 to-orange-500",
    border: "border-amber-300",
    defaultEmoji: "⚠️",
  },
};

function Toast({ toast, onDismiss }: ToastProps) {
  const config = toastConfig[toast.type];
  const duration = toast.duration ?? 3000;

  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, duration);
    return () => clearTimeout(timer);
  }, [toast.id, duration, onDismiss]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={`${config.bg} text-white rounded-xl shadow-lg p-3.5 sm:p-4 border ${config.border} max-w-sm w-full backdrop-blur-sm`}
    >
      <div className="flex items-center gap-3">
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.1 }}
          className="text-xl sm:text-2xl flex-shrink-0"
        >
          {toast.emoji || config.defaultEmoji}
        </motion.span>
        <p className="flex-1 text-sm sm:text-base font-medium leading-tight">
          {toast.message}
        </p>
        <motion.button
          onClick={() => onDismiss(toast.id)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-1.5 rounded-full hover:bg-white/20 transition-colors flex-shrink-0 min-w-[32px] min-h-[32px] flex items-center justify-center"
          aria-label="Luk"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </motion.button>
      </div>
      {/* Progress bar */}
      <motion.div
        className="absolute bottom-0 left-0 h-1 bg-white/30 rounded-b-xl"
        initial={{ width: "100%" }}
        animate={{ width: "0%" }}
        transition={{ duration: duration / 1000, ease: "linear" }}
      />
    </motion.div>
  );
}

interface ToastContainerProps {
  toasts: ToastData[];
  onDismiss: (id: string) => void;
}

export function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 flex flex-col gap-2 px-4 w-full max-w-sm pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <Toast toast={toast} onDismiss={onDismiss} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// Hook for managing toasts
import { useState } from "react";

export function useToast() {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const addToast = useCallback((toast: Omit<ToastData, "id">) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { ...toast, id }]);
    return id;
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const success = useCallback((message: string, emoji?: string) => {
    return addToast({ type: "success", message, emoji });
  }, [addToast]);

  const error = useCallback((message: string, emoji?: string) => {
    return addToast({ type: "error", message, emoji });
  }, [addToast]);

  const info = useCallback((message: string, emoji?: string) => {
    return addToast({ type: "info", message, emoji });
  }, [addToast]);

  const warning = useCallback((message: string, emoji?: string) => {
    return addToast({ type: "warning", message, emoji });
  }, [addToast]);

  return {
    toasts,
    addToast,
    removeToast,
    success,
    error,
    info,
    warning,
  };
}
