import { type CSSProperties } from 'react';
import {
  IconHourglassHigh,
  IconHourglassEmpty,
  IconHourglassLow,
} from '@tabler/icons-react';
import { type TaskPriority } from '@/shared/types';

export interface TaskPriorityIconProps {
  variant: TaskPriority;
}

export const TaskPriorityIcon = ({ variant }: TaskPriorityIconProps) => {
  const style: CSSProperties = {
    flexShrink: 0,
  };

  if (variant === 'HIGH') {
    return <IconHourglassHigh style={style} />;
  }

  if (variant === 'NORMAL') {
    return <IconHourglassEmpty style={style} />;
  }

  if (variant === 'LOW') {
    return <IconHourglassLow style={style} />;
  }

  return null;
};
