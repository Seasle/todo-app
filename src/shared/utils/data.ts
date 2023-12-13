export const isValidDate = (value: Date) => !Number.isNaN(value.getTime());

export const toDate = (value: Date | string) => {
  const parsedValue = typeof value === 'string' ? new Date(value) : value;
  if (isValidDate(parsedValue)) {
    return parsedValue;
  }

  return new Date();
};

export const customCompareIf = <V, N>(
  value: V,
  needle: N | undefined,
  comparator: (value: V, needle: N) => boolean,
) => {
  if (needle === undefined) {
    return true;
  }

  return comparator(value, needle);
};

export const compareIf = <T>(value: T, needle: T | undefined) => {
  return customCompareIf(value, needle, (value, needle) => value === needle);
};

export const clamp = (min: number, max: number, value: number) =>
  Math.max(min, Math.min(max, value));
