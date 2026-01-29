import React, { useState, useEffect, useRef } from "react";
import "../../Styles/Lawyer/LawyerDashboard-Enhanced.css";
import LawyerSidebar from "../../Components/Lawyer/LawyerSidebar";
import API from "../../api";

const LawyerChatComponent = ({ selectedUserId }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await API.get("/api/users/me");
        setCurrentUser(response.data);
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    };
    fetchCurrentUser();
  }, []);

  useEffect(() => {
    if (selectedUserId) {
      fetchMessages();
    }
  }, [selectedUserId]);

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const response = await API.get(`/api/messages/${selectedUserId}`);
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async () => {
    if (input.trim() === "" || !selectedUserId) return;

    try {
      const response = await API.post("/api/messages", {
        receiverId: selectedUserId,
        text: input,
      });

      setMessages([...messages, response.data]);
      setInput("");
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message");
    }
  };

  return (
    <div className="lawyer-chat-component">
      <h3>Chat with Client</h3>
      {selectedUserId ? (
        <>
          <div className="chat-messages">
            {loading && <p>Loading messages...</p>}
            {messages.map((msg) => (
              <div
                key={msg._id}
                className={`chat-message ${
                  msg.sender._id === currentUser?._id ? "sent" : "received"
                }`}
              >
                <div className="message-content">
                  <span className="sender">{msg.sender.name}:</span>
                  <p>{msg.text}</p>
                  <span className="timestamp">
                    {new Date(msg.createdAt).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type your message..."
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </>
      ) : (
        <p style={{ textAlign: "center", color: "#999" }}>
          Select a conversation to start chatting
        </p>
      )}
    </div>
  );
};

const LawyerChatPage = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    try {
      setLoading(true);
      const response = await API.get("/api/messages/conversations/list");
      setConversations(response.data);
    } catch (error) {
      console.error("Error fetching conversations:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lawyer-dashboard-wrapper">
      <LawyerSidebar />
      <div className="lawyer-dashboard-main">
        <div className="section-card">
          <h2>💬 Chat</h2>
          <p className="section-description">
            Communicate with your clients in real time.
          </p>

          <div style={{ display: "flex", gap: "20px", minHeight: "500px" }}>
            {/* Conversations List */}
            <div style={{
              width: "25%",
              borderRight: "1px solid #ddd",
              paddingRight: "15px",
              overflowY: "auto"
            }}>
              <h4>Conversations</h4>
              {loading ? (
                <p>Loading...</p>
              ) : conversations.length > 0 ? (
                conversations.map((conv) => (
                  <div
                    key={conv.userId}
                    onClick={() => setSelectedUserId(conv.userId)}
                    style={{
                      padding: "10px",
                      margin: "5px 0",
                      borderRadius: "4px",
                      cursor: "pointer",
                      backgroundColor: selectedUserId === conv.userId ? "#e0e7ff" : "#f5f5f5",
                      borderLeft: selectedUserId === conv.userId ? "3px solid #3b82f6" : "none"
                    }}
                  >
                    <p style={{ margin: "0", fontWeight: "600" }}>{conv.userName}</p>
                    <small style={{ color: "#999" }}>{conv.lastMessage?.substring(0, 30)}...</small>
                  </div>
                ))
              ) : (
                <p style={{ color: "#999" }}>No conversations</p>
              )}
            </div>

            {/* Chat Area */}
            <div style={{ flex: 1 }}>
              <LawyerChatComponent selectedUserId={selectedUserId} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LawyerChatPage;
