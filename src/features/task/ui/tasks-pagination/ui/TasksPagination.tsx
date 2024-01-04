import { Center, Group, Pagination, SegmentedControl } from '@mantine/core';
import { pageSizes, defaultPageSize } from '../const';
import { taskModel, taskPaginationModel } from '@/entities/task';
import { tryParseInt } from '@/shared/utils';

export const TasksPagination = () => {
  const count = taskModel.selectors.useTasksCount();
  const pagination = taskPaginationModel.selectors.usePagination();
  const page = pagination.page ?? 1;
  const size = pagination.size ?? defaultPageSize;
  const total = Math.ceil(count / size);

  const onPageChange = (value: number) => {
    taskPaginationModel.events.setPaginationConfig({
      page: value,
    });
  };

  const onSizeChange = (value: string) => {
    taskPaginationModel.events.setPaginationConfig({
      page: 1,
      size: tryParseInt(value, defaultPageSize),
    });
  };

  if (count <= defaultPageSize) {
    return null;
  }

  return (
    <Center>
      <Group>
        <Pagination value={page} total={total} onChange={onPageChange} />
        <SegmentedControl
          value={size.toString()}
          defaultValue={defaultPageSize.toString()}
          data={pageSizes}
          onChange={onSizeChange}
        />
      </Group>
    </Center>
  );
};
