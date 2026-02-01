"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useSocialShare } from "@/hooks/useSocialShare";

interface ShareStatsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ShareStatsModal({ isOpen, onClose }: ShareStatsModalProps) {
  const {
    shareProgress,
    shareStatsImage,
    generateStatsImage,
    calculateStats,
    isGeneratingImage
  } = useSocialShare();
  
  const [shareResult, setShareResult] = useState<string | null>(null);
  const [isSharing, setIsSharing] = useState(false);

  const stats = calculateStats();

  const handleShareText = async () => {
    setIsSharing(true);
    try {
      const result = await shareProgress();
      if (result.success) {
        setShareResult(result.method === "native" ? "Delt!" : "Kopieret til udklipsholder!");
      } else {
        setShareResult("Der opstod en fejl ved deling");
      }
    } catch (error) {
      setShareResult("Der opstod en fejl ved deling");
    }
    setIsSharing(false);
  };

  const handleShareImage = async () => {
    setIsSharing(true);
    try {
      const result = await shareStatsImage();
      if (result.success) {
        if (result.method === "native") {
          setShareResult("Billede delt!");
        } else if (result.method === "download") {
          setShareResult("Billede downloadet!");
        }
      } else {
        setShareResult("Der opstod en fejl ved deling af billede");
      }
    } catch (error) {
      setShareResult("Der opstod en fejl ved deling af billede");
    }
    setIsSharing(false);
  };

  const handlePreviewImage = async () => {
    const imageUrl = await generateStatsImage();
    if (imageUrl) {
      const newWindow = window.open();
      if (newWindow) {
        newWindow.document.write(`
          <html>
            <head><title>Mine Samtalekort-statistikker</title></head>
            <body style="margin:0;padding:20px;background:#f3f4f6;display:flex;justify-content:center;align-items:center;">
              <img src="${imageUrl}" style="max-width:100%;height:auto;border-radius:12px;box-shadow:0 20px 25px -5px rgba(0,0,0,0.1);" />
            </body>
          </html>
        `);
        // Clean up the URL after a delay
        setTimeout(() => URL.revokeObjectURL(imageUrl), 1000);
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
                  📊 Del dine statistikker
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Stats Preview */}
              <div className="bg-gradient-to-r from-violet-500 to-purple-600 rounded-2xl p-6 mb-6 text-white">
                <h3 className="text-lg font-semibold mb-4">🎴 Dine fremskridt</h3>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{stats.answeredQuestions}</div>
                    <div className="text-sm opacity-80">Spørgsmål besvaret</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{stats.completedCategories}</div>
                    <div className="text-sm opacity-80">Kategorier fuldført</div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span>Samlet fremskridt</span>
                  <span className="font-semibold">{stats.completionPercentage}%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2 mt-2">
                  <motion.div
                    className="bg-white rounded-full h-2"
                    initial={{ width: 0 }}
                    animate={{ width: `${stats.completionPercentage}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </div>
                
                {stats.favoritesCount > 0 && (
                  <div className="mt-3 text-sm opacity-90">
                    ❤️ {stats.favoritesCount} favoritspørgsmål gemt
                  </div>
                )}
                
                {stats.favoriteCategory && (
                  <div className="mt-2 text-sm opacity-90">
                    🏆 Favorit: {stats.favoriteCategory}
                  </div>
                )}
              </div>

              {/* Share Options */}
              <div className="space-y-3">
                {/* Share as Text */}
                <motion.button
                  onClick={handleShareText}
                  disabled={isSharing}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-3 p-4 bg-blue-500 hover:bg-blue-600 text-white rounded-2xl font-semibold transition-colors disabled:opacity-50"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.959 8.959 0 01-4.906-1.476L3 21l2.524-5.906A8.959 8.959 0 013 12c0-4.418 3.582-8 8-8s8 3.582 8 8z" />
                  </svg>
                  {isSharing ? "Deler..." : "Del som tekst"}
                </motion.button>

                {/* Share as Image */}
                <motion.button
                  onClick={handleShareImage}
                  disabled={isSharing || isGeneratingImage}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-3 p-4 bg-purple-500 hover:bg-purple-600 text-white rounded-2xl font-semibold transition-colors disabled:opacity-50"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {isGeneratingImage ? "Genererer billede..." : isSharing ? "Deler..." : "Del som billede"}
                </motion.button>

                {/* Preview Image */}
                <motion.button
                  onClick={handlePreviewImage}
                  disabled={isGeneratingImage}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-3 p-4 bg-slate-500 hover:bg-slate-600 text-white rounded-2xl font-semibold transition-colors disabled:opacity-50"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  {isGeneratingImage ? "Forbereder..." : "Se forhåndsvisning"}
                </motion.button>
              </div>

              {/* Share Result */}
              <AnimatePresence>
                {shareResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`mt-4 p-3 rounded-xl text-center font-medium ${
                      shareResult.includes("fejl") 
                        ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                        : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                    }`}
                  >
                    {shareResult}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Help Text */}
              <p className="mt-6 text-sm text-slate-500 dark:text-slate-400 text-center">
                Del dine fremskridt med venner og familie! 💫
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}