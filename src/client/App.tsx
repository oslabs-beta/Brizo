import React from 'react';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import ViewStructure from './components/ViewStructure';
import ViewNamespace from './components/ViewNamespace';
import ViewCluster from './components/ViewCluster';
import MainContainer from './components/MainContainer';

/**
 * MainContainer: The root for the browser router.
 * Children: Components that will be displayed where the <Outlet> component is
 * provided.
 */

const router = createHashRouter([
  {
    path: '/',
    element: <MainContainer />,
    children: [
      {
        path: '/',
        element: <ViewStructure />
      },
      {
        path: '/namespace',
        element: <ViewNamespace />
      },
      {
        path: '/cluster',
        element: <ViewCluster />
      }
    ]
  }
]);

const App = () => {
  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
