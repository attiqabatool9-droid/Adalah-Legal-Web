import React, { useState } from "react";
import "../../Styles/User/Chat.css";

const Chat = () => {
  // 🔹 Dummy lawyer info (normally backend se aata)
  const lawyer = {
    name: "Adv. Ahmed Raza",
    specialization: "Family Law",
    status: "Online",
  };

  // 🔹 Chat messages (dummy)
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "lawyer",
      text: "Hello Laiba, I have reviewed your case request. How can I help you?",
      time: "10:00 AM",
    },
    {
      id: 2,
      sender: "user",
      text: "Hello sir, I need guidance regarding my family matter.",
      time: "10:02 AM",
    },
  ]);

  const [newMessage, setNewMessage] = useState("");

  // 🔹 Send message handler
  const handleSend = () => {
    if (newMessage.trim() === "") return;

    const message = {
      id: messages.length + 1,
      sender: "user",
      text: newMessage,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages([...messages, message]);
    setNewMessage("");

    // 🔹 Dummy auto-reply from lawyer (for demo)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 2,
          sender: "lawyer",
          text: "Thank you for the details. I will guide you step by step.",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    }, 1500);
  };

  return (
    <div className="chat-page">
      
      {/* 🔹 Chat Header */}
      <div className="chat-header">
        <div>
          <h3>{lawyer.name}</h3>
          <p>{lawyer.specialization}</p>
        </div>
        <span className="status">{lawyer.status}</span>
      </div>

      {/* 🔹 Messages Area */}
      <div className="chat-messages">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`chat-message ${
              msg.sender === "user" ? "user-msg" : "lawyer-msg"
            }`}
          >
            <p>{msg.text}</p>
            <span className="time">{msg.time}</span>
          </div>
        ))}
      </div>

      {/* 🔹 Input Area */}
      <div className="chat-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={handleSend}>Send</button>
      </div>

    </div>
  );
};

export default Chat;
