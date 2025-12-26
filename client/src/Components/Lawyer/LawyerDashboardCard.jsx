import React from "react";
import { useNavigate } from "react-router-dom";
import "../../Styles/Lawyer/LawyerDashboardCard.css";

const LawyerDashboardCard = ({ title, description, icon, link }) => {
  const navigate = useNavigate();

  return (
    <div 
      className="dashboard-card" 
      onClick={() => navigate(link)}
    >
      <div className="card-icon">
        {icon}
      </div>
      <h3 className="card-title">{title}</h3>
      <p className="card-description">{description}</p>
    </div>
  );
};

export default LawyerDashboardCard;
