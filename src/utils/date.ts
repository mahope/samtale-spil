/**
 * Date utility functions for consistent date handling across the app.
 * Uses YYYY-MM-DD format (ISO date string without time) as the standard
 * for localStorage keys and date comparisons.
 */

/**
 * Returns YYYY-MM-DD string for a date.
 * @param date - Date to convert (defaults to current date)
 * @returns Date string in YYYY-MM-DD format
 */
export function toDateKey(date: Date = new Date()): string {
  return date.toISOString().split("T")[0];
}

/**
 * Returns today's date as a YYYY-MM-DD string.
 * Shorthand for toDateKey(new Date()).
 */
export function getTodayKey(): string {
  return toDateKey(new Date());
}

/**
 * Calculates the number of days between two date strings.
 * @param date1 - First date string (YYYY-MM-DD)
 * @param date2 - Second date string (YYYY-MM-DD)
 * @returns Number of days difference (always positive)
 */
export function getDaysDifference(date1: string, date2: string): number {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffTime = Math.abs(d2.getTime() - d1.getTime());
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Checks if a date string is today.
 * @param dateKey - Date string in YYYY-MM-DD format
 */
export function isToday(dateKey: string): boolean {
  return dateKey === getTodayKey();
}

/**
 * Checks if a date string is yesterday.
 * @param dateKey - Date string in YYYY-MM-DD format
 */
export function isYesterday(dateKey: string): boolean {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  return dateKey === toDateKey(yesterday);
}
