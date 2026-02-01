/**
 * Performance utilities for the Samtale-Spil app
 */

// Debounce function for expensive operations
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return function (...args: Parameters<T>) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func(...args);
    }, wait);
  };
}

// Throttle function for scroll/resize handlers
export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false;

  return function (...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

// Preload critical resources
export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
}

// Prefetch a route for faster navigation
export function prefetchRoute(href: string): void {
  if (typeof window === 'undefined') return;
  
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = href;
  document.head.appendChild(link);
}

// Check if user prefers reduced motion
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Measure component render time (development only)
export function measureRenderTime(componentName: string): () => void {
  if (process.env.NODE_ENV !== 'development') {
    return () => {};
  }

  const start = performance.now();
  return () => {
    const end = performance.now();
    console.debug(`[Performance] ${componentName} rendered in ${(end - start).toFixed(2)}ms`);
  };
}

// Request idle callback polyfill
export function requestIdleCallback(
  callback: IdleRequestCallback,
  options?: IdleRequestOptions
): number {
  if (typeof window === 'undefined') {
    return 0;
  }
  
  if ('requestIdleCallback' in window) {
    return window.requestIdleCallback(callback, options);
  }
  
  // Fallback for Safari
  return setTimeout(() => {
    callback({
      didTimeout: false,
      timeRemaining: () => 50,
    });
  }, 1) as unknown as number;
}

// Cancel idle callback polyfill
export function cancelIdleCallback(handle: number): void {
  if (typeof window === 'undefined') return;
  
  if ('cancelIdleCallback' in window) {
    window.cancelIdleCallback(handle);
  } else {
    clearTimeout(handle);
  }
}

// Defer non-critical work
export function deferWork(callback: () => void): void {
  requestIdleCallback(() => callback(), { timeout: 2000 });
}

// Check if the device is low-end (for reduced animations)
export function isLowEndDevice(): boolean {
  if (typeof window === 'undefined') return false;
  
  // Check for hardware concurrency (number of CPU cores)
  const cores = navigator.hardwareConcurrency || 4;
  
  // Check for device memory (in GB, if available)
  const memory = (navigator as { deviceMemory?: number }).deviceMemory || 4;
  
  // Consider it low-end if fewer than 4 cores or less than 4GB memory
  return cores < 4 || memory < 4;
}

// Create a stable object reference for React comparisons
export function stableObject<T extends object>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}
