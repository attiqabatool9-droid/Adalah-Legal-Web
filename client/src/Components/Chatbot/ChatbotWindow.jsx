import React, { useState } from "react";
import ChatbotHeader from "./ChatbotHeader";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import "./ChatbotWindow.css";

const ChatbotWindow = ({ closeChatbot }) => {
  // messages state (user + bot)
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello! I am Adalah AI Assistant. How can I help you today?",
    },
  ]);

  // handle user message
  const handleSendMessage = (userText) => {
    // add user message
    const userMessage = {
      sender: "user",
      text: userText,
    };

    setMessages((prev) => [...prev, userMessage]);

    // dummy AI response (temporary)
    setTimeout(() => {
      const botReply = {
        sender: "bot",
        text:
          "Thank you for your message. This is a demo response. AI features will be enabled soon.",
      };

      setMessages((prev) => [...prev, botReply]);
    }, 800);
  };

  return (
    <div className="chatbot-window">
      {/* Header */}
      <ChatbotHeader closeChatbot={closeChatbot} />

      {/* Chat Messages */}
      <div className="chatbot-messages">
        {messages.map((msg, index) => (
          <ChatMessage
            key={index}
            sender={msg.sender}
            text={msg.text}
          />
        ))}
      </div>

      {/* Legal Disclaimer */}
      <div className="chatbot-disclaimer">
        ⚠️ This chatbot provides general legal information only and does not
        constitute legal advice.
      </div>

      {/* Input */}
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatbotWindow;
