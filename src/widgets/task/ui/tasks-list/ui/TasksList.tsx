import { useEffect } from 'react';
import { Stack } from '@mantine/core';
import { TasksFilter, FilteredTasks } from '@/features/task';
import { taskModel } from '@/entities/task';

export const TasksList = () => {
  useEffect(() => {
    void taskModel.effects.loadTasksFx();
  }, []);

  return (
    <Stack>
      <TasksFilter />
      <FilteredTasks />
    </Stack>
  );
};
