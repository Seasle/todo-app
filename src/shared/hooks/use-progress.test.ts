import { describe, expect, test, beforeAll, afterAll, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useProgress } from './use-progress';

const start = '2024-01-01T00:00:00Z';
const end = '2024-01-01T12:00:00Z';

describe('useProgress', () => {
  beforeAll(() => {
    vi.useFakeTimers();
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  test('checks progress calculation 1', () => {
    vi.setSystemTime('2024-01-01T00:00:00Z');

    const { result } = renderHook(() => useProgress(start, end, 1, false));

    expect(result.current).toBe(0);
  });

  test('checks progress calculation 2', () => {
    vi.setSystemTime('2024-01-01T06:00:00Z');

    const { result } = renderHook(() => useProgress(start, end, 1, false));

    expect(result.current).toBe(0.5);
  });

  test('checks progress calculation 3', () => {
    vi.setSystemTime('2024-01-01T12:00:00Z');

    const { result } = renderHook(() => useProgress(start, end, 1, false));

    expect(result.current).toBe(1);
  });

  test('checks progress calculation 4', () => {
    vi.setSystemTime('2024-01-01T18:00:00Z');

    const { result } = renderHook(() => useProgress(start, end, 1, false));

    expect(result.current).toBe(1);
  });

  test('checks that progress is calculated correctly using a timer', () => {
    vi.setSystemTime('2024-01-01T00:00:00Z');

    const { result, rerender } = renderHook(() => useProgress(start, end));

    for (let index = 0; index <= 12; index++) {
      rerender();
      expect(result.current).toBe(index / 12);

      vi.advanceTimersByTime(60 * 60 * 1000);
    }
  });
});
