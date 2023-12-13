import { Paper, Stack, Group, Flex, Text, Button } from '@mantine/core';
import { TaskOverdueIcon, TaskPriorityIcon, TaskProgress } from '../..';
import { toDate, humanizedDate } from '@/shared/utils';
import { type Task } from '@/shared/types';

export interface TaskCardProps {
  task: Task;
}

export const TaskCard = ({ task }: TaskCardProps) => {
  const priority = task.priority ?? 'NORMAL';
  const isOverdue = toDate(task.expiresIn ?? '').getTime() < Date.now();

  return (
    <Paper shadow="md" p="lg">
      <Stack>
        <Flex justify="space-between" align="center">
          <Group>
            {isOverdue && <TaskOverdueIcon />}
            <Text size="lg" td={task.isCompleted ? 'line-through' : 'unset'}>
              {task.title}
            </Text>
          </Group>
          <TaskPriorityIcon variant={priority} />
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
          <Button color={task.isCompleted ? 'red' : 'green'} size="xs">
            {task.isCompleted ? 'Переоткрыть' : 'Завершить'}
          </Button>
        </Flex>
      </Stack>
    </Paper>
  );
};
