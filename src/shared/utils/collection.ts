export const getKeys = <T extends object>(entry: T) =>
  Object.keys(entry) as (keyof T)[];

export const nonNullable = <T extends object>(entry: T): T =>
  getKeys(entry).reduce<T>((acc, key) => {
    const value = entry[key];
    if (value !== null && value !== undefined) {
      acc[key] = value;
    }

    return acc;
  }, {} as T);
