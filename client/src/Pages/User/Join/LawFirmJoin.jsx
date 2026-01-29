import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LawFirmSignup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firmName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    address: "",
    experience: "",
    firmType: "",
    registrationFile: null,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({
      ...form,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.firmName || !form.email || !form.phone || !form.password || 
      !form.confirmPassword || !form.address || !form.experience || !form.firmType
    ) {
      setError("Please fill all required fields");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");
    // ✅ Success message updated
    setSuccess("Registration successful! Redirecting to login page...");

    console.log("Law Firm Signup Data sent to backend:", form);

    // ✅ FIX: Ab hum yahan fake login nahi kar rahe. 
    // Sirf success message dikha kar login page par bhej rahe hain.
    setTimeout(() => {
      navigate("/lawfirm/login"); 
    }, 2000);
  };

  return (
    <div className="join-form-wrapper">
      <button className="back-button" onClick={() => navigate("/")} title="Go back">
        ← Back
      </button>

      <div className="join-container">
        <h2>Register Law Firm</h2>
        <p className="form-subtitle">Create a law firm account to manage lawyers</p>

        {error && <div className="error"><span>⚠️</span> {error}</div>}
        {success && <div className="success"><span>✓</span> {success}</div>}

        <form onSubmit={handleSubmit}>
          <input type="text" name="firmName" placeholder="Law Firm Name" value={form.firmName} onChange={handleChange} />
          <input type="email" name="email" placeholder="Official Email Address" value={form.email} onChange={handleChange} />
          <input type="text" name="phone" placeholder="Contact Number" value={form.phone} onChange={handleChange} />
          <input type="text" name="address" placeholder="Office Address" value={form.address} onChange={handleChange} />
          <input type="number" name="experience" placeholder="Years of Experience" value={form.experience} onChange={handleChange} />

          <select name="firmType" value={form.firmType} onChange={handleChange}>
            <option value="">Select Firm Type</option>
            <option value="Family Law">Family Law</option>
            <option value="Criminal Law">Criminal Law</option>
            <option value="Corporate Law">Corporate Law</option>
          </select>

          <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} />
          <input type="password" name="confirmPassword" placeholder="Confirm Password" value={form.confirmPassword} onChange={handleChange} />

          <label className="file-upload">
            Upload Firm Registration / License
            <input type="file" name="registrationFile" onChange={handleChange} />
          </label>

          <button type="submit" className="submit-button">Register Law Firm</button>

          <p className="form-footer">
            Already registered?{" "}
            <span className="link-text" onClick={() => navigate("/lawfirm/login")}>
              Login here
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LawFirmSignup;