import { createStore, createEvent } from 'effector';
import { useUnit } from 'effector-react';
import { persist } from 'effector-storage';
import { createStorageAdapter } from '@/shared/utils';
import { type TaskPriority } from '@/shared/types';

export type QueryConfig = Partial<{
  text: string;
  priority: TaskPriority;
  isCompleted: boolean;
  isOverdue: boolean;
}>;

const setQueryConfig = createEvent<QueryConfig>();

const resetQueryConfig = createEvent();

export const $queryConfig = createStore<QueryConfig>({})
  .on(setQueryConfig, (store, payload) => ({ ...store, ...payload }))
  .on(resetQueryConfig, () => ({}));

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
  resetQueryConfig,
};

export const selectors = {
  useQuery,
};
