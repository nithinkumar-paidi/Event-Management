import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedAdminRoute = ({ children }) => {
  // Check for admin-specific token instead of general token
  const adminToken = localStorage.getItem('adminToken');

  if (!adminToken) {
    // Redirect to admin login if no admin token exists
    return <Navigate to="/admin/login" replace />;
  }

  // If admin token exists, render the protected content
  return children;
};

export default ProtectedAdminRoute;