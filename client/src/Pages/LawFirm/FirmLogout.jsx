import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../Styles/User/Login.css"; 

const LawFirmLogin = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  // ✅ Saari purani redirection aur useEffect khatam!
  // Ab ye page hamesha khulay ga aur aapki apni email accept karega.

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setError("Please enter your email and password");
      return;
    }

    // ✅ Testing ke liye: Har email/password par login ho jayega
    localStorage.setItem("authToken", "lawfirm_token_" + Date.now());
    localStorage.setItem("lawfirmEmail", form.email);
    localStorage.setItem("lawfirmLoggedIn", "true");
    localStorage.setItem("role", "lawfirm");
    localStorage.setItem("isLoggedIn", "true");

    alert("Login Successful with: " + form.email);
    navigate("/lawfirm/dashboard");
  };

  return (
    <div className="login-container">
      <h2>LawFirm Login</h2>
      <p style={{textAlign: 'center', fontSize: '14px', color: '#666', marginBottom: '15px'}}>
        Enter your credentials to access the dashboard
      </p>

      {error && <div className="error" style={{color: 'red', textAlign: 'center', marginBottom: '10px'}}>{error}</div>}

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Your Email Address"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Your Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button type="submit" className="button">
          Login as LawFirm
        </button>
      </form>
    </div>
  );
};

export default LawFirmLogin;