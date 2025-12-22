import React, { useState } from "react";
import UserJoinForm from "./UserJoinForm";
import LawyerJoinForm from "./LawyerJoinForm";

function Join() {
  console.log("JOIN PAGE RENDERED");

  const [role, setRole] = useState("");

  return (
    <div style={{
      minHeight: "100vh",
      display: role ? "flex" : "flex",
      alignItems: role ? "flex-start" : "center",
      justifyContent: "center",
      padding: "20px",
      background: "linear-gradient(135deg, #0b1d36 0%, #132f57 100%)",
      overflow: role ? "auto" : "hidden",
      paddingTop: role ? "30px" : "20px"
    }}>
      {!role && (
        <div style={{
          textAlign: "center",
          color: "#ffffff"
        }}>
          <h2 style={{
            fontSize: "32px",
            marginBottom: "40px",
            color: "#f5c451",
            letterSpacing: "1px"
          }}>Choose Your Role</h2>

          <button
            type="button"
            onClick={() => setRole("user")}
            style={{
              width: "200px",
              padding: "16px 32px",
              marginBottom: "30px",
              background: "linear-gradient(135deg, #f5c451, #e0a832)",
              color: "#0b1d36",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s ease",
              display: "block",
              margin: "0 auto 30px"
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-4px)";
              e.target.style.boxShadow = "0 12px 24px rgba(245, 196, 81, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "none";
            }}
          >
            📋 Join as User
          </button>

          <button
            type="button"
            onClick={() => setRole("lawyer")}
            style={{
              width: "200px",
              padding: "16px 32px",
              background: "linear-gradient(135deg, #4a90e2, #357abd)",
              color: "#ffffff",
              border: "2px solid #f5c451",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s ease",
              display: "block",
              margin: "0 auto"
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-4px)";
              e.target.style.boxShadow = "0 12px 24px rgba(74, 144, 226, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "none";
            }}
          >
            ⚖️ Join as Lawyer
          </button>
        </div>
      )}

      {role === "user" && <UserJoinForm setRole={setRole} />}
      {role === "lawyer" && <LawyerJoinForm setRole={setRole} />}
    </div>
  );
}

export default Join;
