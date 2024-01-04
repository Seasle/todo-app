import { describe, expect, test, beforeAll, afterAll, vi } from 'vitest';
import {
  isValidDate,
  toDate,
  tryParseInt,
  customCompareIf,
  compareIf,
  excludeKey,
} from './data';

const random = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const pick = <T>(collection: T[]) =>
  collection[Math.floor(Math.random() * collection.length)];

describe('isValidDate', () => {
  test('valid date to equal true', () => {
    expect(isValidDate(new Date())).toBe(true);
  });

  test('invalid date to equal false', () => {
    expect(isValidDate(new Date('Invalid date string'))).toBe(false);
  });
});

describe('toDate', () => {
  beforeAll(() => {
    vi.useFakeTimers();
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  test('parse valid date string to equal valid date', () => {
    const dateString = '2010-01-01T13:30:00';
    const dateValue = new Date(2010, 0, 1, 13, 30, 0);

    expect(toDate(dateString)).toStrictEqual(dateValue);
  });

  test('parse valid date to equal valid date', () => {
    const dateValue = new Date('2010-01-01T13:30:00');

    expect(toDate(dateValue)).toStrictEqual(dateValue);
  });

  test('parse invalid date string to equal current date', () => {
    vi.setSystemTime('2024-01-01T00:00:00Z');

    const dateString = 'Invalid date string';
    const dateValue = new Date();

    expect(toDate(dateString)).toStrictEqual(dateValue);
  });
});

describe('tryParseInt', () => {
  test('parse number', () => {
    const value = random(-1e5, 1e5);

    expect(tryParseInt(value)).toBe(value);
  });

  test('parse stringified number', () => {
    const value = random(-1e5, 1e5);

    expect(tryParseInt(value.toString())).toBe(value);
  });

  test('parse broken string to equal default value', () => {
    const defaultValue = random(-1e5, 1e5);

    expect(tryParseInt('', defaultValue)).toBe(defaultValue);
  });

  test('parse null to equal default value', () => {
    expect(tryParseInt(null)).toBe(0);
  });

  test('parse NaN to equal passed default value', () => {
    const defaultValue = random(-1e5, 1e5);

    expect(tryParseInt(NaN, defaultValue)).toBe(defaultValue);
  });

  test('parse null to equal passed default value', () => {
    const defaultValue = random(-1e5, 1e5);

    expect(tryParseInt(null, defaultValue)).toBe(defaultValue);
  });

  test('parse undefined to equal passed default value', () => {
    const defaultValue = random(-1e5, 1e5);

    expect(tryParseInt(undefined, defaultValue)).toBe(defaultValue);
  });
});

describe('customCompareIf', () => {
  test('compare the occurrence of a value in an array to equal true', () => {
    const data = new Array(100).fill(null).map(() => random(-1e5, 1e5));
    const value = pick(data);

    expect(
      customCompareIf(data, value, (entries, entry) => entries.includes(entry)),
    ).toBe(true);
  });

  test('compare the occurrence of a value in an array to equal false', () => {
    const data = new Array(100).fill(null).map(() => random(-1e5, 1e5));
    const value = 2e5;

    expect(
      customCompareIf(data, value, (entries, entry) => entries.includes(entry)),
    ).toBe(false);
  });

  test('should return true if the value is undefined', () => {
    const data = new Array(100).fill(null).map(() => random(-1e5, 1e5));
    const value = data.at(100);

    expect(
      customCompareIf(data, value, (entries, entry) => entries.includes(entry)),
    ).toBe(true);
  });
});

describe('compareIf', () => {
  const data = {
    name: 'John',
    email: 'john@email.domain',
    age: 25,
    isSubsriber: true,
  };

  test('strictly compare string values to equal true', () => {
    expect(compareIf(data.name, 'John')).toBe(true);
  });

  test('strictly compare string values to equal false', () => {
    expect(compareIf(data.email, 'emily@email.com')).toBe(false);
  });

  test('strictly compare number values to equal true', () => {
    expect(compareIf(data.age, 25)).toBe(true);
  });

  test('strictly compare boolean values to equal false', () => {
    expect(compareIf(data.isSubsriber, false)).toBe(false);
  });

  test('should return true if the value is undefined', () => {
    expect(compareIf(data.age, undefined)).toBe(true);
  });
});

describe('excludeKey', () => {
  const data = {
    name: 'John',
    email: 'john@email.domain',
    age: 25,
    isSubsriber: true,
  };

  test('compare objects after deleting an existing key to equal true', () => {
    const copy: Partial<typeof data> = structuredClone(data);
    delete copy.age;

    expect(excludeKey(data, 'age')).toStrictEqual(copy);
  });

  test('check if the original object remains unchanged after deleting an existing key', () => {
    excludeKey(data, 'isSubsriber');

    expect(data).toStrictEqual(data);
  });
});
