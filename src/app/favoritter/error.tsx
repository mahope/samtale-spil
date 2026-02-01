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
    console.error('Favoritter route error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-rose-50 to-pink-100 dark:from-slate-900 dark:to-slate-800">
      <div className="text-center space-y-4 max-w-md">
        <div className="text-6xl mb-4">💔</div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Noget gik galt
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Der opstod en fejl ved indlæsning af dine favoritter. Dine gemte favoritter er ikke gået tabt.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <button
            onClick={reset}
            className="px-6 py-3 bg-rose-500 text-white rounded-xl hover:bg-rose-600 transition-colors font-medium"
          >
            Prøv igen
          </button>
          <Link
            href="/"
            className="px-6 py-3 bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white rounded-xl hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors font-medium"
          >
            Gå til forsiden
          </Link>
        </div>
      </div>
    </div>
  );
}
