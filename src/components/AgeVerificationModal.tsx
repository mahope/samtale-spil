"use client";

import { motion, AnimatePresence } from "framer-motion";
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
  const [step, setStep] = useState<"warning" | "confirmation">("warning");
  const [agreed, setAgreed] = useState(false);

  const focusTrapRef = useFocusTrap<HTMLDivElement>({
    isActive: isOpen,
    onEscape: onCancel,
  });

  const handleVerify = useCallback(() => {
    if (step === "warning") {
      setStep("confirmation");
    } else if (agreed) {
      // Store verification in localStorage
      localStorage.setItem("adult_content_verified", "true");
      localStorage.setItem("adult_verification_date", Date.now().toString());
      onVerify();
    }
  }, [step, agreed, onVerify]);

  const handleCancel = useCallback(() => {
    setStep("warning");
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onClick={handleCancel}
        >
          <motion.div
            ref={focusTrapRef}
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="age-verification-title"
          >
            {/* Header with warning stripe */}
            <div className="bg-gradient-to-r from-red-600 to-rose-600 py-4 px-6">
              <div className="flex items-center gap-3">
                <span className="text-3xl" aria-hidden="true">🔞</span>
                <div>
                  <h2
                    id="age-verification-title"
                    className="text-xl font-bold text-white"
                  >
                    Aldersbekræftelse
                  </h2>
                  <p className="text-red-100 text-sm">Kun for voksne 18+</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <AnimatePresence mode="wait">
                {step === "warning" ? (
                  <motion.div
                    key="warning"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-4"
                  >
                    <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl" aria-hidden="true">⚠️</span>
                        <div>
                          <h3 className="font-semibold text-red-400 mb-1">
                            Advarsel
                          </h3>
                          <p className="text-slate-300 text-sm leading-relaxed">
                            Dette indhold er kun beregnet til voksne par over 18
                            år. Spørgsmålene handler om intimitet, romantik og
                            parforhold på et voksent niveau.
                          </p>
                        </div>
                      </div>
                    </div>

                    <p className="text-slate-400 text-sm text-center">
                      Ved at fortsætte bekræfter du, at du er over 18 år.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="confirmation"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <div className="bg-slate-700/50 rounded-xl p-4">
                      <p className="text-slate-200 text-sm leading-relaxed">
                        Disse spørgsmål er designet til at hjælpe par med at
                        udforske deres intimitet og styrke deres forbindelse.
                        Brug dem ansvarligt og respekter altid hinandens
                        grænser.
                      </p>
                    </div>

                    <label className="flex items-start gap-3 cursor-pointer group">
                      <div className="relative mt-0.5">
                        <input
                          type="checkbox"
                          checked={agreed}
                          onChange={(e) => setAgreed(e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-5 h-5 border-2 border-slate-500 rounded peer-checked:border-red-500 peer-checked:bg-red-500 transition-colors">
                          {agreed && (
                            <svg
                              className="w-full h-full text-white p-0.5"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={3}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                        </div>
                      </div>
                      <span className="text-slate-300 text-sm group-hover:text-slate-200 transition-colors">
                        Jeg bekræfter at jeg er over 18 år og forstår at dette
                        indhold er intimt og kun beregnet til voksne par.
                      </span>
                    </label>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Actions */}
              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 py-3 px-4 bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white rounded-xl font-medium transition-colors"
                >
                  Annuller
                </button>
                <motion.button
                  type="button"
                  onClick={handleVerify}
                  disabled={step === "confirmation" && !agreed}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
                    step === "confirmation" && !agreed
                      ? "bg-slate-600 text-slate-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-red-600 to-rose-600 text-white hover:shadow-lg hover:shadow-red-500/25"
                  }`}
                >
                  {step === "warning" ? "Jeg er over 18" : "Bekræft og fortsæt"}
                </motion.button>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-slate-800/50 px-6 py-3 border-t border-slate-700/50">
              <p className="text-slate-500 text-xs text-center">
                Din aldersbekræftelse gemmes i 30 dage
              </p>
            </div>
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
