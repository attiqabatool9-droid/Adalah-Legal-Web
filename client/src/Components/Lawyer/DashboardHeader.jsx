import React from "react";
//import "../../Styles/Lawyer/DashboardHeader.css";

const DashboardHeader = ({ lawyerName = "Adv. John Doe" }) => {
  return (
    <div className="dashboard-header">
      <div className="header-left">
        <h1>Welcome, {lawyerName} 👋</h1>
        <p>Manage your cases, consultations, and messages efficiently.</p>
      </div>
      <div className="header-right">
        <div className="profile-widget">
          <div className="profile-avatar">
            {lawyerName.split(" ").map((n) => n[0]).join("")}
          </div>
          <div className="profile-info">
            <p className="profile-name">{lawyerName}</p>
            <p className="profile-role">Verified Lawyer</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
