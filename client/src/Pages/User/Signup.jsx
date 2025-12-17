import React from "react";
import { Link } from "react-router-dom";
//import "../Styles/Signup.css";

const Signup = () => {
  return (
    <div className="auth-container">
      <div className="auth-box">
        
        <h2 className="auth-title">Create Your Account</h2>
        <p className="auth-subtitle">
          Join Adalah Legal App to connect with verified lawyers,
          submit your legal issues, and receive professional assistance.
        </p>

        <form className="auth-form">
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Create a password"
              required
            />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm your password"
              required
            />
          </div>

          <button type="submit" className="auth-btn">
            Sign Up
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account?{" "}
            <Link to="/Login" className="auth-link">
              Login
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Signup;
