// src/components/Navbar.jsx
import React from "react";
import { NavLink } from "react-router-dom"; // <-- Updated import

import "../../Styles/Home/Navbar.css";


import logo from "../../assets/logo2.jpeg";

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* Logo + Name */}
      <div className="navbar-logo">
        <img src={logo} alt="Adalah Logo" className="logo-img" />

        <div className="logo-text">
          {/* <h2 className="main-title">ADALAH</h2> */}
          <h2 className="main-title">
    <span className="gold-letter">A</span>
    <span className="gold-letter">D</span>
    ALAH
  </h2>
          <p className="sub-title">Advosacy, Defence & Legal Assistance Hub</p>
        </div>
      </div>

      {/* Navigation Links */}
      <ul className="navbar-links">

        <li>
          <NavLink 
            to="/" 
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Home
          </NavLink>
        </li>

        <li>
          <NavLink 
            to="/find-lawyer"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Find Lawyer
          </NavLink>
        </li>

        <li>
          <NavLink 
            to="/law-firms"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Law Firms
          </NavLink>
        </li>

        <li>
          <NavLink 
            to="/chatbot"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Chatbot
          </NavLink>
        </li>

      </ul>

      {/* Login / Signup */}
      <div className="navbar-auth">
        <NavLink to="/login">
          <button className="login-btn">Join</button>
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;