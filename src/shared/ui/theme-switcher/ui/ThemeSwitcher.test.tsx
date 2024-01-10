import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-utils';
import { ThemeSwitcher } from '.';
import { useMantineColorScheme } from '@mantine/core';

const DemoComponent = () => {
  const { colorScheme } = useMantineColorScheme();

  return (
    <>
      <ThemeSwitcher />
      <div data-testid="colorScheme">{colorScheme}</div>
    </>
  );
};

describe('ThemeSwitcher', () => {
  test('render', () => {
    render(<ThemeSwitcher />);

    expect(screen.getByText('Светлая')).toBeDefined();
    expect(screen.getByText('Тёмная')).toBeDefined();
    expect(screen.getByText('Авто')).toBeDefined();
  });

  test('change theme to light', () => {
    render(<DemoComponent />);

    screen.getByText('Светлая').closest('label')?.click();

    expect(screen.getByTestId('colorScheme').textContent).toBe('light');
  });

  test('change theme to dark', () => {
    render(<DemoComponent />);

    screen.getByText('Тёмная').closest('label')?.click();

    expect(screen.getByTestId('colorScheme').textContent).toBe('dark');
  });

  test('change theme to auto', () => {
    render(<DemoComponent />);

    screen.getByText('Авто').closest('label')?.click();

    expect(screen.getByTestId('colorScheme').textContent).toBe('auto');
  });
});
