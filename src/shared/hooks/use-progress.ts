import { useState, useEffect, useMemo } from 'react';
import { toDate, clamp } from '@/shared/utils';

const calculateProgress = (start: Date, end: Date) => {
  const duration = end.getTime() - start.getTime();
  if (duration > 0) {
    const now = Date.now() - start.getTime();

    return clamp(0, 1, now / duration);
  }

  return 0;
};

export const useProgress = (
  start: Date | string,
  end: Date | string,
  frequency = 1,
  autoUpdate = true,
) => {
  const [progress, setProgress] = useState(0);
  const preparedStart = useMemo(() => toDate(start), [start]);
  const preparedEnd = useMemo(() => toDate(end), [end]);
  const delay = 1000 / frequency;

  useEffect(() => {
    const duration = preparedEnd.getTime() - preparedStart.getTime();
    if (duration <= 0) {
      return;
    }

    setProgress(calculateProgress(preparedStart, preparedEnd));

    if (autoUpdate) {
      const intervalId = window.setInterval(() => {
        const newProgress = calculateProgress(preparedStart, preparedEnd);
        setProgress(newProgress);

        if (newProgress === 1) {
          window.clearInterval(intervalId);
        }
      }, delay);

      return () => {
        window.clearInterval(intervalId);
      };
    }
  }, [preparedStart, preparedEnd, delay, autoUpdate]);

  return progress;
};
