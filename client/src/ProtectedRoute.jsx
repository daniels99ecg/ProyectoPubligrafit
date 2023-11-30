import React from 'react';
import { Navigate , Route } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ element }) => {
  const token = Cookies.get('token');

  if (!token) {
    // Redirige a la página de inicio de sesión si no hay token
 
   
    return <Navigate to="/" />;
  }

  // Renderiza el componente protegido si hay un token
  return element;
};

export default ProtectedRoute;
