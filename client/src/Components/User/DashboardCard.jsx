import React from "react";
import { Link } from "react-router-dom";
//import "../../Styles/User/DashboardCard.css";

const DashboardCard = ({ title, description, icon, link }) => {
  return (
    <div className="dashboard-card">
      
      {/* Icon Section */}
      <div className="dashboard-card-icon">
        {icon}
      </div>
      {/* Content Section */}
      <div className="dashboard-card-content">
        <h3>{title}</h3>
        <p>{description}</p>

        {link && (
          <Link to={link} className="dashboard-card-btn">
            View
          </Link>
        )}
      </div>

    </div>
  );
};

export default DashboardCard;
