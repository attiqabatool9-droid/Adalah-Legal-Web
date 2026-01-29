import React, { useState } from "react";
import "./ChatInput.css";

const ChatInput = ({ onSendMessage }) => {
  const [input, setInput] = useState("");

  // Handle send button or Enter key
  const handleSend = () => {
    if (input.trim() === "") return; // ignore empty messages
    onSendMessage(input); // send to parent
    setInput(""); // clear input after sending
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat-input-container">
      <input
        type="text"
        placeholder="Type your message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleKeyPress}
        className="chat-input-box"
      />
      <button onClick={handleSend} className="chat-send-button">
        ➤
      </button>
    </div>
  );
};

export default ChatInput;
