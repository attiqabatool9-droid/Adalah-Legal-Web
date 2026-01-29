import React, { useState } from "react";
import ChatbotWindow from "./ChatbotWindow";
import "./ChatbotIcon.css";


const ChatbotIcon = () => {
  // state to control chatbot open / close
  const [isOpen, setIsOpen] = useState(false);

  // toggle function
  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Floating Chatbot Icon */}
      <div className="chatbot-icon" onClick={toggleChatbot}>
        💬
      </div>

      {/* Chatbot Window */}
      {isOpen && <ChatbotWindow closeChatbot={toggleChatbot} />}
    </>
  );
};

export default ChatbotIcon;
