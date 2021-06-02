/* eslint-disable react/prop-types */
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }) => {
  const login = localStorage.getItem('login');
  if (login) {
    return children;
  }
  return <Navigate to="/login" />;
};

export default {};
