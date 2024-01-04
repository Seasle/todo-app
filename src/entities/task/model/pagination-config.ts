import { createStore, createEvent } from 'effector';
import { useUnit } from 'effector-react';
import { persist } from 'effector-storage';
import { createStorageAdapter } from '@/shared/utils';

export interface PaginationConfig {
  page: number;
  size: number;
}

const setPaginationConfig = createEvent<Partial<PaginationConfig>>();

const resetPaginationConfig = createEvent();

export const $paginationConfig = createStore<PaginationConfig>({
  page: 1,
  size: 10,
})
  .on(setPaginationConfig, (store, payload) => ({ ...store, ...payload }))
  .reset(resetPaginationConfig);

persist({
  key: 'pagination-config',
  store: $paginationConfig,
  adapter: createStorageAdapter(),
});

const usePagination = () => {
  return useUnit($paginationConfig);
};

export const events = {
  setPaginationConfig,
  resetPaginationConfig,
};

export const selectors = {
  usePagination,
};
