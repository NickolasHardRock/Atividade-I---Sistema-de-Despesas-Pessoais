import { Navigate, Outlet } from 'react-router-dom';
import React from 'react';
import { useAuth } from '../contexts/AuthContext';

function PrivateRoute() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div >
        <div >
          <div ></div>
          <p >Carregando...</p>
        </div>
      </div>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

export default PrivateRoute;
