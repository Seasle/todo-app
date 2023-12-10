import { StorageAdapter } from 'effector-storage/local';
import localForage from 'localforage';
import { nonNullable } from './collection';

export const createStorageAdapter = (name?: string): StorageAdapter => {
  const storage = localForage.createInstance(nonNullable({ name: name }));

  return (key) => ({
    get: async () => {
      return (await storage.getItem(key)) ?? undefined;
    },
    set: (value) => {
      void storage.setItem(key, value);
    },
  });
};
