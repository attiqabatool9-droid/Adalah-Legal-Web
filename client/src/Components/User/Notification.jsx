import React from "react";
//import "../../Styles/User/Notification.css";

const notificationsData = [
  { id: 1, message: "New case request from John Doe", time: "2 mins ago" },
  { id: 2, message: "Suggested lawyer updated for your case", time: "1 hr ago" },
  { id: 3, message: "Case #123 completed successfully", time: "Yesterday" },
];
const Notification = () => {
  return (
    <div className="notifications-container">
      {notificationsData.length === 0 ? (
        <p className="no-notifications">No notifications at the moment.</p>
      ) : (
        notificationsData.map((note) => (
          <div key={note.id} className="notification-card">
            <p className="notification-message">{note.message}</p>
            <span className="notification-time">{note.time}</span>
          </div>
        ))
      )}
    </div>
  );
};

export default Notification;
