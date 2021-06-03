/* eslint-disable react/prop-types */
import { Navigate } from 'react-router-dom';
import { LOGIN_ROUTE, PROFILE_ROUTE } from '../constant/routes';

export const ProtectedRoute = ({ children }) => {
  const login = localStorage.getItem('login');
  if (login) {
    return children;
  }
  return <Navigate to={LOGIN_ROUTE} />;
};

export const AdminOnlyRoute = ({ children }) => {
  const role = localStorage.getItem('role');
  if (role === 'admin') {
    return children;
  }
  return <Navigate to={PROFILE_ROUTE} />;
};
export default {};
