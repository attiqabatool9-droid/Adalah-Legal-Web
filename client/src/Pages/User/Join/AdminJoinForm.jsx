import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
//import "../../../Styles/User/JoinForms.css"; // Same CSS file can be used

function AdminJoinForm({ setRole }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields
    if (!form.name || !form.email || !form.phone || !form.password || !form.confirmPassword) {
      setError("Please fill all required fields");
      return;
    }

    // Password match validation
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");
    setSuccess("Admin account created successfully! Redirecting...");

    console.log("Admin Join Data:", form);

    // Redirect to Admin Dashboard after short delay
    setTimeout(() => {
      navigate("/admin/dashboard");
    }, 1500);
  };

  return (
    <div className="join-form-wrapper">
      <button 
        className="back-button"
        onClick={() => setRole("")}
        title="Go back"
      >
        ← Back
      </button>

      <div className="join-container">
        <h2>Join as Admin</h2>
        <p className="form-subtitle">Create your admin account to manage the platform</p>

        {error && <div className="error"><span>⚠️</span> {error}</div>}
        {success && <div className="success"><span>✓</span> {success}</div>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
          />

          <button type="submit" className="submit-button">Create Admin Account</button>

          <p className="form-footer">
            Already have an account?{" "}
            <span
              className="link-text"
              onClick={() => navigate("/admin/login")}
            >
              Login here
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default AdminJoinForm;
