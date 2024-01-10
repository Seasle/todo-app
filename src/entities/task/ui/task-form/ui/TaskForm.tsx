import { useCallback, useRef } from 'react';
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
import { useViewportSize } from '@mantine/hooks';
import { IconCheck } from '@tabler/icons-react';
import { usePriorityValues } from '../hooks';
import { ChoiceItem } from '@/shared/ui';
import { useDelayedKeyOnResize } from '@/shared/hooks';
import { type Task, type TaskPriority } from '@/shared/types';

const today = new Date();

export interface TaskFormValues {
  title: string;
  description: string;
  priority: TaskPriority;
  expiresIn: Date | null;
}

export interface TaskFormProps {
  data?: Task | null;
  submitText: string;
  onSubmit: (values: TaskFormValues) => Promise<void>;
}

export const TaskForm = ({ data, submitText, onSubmit }: TaskFormProps) => {
  const { width } = useViewportSize();
  const { ref, key } = useDelayedKeyOnResize(50);
  const form = useForm<TaskFormValues>({
    initialValues: {
      title: data?.title ?? '',
      description: data?.description ?? '',
      priority: data?.priority ?? 'NORMAL',
      expiresIn:
        data?.expiresIn !== undefined ? new Date(data.expiresIn) : null,
    },
    validate: {
      title: (value) =>
        value.trim().length === 0 ? 'Название задачи обязательно' : null,
    },
  });
  const isSubmitting = useRef(false);
  const priorityValues = usePriorityValues();
  const orientation = width < 1024 ? 'vertical' : 'horizontal';

  const onFormSubmit = useCallback(
    (values: TaskFormValues) => {
      if (isSubmitting.current) {
        return;
      }

      isSubmitting.current = true;

      void onSubmit(values).finally(() => {
        window.requestIdleCallback(() => {
          isSubmitting.current = false;
        });
      });
    },
    [onSubmit],
  );

  return (
    <form onSubmit={form.onSubmit(onFormSubmit)}>
      <Stack ref={ref}>
        <Grid>
          <Grid.Col span={orientation === 'horizontal' ? 'auto' : 12}>
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
              data-autofocus
              {...form.getInputProps('title')}
            />
          </Grid.Col>
          <Grid.Col span={orientation === 'horizontal' ? 'content' : 12}>
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
          fullWidth={orientation === 'vertical'}
          orientation={orientation}
          key={key}
          {...form.getInputProps('priority')}
        />
        <Center>
          <Button
            type="submit"
            leftSection={<IconCheck />}
            disabled={isSubmitting.current}
          >
            {submitText}
          </Button>
        </Center>
      </Stack>
    </form>
  );
};
