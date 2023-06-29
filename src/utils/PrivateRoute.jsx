import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

const PrivateRoute = ({ children }) => {
  const { authToken } = useAuth();
  if (authToken === false || !authToken) {
    return <Navigate to="/" replace={true} />;
  }
  return children;
};

export default PrivateRoute;
