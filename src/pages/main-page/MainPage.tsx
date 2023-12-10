import { useEffect } from 'react';
import { Stack } from '@mantine/core';
import { TaskCard, taskModel } from '@/entities/task';

export const MainPage = () => {
  const tasks = taskModel.selectors.useTasks();

  useEffect(() => {
    void taskModel.effects.loadTasksFx();
  }, []);

  return (
    <Stack style={{ padding: 40 }}>
      {tasks.map((task) => (
        <TaskCard task={task} key={task.id} />
      ))}
    </Stack>
  );
};
