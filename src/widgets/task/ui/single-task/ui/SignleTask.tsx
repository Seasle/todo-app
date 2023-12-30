import { useNavigate } from 'react-router-dom';
import { SimpleGrid, Stack, Button } from '@mantine/core';
import { IconArrowLeft, IconEdit } from '@tabler/icons-react';
import { TaskView } from '@/features/task';
import { type TaskId } from '@/shared/types';

export interface SingleTaskProps {
  id?: TaskId;
}

export const SingleTask = ({ id }: SingleTaskProps) => {
  const navigate = useNavigate();

  const onBackClick = () => {
    navigate(-1);
  };

  return (
    <Stack>
      <SimpleGrid cols={2}>
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
          disabled
        >
          Изменить
        </Button>
      </SimpleGrid>
      <TaskView id={id} />
    </Stack>
  );
};
