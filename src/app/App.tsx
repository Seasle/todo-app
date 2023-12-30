import { Notifications } from '@mantine/notifications';
import {
  ThemeProvider,
  DateProvider,
  ModalProvider,
  Routing,
} from './providers';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/spotlight/styles.css';
import '@mantine/notifications/styles.css';
import './index.css';

export const App = () => {
  return (
    <ThemeProvider>
      <Notifications />
      <DateProvider>
        <ModalProvider>
          <Routing />
        </ModalProvider>
      </DateProvider>
    </ThemeProvider>
  );
};
