import { Link } from 'react-router-dom';
import { Paper, Stack, Group, Flex, Text, Button, rem } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import {
  TaskOverdueIcon,
  TaskPriorityIcon,
  TaskProgress,
  TaskDeleteButton,
} from '../..';
import { toDate, humanizedDate } from '@/shared/utils';
import { type Task } from '@/shared/types';
import { taskModel } from '@/entities/task';

export interface TaskCardProps {
  task: Task;
}

export const TaskCard = ({ task }: TaskCardProps) => {
  const { width } = useViewportSize();
  const linkTo = `/${task.id}`;
  const isOverdue = toDate(task.expiresIn ?? '').getTime() < Date.now();
  const orientation = width < 1024 ? 'vertical' : 'horizontal';

  const onToggleClick = () => {
    taskModel.events.toggleTask(task.id);
  };

  return (
    <Paper shadow="md" p="lg">
      <Stack>
        <Flex justify="space-between" align="center">
          <Group>
            {isOverdue && <TaskOverdueIcon />}
            <Text
              component={Link}
              to={linkTo}
              size="lg"
              td={task.isCompleted ? 'line-through' : 'unset'}
            >
              {task.title}
            </Text>
          </Group>
          <TaskPriorityIcon variant={task.priority} />
        </Flex>
        {task.description && <Text size="sm">{task.description}</Text>}
        {task.expiresIn && (
          <TaskProgress
            createdAt={task.createdAt}
            expiresIn={task.expiresIn}
            autoUpdate={!task.isCompleted}
          />
        )}
        <Flex
          direction={orientation === 'horizontal' ? 'row' : 'column'}
          gap={orientation === 'horizontal' ? rem(0) : rem(16)}
          justify="space-between"
        >
          <Group>
            <Text size="xs">Создана {humanizedDate(task.createdAt)}</Text>
            {task.expiresIn && (
              <Text size="xs">Сделать до {humanizedDate(task.expiresIn)}</Text>
            )}
            {task.completedIn && (
              <Text size="xs">Сделана {humanizedDate(task.completedIn)}</Text>
            )}
          </Group>
          <Group>
            <TaskDeleteButton task={task} />
            <Button
              size="xs"
              color={task.isCompleted ? 'red' : 'green'}
              onClick={onToggleClick}
            >
              {task.isCompleted ? 'Переоткрыть' : 'Завершить'}
            </Button>
          </Group>
        </Flex>
      </Stack>
    </Paper>
  );
};
