import { describe, it, expect } from 'vitest';
import { categories } from '@/data/categories';

describe('categories data', () => {
  it('has categories defined', () => {
    expect(categories).toBeDefined();
    expect(Array.isArray(categories)).toBe(true);
    expect(categories.length).toBeGreaterThan(0);
  });

  it('each category has required properties', () => {
    categories.forEach((category) => {
      expect(category).toHaveProperty('id');
      expect(category).toHaveProperty('name');
      expect(category).toHaveProperty('description');
      expect(category).toHaveProperty('emoji');
      expect(category).toHaveProperty('color');
      expect(category).toHaveProperty('questions');
      
      expect(typeof category.id).toBe('string');
      expect(typeof category.name).toBe('string');
      expect(typeof category.description).toBe('string');
      expect(typeof category.emoji).toBe('string');
      expect(typeof category.color).toBe('string');
      expect(Array.isArray(category.questions)).toBe(true);
    });
  });

  it('each question has required properties', () => {
    categories.forEach((category) => {
      category.questions.forEach((question) => {
        expect(question).toHaveProperty('id');
        expect(question).toHaveProperty('categoryId');
        expect(question).toHaveProperty('text');
        expect(question).toHaveProperty('depth');
        
        expect(typeof question.id).toBe('string');
        expect(question.categoryId).toBe(category.id);
        expect(typeof question.text).toBe('string');
        expect(['let', 'medium', 'dyb']).toContain(question.depth);
      });
    });
  });

  it('has unique category IDs', () => {
    const ids = categories.map((c) => c.id);
    const uniqueIds = [...new Set(ids)];
    expect(ids.length).toBe(uniqueIds.length);
  });

  it('has unique question IDs across all categories', () => {
    const allQuestionIds = categories.flatMap((c) => 
      c.questions.map((q) => q.id)
    );
    const uniqueIds = [...new Set(allQuestionIds)];
    expect(allQuestionIds.length).toBe(uniqueIds.length);
  });

  it('has at least 10 questions per category', () => {
    categories.forEach((category) => {
      expect(category.questions.length).toBeGreaterThanOrEqual(10);
    });
  });

  it('includes expected category types', () => {
    const categoryIds = categories.map((c) => c.id);
    
    expect(categoryIds).toContain('parforhold');
    expect(categoryIds).toContain('familie');
    expect(categoryIds).toContain('sjove');
    expect(categoryIds).toContain('dybe');
  });

  it('has questions with all depth levels', () => {
    const allDepths = categories.flatMap((c) => 
      c.questions.map((q) => q.depth)
    );
    
    expect(allDepths).toContain('let');
    expect(allDepths).toContain('medium');
    expect(allDepths).toContain('dyb');
  });

  it('has gradient color classes', () => {
    categories.forEach((category) => {
      expect(category.color).toMatch(/^from-.*to-.*/);
    });
  });

  it('calculates total question count correctly', () => {
    const totalQuestions = categories.reduce(
      (sum, category) => sum + category.questions.length,
      0
    );
    
    // Should have a significant number of questions
    expect(totalQuestions).toBeGreaterThan(200);
  });
});
