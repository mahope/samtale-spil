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
    console.error('Mine spørgsmål route error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-violet-50 to-purple-100 dark:from-slate-900 dark:to-slate-800">
      <div className="text-center space-y-4 max-w-md">
        <div className="text-6xl mb-4">✍️</div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Noget gik galt
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Der opstod en fejl ved indlæsning af dine spørgsmål.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 bg-green-100 dark:bg-green-900/30 rounded-lg p-3">
          ✓ Dine ændringer gemmes automatisk lokalt
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <button
            onClick={reset}
            className="px-6 py-3 bg-violet-500 text-white rounded-xl hover:bg-violet-600 transition-colors font-medium"
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
