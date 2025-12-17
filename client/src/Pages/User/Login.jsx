import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../Styles/User/Login.css";


const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Example simple check (fake login)
    if (email && password) {
      // login success → navigate to dashboard
      navigate("/User/Dashboard"); // ← yahan Dashboard route ka path sahi ho
    } else {
      alert("Please enter email and password");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Welcome Back to Adalah Legal App</h2>
        <p>Login to access your dashboard, search lawyers, and manage your legal requests.</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <input 
              type="email" 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              placeholder="Enter your password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          <button type="submit" className="auth-btn">Login</button>
        </form>

        <div className="auth-footer">
          <p>
            Don’t have an account? <Link to="/signup" className="auth-link">Create Account</Link>
          </p>

          <p className="auth-forgot">
            <span>Forgot your password?</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
