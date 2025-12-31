import React from "react";

const Notifications = ({ notifications }) => {
  return (
    <div className="lawfirm-notifications-section">
      <h2 className="lawfirm-notifications-title">🔔 Notifications</h2>

      {notifications && notifications.length === 0 ? (
        <p className="lawfirm-empty-state">No notifications yet</p>
      ) : (
        <div className="lawfirm-notifications-list">
          {notifications && notifications.map((notif, index) => (
            <div key={index} className="lawfirm-notification-item">
              {/* Icon */}
              <div className="lawfirm-notification-icon">
                {notif.icon || "🔔"}
              </div>

              {/* Content */}
              <div className="lawfirm-notification-content">
                <p className="lawfirm-notification-title-text">{notif.title}</p>
                <p className="lawfirm-notification-message">{notif.message}</p>
              </div>

              {/* Time */}
              <div className="lawfirm-notification-time">
                {notif.time}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;
