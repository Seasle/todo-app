import { createStore, createEvent } from 'effector';
import { useUnit } from 'effector-react';
import { persist } from 'effector-storage';
import { createStorageAdapter } from '@/shared/utils';
import { type TaskPriority } from '@/shared/types';

export type QueryConfig = Partial<{
  priority: TaskPriority;
  isCompleted: boolean;
  isOverdue: boolean;
}>;

const setQueryConfig = createEvent<QueryConfig>();

export const $queryConfig = createStore<QueryConfig>({}).on(
  setQueryConfig,
  (store, payload) => ({ ...store, ...payload }),
);

persist({
  key: 'query-config',
  store: $queryConfig,
  adapter: createStorageAdapter(),
});

const useQuery = () => {
  return useUnit($queryConfig);
};

export const events = {
  setQueryConfig,
};

export const selectors = {
  useQuery,
};
