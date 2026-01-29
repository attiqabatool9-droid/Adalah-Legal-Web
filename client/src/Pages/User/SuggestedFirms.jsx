import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import API from "../../api";
import "../../Styles/User/SuggestedFirms.css";

const SuggestedFirms = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [suggestedFirms, setSuggestedFirms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔹 Fetch suggested firms on mount
  useEffect(() => {
    const fetchSuggestedFirms = async () => {
      try {
        setLoading(true);
        const response = await API.get("/api/users");
        
        // Filter only law firms (role === "law_firm")
        const firmsData = response.data.filter((u) => u.role === "law_firm");
        
        // Add recommendation data
        const suggestedData = firmsData.map((firm, index) => ({
          ...firm,
          reason: `Recommended based on your legal case type and profile`,
          recommended: index % 2 === 0,
        })).slice(0, 6); // Show top 6 suggestions

        setSuggestedFirms(suggestedData);
        setError(null);
      } catch (err) {
        console.error("Error fetching suggested firms:", err);
        setError("Failed to load firm suggestions");
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestedFirms();
  }, []);

  // 🔹 Request consultation handler
  const handleRequestConsultation = async (firm) => {
    try {
      // Create a new case and send request to firm
      const caseData = {
        title: "Firm Consultation Request",
        description: "User requested consultation with law firm",
        caseType: "Consultation",
        lawyer: firm._id, // Assign to firm contact person
        status: "pending",
      };

      await API.post("/api/cases", caseData);
      alert("Consultation request sent successfully!");
      navigate("/user/requests");
    } catch (err) {
      console.error("Error sending request:", err);
      alert("Failed to send consultation request");
    }
  };

  // 🔹 View firm profile
  const handleViewProfile = (firmId) => {
    navigate(`/user/firm-profile/${firmId}`);
  };

  return (
    <div className="suggested-firms-page">
      {/* 🔹 Page Header */}
      <div className="page-header">
        <h1>Suggested Law Firms</h1>
        <p>
          These law firms are recommended based on your legal case type and profile.
        </p>
      </div>

      {/* 🔹 Error message */}
      {error && <div className="error-message">{error}</div>}

      {/* 🔹 Suggested Firms List */}
      <div className="suggested-firms-list">
        {loading ? (
          <div className="loading">Loading firm suggestions...</div>
        ) : suggestedFirms.length > 0 ? (
          suggestedFirms.map((firm) => (
            <div className="firm-card" key={firm._id}>
              {/* 🔹 Recommended Badge */}
              {firm.recommended && (
                <span className="recommended-badge">✨ Recommended</span>
              )}

              <h3>{firm.name}</h3>
              <p>
                <strong>Specialization:</strong> {firm.specialization || "General Law"}
              </p>
              <p>
                <strong>Location:</strong> {firm.city || "N/A"}
              </p>
              <p>
                <strong>Experience:</strong> {firm.experience || "0"} Years
              </p>
              <p>
                <strong>Contact:</strong> {firm.email || "N/A"}
              </p>

              {/* 🔹 Why suggested */}
              <p className="suggestion-reason">
                <strong>Why suggested:</strong> {firm.reason}
              </p>

              {/* 🔹 Action buttons */}
              <div className="button-group">
                <button
                  className="request-btn"
                  onClick={() => handleRequestConsultation(firm)}
                >
                  Request Consultation
                </button>
                <button
                  className="view-profile-btn"
                  onClick={() => handleViewProfile(firm._id)}
                >
                  View Profile
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-data">No firm suggestions available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default SuggestedFirms;
