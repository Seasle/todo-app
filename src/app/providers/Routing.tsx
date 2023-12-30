import { RouterProvider, Navigate, createHashRouter } from 'react-router-dom';
import { Layout } from '@/shared/ui/layout';

export const Routing = () => {
  const router = createHashRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          index: true,
          lazy: () =>
            import('@/pages/all-tasks-page').then(
              ({ AllTasksPage: Component }) => ({ Component }),
            ),
        },
        {
          path: ':taskId',
          lazy: () =>
            import('@/pages/task-details-page').then(
              ({ TaskDetailsPage: Component }) => ({ Component }),
            ),
        },
        {
          path: '*',
          element: <Navigate to="/" />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};
