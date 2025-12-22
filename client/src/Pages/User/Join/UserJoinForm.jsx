import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../Styles/User/JoinForms.css";

function UserJoinForm({ setRole }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    caseType: "",
    caseDesc: "",
    city: "",
    urgent: false,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.email ||
      !form.phone ||
      !form.password ||
      !form.confirmPassword ||
      !form.caseType ||
      !form.caseDesc ||
      !form.city
    ) {
      setError("Please fill all required fields");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");
    setSuccess("Account created successfully! Redirecting...");

    console.log("User Join Data:", form);

    setTimeout(() => {
      // ✅ Dashboard open
      navigate("/user/dashboard");
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
        <h2>Join as User</h2>
        <p className="form-subtitle">Create your account and find the right lawyer for your case</p>

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

        <select
          name="caseType"
          value={form.caseType}
          onChange={handleChange}
        >
          <option value="">Select Case Type</option>
          <option value="Family Law">Family Law</option>
          <option value="Criminal">Criminal</option>
          <option value="Property">Property</option>
          <option value="Corporate">Corporate</option>
          <option value="Cyber Crime">Cyber Crime</option>
          <option value="Other">Other</option>
        </select>

        <textarea
          name="caseDesc"
          placeholder="Briefly describe your case"
          value={form.caseDesc}
          onChange={handleChange}
        />

        <input
          type="text"
          name="city"
          placeholder="City / Location"
          value={form.city}
          onChange={handleChange}
        />

        <label className="checkbox">
          <input
            type="checkbox"
            name="urgent"
            checked={form.urgent}
            onChange={handleChange}
          />
          Urgent case
        </label>

        <button type="submit" className="submit-button">Create Account</button>
        <p className="form-footer">
          Already have an account?{" "}
          <span
            className="link-text"
            onClick={() => navigate("/login")}
          >
            Login here
          </span>
        </p>
      </form>
      </div>
    </div>
  );
}

export default UserJoinForm;
