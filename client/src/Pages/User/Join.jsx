import React from "react";
import { useNavigate } from "react-router-dom";

function Join() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "100px", textAlign: "center" }}>
      <h2>Join As</h2>

      <button onClick={() => navigate("/user/signup")}>
        Join as User
      </button>

      <br /><br />

      <button onClick={() => navigate("/lawyer/signup")}>
        Join as Lawyer
      </button>
    </div>
  );
}

export default Join;
