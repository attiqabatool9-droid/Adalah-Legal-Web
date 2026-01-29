import React, { useState } from "react";
import ChatbotIcon from "../../Components/Chatbot/ChatbotIcon";
import ChatbotWindow from "../../Components/Chatbot/ChatbotWindow";
import ChatbotHeader from "../../Components/Chatbot/ChatbotHeader";
import ChatMessage from "../../Components/Chatbot/ChatMessage";
import ChatInput from "../../Components/Chatbot/ChatInput";

import "../../Styles/Chatbot/ChatbotPage.css";


const ChatbotPage = () => {
  // State for opening/closing chatbot window
  const [isOpen, setIsOpen] = useState(false);

  // Messages state
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Welcome to Adalah AI! How can I help you today?" }
  ]);

  // Toggle chatbot window
  const toggleChatbot = () => setIsOpen(!isOpen);

  // Handle sending user message
  const handleSendMessage = (text) => {
    // Add user message
    setMessages((prev) => [...prev, { sender: "user", text }]);

    // Dummy AI response (later backend integration)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "This is a dummy AI response for: " + text }
      ]);
    }, 1000);
  };

  return (
    <div className="chatbot-page-container">
      <h1 style={{ textAlign: "center", marginTop: "30px" }}>
        Adalah AI Legal Assistant
      </h1>
      <p style={{ textAlign: "center", marginBottom: "20px" }}>
        Ask legal questions, check document checklists, or get lawyer recommendations.
      </p>

      {/* Floating Chatbot Icon */}
      <ChatbotIcon toggleChatbot={toggleChatbot} />
      {/* Chatbot Window */}
      {isOpen && (
        <ChatbotWindow
          messages={messages}
          onSendMessage={handleSendMessage}
          closeChatbot={toggleChatbot}
        >
          {/* Sub-components inside ChatbotWindow */}
          <ChatbotHeader closeChatbot={toggleChatbot} />
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <ChatMessage key={index} sender={msg.sender} text={msg.text} />
            ))}
          </div>
          <ChatInput onSendMessage={handleSendMessage} />
        </ChatbotWindow>
      )}
    </div>
  );
};

export default ChatbotPage;