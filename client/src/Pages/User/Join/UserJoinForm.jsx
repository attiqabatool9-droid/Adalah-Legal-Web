import React, { useState } from "react";
import "./JoinForms.css";

function UserJoinForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    caseDesc: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.caseDesc) {
      setError("Please fill all fields");
      return;
    }

    setError("");
    console.log("User Form Data:", form);
    alert("User case submitted successfully!");
  };

  return (
    <div className="join-container">
      <h2>User Case Form</h2>

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

      <textarea
        name="caseDesc"
        placeholder="Describe your case"
        value={form.caseDesc}
        onChange={handleChange}
      />

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default UserJoinForm;
