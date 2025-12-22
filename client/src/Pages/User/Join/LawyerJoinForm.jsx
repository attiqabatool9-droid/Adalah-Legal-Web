import React, { useState } from "react";
// import "./JoinForms.css";
import "../../../Styles/User/JoinForms.css";

function LawyerJoinForm({ setRole }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    specialization: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.specialization) {
      setError("Please fill all fields");
      return;
    }

    setError("");
    setSuccess("Registration successful! Redirecting...");
    console.log("Lawyer Form Data:", form);
    
    setTimeout(() => {
      // Redirect to dashboard or success page
      window.location.href = "/lawyer/dashboard";
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
        <h2>Lawyer Registration</h2>
        <p className="form-subtitle">Register your legal practice and connect with clients</p>

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
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />

          <input
            type="text"
            name="specialization"
            placeholder="Specialization (e.g., Family Law, Corporate Law)"
            value={form.specialization}
            onChange={handleChange}
          />

          <button type="submit" className="submit-button">Register as Lawyer</button>
        </form>
      </div>
    </div>
  );
}

export default LawyerJoinForm;
