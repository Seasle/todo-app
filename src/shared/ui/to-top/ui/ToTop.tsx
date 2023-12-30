import { Affix, Transition, Button, rem } from '@mantine/core';
import { useViewportSize, useWindowScroll } from '@mantine/hooks';
import { IconArrowUp } from '@tabler/icons-react';

export const ToTop = () => {
  const { width } = useViewportSize();
  const [scroll, scrollTo] = useWindowScroll();

  if (width < 1024) {
    return null;
  }

  return (
    <Affix position={{ bottom: rem(16), right: rem(16) }}>
      <Transition transition="slide-up" mounted={scroll.y > 0}>
        {(styles) => (
          <Button
            style={styles}
            leftSection={
              <IconArrowUp style={{ width: rem(16), height: rem(16) }} />
            }
            onClick={() => scrollTo({ y: 0 })}
          >
            Наверх
          </Button>
        )}
      </Transition>
    </Affix>
  );
};
