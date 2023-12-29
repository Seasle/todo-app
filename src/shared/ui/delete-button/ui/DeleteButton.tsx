import { useState, useCallback, useRef, memo } from 'react';
import { ActionIcon, type MantineColor } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';

export interface DeleteButtonProps {
  delay?: number;
  idleColor?: MantineColor;
  confirmColor?: MantineColor;
  onClick?: () => void;
}

export const DeleteButton = memo(
  ({
    delay = 1000,
    idleColor = 'blue',
    confirmColor = 'red',
    onClick,
  }: DeleteButtonProps) => {
    const [color, setColor] = useState<MantineColor>(idleColor);
    const isClicked = useRef(false);
    const timeout = useRef<number | undefined>(undefined);

    const onDelete = useCallback(() => {
      if (!isClicked.current) {
        setColor(confirmColor);
        isClicked.current = true;

        timeout.current = window.setTimeout(() => {
          setColor(idleColor);
          isClicked.current = false;
        }, delay);
      } else {
        setColor(idleColor);
        isClicked.current = false;

        window.clearTimeout(timeout.current);

        onClick?.();
      }
    }, [delay, idleColor, confirmColor, onClick]);

    return (
      <ActionIcon color={color} onClick={onDelete}>
        <IconTrash />
      </ActionIcon>
    );
  },
);

DeleteButton.displayName = 'DeleteButton';
