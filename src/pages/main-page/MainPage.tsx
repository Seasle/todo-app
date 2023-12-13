import { Container } from '@mantine/core';
import { TasksList } from '@/widgets/task';

export const MainPage = () => {
  return (
    <Container p="xl">
      <TasksList />
    </Container>
  );
};
