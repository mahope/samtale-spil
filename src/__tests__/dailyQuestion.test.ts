import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getDailyQuestion, formatDepth, getDepthColor } from '@/utils/dailyQuestion';

describe('dailyQuestion utilities', () => {
  describe('getDailyQuestion', () => {
    beforeEach(() => {
      // Mock Date to ensure deterministic results
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('returns a question and category object', () => {
      vi.setSystemTime(new Date('2026-02-01'));
      const result = getDailyQuestion();
      
      expect(result).toHaveProperty('question');
      expect(result).toHaveProperty('category');
      expect(result.question).toHaveProperty('id');
      expect(result.question).toHaveProperty('text');
      expect(result.question).toHaveProperty('depth');
      expect(result.category).toHaveProperty('name');
      expect(result.category).toHaveProperty('emoji');
    });

    it('returns the same question for the same day', () => {
      vi.setSystemTime(new Date('2026-02-01T10:00:00'));
      const morning = getDailyQuestion();
      
      vi.setSystemTime(new Date('2026-02-01T22:00:00'));
      const evening = getDailyQuestion();
      
      expect(morning.question.id).toBe(evening.question.id);
    });

    it('returns different questions for different days', () => {
      vi.setSystemTime(new Date('2026-02-01'));
      const day1 = getDailyQuestion();
      
      vi.setSystemTime(new Date('2026-02-02'));
      const day2 = getDailyQuestion();
      
      // Due to the hash function, different dates should typically give different questions
      // (though there's a small chance of collision)
      expect(day1.question.id).not.toBe(day2.question.id);
    });

    it('matches question categoryId with category id', () => {
      vi.setSystemTime(new Date('2026-05-15'));
      const result = getDailyQuestion();
      
      expect(result.question.categoryId).toBe(result.category.id);
    });
  });

  describe('formatDepth', () => {
    it('formats "let" to "Let"', () => {
      expect(formatDepth('let')).toBe('Let');
    });

    it('formats "medium" to "Medium"', () => {
      expect(formatDepth('medium')).toBe('Medium');
    });

    it('formats "dyb" to "Dyb"', () => {
      expect(formatDepth('dyb')).toBe('Dyb');
    });
  });

  describe('getDepthColor', () => {
    it('returns green classes for "let"', () => {
      const result = getDepthColor('let');
      expect(result).toContain('green');
    });

    it('returns amber classes for "medium"', () => {
      const result = getDepthColor('medium');
      expect(result).toContain('amber');
    });

    it('returns purple classes for "dyb"', () => {
      const result = getDepthColor('dyb');
      expect(result).toContain('purple');
    });

    it('includes dark mode classes', () => {
      const result = getDepthColor('let');
      expect(result).toContain('dark:');
    });
  });
});
