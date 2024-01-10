import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-utils';
import { ChoiceItem } from '.';
import { Icon123 } from '@tabler/icons-react';

describe('ChoiceItem', () => {
  test('render without icon', () => {
    render(<ChoiceItem value={{ value: 1, icon: null, label: 'Simple' }} />);

    expect(screen.getByText('Simple')).toBeDefined();
  });

  test('render with icon', () => {
    const { container } = render(
      <ChoiceItem
        value={{ value: 1, icon: <Icon123 />, label: 'With icon' }}
      />,
    );

    expect(container.querySelector('.tabler-icon')).toBeDefined();
    expect(screen.getByText('With icon')).toBeDefined();
  });
});
