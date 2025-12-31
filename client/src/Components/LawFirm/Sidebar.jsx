import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../../Styles/LawFirm/LawFirmDashboard.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    navigate("/lawfirm/logout");
  };

  const links = [
    { title: "Dashboard", icon: "🏠", path: "/lawfirm/dashboard" },
    { title: "Manage Lawyers", icon: "👨‍⚖️", path: "/lawfirm/manage-lawyers" },
    { title: "View Cases", icon: "📂", path: "/lawfirm/case-requests" },
    { title: "Assign Case", icon: "⚖️", path: "/lawfirm/assign-case" },
    { title: "Notifications", icon: "🔔", path: "/lawfirm/notifications" },
    { title: "Profile / Settings", icon: "👤", path: "/lawfirm/profile" },
  ];

  return (
    <div className="lawfirm-sidebar">
      <h2>🏢 Law Firm</h2>

      <div className="lawfirm-sidebar-links">
        {links.map((link, index) => {
          const isActive = location.pathname === link.path;
          return (
            <div
              key={index}
              className={`lawfirm-sidebar-link ${isActive ? "active" : ""}`}
              onClick={() => navigate(link.path)}
            >
              <span>{link.icon}</span>
              <span>{link.title}</span>
            </div>
          );
        })}
      </div>

      {/* Logout */}
      <div className="lawfirm-sidebar-logout" onClick={handleLogout}>
        <span>🚪</span>
        <span>Logout</span>
      </div>
    </div>
  );
};

export default Sidebar;
