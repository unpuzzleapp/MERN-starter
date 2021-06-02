/* eslint-disable react/prop-types */
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }) => {
  const login = localStorage.getItem('login');
  if (login) {
    return children;
  }
  return <Navigate to="/login" />;
};

export const AdminOnlyRoute = ({ children }) => {
  const role = localStorage.getItem('role');
  if (role === 'owner') {
    return children;
  }
  return <Navigate to="/login" />;
};
export default {};
