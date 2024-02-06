import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';

import Login from './pages/Login';
import Home from './pages/Home';
import Page404 from './pages/errors/Page404';

import PrivateRoute from './utils/router/privateRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Page404 />,
    children: [
      {
        path: '/',
        element: <PrivateRoute />,
        children: [
          {
            path: '',
            element: <Home />,
          },
        ],
      },
      // AUTH =====================
      {
        path: '/login',
        element: <Login />,
      },
      // ==========================
      {
        path: '*',
        element: <Page404 />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
