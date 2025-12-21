import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../Styles/User/Login.css";

const Login = () => {
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

    console.log("Login Data:", form);

    // Store authentication data in localStorage
    localStorage.setItem("authToken", "user_token_" + Date.now());
    localStorage.setItem("userEmail", form.email);
    localStorage.setItem("userName", form.email.split("@")[0]);
    localStorage.setItem("isLoggedIn", "true");

    alert("Login successful");

    // ✅ Dashboard open
    navigate("/user/dashboard");
  };

  return (
    <div className="login-container">
      <h2>User Login</h2>

      {error && <div className="error">{error}</div>}

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
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

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
