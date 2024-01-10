import { TaskPriorityIcon } from '@/entities/task';
import { type PriorityVariantValue } from './types';

export const usePriorityValues = (): PriorityVariantValue[] => [
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
