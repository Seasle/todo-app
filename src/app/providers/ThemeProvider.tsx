import { type PropsWithChildren } from 'react';
import { MantineProvider, createTheme } from '@mantine/core';

const theme = createTheme({
  primaryColor: 'green',
});

export const ThemeProvider = ({ children }: PropsWithChildren<unknown>) => {
  return (
    <MantineProvider theme={theme} defaultColorScheme="auto">
      {children}
    </MantineProvider>
  );
};
