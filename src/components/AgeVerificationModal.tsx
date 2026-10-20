"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState, useCallback } from "react";
import { useFocusTrap } from "@/hooks/useFocusTrap";

interface AgeVerificationModalProps {
  isOpen: boolean;
  onVerify: () => void;
  onCancel: () => void;
}

export function AgeVerificationModal({
  isOpen,
  onVerify,
  onCancel,
}: AgeVerificationModalProps) {
  const [agreed, setAgreed] = useState(false);

  const focusTrapRef = useFocusTrap<HTMLDivElement>({
    isActive: isOpen,
    onEscape: onCancel,
  });

  const handleVerify = useCallback(() => {
    if (!agreed) return;
    localStorage.setItem("adult_content_verified", "true");
    localStorage.setItem("adult_verification_date", Date.now().toString());
    onVerify();
  }, [agreed, onVerify]);

  const handleCancel = useCallback(() => {
    setAgreed(false);
    onCancel();
  }, [onCancel]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={handleCancel}
        >
          <motion.div
            ref={focusTrapRef}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            className="relative w-full max-w-md rounded-2xl bg-flade p-6 text-blaek shadow-kort ring-1 ring-streg"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="age-verification-title"
          >
            <span className="inline-flex rounded-full bg-[#1d1820] px-3 py-1 text-sm font-bold text-white">18+</span>
            <h2 id="age-verification-title" className="mt-4 text-2xl font-bold">
              Kun for voksne
            </h2>
            <p className="mt-3 leading-relaxed text-blaek-2">
              Spørgsmålene her handler om sex, lyst og intimitet og er skrevet til voksne par. Tag hensyn til
              hinandens grænser, og spring et kort over, hvis det ikke føles rigtigt.
            </p>

            <label className="mt-5 flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-1 h-5 w-5 shrink-0 accent-[#1d4a38]"
              />
              <span>Jeg er fyldt 18 år.</span>
            </label>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={handleCancel}
                className="min-h-12 flex-1 rounded-full px-4 font-semibold ring-1 ring-streg hover:bg-flade-2"
              >
                Tilbage
              </button>
              <button
                type="button"
                onClick={handleVerify}
                disabled={!agreed}
                className="min-h-12 flex-1 rounded-full bg-bord px-4 font-bold text-white disabled:opacity-50 dark:bg-kridt dark:text-kridt-blaek"
              >
                Vis kortene
              </button>
            </div>
            <p className="mt-4 text-center text-sm text-blaek-2">Svaret huskes på denne enhed i 30 dage.</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Hook to check and manage adult content verification
export function useAdultContentVerification() {
  const checkVerification = useCallback((): boolean => {
    if (typeof window === "undefined") return false;

    const verified = localStorage.getItem("adult_content_verified");
    const verificationDate = localStorage.getItem("adult_verification_date");

    if (!verified || verified !== "true" || !verificationDate) {
      return false;
    }

    // Check if verification has expired (30 days)
    const expiryMs = 30 * 24 * 60 * 60 * 1000; // 30 days
    const verifiedAt = parseInt(verificationDate, 10);
    const hasExpired = Date.now() - verifiedAt > expiryMs;

    if (hasExpired) {
      localStorage.removeItem("adult_content_verified");
      localStorage.removeItem("adult_verification_date");
      return false;
    }

    return true;
  }, []);

  const clearVerification = useCallback(() => {
    localStorage.removeItem("adult_content_verified");
    localStorage.removeItem("adult_verification_date");
  }, []);

  return {
    isVerified: checkVerification,
    clearVerification,
  };
}
