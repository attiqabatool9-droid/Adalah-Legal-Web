import React from "react";
import "./ChatMessage.css";

const ChatMessage = ({ sender, text }) => {
  // sender = "user" ya "bot"

  return (
    <div className={`chat-message ${sender === "user" ? "user" : "bot"}`}>
      <p className="message-text">{text}</p>
    </div>
  );
};

export default ChatMessage;
