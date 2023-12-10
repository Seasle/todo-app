import { createStore, createEffect } from 'effector';
import { useUnit } from 'effector-react';
import { persist } from 'effector-storage';
import { createStorageAdapter, generateFakeTasks } from '@/shared/utils';
import { type Task } from '@/shared/types';

const loadTasksFx = createEffect(() => {
  return generateFakeTasks(100);
});

const $tasks = createStore<Task[]>([]).on(
  loadTasksFx.doneData,
  (_, payload) => payload,
);

persist({
  key: 'tasks',
  store: $tasks,
  adapter: createStorageAdapter(),
});

const useTasks = () => {
  return useUnit($tasks);
};

export const effects = {
  loadTasksFx,
};

export const selectors = {
  useTasks,
};
