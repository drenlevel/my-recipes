import React, { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { AuthContext } from '../AuthProvider/AuthProvider';

export const RequireAuthRoute = () => {
  const location = useLocation();
  const { currentUser } = useContext(AuthContext);

  return currentUser ? (
    <Outlet />
  ) : (
    <Navigate to={{ pathname: '/login' }} state={{ from: location }} />
  );
};
