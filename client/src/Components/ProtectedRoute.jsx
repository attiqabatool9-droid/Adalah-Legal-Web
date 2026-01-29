import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
  // 1. Hum check karenge ke "userInfo" (Asli data) hai ya nahi?
  // ("isLoggedIn" kabhi kabhi galti se true reh jata hai, par userInfo sahi batata hai)
  const user = localStorage.getItem("userInfo");

  // 2. Agar User ka data nahi mila (Matlab Logout hai)
  if (!user) {
    // To wapis Login page par bhej do
    return <Navigate to="/login" replace />;
  }

  // 3. Agar data hai, to Page kholo
  return element;
};

export default ProtectedRoute;