import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element: Element }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return Element;
};

export default ProtectedRoute;
