import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

export default function AdminRoute({ children }){
  const { user, loading } = useContext(AuthContext);

  if (loading) return null;
  // check admin flag - adapt to your JWT shape
  const isAdmin = user && (user.role === 'admin' || user.isAdmin || user.admin === true);
  if (!isAdmin) return <Navigate to="/login" replace />;
  return children;
}
