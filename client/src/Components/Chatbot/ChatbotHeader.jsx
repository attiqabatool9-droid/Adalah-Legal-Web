import React from "react";
import "./ChatbotHeader.css";



const ChatbotHeader = ({ title = "LegalBot", closeChatbot }) => {
  return (
    <div className="chatbot-header">
      <div className="chatbot-header-title">
        <span className="chatbot-title-icon">🤖</span>
        <h3>{title}</h3>
      </div>
      <button className="chatbot-close-btn" onClick={closeChatbot}>
        ✖
      </button>
    </div>
  );
};

export default ChatbotHeader;
