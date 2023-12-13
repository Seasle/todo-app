import { useEffect } from 'react';
import { Stack, Alert } from '@mantine/core';
import { IconInfoSquareRounded } from '@tabler/icons-react';
import { TasksFilter } from '@/features/task';
import { TaskCard, taskModel } from '@/entities/task';

export const TasksList = () => {
  const tasks = taskModel.selectors.useTasks();
  const isEmpty = tasks.length === 0;

  useEffect(() => {
    void taskModel.effects.loadTasksFx();
  }, []);

  return (
    <Stack>
      <TasksFilter />
      {isEmpty && (
        <Alert title="Задач нет" icon={<IconInfoSquareRounded />} color="green">
          По текущим настройкам фильтра задачи не найдены.
        </Alert>
      )}
      {tasks.map((task) => (
        <TaskCard task={task} key={task.id} />
      ))}
    </Stack>
  );
};
