import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  debounce,
  throttle,
  prefersReducedMotion,
  isLowEndDevice,
  stableObject,
} from '@/utils/performance';

describe('performance utilities', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('debounce', () => {
    it('delays function execution', () => {
      const fn = vi.fn();
      const debouncedFn = debounce(fn, 100);

      debouncedFn();
      expect(fn).not.toHaveBeenCalled();

      vi.advanceTimersByTime(100);
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('resets timer on subsequent calls', () => {
      const fn = vi.fn();
      const debouncedFn = debounce(fn, 100);

      debouncedFn();
      vi.advanceTimersByTime(50);
      debouncedFn(); // Reset timer
      vi.advanceTimersByTime(50);
      
      expect(fn).not.toHaveBeenCalled();

      vi.advanceTimersByTime(50);
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('passes arguments to the debounced function', () => {
      const fn = vi.fn();
      const debouncedFn = debounce(fn, 100);

      debouncedFn('arg1', 'arg2');
      vi.advanceTimersByTime(100);

      expect(fn).toHaveBeenCalledWith('arg1', 'arg2');
    });
  });

  describe('throttle', () => {
    it('executes function immediately on first call', () => {
      const fn = vi.fn();
      const throttledFn = throttle(fn, 100);

      throttledFn();
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('blocks subsequent calls within the limit', () => {
      const fn = vi.fn();
      const throttledFn = throttle(fn, 100);

      throttledFn();
      throttledFn();
      throttledFn();

      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('allows calls after the limit has passed', () => {
      const fn = vi.fn();
      const throttledFn = throttle(fn, 100);

      throttledFn();
      vi.advanceTimersByTime(100);
      throttledFn();

      expect(fn).toHaveBeenCalledTimes(2);
    });

    it('passes arguments to the throttled function', () => {
      const fn = vi.fn();
      const throttledFn = throttle(fn, 100);

      throttledFn('hello', 123);

      expect(fn).toHaveBeenCalledWith('hello', 123);
    });
  });

  describe('prefersReducedMotion', () => {
    it('returns false when matchMedia returns false', () => {
      vi.stubGlobal('matchMedia', vi.fn(() => ({ matches: false })));
      expect(prefersReducedMotion()).toBe(false);
    });

    it('returns true when user prefers reduced motion', () => {
      vi.stubGlobal('matchMedia', vi.fn(() => ({ matches: true })));
      expect(prefersReducedMotion()).toBe(true);
    });
  });

  describe('isLowEndDevice', () => {
    it('returns false for high-end devices', () => {
      Object.defineProperty(navigator, 'hardwareConcurrency', {
        value: 8,
        configurable: true,
      });
      Object.defineProperty(navigator, 'deviceMemory', {
        value: 8,
        configurable: true,
      });
      
      expect(isLowEndDevice()).toBe(false);
    });

    it('returns true for low CPU core count', () => {
      Object.defineProperty(navigator, 'hardwareConcurrency', {
        value: 2,
        configurable: true,
      });
      Object.defineProperty(navigator, 'deviceMemory', {
        value: 8,
        configurable: true,
      });
      
      expect(isLowEndDevice()).toBe(true);
    });

    it('returns true for low memory', () => {
      Object.defineProperty(navigator, 'hardwareConcurrency', {
        value: 8,
        configurable: true,
      });
      Object.defineProperty(navigator, 'deviceMemory', {
        value: 2,
        configurable: true,
      });
      
      expect(isLowEndDevice()).toBe(true);
    });
  });

  describe('stableObject', () => {
    it('creates a deep copy of an object', () => {
      const original = { a: 1, b: { c: 2 } };
      const stable = stableObject(original);

      expect(stable).toEqual(original);
      expect(stable).not.toBe(original);
      expect(stable.b).not.toBe(original.b);
    });

    it('works with arrays', () => {
      const original = [1, 2, { a: 3 }];
      const stable = stableObject(original);

      expect(stable).toEqual(original);
      expect(stable).not.toBe(original);
    });
  });
});
