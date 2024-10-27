import React from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ element, allowedRoles, userRole }) => {
  // Check if user has one of the allowed roles
  if (allowedRoles.includes(userRole)) {
    return element; // Render the protected component
  }

  // If the user is not authorized, redirect to login or another page
  return <Navigate to="/login" />;
};

//  default ProtectedRoute;
