import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../../Styles/Lawyer/LawyerSidebar-Enhanced.css";

const LawyerSidebar = () => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const lawyerName = localStorage.getItem("lawyerName") || "Lawyer";
  const unreadNotifications = 3; // This can be dynamic from state management

  const handleLogout = () => {
    navigate("/user/logout");
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const navigationItems = [
    { path: "/lawyer/dashboard", label: "Dashboard", icon: "📊" },
    { path: "/lawyer/profile", label: "My Profile", icon: "👤" },
    { path: "/lawyer/requests", label: "Case Requests", icon: "📋", badge: 5 },
    { path: "/lawyer/assigned-cases", label: "Assigned Cases", icon: "📂", badge: 2 },
    { path: "/lawyer/chat", label: "Inbox / Chat", icon: "💬", badge: unreadNotifications },
    { path: "/lawyer/availability", label: "Availability & Fees", icon: "⏰" },
    { path: "/lawyer/appointments", label: "Appointments", icon: "📅" },

  ];

  return (
    <div className={`lawyer-sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        <h2>⚖️ Lawyer Panel</h2>
        <button className="sidebar-toggle" onClick={toggleSidebar} title={isCollapsed ? "Expand" : "Collapse"}>
          {isCollapsed ? "→" : "←"}
        </button>
      </div>

      {!isCollapsed && (
        <div className="sidebar-profile-preview">
          <div className="profile-avatar-small">👨‍⚖️</div>
          <p className="profile-name">{lawyerName}</p>
          <span className="profile-status">🟢 Online</span>
        </div>
      )}

      <ul className="sidebar-links">
        {navigationItems.map((item) => (
          <li key={item.path}>
            <NavLink 
              to={item.path} 
              className={({isActive}) => `sidebar-link ${isActive ? "active-link" : ""}`}
              title={isCollapsed ? item.label : ""}
            >
              <span className="link-icon">{item.icon}</span>
              {!isCollapsed && <span className="link-label">{item.label}</span>}
              {!isCollapsed && item.badge && <span className="link-badge">{item.badge}</span>}
            </NavLink>
          </li>
        ))}
      </ul>

      {!isCollapsed && (
        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogout}>🚪 Logout</button>
        </div>
      )}
      
      {isCollapsed && (
        <div className="sidebar-footer-collapsed">
          <button className="logout-btn-icon" onClick={handleLogout} title="Logout">🚪</button>
        </div>
      )}
    </div>
  );
};

export default LawyerSidebar;
