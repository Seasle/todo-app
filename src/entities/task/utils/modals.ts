import { modals } from '@mantine/modals';
import { type TaskId } from '@/shared/types';

export const openCreateTaskModal = () =>
  modals.openContextModal({
    modal: 'createTask',
    title: 'Создание задачи',
    size: 'xl',
    centered: true,
    innerProps: {},
  });

export const openEditTaskModal = (taskId: TaskId) =>
  modals.openContextModal({
    modal: 'editTask',
    title: 'Редактирование задачи',
    size: 'xl',
    centered: true,
    innerProps: {
      taskId,
    },
  });
