import { createStore, createEvent, combine, sample } from 'effector';
import { useUnit } from 'effector-react';
import { persist } from 'effector-storage';
import { nanoid } from 'nanoid';
import { $queryConfig } from './query-config';
import { compareText, compareExpiresIn } from '../utils';
import {
  createStorageAdapter,
  compareIf,
  customCompareIf,
  excludeKey,
} from '@/shared/utils';
import { type TaskBase, type Task, type TaskId } from '@/shared/types';

const addTask = createEvent<TaskBase>();

const modifyTask = createEvent<{ id: TaskId } & TaskBase>();

const removeTask = createEvent<TaskId>();

const toggleTask = createEvent<TaskId>();

const markTaskToRemove = createEvent<TaskId>();

const unmarkTaskToRemove = createEvent<TaskId>();

sample({
  clock: removeTask,
  target: unmarkTaskToRemove,
});

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
  .on(modifyTask, (store, { id, ...taskBase }) => {
    const title = taskBase.title.trim();
    const description = taskBase.description ? taskBase.description : undefined;
    const expiresIn = taskBase.expiresIn ?? undefined;

    return {
      ...store,
      [id]: {
        ...store[id],
        title,
        description,
        priority: taskBase.priority,
        expiresIn,
      },
    };
  })
  .on(removeTask, (store, taskId) => excludeKey(store, taskId))
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

export const $tasksToDelete = createStore<TaskId[]>([])
  .on(markTaskToRemove, (store, taskId) => [...store, taskId])
  .on(unmarkTaskToRemove, (store, taskId) =>
    store.filter((entry) => entry !== taskId),
  );

export const $tasksList = combine(
  $tasks,
  $tasksToDelete,
  (tasks, tasksToDelete) =>
    Object.values(tasks).filter((task) => !tasksToDelete.includes(task.id)),
);

export const $tasksFiltered = combine(
  $tasksList,
  $queryConfig,
  (tasks, query) =>
    tasks.filter(
      (task) =>
        customCompareIf(
          task.title.concat(task.description ?? ''),
          query.text,
          compareText,
        ) &&
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

const useTask = (id?: TaskId) => {
  const tasks = useUnit($tasks);
  const tasksToDelete = useUnit($tasksToDelete);

  if (id === undefined || tasksToDelete.includes(id)) {
    return null;
  }

  return tasks?.[id] ?? null;
};

export const events = {
  addTask,
  modifyTask,
  removeTask,
  toggleTask,
  markTaskToRemove,
  unmarkTaskToRemove,
};

export const selectors = {
  useTasks,
  useTask,
};
