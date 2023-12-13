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
