import { describe, expect, test } from 'vitest';
import { getKeys } from './collection';

describe('getKeys', () => {
  const data = {
    name: 'John',
    email: 'john@email.domain',
    age: 25,
    isSubsriber: true,
  };

  test('keys of object to equal true', () => {
    expect(getKeys(data)).toStrictEqual([
      'name',
      'email',
      'age',
      'isSubsriber',
    ] as const);
  });

  test('keys of object to equal false', () => {
    expect(getKeys(data)).not.toStrictEqual([] as const);
  });
});
