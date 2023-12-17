import { type ChangeEvent } from 'react';
import {
  Paper,
  Grid,
  Stack,
  Group,
  TextInput,
  SegmentedControl,
  Button,
  CloseButton,
  Text,
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
import { taskQueryModel } from '@/entities/task';
import { ChoiceItem } from '@/shared/ui';

export const TasksFilter = () => {
  const query = taskQueryModel.selectors.useQuery();
  const textValue = query.text ?? '';
  const priorityValue = toPriority(query.priority);
  const completedValue = toCompleted(query.isCompleted);
  const overdueValue = toOverdue(query.isOverdue);
  const isEmpty =
    query.text === undefined &&
    query.priority === undefined &&
    query.isCompleted === undefined &&
    query.isOverdue === undefined;

  const onTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    taskQueryModel.events.setQueryConfig({
      text: event.currentTarget.value,
    });
  };

  const onTextClear = () => {
    taskQueryModel.events.setQueryConfig({ text: undefined });
  };

  const onPriorityChange = (value: string) => {
    taskQueryModel.events.setQueryConfig({ priority: fromPriority(value) });
  };

  const onCompletedChange = (value: string) => {
    taskQueryModel.events.setQueryConfig({ isCompleted: fromCompleted(value) });
  };

  const onOverdueChange = (value: string) => {
    taskQueryModel.events.setQueryConfig({ isOverdue: fromOverdue(value) });
  };

  const onResetClick = () => {
    taskQueryModel.events.resetQueryConfig();
  };

  return (
    <Paper shadow="md" p="lg">
      <Stack>
        <Text size="lg">Фильтр задач</Text>
        <Grid align="end">
          <Grid.Col span="auto">
            <TextInput
              label="Текст в названии или описании"
              placeholder="Ищем любые задачи"
              value={textValue}
              rightSection={
                <CloseButton
                  aria-label="Очистить поле"
                  onClick={onTextClear}
                  style={{ display: query.text ? undefined : 'none' }}
                />
              }
              onChange={onTextChange}
            />
          </Grid.Col>
          <Grid.Col span="content">
            <Button color="red" disabled={isEmpty} onClick={onResetClick}>
              Сбросить
            </Button>
          </Grid.Col>
        </Grid>
        <Group>
          <SegmentedControl
            value={priorityValue}
            data={priorityValues.map((entry) => ({
              value: entry.value,
              label: <ChoiceItem value={entry} />,
            }))}
            onChange={onPriorityChange}
          />
          <SegmentedControl
            value={completedValue}
            data={completedValues.map((entry) => ({
              value: entry.value,
              label: <ChoiceItem value={entry} />,
            }))}
            onChange={onCompletedChange}
          />
          <SegmentedControl
            value={overdueValue}
            data={overdueValues.map((entry) => ({
              value: entry.value,
              label: <ChoiceItem value={entry} />,
            }))}
            onChange={onOverdueChange}
          />
        </Group>
      </Stack>
    </Paper>
  );
};
