import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../Styles/User/Login.css"; // CSS file

const AdminLogin = () => {
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

    console.log("Admin Login Data:", form);

    // Store authentication data in localStorage
    localStorage.setItem("authToken", "admin_token_" + Date.now());
    localStorage.setItem("adminEmail", form.email);
    localStorage.setItem("adminName", form.email.split("@")[0]);
    localStorage.setItem("isAdminLoggedIn", "true");

    alert("Admin login successful");

    // ✅ Navigate to Admin Dashboard
    navigate("/admin/dashboard");
  };

  return (
    <div className="login-container"> {/* Changed from admin-login-container */}
      <h2>Admin Login</h2>

      {error && <div className="error">{error}</div>}

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Admin Email"
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

        <button type="submit" className="button">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
