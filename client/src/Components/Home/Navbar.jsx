// src/components/Navbar.jsx
import React, { useState } from "react";   // 🔹 useState ADD
import { NavLink } from "react-router-dom";
import "../../Styles/Home/Navbar.css";
import logo from "../../assets/logo2.jpeg";

const Navbar = () => {
  // 🔹 state for dropdown
  const [showJoinOptions, setShowJoinOptions] = useState(false);

  return (
    <nav className="navbar">
      {/* Logo + Name */}
      <div className="navbar-logo">
        <img src={logo} alt="Adalah Logo" className="logo-img" />
        <div className="logo-text">
          <h2 className="main-title">
            <span className="gold-letter">A</span>
            <span className="gold-letter">D</span>
            ALAH
          </h2>
          <p className="sub-title">
            Advosacy, Defence & Legal Assistance Hub
          </p>
        </div>
      </div>

      {/* Navigation Links */}
      <ul className="navbar-links">
        <li>
          <NavLink to="/" className={({ isActive }) => (isActive ? "active-link" : "")}>
            Home
          </NavLink>
        </li>

        <li>
          <NavLink to="/find-lawyer" className={({ isActive }) => (isActive ? "active-link" : "")}>
            Find Lawyer
          </NavLink>
        </li>

        <li>
          <NavLink to="/law-firms" className={({ isActive }) => (isActive ? "active-link" : "")}>
            Law Firms
          </NavLink>
        </li>

        <li>
          <NavLink to="/chatbot" className={({ isActive }) => (isActive ? "active-link" : "")}>
            Chatbot
          </NavLink>
        </li>
      </ul>

      {/* 🔽 JOIN BUTTON + DROPDOWN (ONLY CHANGE AREA) */}
      <div className="navbar-auth">
        <button
          className="login-btn"
          onClick={() => setShowJoinOptions(!showJoinOptions)}
        >
          Join
        </button>

        {showJoinOptions && (
          <div className="join-dropdown">
            <NavLink to="/join-user" className="join-option">
              Join as User
            </NavLink>

            <NavLink to="/join-lawyer" className="join-option">
              Join as Lawyer
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
