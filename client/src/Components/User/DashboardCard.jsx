import React from "react";
import { Link } from "react-router-dom";
import "../../Styles/User/DashboardCard.css";

const DashboardCard = ({ title, description, icon, link }) => {
  return (
    <div className="dashboard-card">
      {/* Icon Section in Circle */}
      <div className="dashboard-card-icon-wrapper">
        <span className="dashboard-card-icon">{icon}</span>
      </div>

      {/* Content Section */}
      <div className="dashboard-card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{description}</p>

        {link && (
          <Link to={link} className="dashboard-card-btn">
            View Details →
          </Link>
        )}
      </div>
    </div>
  );
};

export default DashboardCard;
