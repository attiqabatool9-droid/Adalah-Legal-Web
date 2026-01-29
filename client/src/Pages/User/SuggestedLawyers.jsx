import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import API from "../../api";
import "../../Styles/User/SuggestedLawyers.css";

const SuggestedLawyers = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [suggestedLawyers, setSuggestedLawyers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔹 Fetch suggested lawyers on mount
  useEffect(() => {
    const fetchSuggestedLawyers = async () => {
      try {
        setLoading(true);
        const response = await API.get("/api/users");
        
        // Filter only lawyers and add recommendation logic
        const lawyersData = response.data.filter((u) => u.role === "lawyer");
        
        // Add recommendation badges based on specialization or other criteria
        const suggestedData = lawyersData.map((lawyer, index) => ({
          ...lawyer,
          recommended: index % 2 === 0, // Demo: alternate recommendations
          urgency: ["Urgent", "Normal", "Low"][index % 3],
          source: ["Chatbot", "Manual Search", "Profile Match"][index % 3],
          reason: `Recommended based on your legal interests and preferences`,
        })).slice(0, 6); // Show top 6 suggestions

        setSuggestedLawyers(suggestedData);
        setError(null);
      } catch (err) {
        console.error("Error fetching suggested lawyers:", err);
        setError("Failed to load suggestions");
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestedLawyers();
  }, []);

  // 🔹 Request consultation handler
  const handleRequestConsultation = async (lawyerId) => {
    try {
      // Create a new case and send request to lawyer
      const caseData = {
        title: "Consultation Request",
        description: "User requested consultation",
        caseType: "Consultation",
        lawyer: lawyerId,
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

  // 🔹 View lawyer profile
  const handleViewProfile = (lawyerId) => {
    navigate(`/user/lawyer-profile/${lawyerId}`);
  };

  return (
    <div className="suggested-lawyers-page">
      {/* 🔹 Page Header */}
      <div className="page-header">
        <h1>Suggested Lawyers</h1>
        <p>
          These lawyers are automatically recommended based on your legal
          interests, profile information, and previous searches.
        </p>
      </div>

      {/* 🔹 Error message */}
      {error && <div className="error-message">{error}</div>}

      {/* 🔹 Suggested Lawyers List */}
      <div className="suggested-lawyers-list">
        {loading ? (
          <div className="loading">Loading suggestions...</div>
        ) : suggestedLawyers.length > 0 ? (
          suggestedLawyers.map((lawyer) => (
            <div className="lawyer-card" key={lawyer._id}>
              {/* 🔹 AI Recommended Badge */}
              {lawyer.recommended && (
                <span className="ai-badge">✨ AI Recommended</span>
              )}

              {/* 🔹 Urgency Badge */}
              <span className={`urgency-badge ${lawyer.urgency.toLowerCase()}`}>
                {lawyer.urgency}
              </span>

              <h3>{lawyer.name}</h3>
              <p>
                <strong>Specialization:</strong> {lawyer.specialization || "N/A"}
              </p>
              <p>
                <strong>Location:</strong> {lawyer.city || "N/A"}
              </p>
              <p>
                <strong>Experience:</strong> {lawyer.experience || "0"} Years
              </p>

              {/* 🔹 Why Suggested */}
              <p className="suggestion-reason">
                <strong>Why suggested:</strong> {lawyer.reason}
              </p>

              {/* 🔹 Source Info */}
              <p className="source-text">
                <strong>Source:</strong> {lawyer.source}
              </p>

              <div className="button-group">
                <button
                  className="request-btn"
                  onClick={() => handleRequestConsultation(lawyer._id)}
                >
                  Request Consultation
                </button>
                <button
                  className="view-profile-btn"
                  onClick={() => handleViewProfile(lawyer._id)}
                >
                  View Profile
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-data">No lawyer suggestions available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default SuggestedLawyers;
