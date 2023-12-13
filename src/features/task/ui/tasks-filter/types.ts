import { type JSX } from 'react';
import { type TaskPriority } from '@/shared/types';

export interface FilterValue<Value> {
  value: Value;
  icon: JSX.Element | null;
  label: string;
}

export type PriorityFilterValue = FilterValue<TaskPriority | 'ANY'>;

export type CompletedFilterValue = FilterValue<
  'NOT_COMPLETED' | 'COMPLETED' | 'ANY'
>;

export type OverdueFilterValue = FilterValue<'YES' | 'NO' | 'ANY'>;
