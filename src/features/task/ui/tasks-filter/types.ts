import { type ChoiceValue, type TaskPriority } from '@/shared/types';

export type PriorityFilterValue = ChoiceValue<TaskPriority | 'ANY'>;

export type CompletedFilterValue = ChoiceValue<
  'NOT_COMPLETED' | 'COMPLETED' | 'ANY'
>;

export type OverdueFilterValue = ChoiceValue<'YES' | 'NO' | 'UNKNOWN' | 'ANY'>;
