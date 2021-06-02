import React from 'react';
import { Navigate } from 'react-router-dom';
import { ProtectedRoute, AdminOnlyRoute } from './Type';
import AuthLayout from '../layout/Auth';
import DashboardLayout from '../layout/DashboardLayout';
import Login from '../pages/login';
import Register from '../pages/login/register';
import UserList from '../pages/list';

const routes = [
  {
    path: 'app',
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: 'users',
        element: (
          <AdminOnlyRoute>
            <UserList />
          </AdminOnlyRoute>
        ),
      },
    ],
  },
  // {
  //   path: '/home',
  //   element: <Landing />,
  // },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      // { path: '404', element: <NotFound /> },
      { path: '/', element: <Navigate to="/app/users" /> },
      // { path: '*', element: <Navigate to="/404" /> },
    ],
  },
];
export default routes;
