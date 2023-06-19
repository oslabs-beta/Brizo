import React from 'react';
import { Router, Routes, Route, createBrowserRouter, RouterProvider } from 'react-router-dom';
import StructureOverview from './components/StructureOverview';
import MainContainer from './components/MainContainer';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainContainer />,
    children: [
      {
        path: '/structure',
        element: <StructureOverview />,
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