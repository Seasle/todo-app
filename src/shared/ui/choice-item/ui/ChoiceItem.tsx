import { Center } from '@mantine/core';
import { type ChoiceValue } from '@/shared/types';

export interface ChoiceItemProps<T> {
  value: ChoiceValue<T>;
}

export const ChoiceItem = <T,>({ value }: ChoiceItemProps<T>) => {
  if (value.icon !== null) {
    return (
      <Center style={{ gap: 10 }}>
        {value.icon}
        {value.label}
      </Center>
    );
  }

  return value.label;
};
