import { type PropsWithChildren } from 'react';
import { DatesProvider } from '@mantine/dates';
import 'dayjs/locale/ru';

export const DateProvider = ({ children }: PropsWithChildren<unknown>) => {
  return <DatesProvider settings={{ locale: 'ru' }}>{children}</DatesProvider>;
};
