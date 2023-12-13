import { Flavor } from './common';

export interface Task {
  id: TaskId;
  title: string;
  description?: string;
  priority?: TaskPriority;
  createdAt: string;
  expiresIn?: string;
  completedIn?: string;
  isCompleted: boolean;
}

export type TaskId = Flavor<string, 'TaskId'>;

export type TaskPriority = 'HIGH' | 'NORMAL' | 'LOW';
