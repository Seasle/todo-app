import { Link } from 'react-router-dom';
import { Paper, Stack, Group, Flex, Text, Button } from '@mantine/core';
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
  const linkTo = `/${task.id}`;
  const isOverdue = toDate(task.expiresIn ?? '').getTime() < Date.now();

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
          <Group>
            <TaskPriorityIcon variant={task.priority} />
            <TaskDeleteButton task={task} />
          </Group>
        </Flex>
        {task.description && <Text size="sm">{task.description}</Text>}
        {task.expiresIn && (
          <TaskProgress
            createdAt={task.createdAt}
            expiresIn={task.expiresIn}
            autoUpdate={!task.isCompleted}
          />
        )}
        <Flex justify="space-between">
          <Group>
            <Text size="xs">Создана {humanizedDate(task.createdAt)}</Text>
            {task.expiresIn && (
              <Text size="xs">Сделать до {humanizedDate(task.expiresIn)}</Text>
            )}
            {task.completedIn && (
              <Text size="xs">Сделана {humanizedDate(task.completedIn)}</Text>
            )}
          </Group>
          <Button
            size="xs"
            color={task.isCompleted ? 'red' : 'green'}
            onClick={onToggleClick}
          >
            {task.isCompleted ? 'Переоткрыть' : 'Завершить'}
          </Button>
        </Flex>
      </Stack>
    </Paper>
  );
};
