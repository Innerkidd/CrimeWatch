import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const AdminRoute: React.FC = () => {
  const isAuthenticated = !!localStorage.getItem('token');
  const userString = localStorage.getItem('user');
  
  let isAdmin = false;
  if (userString) {
    try {
      const user = JSON.parse(userString);
      isAdmin = user.role === 'admin';
    } catch (e) {
      console.error('Failed to parse user role', e);
    }
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
