import React from 'react';
import AuthLayout from '../layout/Auth';
import Login from '../pages/login';

const routes = [
  // {
  //   path: 'app',
  //   element: (
  //     <ProtectedRoute>
  //       <DashboardLayout />
  //     </ProtectedRoute>
  //   ),
  //   children: [
  //     { path: 'account', element: <Account /> },
  //     { path: 'customers', element: <CustomerList /> },
  //     { path: 'dashboard', element: <Dashboard /> },
  //     { path: 'products', element: <ProductList /> },
  //     { path: 'settings', element: <Settings /> },
  //     { path: '*', element: <Navigate to="/404" /> },
  //   ],
  // },
  // {
  //   path: '/home',
  //   element: <Landing />,
  // },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      { path: 'login', element: <Login /> },
      // { path: 'register', element: <Register /> },
      // { path: '404', element: <NotFound /> },
      // { path: '/', element: <Navigate to="/app/dashboard" /> },
      // { path: '*', element: <Navigate to="/404" /> },
    ],
  },
];
export default routes;
