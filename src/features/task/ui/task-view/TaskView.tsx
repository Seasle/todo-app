import { Alert } from '@mantine/core';
import { IconAlertSquareRounded } from '@tabler/icons-react';
import { TaskCard, taskModel } from '@/entities/task';
import { type TaskId } from '@/shared/types';

export interface TaskViewProps {
  id?: TaskId;
}

export const TaskView = ({ id }: TaskViewProps) => {
  const task = taskModel.selectors.useTask(id);

  if (task === null) {
    return (
      <Alert title="Задачи нет" icon={<IconAlertSquareRounded />}>
        Такой задачи не найдено.
      </Alert>
    );
  }

  return <TaskCard task={task} />;
};
