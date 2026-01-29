import React from "react";
import "./AdminStatsCard.css";

const AdminStatsCard = ({ title, count, icon, color }) => {
  return (
    <div className="admin-stats-card" style={{ borderLeft: `5px solid ${color}` }}>
      
      {/* Icon Section */}
      <div className="stats-icon" style={{ color }}>
        {icon}
      </div>

      {/* Text Section */}
      <div className="stats-content">
        <h4 className="stats-title">{title}</h4>
        <p className="stats-count">{count}</p>
      </div>

    </div>
  );
};

export default AdminStatsCard;
