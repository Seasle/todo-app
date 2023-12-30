import { useCallback } from 'react';
import { type ContextModalProps } from '@mantine/modals';
import { TaskForm, taskModel, type TaskFormValues } from '@/entities/task';
import { type TaskId } from '@/shared/types';

export interface TaskEditFormProps {
  taskId: TaskId;
}

export const TaskEditForm = ({
  id,
  context,
  innerProps: { taskId },
}: ContextModalProps<TaskEditFormProps>) => {
  const task = taskModel.selectors.useTask(taskId);

  const onSubmit = useCallback(
    (values: TaskFormValues) =>
      new Promise<void>((resolve) => {
        taskModel.events.modifyTask({
          id: taskId,
          title: values.title,
          description: values.description,
          priority: values.priority,
          expiresIn: values.expiresIn?.toISOString(),
        });

        context.closeContextModal(id);

        resolve();
      }),
    [taskId, id, context],
  );

  return <TaskForm data={task} submitText="Изменить" onSubmit={onSubmit} />;
};
