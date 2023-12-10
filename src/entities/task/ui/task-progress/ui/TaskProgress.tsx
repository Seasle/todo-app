import { useProgress } from '@/shared/hooks/use-progress';
import classes from './TaskProgress.module.scss';

export interface TaskProgressProps {
  createdAt: string;
  expiresIn: string;
  autoUpdate?: boolean;
}

const percent = (value: number) => (value * 100).toFixed(2).concat('%');

export const TaskProgress = ({
  createdAt,
  expiresIn,
  autoUpdate = true,
}: TaskProgressProps) => {
  const progress = useProgress(createdAt, expiresIn, 1, autoUpdate);

  return (
    <div className={classes.taskProgress}>
      <div
        className={classes.taskProgressLine}
        style={{ width: percent(progress) }}
      ></div>
    </div>
  );
};
