import { createStore, createEvent, createEffect, combine } from 'effector';
import { useUnit } from 'effector-react';
import { persist } from 'effector-storage';
import { $queryConfig } from './query-config';
import { compareText, compareExpiresIn } from '../utils';
import {
  createStorageAdapter,
  compareIf,
  customCompareIf,
  generateFakeTasks,
} from '@/shared/utils';
import { type Task, type TaskId } from '@/shared/types';

const toggleTask = createEvent<TaskId>();

const loadTasksFx = createEffect(() => {
  return generateFakeTasks(20).reduce<Record<TaskId, Task>>((acc, entry) => {
    acc[entry.id] = entry;

    return acc;
  }, {});
});

export const $tasks = createStore<Record<TaskId, Task>>({})
  .on(loadTasksFx.doneData, (_, payload) => payload)
  .on(toggleTask, (store, taskId) => ({
    ...store,
    [taskId]: {
      ...store[taskId],
      isCompleted: !store[taskId].isCompleted,
    },
  }));

export const $tasksList = combine($tasks, (tasks) => Object.values(tasks));

export const $tasksFiltered = combine(
  $tasksList,
  $queryConfig,
  (tasks, query) =>
    tasks.filter(
      (task) =>
        (customCompareIf(task.title, query.text, compareText) ||
          customCompareIf(task.title, query.text, compareText)) &&
        compareIf(task.priority, query.priority) &&
        compareIf(task.isCompleted, query.isCompleted) &&
        customCompareIf(task.expiresIn, query.isOverdue, compareExpiresIn),
    ),
);

persist({
  key: 'tasks',
  store: $tasks,
  adapter: createStorageAdapter(),
});
const useTasks = () => {
  return useUnit($tasksFiltered);
};

export const events = {
  toggleTask,
};

export const effects = {
  loadTasksFx,
};

export const selectors = {
  useTasks,
};
