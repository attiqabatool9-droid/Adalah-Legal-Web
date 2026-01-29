import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import API from "../../api";
import "../../Styles/User/Chat.css";

const UserChat = () => {
  const { lawyerId } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // 🔹 Lawyer info and chat state
  const [lawyer, setLawyer] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);

  // 🔹 Fetch lawyer info and messages on mount
  useEffect(() => {
    const fetchChatData = async () => {
      try {
        setLoading(true);
        
        // Fetch lawyer details
        const lawyerResponse = await API.get(`/api/users/${lawyerId}`);
        setLawyer(lawyerResponse.data);

        // Fetch messages between user and lawyer
        const messagesResponse = await API.get(`/api/messages/${lawyerId}`);
        setMessages(messagesResponse.data || []);
        
        setError(null);
      } catch (err) {
        console.error("Error fetching chat data:", err);
        setError("Failed to load conversation");
      } finally {
        setLoading(false);
      }
    };

    if (lawyerId && user?._id) {
      fetchChatData();
    }
  }, [lawyerId, user?._id]);

  // 🔹 Send message handler
  const handleSend = async () => {
    if (newMessage.trim() === "" || !lawyerId) return;

    try {
      setSending(true);
      const response = await API.post("/api/messages", {
        receiver: lawyerId,
        text: newMessage,
        caseId: null, // Can be passed if needed
      });

      setMessages([...messages, response.data]);
      setNewMessage("");
    } catch (err) {
      console.error("Error sending message:", err);
      setError("Failed to send message");
    } finally {
      setSending(false);
    }
  };

  // 🔹 Handle key press for sending
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !sending) {
      handleSend();
    }
  };

  return (
    <div className="chat-page">
      {/* 🔹 Loading state */}
      {loading ? (
        <div className="loading">Loading conversation...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : lawyer ? (
        <>
          {/* 🔹 Chat Header */}
          <div className="chat-header">
            <div>
              <h3>{lawyer.name}</h3>
              <p>{lawyer.specialization}</p>
            </div>
            <span className="status">Available</span>
          </div>

          {/* 🔹 Messages Area */}
          <div className="chat-messages">
            {messages.length > 0 ? (
              messages.map((msg) => (
                <div
                  key={msg._id}
                  className={`chat-message ${
                    msg.sender === user?._id ? "user-msg" : "lawyer-msg"
                  }`}
                >
                  <p>{msg.text}</p>
                  <span className="time">
                    {new Date(msg.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              ))
            ) : (
              <div className="no-messages">No messages yet. Start the conversation!</div>
            )}
          </div>

          {/* 🔹 Input Area */}
          <div className="chat-input">
            <input
              type="text"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={sending}
            />
            <button onClick={handleSend} disabled={sending || newMessage.trim() === ""}>
              {sending ? "Sending..." : "Send"}
            </button>
          </div>
        </>
      ) : (
        <div className="error-message">Lawyer not found</div>
      )}
    </div>
  );
};

export default UserChat;
