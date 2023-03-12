import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthContext } from '#utils/firebase/hooks';

export const RequireAuthRoute = () => {
  const location = useLocation();
  const { currentUser } = useAuthContext();

  return currentUser ? (
    <Outlet />
  ) : (
    <Navigate to={{ pathname: '/login' }} state={{ from: location }} />
  );
};
