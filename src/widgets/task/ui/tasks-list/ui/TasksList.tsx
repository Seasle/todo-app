import { Stack, Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { TasksFilter, FilteredTasks } from '@/features/task';
import { openCreateTaskModal } from '@/entities/task';

export const TasksList = () => {
  return (
    <Stack>
      <Button
        size="lg"
        variant="gradient"
        gradient={{ from: 'green', to: 'cyan' }}
        leftSection={<IconPlus />}
        onClick={openCreateTaskModal}
      >
        Добавить задачу
      </Button>
      <TasksFilter />
      <FilteredTasks />
    </Stack>
  );
};
