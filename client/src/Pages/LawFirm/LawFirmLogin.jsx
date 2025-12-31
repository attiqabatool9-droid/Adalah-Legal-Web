import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../Styles/User/Login.css"; // Reuse same CSS

const LawFirmLogin = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  // ✅ Redirect if already logged in (only on mount, not on every render)
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("lawfirmLoggedIn");
    if (isLoggedIn === "true") {
      // Ensure user was actually logged in before redirecting
      const authToken = localStorage.getItem("authToken");
      const lawfirmEmail = localStorage.getItem("lawfirmEmail");
      if (authToken && lawfirmEmail) {
        navigate("/lawfirm/dashboard");
      }
    }
  }, []);

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

    console.log("Law Firm Login Data:", form);

    // ✅ Store law firm auth data
    localStorage.setItem("authToken", "lawfirm_token_" + Date.now());
    localStorage.setItem("lawfirmEmail", form.email);
    localStorage.setItem("lawfirmName", form.email.split("@")[0]);
    localStorage.setItem("lawfirmLoggedIn", "true");
    localStorage.setItem("role", "lawfirm");
    localStorage.setItem("isLoggedIn", "true");

    alert("Law Firm login successful");

    // ✅ Navigate to dashboard
    navigate("/lawfirm/dashboard");
  };

  return (
    <div className="login-container">
      <h2>LawFirm Login</h2>

      {error && <div className="error">{error}</div>}

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Law Firm Email"
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
          Login as LawFirm
        </button>
      </form>
    </div>
  );
};

export default LawFirmLogin;
