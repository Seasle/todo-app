import { type CSSProperties } from 'react';
import { useMantineTheme } from '@mantine/core';
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
  const theme = useMantineTheme();
  const style: CSSProperties = {
    flexShrink: 0,
  };

  if (variant === 'HIGH') {
    return <IconHourglassHigh style={style} color={theme.colors.red[6]} />;
  }

  if (variant === 'NORMAL') {
    return <IconHourglassEmpty style={style} color={theme.colors.yellow[6]} />;
  }

  if (variant === 'LOW') {
    return <IconHourglassLow style={style} color={theme.colors.indigo[6]} />;
  }

  return null;
};
