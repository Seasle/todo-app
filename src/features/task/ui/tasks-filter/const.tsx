import {
  IconAsterisk,
  IconProgress,
  IconCheck,
  IconInfinity,
} from '@tabler/icons-react';
import {
  TaskPriorityIcon,
  TaskOverdueIcon,
  TaskNonOverdueIcon,
} from '@/entities/task';
import {
  type PriorityFilterValue,
  type CompletedFilterValue,
  type OverdueFilterValue,
} from './types';

export const priorityValues: PriorityFilterValue[] = [
  { value: 'ANY', icon: <IconAsterisk />, label: 'Любой приоритет' },
  {
    value: 'HIGH',
    icon: <TaskPriorityIcon variant="HIGH" />,
    label: 'Высокий приоритет',
  },
  {
    value: 'NORMAL',
    icon: <TaskPriorityIcon variant="NORMAL" />,
    label: 'Обычный приоритет',
  },
  {
    value: 'LOW',
    icon: <TaskPriorityIcon variant="LOW" />,
    label: 'Низкий приоритет',
  },
];

export const completedValues: CompletedFilterValue[] = [
  { value: 'ANY', icon: <IconAsterisk />, label: 'Любые задачи' },
  {
    value: 'NOT_COMPLETED',
    icon: <IconProgress />,
    label: 'Незавершенные задачи',
  },
  { value: 'COMPLETED', icon: <IconCheck />, label: 'Завершенные задачи' },
];

export const overdueValues: OverdueFilterValue[] = [
  { value: 'ANY', icon: <IconAsterisk />, label: 'Любые задачи' },
  { value: 'UNKNOWN', icon: <IconInfinity />, label: 'Задачи без срока' },
  {
    value: 'YES',
    icon: <TaskOverdueIcon />,
    label: 'Просроченные задачи',
  },
  { value: 'NO', icon: <TaskNonOverdueIcon />, label: 'Непросроченные задачи' },
];
