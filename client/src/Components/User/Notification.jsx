import React, { useState } from "react";
import "../../Styles/User/Notification-Enhanced.css";

const notificationsData = [
  { id: 1, message: "New case request from John Doe", time: "2 mins ago", type: "info", icon: "📧", priority: "medium", action: "View Request" },
  { id: 2, message: "Suggested lawyer updated for your case", time: "1 hr ago", type: "success", icon: "⭐", priority: "low", action: "View Suggestions" },
  { id: 3, message: "Case #2024-003 completed successfully", time: "Yesterday", type: "success", icon: "✅", priority: "medium", action: "Review Case" },
  { id: 4, message: "Emergency case assigned: Client XYZ needs immediate attention", time: "Just now", type: "emergency", icon: "🚨", priority: "critical", action: "View Details" },
  { id: 5, message: "Court hearing scheduled for tomorrow at 10:00 AM", time: "3 hrs ago", type: "warning", icon: "📅", priority: "high", action: "Add to Calendar" },
];

const Notification = () => {
  const [dismissedNotifications, setDismissedNotifications] = useState([]);
  const [expandedNotification, setExpandedNotification] = useState(null);

  const handleDismiss = (id) => {
    setDismissedNotifications([...dismissedNotifications, id]);
  };

  const handleViewAction = (id) => {
    console.log(`Action clicked for notification ${id}`);
    // Add action handling here
  };

  const visibleNotifications = notificationsData.filter(
    (note) => !dismissedNotifications.includes(note.id)
  );

  return (
    <div className="notifications-container">
      {visibleNotifications.length === 0 ? (
        <div className="no-notifications">
          <p>✨ All caught up!</p>
          <small>You have no new notifications</small>
        </div>
      ) : (
        <>
          <div className="notifications-header">
            <span className="notification-count">
              {visibleNotifications.length} notification{visibleNotifications.length !== 1 ? "s" : ""}
            </span>
            {visibleNotifications.length > 0 && (
              <button 
                className="clear-all-btn"
                onClick={() => setDismissedNotifications(notificationsData.map(n => n.id))}
              >
                Clear All
              </button>
            )}
          </div>
          
          <div className="notifications-list">
            {visibleNotifications.map((note) => (
              <div
                key={note.id}
                className={`notification-card notification-${note.type} priority-${note.priority} ${
                  expandedNotification === note.id ? "expanded" : ""
                }`}
                onClick={() => setExpandedNotification(expandedNotification === note.id ? null : note.id)}
              >
                {/* Priority Indicator */}
                <div className={`priority-indicator priority-${note.priority}`}></div>

                {/* Icon */}
                <div className="notification-icon-wrapper">
                  <span className="notification-icon">{note.icon}</span>
                </div>

                {/* Content */}
                <div className="notification-content">
                  <p className="notification-message">{note.message}</p>
                  <span className="notification-time">
                    <span className="time-dot">•</span> {note.time}
                  </span>
                </div>

                {/* Action Button */}
                <button 
                  className="notification-action-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleViewAction(note.id);
                  }}
                  title={note.action}
                >
                  {note.action}
                </button>

                {/* Emergency Indicator Badge */}
                {note.type === "emergency" && (
                  <div className="emergency-badge">
                    <span className="pulse-dot"></span>
                    URGENT
                  </div>
                )}

                {/* Dismiss Button */}
                <button
                  className="dismiss-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDismiss(note.id);
                  }}
                  title="Dismiss notification"
                  aria-label="Dismiss"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Notification;
