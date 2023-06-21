import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ViewStructure from './components/ViewStructure';
import ViewNamespace from './components/ViewNamespace';
import ViewCluster from './components/ViewCluster';
import MainContainer from './components/MainContainer';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainContainer />,
    children: [
      {
        path: '/',
        element: <ViewStructure />,
      },
      {
        path: '/namespace',
        element: <ViewNamespace />
      },
      {
        path: '/cluster',
        element: <ViewCluster />
      },
    ]
  }
])

const App = () => {
  return (
    <RouterProvider router={router}></RouterProvider>
  )
}

export default App