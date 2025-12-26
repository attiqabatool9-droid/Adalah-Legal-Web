import React, { useState } from "react";
import "../../Styles/Lawyer/LawyerNotification-Enhanced.css";

// Dummy notification data
const dummyNotifications = [
  { id: 1, message: "New case request from Laiba Mubeen", date: "2025-12-20" },
  { id: 2, message: "Document uploaded by Ali Khan", date: "2025-12-19" },
  { id: 3, message: "Case with Sara Ahmed marked as completed", date: "2025-12-18" },
];

const LawyerNotifications = () => {
  const [notifications, setNotifications] = useState(dummyNotifications);

  // Mark as read (optional)
  const markAsRead = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <div className="lawyer-notifications">
      <h3>📢 Recent Notifications</h3>
      {notifications.length === 0 ? (
        <p>No new notifications</p>
      ) : (
        <ul>
          {notifications.map((n) => (
            <li key={n.id}>
              <div className="notification-icon-wrapper">🔔</div>
              <div className="notification-content">
                <span>{n.message}</span>
                <small>{n.date}</small>
              </div>
              <button onClick={() => markAsRead(n.id)}>Mark Read</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LawyerNotifications;
