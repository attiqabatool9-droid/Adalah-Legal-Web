import React, { useState, useEffect } from "react";
import API from "../../api";
import LawyerSidebar from "../../Components/Lawyer/LawyerSidebar";
import DashboardHeader from "../../Components/Lawyer/DashboardHeader";
import "../../Styles/Lawyer/LawyerDashboard-Enhanced.css"; // Same CSS use karenge

const PendingRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // 1. Fetch only "pending" cases
  useEffect(() => {
    fetchPendingRequests();
  }, []);

  const fetchPendingRequests = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await API.get("/api/cases");
      // Filter only pending ones
      const pendingOnes = res.data.filter((c) => c.status === "pending");
      setRequests(pendingOnes);
    } catch (err) {
      console.error("Error fetching requests:", err);
      setError("Failed to load pending requests");
    } finally {
      setLoading(false);
    }
  };

  // 2. Accept Case Function
  const handleAction = async (caseId, newStatus) => {
    try {
      console.log(`Updating case ${caseId} to status ${newStatus}`);
      const response = await API.put(`/api/cases/${caseId}`, { status: newStatus });
      console.log("Response:", response.data);
      setMessage(`Case ${newStatus} successfully!`);
      setError("");
      
      // List refresh karein taaki wo case yahan se nikal jaye
      fetchPendingRequests();

      // 3 second baad message gayab kar dein
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error("Error updating case status:", err);
      const errorMsg = err.response?.data?.message || err.message || "Unknown error";
      setError(`Error: ${errorMsg}`);
      alert(`Error updating case status: ${errorMsg}`);
    }
  };

  return (
    <div className="lawyer-dashboard-wrapper" style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f0f2f5" }}>
      <LawyerSidebar />

      <div className="lawyer-dashboard-main" style={{ flex: 1, padding: "25px" }}>
        <DashboardHeader lawyerName="Lawyer" />

        <div style={{ marginTop: "20px" }}>
          <h2 style={{ color: "#0d1b2a", marginBottom: "10px" }}>📥 New Case Requests</h2>
          <p style={{ color: "#666", marginBottom: "20px" }}>Review and accept cases from potential clients.</p>

          {error && (
            <div style={{ padding: "10px", backgroundColor: "#fee", color: "#c33", borderRadius: "5px", marginBottom: "15px" }}>
              {error}
            </div>
          )}

          {message && (
            <div style={{ padding: "10px", backgroundColor: "#d1fae5", color: "#065f46", borderRadius: "5px", marginBottom: "15px" }}>
              {message}
            </div>
          )}

          {loading ? (
            <p>Loading requests...</p>
          ) : (
            <div style={{ background: "white", padding: "20px", borderRadius: "12px", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ backgroundColor: "#0d1b2a", color: "white" }}>
                    <th style={{ padding: "15px", textAlign: "left" }}>Client</th>
                    <th style={{ padding: "15px", textAlign: "left" }}>Case Title</th>
                    <th style={{ padding: "15px", textAlign: "left" }}>Type</th>
                    <th style={{ padding: "15px", textAlign: "left" }}>City</th>
                    <th style={{ padding: "15px", textAlign: "center" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.length > 0 ? (
                    requests.map((req) => (
                      <tr key={req._id} style={{ borderBottom: "1px solid #eee" }}>
                        <td style={{ padding: "15px" }}>{req.client?.name || "Anonymous"}</td>
                        <td style={{ padding: "15px", fontWeight: "500" }}>{req.title}</td>
                        <td style={{ padding: "15px" }}>{req.caseType}</td>
                        <td style={{ padding: "15px" }}>{req.city}</td>
                        <td style={{ padding: "15px", textAlign: "center" }}>
                          <button 
                            onClick={() => handleAction(req._id, "active")}
                            style={{ backgroundColor: "#10b981", color: "white", border: "none", padding: "8px 15px", borderRadius: "5px", marginRight: "10px", cursor: "pointer" }}
                          >
                            Accept
                          </button>
                          <button 
                            onClick={() => handleAction(req._id, "rejected")}
                            style={{ backgroundColor: "#ef4444", color: "white", border: "none", padding: "8px 15px", borderRadius: "5px", cursor: "pointer" }}
                          >
                            Reject
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" style={{ padding: "40px", textAlign: "center", color: "#999" }}>
                        No new pending requests found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PendingRequests;