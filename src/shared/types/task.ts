import { Flavor } from './common';

export type TaskId = Flavor<string, 'TaskId'>;

export interface TaskBase {
  title: string;
  description?: string;
  priority: TaskPriority;
  expiresIn?: string;
}

export interface Task extends TaskBase {
  id: TaskId;
  createdAt: string;
  completedIn?: string;
  isCompleted: boolean;
}

export type TaskPriority = 'HIGH' | 'NORMAL' | 'LOW';
