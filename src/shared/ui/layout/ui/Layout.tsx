import { Container } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import { ToTop } from '../..';

export const Layout = () => {
  return (
    <Container p="xl">
      <Outlet />
      <ToTop />
    </Container>
  );
};
