/**
 * Performance utilities for the Samtale-Spil app
 * @module utils/performance
 */

/**
 * Creates a debounced version of a function that delays execution
 * until after the specified wait time has elapsed since the last call.
 * 
 * @template T - The function type
 * @param {T} func - The function to debounce
 * @param {number} wait - The number of milliseconds to delay
 * @returns {(...args: Parameters<T>) => void} The debounced function
 * 
 * @example
 * const debouncedSearch = debounce((query: string) => {
 *   console.log('Searching:', query);
 * }, 300);
 */
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

/**
 * Creates a throttled version of a function that limits execution
 * to once per specified time period.
 * 
 * @template T - The function type
 * @param {T} func - The function to throttle
 * @param {number} limit - The time limit in milliseconds
 * @returns {(...args: Parameters<T>) => void} The throttled function
 * 
 * @example
 * const throttledScroll = throttle(() => {
 *   console.log('Scroll event');
 * }, 100);
 * window.addEventListener('scroll', throttledScroll);
 */
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

/**
 * Preloads an image by creating an Image object and waiting for it to load.
 * Useful for preloading critical images before they're needed.
 * 
 * @param {string} src - The URL of the image to preload
 * @returns {Promise<void>} A promise that resolves when the image is loaded
 * 
 * @example
 * await preloadImage('/hero-image.jpg');
 */
export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
}

/**
 * Prefetches a route by adding a prefetch link to the document head.
 * This hints to the browser to fetch the resource in the background.
 * 
 * @param {string} href - The URL to prefetch
 */
export function prefetchRoute(href: string): void {
  if (typeof window === 'undefined') return;
  
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = href;
  document.head.appendChild(link);
}

/**
 * Checks if the user has requested reduced motion in their system settings.
 * 
 * @returns {boolean} True if reduced motion is preferred
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Measures and logs component render time in development mode.
 * Returns a function to call when rendering is complete.
 * 
 * @param {string} componentName - The name of the component being measured
 * @returns {() => void} A function to call when rendering is complete
 * 
 * @example
 * const endMeasure = measureRenderTime('MyComponent');
 * // ... render logic
 * endMeasure();
 */
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

/**
 * A cross-browser polyfill for requestIdleCallback.
 * Falls back to setTimeout for browsers that don't support it (Safari).
 * 
 * @param {IdleRequestCallback} callback - The callback to execute during idle time
 * @param {IdleRequestOptions} [options] - Optional configuration
 * @returns {number} A handle that can be used to cancel the callback
 */
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
