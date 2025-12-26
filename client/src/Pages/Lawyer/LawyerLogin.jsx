import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../Styles/User/Login.css"; 

const LawyerLogin = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setError("Please enter email and password");
      return;
    }

    setError("");

    console.log("Lawyer Login Data:", form);

    // ✅ Store lawyer auth data
    localStorage.setItem("authToken", "lawyer_token_" + Date.now());
    localStorage.setItem("lawyerEmail", form.email);
    localStorage.setItem("lawyerName", form.email.split("@")[0]);
    localStorage.setItem("lawyerLoggedIn", "true");
    localStorage.setItem("role", "lawyer");
    localStorage.setItem("isLoggedIn", "true");

    alert("Lawyer login successful");
    navigate("/lawyer/dashboard");
  };

  return (
    <div className="login-container">
      <h2>Lawyer Login</h2>

      {error && <div className="error">{error}</div>}

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Lawyer Email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />

        <button type="submit" className="button">
          Login as Lawyer
        </button>
      </form>
    </div>
  );
};

export default LawyerLogin;
