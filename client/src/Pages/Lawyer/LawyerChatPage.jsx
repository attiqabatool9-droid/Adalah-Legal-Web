import React, { useState } from "react";
import "../../Styles/Lawyer/LawyerDashboard-Enhanced.css";
import LawyerSidebar from "../../Components/Lawyer/LawyerSidebar";

const LawyerChatComponent = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: "Client", text: "Hello, I need help with my case." },
    { id: 2, sender: "Lawyer", text: "Sure, I am here to assist you." },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() !== "") {
      setMessages([
        ...messages,
        { id: messages.length + 1, sender: "Lawyer", text: input },
      ]);
      setInput("");
    }
  };

  return (
    <div className="lawyer-chat-component">
      <h3>Chat with Clients</h3>
      <div className="chat-messages">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`chat-message ${
              msg.sender === "Lawyer" ? "sent" : "received"
            }`}
          >
            <span className="sender">{msg.sender}:</span> {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

const LawyerChatPage = () => {
  return (
    <div className="lawyer-dashboard-wrapper">
      <LawyerSidebar />
      <div className="lawyer-dashboard-main">
        <div className="section-card">
          <h2>Chat</h2>
          <p className="section-description">
            Communicate with your clients in real time.
          </p>
          <LawyerChatComponent />
        </div>
      </div>
    </div>
  );
};

export default LawyerChatPage;
