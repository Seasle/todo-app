import { createStore, createEvent, combine } from 'effector';
import { useUnit } from 'effector-react';
import { persist } from 'effector-storage';
import { nanoid } from 'nanoid';
import { $queryConfig } from './query-config';
import { compareText, compareExpiresIn } from '../utils';
import {
  createStorageAdapter,
  compareIf,
  customCompareIf,
} from '@/shared/utils';
import { type TaskBase, type Task, type TaskId } from '@/shared/types';

const addTask = createEvent<TaskBase>();

const toggleTask = createEvent<TaskId>();

export const $tasks = createStore<Record<TaskId, Task>>({})
  .on(addTask, (store, taskBase) => {
    const id = nanoid();
    const title = taskBase.title.trim();
    const description = taskBase.description ? taskBase.description : undefined;
    const expiresIn = taskBase.expiresIn ?? undefined;

    return {
      ...store,
      [id]: {
        id,
        title,
        description,
        priority: taskBase.priority,
        createdAt: new Date().toISOString(),
        expiresIn,
        completedIn: undefined,
        isCompleted: false,
      },
    };
  })
  .on(toggleTask, (store, taskId) => {
    const isCompleted = !store[taskId].isCompleted;

    return {
      ...store,
      [taskId]: {
        ...store[taskId],
        completedIn: isCompleted ? new Date().toISOString() : undefined,
        isCompleted,
      },
    };
  });

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
  addTask,
  toggleTask,
};

export const selectors = {
  useTasks,
};
