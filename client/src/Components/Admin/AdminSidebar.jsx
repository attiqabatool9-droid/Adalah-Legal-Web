import React from "react";
import { NavLink } from "react-router-dom";
import "./AdminSidebar.css";

const AdminSidebar = ({ onLogout }) => {
  return (
    <div className="admin-sidebar">

      {/* 🔹 Logo / Title */}
      <div className="admin-sidebar-header">
        <h2>🏛️ Adalah</h2>
        <p>Admin Panel</p>
      </div>

      {/* 🔹 Navigation Links */}
      <ul className="admin-sidebar-menu">

        <li>
          <NavLink 
            to="/admin/dashboard" 
            className={({ isActive }) =>
              isActive ? "admin-nav-link active-link" : "admin-nav-link"
            }
          >
            📊 Dashboard
          </NavLink>
        </li>

        <li>
          <NavLink 
            to="/admin/users"
            className={({ isActive }) =>
              isActive ? "admin-nav-link active-link" : "admin-nav-link"
            }
          >
            👥 Users
          </NavLink>
        </li>

        <li>
          <NavLink 
            to="/admin/lawyers"
            className={({ isActive }) =>
              isActive ? "admin-nav-link active-link" : "admin-nav-link"
            }
          >
            ⚖️ Lawyers
          </NavLink>
        </li>

        <li>
          <NavLink 
            to="/admin/lawfirms"
            className={({ isActive }) =>
              isActive ? "admin-nav-link active-link" : "admin-nav-link"
            }
          >
            🏢 Law Firms
          </NavLink>
        </li>

        <li>
          <NavLink 
            to="/admin/cases"
            className={({ isActive }) =>
              isActive ? "admin-nav-link active-link" : "admin-nav-link"
            }
          >
            📁 Cases
          </NavLink>
        </li>

      </ul>

      {/* 🔹 Footer */}
      <div className="admin-sidebar-footer">
        {onLogout && (
          <button className="admin-logout-link" onClick={onLogout}>
            🚪 Logout
          </button>
        )}
        <p>© 2025 Adalah Legal</p>
      </div>

    </div>
  );
};

export default AdminSidebar;
