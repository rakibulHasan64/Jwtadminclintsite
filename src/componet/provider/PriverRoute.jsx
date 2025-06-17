import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from './useAuth';
import Loddinge from './Loddinge';

function PriverRoute({ children }) {
   const { user, loading } = useAuth();
   const location = useLocation();

   if (loading) {
      return <Loddinge />; 
   }

   if (!user) {
      return <Navigate to="/login" state={{ from: location }} replace />;
   }

   return children;
}

export default PriverRoute;
