import React from "react";
import DashboardCard from "../../Components/User/DashboardCard";
import Notification from "../../Components/User/Notification";
import Sidebar from "../../Components/User/Sidebar";

// CSS import agar hai toh uncomment karo
// import "../../Styles/User/Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-wrapper">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Dashboard Content */}
      <div className="dashboard-container">
        
        {/* Greeting Section */}
        <div className="dashboard-header">
          <h1>Welcome, Laiba!</h1>
          <p>
            Access your profile, search lawyers, manage case requests, and stay
            updated with notifications — all in one place.
          </p>
        </div>

        {/* Dashboard Quick Access Cards */}
        <div className="dashboard-cards">
          <DashboardCard
            title="Search Lawyers"
            description="Find lawyers based on your legal case and location."
            icon="⚖️"
            link="/user/find-lawyers" // ✅ Must match App.jsx route
          />
          <DashboardCard
            title="Suggested Lawyers"
            description="Get lawyer recommendations tailored to your needs."
            icon="⭐"
            link="/user/suggested-lawyers"
          />
          <DashboardCard
            title="My Case Requests"
            description="Track the status of your consultation requests."
            icon="📁"
            link="/user/requests"
          />
          <DashboardCard
            title="Profile Settings"
            description="Update your personal details and preferences."
            icon="👤"
            link="/user/profile"
          />
        </div>

        {/* Notifications Section */}
        <div className="dashboard-notifications">
          <h2>Notifications</h2>
          <Notification />
        </div>
        
      </div>
    </div>
  );
};

export default Dashboard;
