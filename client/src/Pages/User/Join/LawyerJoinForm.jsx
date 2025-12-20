import React, { useState } from "react";
import "./JoinForms.css";

function LawyerJoinForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    specialization: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.specialization) {
      setError("Please fill all fields");
      return;
    }

    setError("");
    console.log("Lawyer Form Data:", form);
    alert("Lawyer registered successfully!");
  };

  return (
    <div className="join-container">
      <h2>Lawyer Registration</h2>

      {error && <div className="error">{error}</div>}

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
        placeholder="Specialization"
        value={form.specialization}
        onChange={handleChange}
      />

      <button onClick={handleSubmit}>Register</button>
    </div>
  );
}

export default LawyerJoinForm;
