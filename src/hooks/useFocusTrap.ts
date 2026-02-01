"use client";

import { useEffect, useRef, useCallback } from "react";

const FOCUSABLE_ELEMENTS = [
  'button:not([disabled])',
  'a[href]',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

interface UseFocusTrapOptions {
  /** Whether the focus trap is active */
  isActive: boolean;
  /** Callback when Escape key is pressed */
  onEscape?: () => void;
  /** Whether to restore focus to the previously focused element on deactivation */
  restoreFocus?: boolean;
}

/**
 * Hook to trap focus within a container element.
 * Ensures keyboard navigation stays within the modal/overlay.
 * 
 * @example
 * ```tsx
 * const containerRef = useFocusTrap({
 *   isActive: isOpen,
 *   onEscape: handleClose,
 * });
 * 
 * return <div ref={containerRef}>...</div>
 * ```
 */
export function useFocusTrap<T extends HTMLElement = HTMLDivElement>({
  isActive,
  onEscape,
  restoreFocus = true,
}: UseFocusTrapOptions) {
  const containerRef = useRef<T>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  // Get all focusable elements within the container
  const getFocusableElements = useCallback(() => {
    if (!containerRef.current) return [];
    return Array.from(
      containerRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_ELEMENTS)
    ).filter(el => el.offsetParent !== null); // Filter out hidden elements
  }, []);

  // Focus the first focusable element
  const focusFirstElement = useCallback(() => {
    const focusableElements = getFocusableElements();
    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    }
  }, [getFocusableElements]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!isActive) return;

    // Handle Escape key
    if (event.key === 'Escape' && onEscape) {
      event.preventDefault();
      event.stopPropagation();
      onEscape();
      return;
    }

    // Handle Tab key for focus trapping
    if (event.key !== 'Tab') return;

    const focusableElements = getFocusableElements();
    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // Shift + Tab: go to last element if on first
    if (event.shiftKey) {
      if (document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }
    } else {
      // Tab: go to first element if on last
      if (document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  }, [isActive, onEscape, getFocusableElements]);

  // Set up focus trap
  useEffect(() => {
    if (isActive) {
      // Store currently focused element
      previouslyFocusedRef.current = document.activeElement as HTMLElement;
      
      // Focus first element after a short delay (for animations)
      const focusTimeout = setTimeout(() => {
        focusFirstElement();
      }, 50);

      // Add keyboard listener
      document.addEventListener('keydown', handleKeyDown);

      return () => {
        clearTimeout(focusTimeout);
        document.removeEventListener('keydown', handleKeyDown);
      };
    } else if (restoreFocus && previouslyFocusedRef.current) {
      // Restore focus when deactivated
      previouslyFocusedRef.current.focus();
      previouslyFocusedRef.current = null;
    }
  }, [isActive, handleKeyDown, focusFirstElement, restoreFocus]);

  return containerRef;
}
