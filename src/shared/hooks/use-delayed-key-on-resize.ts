import { useState, useEffect } from 'react';
import { useResizeObserver, useDebouncedValue } from '@mantine/hooks';
import { nanoid } from 'nanoid';

/**
 * https://github.com/mantinedev/mantine/issues/3330
 */
export const useDelayedKeyOnResize = (delay = 0) => {
  const [key, setKey] = useState(nanoid());
  const [ref, rect] = useResizeObserver();
  const [debouncedRect] = useDebouncedValue(rect, delay);

  useEffect(() => {
    setKey(nanoid());
  }, [debouncedRect]);

  return { ref, key };
};
