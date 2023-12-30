import { type SpotlightActionData } from '@mantine/spotlight';
import { taskQueryModel, openCreateTaskModal } from '@/entities/task';

export const actions: SpotlightActionData[] = [
  {
    id: 'create-task',
    label: 'Создать задачу',
    description: 'Нам нужна новая задача - создадим её',
    keywords: ['task', 'create', 'new'],
    onClick: () => openCreateTaskModal(),
  },
  {
    id: 'any-priority',
    label: 'Любой приоритет',
    description: 'Искать задачи с любым приоритетом',
    keywords: ['any', 'priority'],
    onClick: () =>
      taskQueryModel.events.setQueryConfig({ priority: undefined }),
  },
  {
    id: 'high-priority',
    label: 'Высокий приоритет',
    description: 'Искать задачи с высоким приоритетом',
    keywords: ['high', 'priority'],
    onClick: () => taskQueryModel.events.setQueryConfig({ priority: 'HIGH' }),
  },
  {
    id: 'normal-priority',
    label: 'Обычный приоритет',
    description: 'Искать задачи с обычным приоритетом',
    keywords: ['normal', 'priority'],
    onClick: () => taskQueryModel.events.setQueryConfig({ priority: 'NORMAL' }),
  },
  {
    id: 'low-priority',
    label: 'Низкий приоритет',
    description: 'Искать задачи с низким приоритетом',
    keywords: ['low', 'priority'],
    onClick: () => taskQueryModel.events.setQueryConfig({ priority: 'LOW' }),
  },
  {
    id: 'any-status-tasks',
    label: 'Любые задачи',
    description: 'Искать завершенные и незавершенные задачи',
    keywords: ['any', 'task'],
    onClick: () =>
      taskQueryModel.events.setQueryConfig({ isCompleted: undefined }),
  },
  {
    id: 'non-completed-tasks',
    label: 'Незавершенные задачи',
    description: 'Искать незавершенные задачи',
    keywords: ['not completed', 'task'],
    onClick: () => taskQueryModel.events.setQueryConfig({ isCompleted: false }),
  },
  {
    id: 'completed-tasks',
    label: 'Завершенные задачи',
    description: 'Искать завершенные задачи',
    keywords: ['completed', 'task'],
    onClick: () => taskQueryModel.events.setQueryConfig({ isCompleted: true }),
  },
  {
    id: 'any-overdue-tasks',
    label: 'Любые задачи',
    description: 'Искать задачи со сроком выполнения и без',
    keywords: ['any', 'overdue', 'deadline', 'task'],
    onClick: () =>
      taskQueryModel.events.setQueryConfig({ isOverdue: undefined }),
  },
  {
    id: 'without-deadline-tasks',
    label: 'Задачи без срока выполнения',
    description: 'Искать задачи без срока выполнения',
    keywords: ['without', 'overdue', 'deadline', 'task'],
    onClick: () => taskQueryModel.events.setQueryConfig({ isOverdue: null }),
  },
  {
    id: 'overdue-tasks',
    label: 'Просроченные задачи',
    description: 'Искать просроченные задачи',
    keywords: ['overdue', 'task'],
    onClick: () => taskQueryModel.events.setQueryConfig({ isOverdue: true }),
  },
  {
    id: 'non-overdue-tasks',
    label: 'Непросроченные задачи',
    description: 'Искать непросроченные задачи',
    keywords: ['not overdue', 'not deadline', 'task'],
    onClick: () => taskQueryModel.events.setQueryConfig({ isOverdue: false }),
  },
  {
    id: 'reset-filter',
    label: 'Сбросить фильтр',
    description: 'Вернёт все значения по умолчанию',
    keywords: ['reset', 'clear'],
    onClick: () => taskQueryModel.events.resetQueryConfig(),
  },
];
