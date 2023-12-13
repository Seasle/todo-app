import { IconProgress, IconCheck } from '@tabler/icons-react';
import { TaskOverdueIcon, TaskNonOverdueIcon } from '@/entities/task';
import {
  type PriorityFilterValue,
  type CompletedFilterValue,
  type OverdueFilterValue,
} from './types';

export const priorityValues: PriorityFilterValue[] = [
  { value: 'ANY', icon: null, label: 'Любой приоритет' },
  { value: 'HIGH', icon: 'HIGH', label: 'Высокий приоритет' },
  { value: 'NORMAL', icon: 'NORMAL', label: 'Обычный приоритет' },
  { value: 'LOW', icon: 'LOW', label: 'Низкий приоритет' },
];

export const completedValues: CompletedFilterValue[] = [
  { value: 'ANY', icon: null, label: 'Любые задачи' },
  {
    value: 'NOT_COMPLETED',
    icon: <IconProgress />,
    label: 'Незавершенные задачи',
  },
  { value: 'COMPLETED', icon: <IconCheck />, label: 'Завершенные задачи' },
];

export const overdueValues: OverdueFilterValue[] = [
  { value: 'ANY', icon: null, label: 'Любые задачи' },
  {
    value: 'YES',
    icon: <TaskOverdueIcon />,
    label: 'Просроченные задачи',
  },
  { value: 'NO', icon: <TaskNonOverdueIcon />, label: 'Непросроченные задачи' },
];
