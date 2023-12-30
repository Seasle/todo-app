import { useCallback } from 'react';
import { type ContextModalProps } from '@mantine/modals';
import { TaskForm, taskModel, type TaskFormValues } from '@/entities/task';

export const TaskCreateForm = ({ id, context }: ContextModalProps) => {
  const onSubmit = useCallback(
    (values: TaskFormValues) =>
      new Promise<void>((resolve) => {
        taskModel.events.addTask({
          title: values.title,
          description: values.description,
          priority: values.priority,
          expiresIn: values.expiresIn?.toISOString(),
        });

        context.closeContextModal(id);

        resolve();
      }),
    [id, context],
  );

  return <TaskForm submitText="Создать" onSubmit={onSubmit} />;
};
