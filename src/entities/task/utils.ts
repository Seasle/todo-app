export const compareText = (
  value: string | undefined,
  needle: string | undefined,
) => {
  if (value === undefined || needle === undefined) {
    return false;
  }

  if (needle.length === 0) {
    return true;
  }

  return value.toLowerCase().includes(needle.trim().toLowerCase());
};

export const compareExpiresIn = (
  value: string | undefined,
  isOverdue: boolean,
) => {
  if (value === undefined) {
    return false;
  }

  if (isOverdue) {
    return Date.parse(value) < Date.now();
  } else {
    return Date.parse(value) >= Date.now();
  }
};
