'use client';

import { useEffect } from 'react';
import Link from 'next/link';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log til error tracking service (Sentry etc.) i fremtiden
    console.error('Multiplayer route error:', error);
  }, [error]);

  const handleLeaveGame = () => {
    // Clear any multiplayer state from localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('samtale-spil-room');
    }
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="text-center space-y-4 max-w-md bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
        <div className="text-6xl mb-4">🎮</div>
        <h2 className="text-2xl font-bold text-white">
          Multiplayer-fejl
        </h2>
        <p className="text-white/80">
          Der opstod en fejl i multiplayer-spillet. Forbindelsen kan være blevet afbrudt.
        </p>
        <div className="flex flex-col gap-3 pt-4">
          <button
            onClick={reset}
            className="w-full px-6 py-3 bg-white text-purple-600 rounded-xl hover:bg-white/90 transition-colors font-bold"
          >
            Prøv igen
          </button>
          <button
            onClick={handleLeaveGame}
            className="w-full px-6 py-3 bg-white/20 text-white rounded-xl hover:bg-white/30 transition-colors font-medium border border-white/30"
          >
            Forlad spil
          </button>
          <Link
            href="/"
            className="w-full px-6 py-3 text-white/70 hover:text-white transition-colors text-sm"
          >
            Tilbage til forsiden
          </Link>
        </div>
      </div>
    </div>
  );
}
