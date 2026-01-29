import React, { useState } from "react";
import "./AdminNotifications.css";

const AdminNotifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New User Registered",
      message: "A new user account has been created.",
      time: "2 minutes ago",
      type: "info",
    },
    {
      id: 2,
      title: "Lawyer Approved",
      message: "Lawyer profile has been approved by admin.",
      time: "1 hour ago",
      type: "success",
    },
    {
      id: 3,
      title: "New Case Submitted",
      message: "A new legal case has been submitted by a user.",
      time: "Today",
      type: "warning",
    },
  ]);

  const removeNotification = (id) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  return (
    <div className="admin-notifications">
      <h3 className="admin-notifications-title">🔔 Recent Notifications</h3>

      {notifications.length === 0 ? (
        <p className="admin-no-notifications">No new notifications</p>
      ) : (
        <ul className="admin-notifications-list">
          {notifications.map((note) => (
            <li
              key={note.id}
              className={`admin-notification-item ${note.type}`}
            >
              <div className="admin-notification-content">
                <strong>{note.title}</strong>
                <p>{note.message}</p>
                <span className="admin-notification-time">
                  {note.time}
                </span>
              </div>

              <button
                className="admin-notification-close"
                onClick={() => removeNotification(note.id)}
              >
                ✖
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminNotifications;
