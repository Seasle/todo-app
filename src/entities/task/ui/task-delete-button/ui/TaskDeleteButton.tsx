import { Group, Button, ActionIcon, rem } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconQuestionMark, IconCheck, IconTrash } from '@tabler/icons-react';
import { type Task } from '@/shared/types';
import { taskModel } from '@/entities/task';

export interface TaskDeleteButtonProps {
  task: Task;
}

export const TaskDeleteButton = ({ task }: TaskDeleteButtonProps) => {
  const onClick = () => {
    let needRemove = true;

    taskModel.events.markTaskToRemove(task.id);
    notifications.show({
      id: task.id,
      title: `Вы удалили задачу: ${task.title}`,
      message: (
        <Group gap={rem(4)}>
          Хотите вернуть?
          <Button
            color="blue"
            variant="light"
            size="compact-xs"
            onClick={() => {
              needRemove = false;

              taskModel.events.unmarkTaskToRemove(task.id);
              notifications.hide(task.id);
              notifications.show({
                title: `Вы вернули задачу: ${task.title}`,
                message: 'Задача возвращена',
                color: 'green',
                icon: <IconCheck />,
              });
            }}
          >
            Да!
          </Button>
        </Group>
      ),
      color: 'yellow',
      icon: <IconQuestionMark />,
      onClose: () => {
        if (!needRemove) {
          return;
        }

        taskModel.events.removeTask(task.id);
      },
    });
  };

  return (
    <ActionIcon color="blue" onClick={onClick}>
      <IconTrash />
    </ActionIcon>
  );
};
