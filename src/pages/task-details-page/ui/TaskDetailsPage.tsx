import { useParams } from 'react-router-dom';
import { rem } from '@mantine/core';
import { Spotlight } from '@mantine/spotlight';
import { IconSearch } from '@tabler/icons-react';
import { SingleTask } from '@/widgets/task';
import { actions } from '../const';

export const TaskDetailsPage = () => {
  const { taskId } = useParams<'taskId'>();

  return (
    <>
      <SingleTask id={taskId} />
      <Spotlight
        actions={actions}
        nothingFound="Ничего не нашлось..."
        highlightQuery
        searchProps={{
          placeholder: 'Поиск...',
          leftSection: (
            <IconSearch
              style={{ width: rem(24), height: rem(24) }}
              stroke={1.5}
            />
          ),
        }}
      />
    </>
  );
};
