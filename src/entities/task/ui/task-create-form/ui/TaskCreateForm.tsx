import { useCallback } from 'react';
import {
  Grid,
  Stack,
  Center,
  TextInput,
  Textarea,
  SegmentedControl,
  Button,
  CloseButton,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { type ContextModalProps } from '@mantine/modals';
import { IconCheck } from '@tabler/icons-react';
import { taskModel } from '@/entities/task';
import { priorityValues } from '../const';
import { ChoiceItem } from '@/shared/ui';
import { useDelayedKeyOnResize } from '@/shared/hooks';
import { type TaskPriority } from '@/shared/types';

interface TaskCreateFormValues {
  title: string;
  description: string;
  priority: TaskPriority;
  expiresIn: Date | null;
}

const today = new Date();

export const TaskCreateForm = ({ id, context }: ContextModalProps) => {
  const { ref, key } = useDelayedKeyOnResize(50);
  const form = useForm<TaskCreateFormValues>({
    initialValues: {
      title: '',
      description: '',
      priority: 'NORMAL',
      expiresIn: null,
    },
    validate: {
      title: (value) =>
        value.trim().length === 0 ? 'Название задачи обязательно' : null,
    },
  });

  const onFormSubmit = useCallback(
    (values: TaskCreateFormValues) => {
      taskModel.events.addTask({
        title: values.title,
        description: values.description,
        priority: values.priority,
        expiresIn: values.expiresIn?.toISOString(),
      });

      context.closeContextModal(id);
    },
    [id, context],
  );

  return (
    <form onSubmit={form.onSubmit(onFormSubmit)}>
      <Stack ref={ref}>
        <Grid>
          <Grid.Col span="auto">
            <TextInput
              label="Название задачи"
              placeholder="Что будем делать?"
              withAsterisk
              rightSection={
                <CloseButton
                  aria-label="Очистить поле"
                  onClick={() => form.setFieldValue('title', '')}
                  style={{ display: form.values.title ? undefined : 'none' }}
                />
              }
              {...form.getInputProps('title')}
            />
          </Grid.Col>
          <Grid.Col span="content">
            <DateInput
              label="Срок выполнения"
              placeholder="А он нужен?"
              valueFormat="DD.MM.YYYY"
              minDate={today}
              rightSection={
                <CloseButton
                  aria-label="Очистить поле"
                  onClick={() => form.setFieldValue('expiresIn', null)}
                  style={{
                    display: form.values.expiresIn ? undefined : 'none',
                  }}
                />
              }
              {...form.getInputProps('expiresIn')}
            />
          </Grid.Col>
        </Grid>
        <Textarea
          label="Текст задачи"
          placeholder="А подробнее нужно?"
          rightSection={
            <CloseButton
              aria-label="Очистить поле"
              onClick={() => form.setFieldValue('description', '')}
              style={{ display: form.values.description ? undefined : 'none' }}
            />
          }
          {...form.getInputProps('description')}
        />
        <SegmentedControl
          data={priorityValues.map((entry) => ({
            value: entry.value,
            label: <ChoiceItem value={entry} />,
          }))}
          key={key}
          {...form.getInputProps('priority')}
        />
        <Center>
          <Button type="submit" leftSection={<IconCheck />}>
            Создать
          </Button>
        </Center>
      </Stack>
    </form>
  );
};
