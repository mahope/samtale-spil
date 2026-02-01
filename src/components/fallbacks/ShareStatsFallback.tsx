"use client";

import { motion } from "framer-motion";

interface ShareStatsFallbackProps {
  onClose?: () => void;
}

export function ShareStatsFallback({ onClose }: ShareStatsFallbackProps) {
  const handleCopyText = async () => {
    const fallbackText = `🎴 Mine Samtalekort-statistikker
    
Jeg bruger Samtalekort til at have gode samtaler!

Prøv det selv: ${typeof window !== "undefined" ? window.location.origin : "samtalekort.dk"}`;

    try {
      await navigator.clipboard.writeText(fallbackText);
      alert("Tekst kopieret til udklipsholder!");
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = fallbackText;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      alert("Tekst kopieret til udklipsholder!");
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl max-w-md w-full p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
          📊 Del statistikker
        </h2>
        {onClose && (
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      <div className="text-center py-6">
        <div className="text-5xl mb-4">⚠️</div>
        <p className="text-slate-600 dark:text-slate-300 mb-2">
          Kunne ikke generere statistik-billede
        </p>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
          Du kan stadig dele dine fremskridt som tekst
        </p>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleCopyText}
          className="w-full flex items-center justify-center gap-3 p-4 bg-blue-500 hover:bg-blue-600 text-white rounded-2xl font-semibold transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
          </svg>
          Kopiér tekst i stedet
        </motion.button>
      </div>
    </div>
  );
}
