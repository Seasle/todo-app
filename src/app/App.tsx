import { ThemeProvider } from './providers/ThemeProvider';
import { DateProvider } from './providers/DateProvider';
import { Routing } from './providers/Routing';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/spotlight/styles.css';
import './index.css';

export const App = () => {
  return (
    <ThemeProvider>
      <DateProvider>
        <Routing />
      </DateProvider>
    </ThemeProvider>
  );
};
