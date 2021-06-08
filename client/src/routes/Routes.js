import React from 'react';
import { Navigate } from 'react-router-dom';
import { ProtectedRoute, AdminOnlyRoute } from './Type';
import AuthLayout from '../layout/Auth';
import DashboardLayout from '../layout/DashboardLayout';
//   import Login from '../pages/auth/login';
// import Register from '../pages/auth/register';
import Login from '../pages/login';
import Register from '../pages/signup';
import UserList from '../pages/list';
import Profile from '../pages/auth/profile';
import NotFound from '../pages/error/NotFound';
import { HOME_ROUTE } from '../constant/routes';
import Home from '../pages/home';
import BookASession from '../pages/bookasession';
import ComputerProgramming from '../pages/computerprogramming';
import DigitalSkills from '../pages/digitalskills';
import GradeSchool from '../pages/gradeschool';
import InnocationalEducation from '../pages/innovationineducation';
import PuzzleTweet from '../pages/PuzzleTweet';
import PuzzleWorld from '../pages/puzzleworld';
import Tutoring from '../pages/tutoring';

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
      {
        path: 'profile',
        element: <Profile />,
      },
      { path: '*', element: <Navigate to="/404" /> },
    ],
  },
  {
    path: '/users',
    element: <AuthLayout />,
    children: [{ path: '*', element: <PuzzleTweet /> }],
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      { path: 'puzzleworld', element: <PuzzleWorld /> },
      { path: 'puzzletweet', element: <PuzzleTweet /> },
      { path: 'innovationineducation', element: <InnocationalEducation /> },
      { path: 'gradeschool', element: <GradeSchool /> },
      { path: 'digitalskills', element: <DigitalSkills /> },
      { path: 'computerprogramming', element: <ComputerProgramming /> },
      { path: 'bookASession', element: <BookASession /> },
      { path: 'tutoring', element: <Tutoring /> },
      { path: 'home', element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: '/', element: <Navigate to={HOME_ROUTE} /> },
      { path: '404', element: <NotFound /> },
      { path: '*', element: <Navigate to="/404" /> },
    ],
  },
];
export default routes;
