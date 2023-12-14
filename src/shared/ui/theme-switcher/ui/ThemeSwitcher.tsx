import {
  Center,
  SegmentedControl,
  useMantineColorScheme,
  rem,
  type SegmentedControlItem,
} from '@mantine/core';
import {
  IconMoonFilled,
  IconSunFilled,
  IconCircleLetterA,
} from '@tabler/icons-react';

const segmentedData: SegmentedControlItem[] = [
  {
    value: 'light',
    label: (
      <Center style={{ gap: 10 }}>
        <IconSunFilled style={{ width: rem(20), height: rem(20) }} />
        Светлая
      </Center>
    ),
  },
  {
    value: 'dark',
    label: (
      <Center style={{ gap: 10 }}>
        <IconMoonFilled style={{ width: rem(20), height: rem(20) }} />
        Тёмная
      </Center>
    ),
  },
  {
    value: 'auto',
    label: (
      <Center style={{ gap: 10 }}>
        <IconCircleLetterA style={{ width: rem(20), height: rem(20) }} />
        Авто
      </Center>
    ),
  },
];

export const ThemeSwitcher = () => {
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  const onSchemeChange = (value: string) => {
    if (value === 'light' || value === 'dark' || value === 'auto') {
      setColorScheme(value);
    }
  };

  return (
    <SegmentedControl
      value={colorScheme}
      data={segmentedData}
      onChange={onSchemeChange}
    />
  );
};
