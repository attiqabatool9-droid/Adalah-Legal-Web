import React, { useState } from "react";
import "../../Styles/LawFirm/FirmNotifications.css";

// Components
import Sidebar from "../../Components/LawFirm/Sidebar";

// Dummy notifications data
const initialNotifications = [
  {
    id: 1,
    title: "New Case Request",
    description: "Ali Khan submitted a new property dispute case.",
    date: "2025-12-26 10:30 AM",
    read: false,
  },
  {
    id: 2,
    title: "Case Assigned",
    description: "Family Law case assigned to Advocate Sara.",
    date: "2025-12-25 03:45 PM",
    read: true,
  },
  {
    id: 3,
    title: "New Message from User",
    description: "Bilal Shah sent a message regarding corporate contract.",
    date: "2025-12-24 09:20 AM",
    read: false,
  },
];

function FirmNotifications() {
  const [notifications, setNotifications] = useState(initialNotifications);

  // Mark a notification as read
  const markAsRead = (id) => {
    setNotifications(
      notifications.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  // Delete a notification
  const deleteNotification = (id) => {
    setNotifications(notifications.filter((notif) => notif.id !== id));
  };

  return (
    <div className="notifications-wrapper">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="notifications-container">
        {/* Header */}
        <div className="notifications-header">
          <h2>🔔 Notifications</h2>
          <p>Stay updated with the latest events and activities</p>
        </div>

        {/* Notifications Section */}
        <div className="notifications-section">
          {notifications.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">✨</div>
              <p>No notifications at the moment.</p>
              <p className="empty-state-subtext">
                You're all caught up! Check back later for updates.
              </p>
            </div>
          ) : (
            <div className="notifications-list">
              {notifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`notification-item ${
                    notif.read ? "read" : "unread"
                  }`}
                >
                  <div className="notification-header">
                    <h4 className="notification-title">{notif.title}</h4>
                    <span className="notification-time">{notif.date}</span>
                  </div>

                  <div className="notification-content">
                    <p className="notification-description">
                      {notif.description}
                    </p>

                    <div className="notification-actions">
                      {!notif.read && (
                        <button
                          className="notification-button btn-mark-read"
                          onClick={() => markAsRead(notif.id)}
                        >
                          ✓ Mark as Read
                        </button>
                      )}
                      <button
                        className="notification-button btn-dismiss"
                        onClick={() => deleteNotification(notif.id)}
                      >
                        ✕ Dismiss
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FirmNotifications;
