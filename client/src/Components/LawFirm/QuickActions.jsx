import React from "react";
import { useNavigate } from "react-router-dom";

// Props: actions (array of action objects)
const QuickActions = ({ actions }) => {
  const navigate = useNavigate();

  return (
    <div className="lawfirm-quick-actions">
      {actions.map((action, index) => (
        <div
          key={index}
          className="lawfirm-action-card"
          onClick={() => navigate(action.navigateTo)}
        >
          {/* Icon */}
          <div className="lawfirm-action-icon">
            {action.icon || "⚡"}
          </div>

          {/* Title */}
          <h3 className="lawfirm-action-title">
            {action.title}
          </h3>

          {/* Short Description */}
          {action.description && (
            <p className="lawfirm-action-description">
              {action.description}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default QuickActions;
