import { Alert } from '@mantine/core';
import { IconInfoSquareRounded } from '@tabler/icons-react';
import { TaskCard, taskModel } from '@/entities/task';

export const FilteredTasks = () => {
  const tasks = taskModel.selectors.useTasks();
  const isEmpty = tasks.length === 0;

  if (isEmpty) {
    return (
      <Alert title="Задач нет" icon={<IconInfoSquareRounded />}>
        По текущим настройкам фильтра задачи не найдены.
      </Alert>
    );
  }

  return (
    <>
      {tasks.map((task) => (
        <TaskCard task={task} key={task.id} />
      ))}
    </>
  );
};
