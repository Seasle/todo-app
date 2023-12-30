import { type ChangeEvent } from 'react';
import {
  Paper,
  Grid,
  Stack,
  TextInput,
  SegmentedControl,
  Button,
  CloseButton,
  Text,
} from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import clsx from 'clsx';
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
import classes from './TasksFilter.module.scss';

export const TasksFilter = () => {
  const { width } = useViewportSize();
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
  const orientation = width < 1024 ? 'vertical' : 'horizontal';

  const onTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    const isEmpty = value.length === 0;

    taskQueryModel.events.setQueryConfig({
      text: !isEmpty ? value : undefined,
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
          <Grid.Col span={orientation === 'horizontal' ? 'auto' : 12}>
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
          <Grid.Col span={orientation === 'horizontal' ? 'content' : 12}>
            <Button
              fullWidth
              color="red"
              disabled={isEmpty}
              onClick={onResetClick}
            >
              Сбросить
            </Button>
          </Grid.Col>
        </Grid>
        <div className={clsx(classes.filters, orientation)}>
          <SegmentedControl
            value={priorityValue}
            data={priorityValues.map((entry) => ({
              value: entry.value,
              label: <ChoiceItem value={entry} />,
            }))}
            orientation={orientation}
            onChange={onPriorityChange}
          />
          <SegmentedControl
            value={completedValue}
            data={completedValues.map((entry) => ({
              value: entry.value,
              label: <ChoiceItem value={entry} />,
            }))}
            orientation={orientation}
            onChange={onCompletedChange}
          />
          <SegmentedControl
            value={overdueValue}
            data={overdueValues.map((entry) => ({
              value: entry.value,
              label: <ChoiceItem value={entry} />,
            }))}
            orientation={orientation}
            onChange={onOverdueChange}
          />
        </div>
      </Stack>
    </Paper>
  );
};
