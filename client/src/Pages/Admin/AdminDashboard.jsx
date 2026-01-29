import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../Components/Admin/AdminSidebar";
import AdminStatsCard from "../../Components/Admin/AdminStatsCard";
import AdminNotifications from "../../Components/Admin/AdminNotifications";
import "../../Styles/Admin/AdminDashboard.css";

// Dummy stats data (backend baad me replace hoga)
const adminStats = [
  {
    title: "Total Users",
    count: 1240,
    icon: "👤",
    color: "#3b82f6",
  },
  {
    title: "Registered Lawyers",
    count: 320,
    icon: "⚖️",
    color: "#22c55e",
  },
  {
    title: "Law Firms",
    count: 58,
    icon: "🏢",
    color: "#f59e0b",
  },
  {
    title: "Active Cases",
    count: 410,
    icon: "📁",
    color: "#ef4444",
  },
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [adminName] = useState(localStorage.getItem("adminName") || "Admin");

  // Check if admin is logged in
  React.useEffect(() => {
    if (!localStorage.getItem("isAdminLoggedIn")) {
      navigate("/admin/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("adminEmail");
    localStorage.removeItem("adminName");
    localStorage.removeItem("isAdminLoggedIn");
    navigate("/admin/login");
  };

  return (
    <div className="admin-dashboard-wrapper">
      
      {/* 🔹 Sidebar */}
      <AdminSidebar onLogout={handleLogout} />

      {/* 🔹 Main Content */}
      <div className="admin-dashboard-content">

        {/* Header */}
        <div className="admin-dashboard-header">
          <div className="admin-header-left">
            <h1>Welcome, {adminName}!</h1>
            <p>Monitor and manage the entire Adalah legal system</p>
          </div>
          <div className="admin-header-right">
            <button className="admin-logout-btn" onClick={handleLogout}>
              🚪 Logout
            </button>
          </div>
        </div>

        {/* 🔹 Statistics Cards */}
        <div className="admin-stats-grid">
          {adminStats.map((stat, index) => (
            <AdminStatsCard
              key={index}
              title={stat.title}
              count={stat.count}
              icon={stat.icon}
              color={stat.color}
            />
          ))}
        </div>

        {/* 🔹 Quick Access Section */}
        <div className="admin-quick-access">
          <h2>⚡ Quick Actions</h2>
          <div className="admin-quick-actions-grid">
            <button className="quick-action-btn" onClick={() => navigate("/admin/users")}>
              👥 Manage Users
            </button>
            <button className="quick-action-btn" onClick={() => navigate("/admin/lawyers")}>
              ⚖️ Manage Lawyers
            </button>
            <button className="quick-action-btn" onClick={() => navigate("/admin/lawfirms")}>
              🏢 Manage Law Firms
            </button>
            <button className="quick-action-btn" onClick={() => navigate("/admin/cases")}>
              📁 View Cases
            </button>
          </div>
        </div>

        {/* 🔹 Notifications Section */}
        <div className="admin-dashboard-section">
          <h2>🔔 Recent System Notifications</h2>
          <AdminNotifications />
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
