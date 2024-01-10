import { type PropsWithChildren, type ReactNode } from 'react';
import { render as internalRender } from '@testing-library/react';
import { ThemeProvider, DateProvider, ModalProvider } from '@/app/providers';

const customWrapper = ({ children }: PropsWithChildren<unknown>) => (
  <ThemeProvider>
    <DateProvider>
      <ModalProvider>{children}</ModalProvider>
    </DateProvider>
  </ThemeProvider>
);

export const render = (ui: ReactNode) => {
  return internalRender(<>{ui}</>, {
    wrapper: customWrapper,
  });
};
