import { type PropsWithChildren } from 'react';
import { ModalsProvider } from '@mantine/modals';
import { TaskCreateForm, TaskEditForm } from '@/features/task';

export const ModalProvider = ({ children }: PropsWithChildren<unknown>) => {
  return (
    <ModalsProvider
      modals={{
        createTask: TaskCreateForm,
        editTask: TaskEditForm,
      }}
    >
      {children}
    </ModalsProvider>
  );
};
