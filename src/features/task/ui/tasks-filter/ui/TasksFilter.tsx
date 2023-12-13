import {
  Paper,
  Stack,
  Center,
  SegmentedControl,
  Text,
  Group,
} from '@mantine/core';
import {
  toPriority,
  toCompleted,
  toOverdue,
  fromPriority,
  fromCompleted,
  fromOverdue,
} from '../utils';
import { priorityValues, completedValues, overdueValues } from '../const';
import { TaskPriorityIcon, taskQueryModel } from '@/entities/task';

export const TasksFilter = () => {
  const query = taskQueryModel.selectors.useQuery();
  const priorityValue = toPriority(query.priority);
  const completedValue = toCompleted(query.isCompleted);
  const overdueValue = toOverdue(query.isOverdue);

  const onPriorityChange = (value: string) => {
    taskQueryModel.events.setQueryConfig({ priority: fromPriority(value) });
  };

  const onCompletedChange = (value: string) => {
    taskQueryModel.events.setQueryConfig({ isCompleted: fromCompleted(value) });
  };

  const onOverdueChange = (value: string) => {
    taskQueryModel.events.setQueryConfig({ isOverdue: fromOverdue(value) });
  };

  return (
    <Paper shadow="md" p="lg">
      <Stack>
        <Text size="lg">Фильтр задач</Text>
        <Group>
          <SegmentedControl
            value={priorityValue}
            data={priorityValues.map((entry) => ({
              value: entry.value,
              label:
                entry.icon !== null ? (
                  <Center style={{ gap: 10 }}>
                    <TaskPriorityIcon variant={entry.icon} />
                    {entry.label}
                  </Center>
                ) : (
                  entry.label
                ),
            }))}
            onChange={onPriorityChange}
          />
          <SegmentedControl
            value={completedValue}
            data={completedValues.map((entry) => ({
              value: entry.value,
              label:
                entry.icon !== null ? (
                  <Center style={{ gap: 10 }}>
                    {entry.icon}
                    {entry.label}
                  </Center>
                ) : (
                  entry.label
                ),
            }))}
            onChange={onCompletedChange}
          />
          <SegmentedControl
            value={overdueValue}
            data={overdueValues.map((entry) => ({
              value: entry.value,
              label:
                entry.icon !== null ? (
                  <Center style={{ gap: 10 }}>
                    {entry.icon}
                    {entry.label}
                  </Center>
                ) : (
                  entry.label
                ),
            }))}
            onChange={onOverdueChange}
          />
        </Group>
      </Stack>
    </Paper>
  );
};
