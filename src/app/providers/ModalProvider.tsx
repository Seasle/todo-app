import { type PropsWithChildren } from 'react';
import { ModalsProvider } from '@mantine/modals';
import { TaskCreateForm } from '@/entities/task';

export const ModalProvider = ({ children }: PropsWithChildren<unknown>) => {
  return (
    <ModalsProvider
      modals={{
        createTask: TaskCreateForm,
      }}
    >
      {children}
    </ModalsProvider>
  );
};
