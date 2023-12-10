export const isValidDate = (value: Date) => !Number.isNaN(value.getTime());

export const toDate = (value: Date | string) => {
  const parsedValue = typeof value === 'string' ? new Date(value) : value;
  if (isValidDate(parsedValue)) {
    return parsedValue;
  }

  return new Date();
};

export const clamp = (min: number, max: number, value: number) =>
  Math.max(min, Math.min(max, value));
