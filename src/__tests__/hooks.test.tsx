import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { 
  useLocalStorage, 
  useFavorites, 
  useTimerSettings,
  useDifficultyFilter,
  useProgress 
} from '@/hooks/useLocalStorage';

describe('useLocalStorage hook', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns initial value when localStorage is empty', () => {
    const { result } = renderHook(() => 
      useLocalStorage('test-key', 'initial')
    );

    expect(result.current[0]).toBe('initial');
  });

  it('reads existing value from localStorage', () => {
    localStorage.setItem('test-key', JSON.stringify('stored-value'));

    const { result } = renderHook(() => 
      useLocalStorage('test-key', 'initial')
    );

    // Wait for effect to run
    expect(result.current[0]).toBe('stored-value');
  });

  it('updates localStorage when setValue is called', () => {
    const { result } = renderHook(() => 
      useLocalStorage('test-key', 'initial')
    );

    act(() => {
      result.current[1]('new-value');
    });

    expect(result.current[0]).toBe('new-value');
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'test-key',
      JSON.stringify('new-value')
    );
  });

  it('supports function updates', () => {
    const { result } = renderHook(() => 
      useLocalStorage('test-key', 0)
    );

    act(() => {
      result.current[1]((prev) => prev + 1);
    });

    expect(result.current[0]).toBe(1);
  });
});

describe('useFavorites hook', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('starts with empty favorites', () => {
    const { result } = renderHook(() => useFavorites());
    expect(result.current.favorites).toEqual([]);
  });

  it('adds a favorite', () => {
    const { result } = renderHook(() => useFavorites());

    act(() => {
      result.current.addFavorite({
        id: 'q1',
        categoryId: 'test',
        text: 'Test question',
        depth: 'let',
      });
    });

    expect(result.current.favorites).toHaveLength(1);
    expect(result.current.favorites[0].id).toBe('q1');
  });

  it('removes a favorite', () => {
    const { result } = renderHook(() => useFavorites());

    act(() => {
      result.current.addFavorite({
        id: 'q1',
        categoryId: 'test',
        text: 'Test question',
        depth: 'let',
      });
    });

    act(() => {
      result.current.removeFavorite('q1');
    });

    expect(result.current.favorites).toHaveLength(0);
  });

  it('toggles favorite correctly', () => {
    const { result } = renderHook(() => useFavorites());
    const question = {
      id: 'q1',
      categoryId: 'test',
      text: 'Test question',
      depth: 'let' as const,
    };

    // Add favorite
    act(() => {
      result.current.toggleFavorite(question);
    });
    expect(result.current.isFavorite('q1')).toBe(true);

    // Remove favorite
    act(() => {
      result.current.toggleFavorite(question);
    });
    expect(result.current.isFavorite('q1')).toBe(false);
  });

  it('does not add duplicate favorites', () => {
    const { result } = renderHook(() => useFavorites());
    const question = {
      id: 'q1',
      categoryId: 'test',
      text: 'Test question',
      depth: 'let' as const,
    };

    act(() => {
      result.current.addFavorite(question);
      result.current.addFavorite(question);
    });

    expect(result.current.favorites).toHaveLength(1);
  });
});

describe('useTimerSettings hook', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('has default settings', () => {
    const { result } = renderHook(() => useTimerSettings());

    expect(result.current.settings).toEqual({
      enabled: false,
      duration: 60,
      soundEnabled: true,
      vibrationEnabled: true,
    });
  });

  it('toggles timer enabled', () => {
    const { result } = renderHook(() => useTimerSettings());

    act(() => {
      result.current.toggleTimer();
    });

    expect(result.current.settings.enabled).toBe(true);
  });

  it('sets duration', () => {
    const { result } = renderHook(() => useTimerSettings());

    act(() => {
      result.current.setDuration(90);
    });

    expect(result.current.settings.duration).toBe(90);
  });

  it('toggles sound', () => {
    const { result } = renderHook(() => useTimerSettings());

    act(() => {
      result.current.toggleSound();
    });

    expect(result.current.settings.soundEnabled).toBe(false);
  });
});

describe('useDifficultyFilter hook', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('starts with "alle" filter', () => {
    const { result } = renderHook(() => useDifficultyFilter());
    expect(result.current.filter).toBe('alle');
  });

  it('sets filter to specific level', () => {
    const { result } = renderHook(() => useDifficultyFilter());

    act(() => {
      result.current.setFilter('dyb');
    });

    expect(result.current.filter).toBe('dyb');
  });
});

describe('useProgress hook', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('starts with empty progress', () => {
    const { result } = renderHook(() => useProgress());
    expect(result.current.progress).toEqual({});
  });

  it('marks question as answered', () => {
    const { result } = renderHook(() => useProgress());

    act(() => {
      result.current.markAnswered('parforhold', 'par-1');
    });

    const progress = result.current.getCategoryProgress('parforhold');
    expect(progress.answeredIds).toContain('par-1');
  });

  it('does not add duplicate answered questions', () => {
    const { result } = renderHook(() => useProgress());

    act(() => {
      result.current.markAnswered('parforhold', 'par-1');
      result.current.markAnswered('parforhold', 'par-1');
    });

    const progress = result.current.getCategoryProgress('parforhold');
    expect(progress.answeredIds.filter((id) => id === 'par-1')).toHaveLength(1);
  });

  it('resets category progress', () => {
    const { result } = renderHook(() => useProgress());

    act(() => {
      result.current.markAnswered('parforhold', 'par-1');
      result.current.markAnswered('parforhold', 'par-2');
    });

    act(() => {
      result.current.resetCategory('parforhold');
    });

    const progress = result.current.getCategoryProgress('parforhold');
    expect(progress.answeredIds).toEqual([]);
  });

  it('resets all progress', () => {
    const { result } = renderHook(() => useProgress());

    act(() => {
      result.current.markAnswered('parforhold', 'par-1');
      result.current.markAnswered('familie', 'fam-1');
    });

    act(() => {
      result.current.resetAll();
    });

    expect(result.current.progress).toEqual({});
  });
});
