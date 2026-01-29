import React, { useState, useContext } from "react"; // 1. useContext add kiya
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext"; // 2. Context Import kiya

const Logout = () => {
  const navigate = useNavigate();
  
  // 3. Context se logout function nikala
  const { logout } = useContext(AuthContext);

  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const handleConfirmLogout = () => {
    setConfirmed(true);
    setIsLoggingOut(true);

    // 4. Manual clearing ki jagah Context wala logout function use kiya
    // Ye function LocalStorage bhi clear karega aur App ka State bhi reset karega
    logout(); 
    
    // Session storage bhi clear kar dete hain (safety ke liye)
    sessionStorage.clear();

    // Show logout message for 2 seconds, then redirect to login
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  const handleCancel = () => {
    navigate("/user/dashboard");
  };

  return (
    <div
      style={{
        padding: "20px",
        textAlign: "center",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #0B1E39 0%, #1a3f5f 100%)",
        color: "#E8ECF2",
      }}
    >
      <div
        style={{
          background: "#0e254b",
          padding: "40px",
          borderRadius: "12px",
          border: "1px solid #1a3f5f",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
          maxWidth: "400px",
        }}
      >
        {!isLoggingOut ? (
          <>
            <h2 style={{ color: "#f0c040", marginBottom: "20px" }}>Logout Confirmation</h2>
            <p style={{ marginBottom: "30px", fontSize: "1rem" }}>
              Are you sure you want to logout? You will need to log in again to access your dashboard.
            </p>
            <div
              style={{
                display: "flex",
                gap: "12px",
                justifyContent: "center",
              }}
            >
              <button
                onClick={handleConfirmLogout}
                style={{
                  padding: "10px 24px",
                  background: "#f0c040",
                  color: "#0B1E39",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "1rem",
                  fontWeight: "700",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onMouseOver={(e) => (e.target.style.background = "#f7d86f")}
                onMouseOut={(e) => (e.target.style.background = "#f0c040")}
              >
                Yes, Logout
              </button>
              <button
                onClick={handleCancel}
                style={{
                  padding: "10px 24px",
                  background: "transparent",
                  color: "#f0c040",
                  border: "2px solid #f0c040",
                  borderRadius: "8px",
                  fontSize: "1rem",
                  fontWeight: "700",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onMouseOver={(e) => (e.target.style.background = "rgba(240, 192, 64, 0.1)")}
                onMouseOut={(e) => (e.target.style.background = "transparent")}
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 style={{ color: "#f0c040", marginBottom: "20px" }}>✓ Logged Out</h2>
            <p style={{ marginBottom: "20px", fontSize: "1rem" }}>
              You have been successfully logged out.
            </p>
            <p style={{ fontSize: "0.9rem", color: "#94a3b8" }}>
              Redirecting to login page...
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Logout;