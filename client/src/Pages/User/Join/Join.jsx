import React, { useState } from "react";
import UserJoinForm from "./UserJoinForm";
import LawyerJoinForm from "./LawyerJoinForm";
import LawFirmJoin from "./LawFirmJoin";

function Join() {
  console.log("JOIN PAGE RENDERED");

  const [role, setRole] = useState("");

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        background: "linear-gradient(135deg, #0b1d36 0%, #132f57 100%)",
        overflow: "auto",
      }}
    >
      {/* Role Selection Buttons */}
      {!role && (
        <div style={{ textAlign: "center", color: "#ffffff" }}>
          <h2
            style={{
              fontSize: "32px",
              marginBottom: "40px",
              color: "#f5c451",
              letterSpacing: "1px",
            }}
          >
            Choose Your Role
          </h2>

          {/* User Button */}
          <button
            type="button"
            onClick={() => setRole("user")}
            style={{
              width: "200px",
              padding: "16px 32px",
              marginBottom: "20px",
              background: "linear-gradient(135deg, #f5c451, #e0a832)",
              color: "#0b1d36",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s ease",
              display: "block",
              margin: "0 auto",
            }}
          >
            📋 Join as User
          </button>

          {/* Lawyer Button */}
          <button
            type="button"
            onClick={() => setRole("lawyer")}
            style={{
              width: "200px",
              padding: "16px 32px",
              marginBottom: "20px",
              background: "linear-gradient(135deg, #4a90e2, #357abd)",
              color: "#ffffff",
              border: "2px solid #f5c451",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
              display: "block",
              margin: "0 auto",
            }}
          >
            ⚖️ Join as Lawyer
          </button>

          {/* Law Firm Button */}
          <button
            type="button"
            onClick={() => setRole("lawfirm")}
            style={{
              width: "200px",
              padding: "16px 32px",
              background: "linear-gradient(135deg, #2ecc71, #27ae60)",
              color: "#ffffff",
              border: "2px solid #f5c451",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
              display: "block",
              margin: "0 auto",
            }}
          >
            🏢 Join as Law Firm
          </button>
        </div>
      )}

      {/* Conditional Rendering of Forms */}
      {role === "user" && <UserJoinForm setRole={setRole} />}
      {role === "lawyer" && <LawyerJoinForm setRole={setRole} />}
      {role === "lawfirm" && <LawFirmJoin setRole={setRole} />}
    </div>
  );
}

export default Join;
