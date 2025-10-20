import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode(token);
    if (decoded.user.role !== 'Admin') {
      // If the user is not an admin, redirect them to their own dashboard
      return <Navigate to="/dashboard" replace />;
    }
  } catch (error) {
    // If token is invalid, redirect to login
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AdminRoute;