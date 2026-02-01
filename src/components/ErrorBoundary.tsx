"use client";

import { Component, type ReactNode } from "react";
import { motion } from "framer-motion";

interface Props {
  children: ReactNode;
  /** Custom fallback component */
  fallback?: ReactNode;
  /** Callback when error occurs */
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  /** Reset key - changing this will reset the error boundary */
  resetKey?: string | number;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Reusable error boundary component for catching errors in child components.
 * Can be used to wrap specific sections of the UI.
 * 
 * @example
 * ```tsx
 * <ErrorBoundary fallback={<p>Something went wrong</p>}>
 *   <RiskyComponent />
 * </ErrorBoundary>
 * ```
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  componentDidUpdate(prevProps: Props) {
    // Reset error state when resetKey changes
    if (prevProps.resetKey !== this.props.resetKey && this.state.hasError) {
      this.setState({ hasError: false, error: null });
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return <DefaultErrorFallback error={this.state.error} onReset={this.handleReset} />;
    }

    return this.props.children;
  }
}

interface DefaultErrorFallbackProps {
  error: Error | null;
  onReset: () => void;
}

/**
 * Default fallback UI shown when an error is caught.
 * Can be overridden by passing a custom fallback prop.
 */
function DefaultErrorFallback({ error, onReset }: DefaultErrorFallbackProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full p-4 sm:p-6 rounded-xl bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-950/30 dark:to-rose-950/30 border border-red-200 dark:border-red-800"
      role="alert"
    >
      <div className="flex flex-col sm:flex-row items-start gap-3">
        {/* Icon */}
        <motion.span
          initial={{ rotate: -10 }}
          animate={{ rotate: [0, -5, 5, 0] }}
          transition={{ duration: 0.5 }}
          className="text-3xl"
          aria-hidden="true"
        >
          ⚠️
        </motion.span>

        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-1">
            Noget gik galt
          </h3>
          <p className="text-sm text-red-600 dark:text-red-300 mb-3">
            Der opstod en fejl. Prøv at indlæse igen.
          </p>

          {/* Error message in dev mode */}
          {process.env.NODE_ENV === "development" && error && (
            <pre className="p-2 mb-3 text-xs bg-red-100 dark:bg-red-900/40 rounded overflow-x-auto text-red-700 dark:text-red-300">
              {error.message}
            </pre>
          )}

          {/* Reset button */}
          <motion.button
            type="button"
            onClick={onReset}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-medium transition-colors focus:ring-4 focus:ring-red-300 dark:focus:ring-red-800"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Prøv igen
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

/**
 * Inline error message component for smaller error displays.
 * Useful for form errors or minor failures.
 */
export function InlineError({ 
  message, 
  onRetry 
}: { 
  message: string; 
  onRetry?: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 text-sm"
      role="alert"
    >
      <span aria-hidden="true">⚠️</span>
      <span className="flex-1">{message}</span>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="text-red-700 dark:text-red-300 hover:underline font-medium"
        >
          Prøv igen
        </button>
      )}
    </motion.div>
  );
}

/**
 * Async error boundary wrapper for Suspense-compatible error handling.
 * Use this in async components that might throw.
 */
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: ReactNode
) {
  return function WrappedComponent(props: P) {
    return (
      <ErrorBoundary fallback={fallback}>
        <Component {...props} />
      </ErrorBoundary>
    );
  };
}
