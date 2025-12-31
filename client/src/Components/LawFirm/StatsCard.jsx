import React from "react";

// Props: title, value, icon, description
const StatsCard = ({ title, value, icon, description }) => {
  return (
    <div className="lawfirm-stat-card">
      {/* Icon */}
      <div className="lawfirm-stat-icon">
        {icon || "ℹ️"}
      </div>

      {/* Content */}
      <div className="lawfirm-stat-content">
        {/* Title */}
        <p className="lawfirm-stat-label">
          {title}
        </p>

        {/* Value */}
        <p className="lawfirm-stat-value">
          {value}
        </p>

        {/* Short description */}
        {description && (
          <p style={{
            marginTop: "8px",
            fontSize: "0.85rem",
            color: "#E8ECF2",
            textAlign: "center"
          }}>
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default StatsCard;
