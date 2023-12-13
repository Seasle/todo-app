import { type TaskPriority } from '@/shared/types';

export const toPriority = (value: TaskPriority | undefined) => {
  if (value === 'HIGH' || value === 'NORMAL' || value === 'LOW') {
    return value;
  }

  return 'ANY';
};

export const toCompleted = (value: boolean | undefined) => {
  if (value === true) {
    return 'COMPLETED';
  }

  if (value === false) {
    return 'NOT_COMPLETED';
  }

  return 'ANY';
};

export const toOverdue = (value: boolean | undefined) => {
  if (value === true) {
    return 'YES';
  }

  if (value === false) {
    return 'NO';
  }

  return 'ANY';
};

export const fromPriority = (value: string) => {
  if (value === 'HIGH' || value === 'NORMAL' || value === 'LOW') {
    return value;
  }

  return undefined;
};

export const fromCompleted = (value: string) => {
  if (value === 'COMPLETED') {
    return true;
  } else if (value === 'NOT_COMPLETED') {
    return false;
  }

  return undefined;
};

export const fromOverdue = (value: string) => {
  if (value === 'YES') {
    return true;
  } else if (value === 'NO') {
    return false;
  }

  return undefined;
};
