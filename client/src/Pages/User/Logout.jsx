import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear any auth tokens / user data here if using
    // localStorage.clear();

    // Redirect to login
    navigate("/login");
  }, [navigate]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Logging out...</h2>
    </div>
  );
};

export default Logout;
