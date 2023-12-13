import { type JSX } from 'react';
import { type TaskPriority } from '@/shared/types';

interface FilterValue<Value, Icon> {
  value: Value;
  icon: Icon;
  label: string;
}

export type PriorityFilterValue = FilterValue<
  TaskPriority | 'ANY',
  TaskPriority | null
>;

export type CompletedFilterValue = FilterValue<
  'NOT_COMPLETED' | 'COMPLETED' | 'ANY',
  JSX.Element | null
>;

export type OverdueFilterValue = FilterValue<
  'YES' | 'NO' | 'ANY',
  JSX.Element | null
>;
