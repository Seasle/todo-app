import { describe, expect, test } from 'vitest';
import { humanizedDate } from './ui';

describe('humanizedDate', () => {
  test('valid format for date string', () => {
    const value = '2012-12-31T00:00:00Z';

    expect(humanizedDate(value)).toBe('31.12.2012');
  });

  test('valid format for date value', () => {
    const value = new Date(2016, 0, 1);

    expect(humanizedDate(value)).toBe('01.01.2016');
  });
});
