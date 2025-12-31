import React from "react";

// Styles
import "../../Styles/LawFirm/LawFirmDashboard.css";

// Components
import Sidebar from "../../Components/LawFirm/Sidebar";
import DashboardHeader from "../../Components/LawFirm/DashboardHeader";
import StatsCard from "../../Components/LawFirm/StatsCard";
import QuickActions from "../../Components/LawFirm/QuickActions";
import Notifications from "../../Components/LawFirm/Notifications";

const LawFirmDashboard = () => {
  // Sample Data
  const firmName = localStorage.getItem("lawfirmName") || "ABC Law Firm";

  // Stats cards data
  const stats = [
    { title: "Total Lawyers", value: 12, icon: "👨‍⚖️", description: "Currently active lawyers" },
    { title: "New Case Requests", value: 5, icon: "📂", description: "Pending new cases" },
    { title: "Ongoing Cases", value: 8, icon: "⚖️", description: "Cases in progress" },
    { title: "Completed Cases", value: 20, icon: "✅", description: "Cases completed successfully" },
  ];

  // QuickActions buttons
  const actions = [
    { title: "Manage Lawyers", icon: "👨‍⚖️", description: "Add / Remove / Update lawyers", navigateTo: "/lawfirm/manage-lawyers" },
    { title: "View Cases", icon: "📂", description: "See all case requests", navigateTo: "/lawfirm/case-requests" },
    { title: "Assign Case", icon: "⚖️", description: "Assign cases to lawyers", navigateTo: "/lawfirm/assign-case" },
    { title: "Notifications", icon: "🔔", description: "Check new updates", navigateTo: "/lawfirm/notifications" },
  ];

  // Sample notifications
  const sampleNotifications = [
    { title: "New Case Request", message: "User John Doe submitted a new case request", time: "2 hours ago", icon: "📂" },
    { title: "Case Assigned", message: "Case #102 assigned to lawyer Ahmed", time: "5 hours ago", icon: "👨‍⚖️" },
    { title: "Case Completed", message: "Case #98 has been marked completed", time: "1 day ago", icon: "✅" }
  ];

  return (
    <div className="lawfirm-dashboard-wrapper">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="lawfirm-dashboard-container">
        {/* Dashboard Header */}
        <DashboardHeader firmName={firmName} />

        {/* Stats Cards */}
        <div className="lawfirm-dashboard-stats">
          {stats.map((stat, index) => (
            <StatsCard
              key={index}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              description={stat.description}
            />
          ))}
        </div>

        {/* Quick Actions */}
        <QuickActions actions={actions} />

        {/* Notifications */}
        <Notifications notifications={sampleNotifications} />
      </div>
    </div>
  );
};

export default LawFirmDashboard;
