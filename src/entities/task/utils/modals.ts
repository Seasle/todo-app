import { modals } from '@mantine/modals';

export const openCreateTaskModal = () =>
  modals.openContextModal({
    modal: 'createTask',
    title: 'Создание задачи',
    size: 'xl',
    centered: true,
    innerProps: {},
  });
