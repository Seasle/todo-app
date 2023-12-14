import { AppShell, Container, Flex } from '@mantine/core';
import { useHeadroom } from '@mantine/hooks';
import { Outlet } from 'react-router-dom';
import { ThemeSwitcher, ToTop } from '../..';

export const Layout = () => {
  const pinned = useHeadroom({ fixedAt: 0 });

  return (
    <AppShell header={{ height: 64, collapsed: !pinned, offset: false }}>
      <AppShell.Header>
        <Flex justify="end" align="center" h={64} px="xl">
          <ThemeSwitcher />
        </Flex>
      </AppShell.Header>
      <AppShell.Main pt={64}>
        <Container p="xl">
          <Outlet />
          <ToTop />
        </Container>
      </AppShell.Main>
    </AppShell>
  );
};
