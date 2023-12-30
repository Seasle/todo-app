import { useNavigate } from 'react-router-dom';
import { SimpleGrid, Stack, Button } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import { IconArrowLeft, IconEdit } from '@tabler/icons-react';
import { TaskView } from '@/features/task';
import { type TaskId } from '@/shared/types';
import { openEditTaskModal } from '@/entities/task';

export interface SingleTaskProps {
  id?: TaskId;
}

export const SingleTask = ({ id }: SingleTaskProps) => {
  const { width } = useViewportSize();
  const navigate = useNavigate();
  const orientation = width < 1024 ? 'vertical' : 'horizontal';

  const onBackClick = () => {
    navigate(-1);
  };

  const onEditClick = () => {
    if (id === undefined) {
      return;
    }

    openEditTaskModal(id);
  };

  return (
    <Stack>
      <SimpleGrid cols={orientation === 'vertical' ? 1 : 2}>
        <Button
          size="lg"
          color="gray"
          leftSection={<IconArrowLeft />}
          onClick={onBackClick}
        >
          Назад
        </Button>
        <Button
          size="lg"
          variant="gradient"
          gradient={{ from: 'green', to: 'cyan' }}
          leftSection={<IconEdit />}
          disabled={id === undefined}
          onClick={onEditClick}
        >
          Изменить
        </Button>
      </SimpleGrid>
      <TaskView id={id} />
    </Stack>
  );
};
