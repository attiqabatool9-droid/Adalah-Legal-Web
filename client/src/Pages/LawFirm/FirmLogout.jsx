import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../Styles/LawFirm/FirmLogout.css";

function FirmLogout() {
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [firmName, setFirmName] = useState("");

  useEffect(() => {
    // Get firm name from localStorage before clearing
    const name = localStorage.getItem("lawfirmName") || "Law Firm";
    setFirmName(name);
  }, []);

  const handleConfirmLogout = () => {
    setIsLoggingOut(true);

    // Clear all law firm related data from localStorage IMMEDIATELY
    localStorage.removeItem("authToken");
    localStorage.removeItem("lawfirmEmail");
    localStorage.removeItem("lawfirmName");
    localStorage.removeItem("lawfirmLoggedIn");
    localStorage.removeItem("role");
    localStorage.removeItem("isLoggedIn");

    // Simulate logout process with spinner for UX
    setTimeout(() => {
      // Navigate to login page after storage is cleared
      navigate("/lawfirm/login");
    }, 1500);
  };

  const handleCancel = () => {
    navigate("/lawfirm/dashboard");
  };

  return (
    <div className="logout-wrapper">
      <div className="logout-container">
        <div className="logout-card">
          <div className="logout-icon">🚪</div>

          {!isLoggingOut ? (
            <>
              <h2>Confirm Logout</h2>
              <p className="logout-message">
                Are you sure you want to log out from <strong>{firmName}</strong>?
              </p>
              <p className="logout-info">
                You will need to log in again to access your dashboard.
              </p>

              <div className="logout-actions">
                <button
                  className="logout-button confirm"
                  onClick={handleConfirmLogout}
                >
                  Yes, Logout
                </button>
                <button className="logout-button cancel" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <h2>Logging Out...</h2>
              <div className="logout-spinner">
                <div className="spinner"></div>
              </div>
              <p className="logout-message">
                Please wait while we log you out securely.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default FirmLogout;
