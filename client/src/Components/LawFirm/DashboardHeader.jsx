import React from "react";

// Props: firmName
const DashboardHeader = ({ firmName }) => {
  return (
    <div className="lawfirm-dashboard-header">
      <div className="lawfirm-header-left">
        <h1>Welcome, {firmName || "Law Firm"}</h1>
        <p>Manage your lawyers and cases efficiently</p>
      </div>

      {/* Profile Widget */}
      <div className="lawfirm-header-right">
        <div className="lawfirm-profile-widget">
          <div className="lawfirm-profile-avatar">
            {firmName ? firmName.charAt(0).toUpperCase() : "L"}
          </div>
          <div className="lawfirm-profile-info">
            <p className="lawfirm-profile-name">{firmName || "Law Firm"}</p>
            <p className="lawfirm-profile-role">Administrator</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
