export interface Task {
  id: string;
  title: string;
  description?: string;
  priority?: TaskPriority;
  createdAt: string;
  expiresIn?: string;
  isCompleted: boolean;
}

export type TaskPriority = 'HIGH' | 'NORMAL' | 'LOW';
