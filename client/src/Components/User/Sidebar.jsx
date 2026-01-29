
import React from "react";
import { NavLink } from "react-router-dom";
import "../../Styles/User/Sidebar-Enhanced.css";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">Dashboard</h2>
      <nav className="sidebar-nav">
        <ul>
          <li>
            <NavLink 
              to="/user/find-lawyers" 
              className={({ isActive }) => isActive ? "active-link" : ""}
            >
              ⚖️ Search Lawyers
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/user/suggested-lawyers" 
              className={({ isActive }) => isActive ? "active-link" : ""}
            >
              ⭐ Suggested Lawyers
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/user/requests" 
              className={({ isActive }) => isActive ? "active-link" : ""}
            >
              📁 My Case Requests
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/user/profile" 
              className={({ isActive }) => isActive ? "active-link" : ""}
            >
              👤 Profile Settings
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/user/chat" 
              className={({ isActive }) => isActive ? "active-link" : ""}
            >
              💬 Chat
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/user/logout" 
              className={({ isActive }) => isActive ? "active-link" : ""}
            >
              🚪 Logout
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;