import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import "../../Styles/Lawyer/LawyerDashboard-Enhanced.css";

// API Import
import API from "../../api";

// Components
import LawyerSidebar from "../../Components/Lawyer/LawyerSidebar";
import LawyerDashboardCard from "../../Components/Lawyer/LawyerDashboardCard";
import DashboardHeader from "../../Components/Lawyer/DashboardHeader";
import LawyerNotifications from "../../Components/Lawyer/LawyerNotifications";

// ============================================
// RECENT CASES TABLE (With Blue Theme)
// ============================================
const RecentCasesTable = ({ cases }) => {
  return (
    <div className="recent-cases-section">
      <h2 style={{ marginBottom: "20px", color: "#f0c040", fontSize: "20px" }}>
        📋 Recent Cases
      </h2>
      <div
        style={{
          overflowX: "auto",
          backgroundColor: "#0e254b",
          borderRadius: "10px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          border: "1px solid #1a3f5f"
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            {/* Header with Blue theme matching */}
            <tr style={{ backgroundColor: "#0B1E39", color: "#f0c040", borderBottom: "2px solid #1a3f5f" }}>
              <th style={{ padding: "15px", textAlign: "left", fontWeight: "600", fontSize: "14px" }}>Case Title</th>
              <th style={{ padding: "15px", textAlign: "left", fontWeight: "600", fontSize: "14px" }}>Client</th>
              <th style={{ padding: "15px", textAlign: "left", fontWeight: "600", fontSize: "14px" }}>Case Type</th>
              <th style={{ padding: "15px", textAlign: "left", fontWeight: "600", fontSize: "14px" }}>Status</th>
              <th style={{ padding: "15px", textAlign: "left", fontWeight: "600", fontSize: "14px" }}>City</th>
            </tr>
          </thead>
          <tbody>
            {cases && cases.length > 0 ? (
              cases.map((caseItem, index) => (
                <tr
                  key={caseItem._id}
                  style={{
                    borderBottom: "1px solid #1a3f5f",
                    backgroundColor: index % 2 === 0 ? "#162a45" : "#0e254b",
                  }}
                >
                  <td style={{ padding: "15px", color: "#E8ECF2", fontSize: "14px" }}>
                    <strong>{caseItem.title}</strong>
                  </td>
                  <td style={{ padding: "15px", color: "#c5d3e0", fontSize: "14px" }}>
                    {/* Agar client object hai to uska naam, warna ID */}
                    {caseItem.client?.name || "Client Name"} 
                  </td>
                  <td style={{ padding: "15px", color: "#c5d3e0", fontSize: "14px" }}>
                    <span style={{ backgroundColor: "rgba(63, 130, 246, 0.2)", color: "#3b82f6", padding: "4px 8px", borderRadius: "4px", fontSize: "12px", fontWeight: "500" }}>
                      {caseItem.caseType}
                    </span>
                  </td>
                  <td style={{ padding: "15px", fontSize: "14px" }}>
                    <span
                      style={{
                        backgroundColor:
                          caseItem.status === "pending" ? "rgba(240, 192, 64, 0.2)" :
                          caseItem.status === "active" ? "rgba(16, 185, 129, 0.2)" : "rgba(59, 130, 246, 0.2)",
                        color:
                          caseItem.status === "pending" ? "#f0c040" :
                          caseItem.status === "active" ? "#10b981" : "#3b82f6",
                        padding: "4px 8px", borderRadius: "4px", fontWeight: "500", fontSize: "12px", textTransform: "capitalize"
                      }}
                    >
                      {caseItem.status}
                    </span>
                  </td>
                  <td style={{ padding: "15px", color: "#a0aec0", fontSize: "14px" }}>
                    {caseItem.city}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ padding: "20px", textAlign: "center", color: "#999" }}>
                  No cases found yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ============================================
// MAIN DASHBOARD COMPONENT
// ============================================
const LawyerDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [cases, setCases] = useState([]); // Real Data State
  const [loading, setLoading] = useState(true);

  // --- DATA FETCHING ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Fetch Profile
        const profileRes = await API.get("/api/users/me");
        setProfile(profileRes.data);

        // 2. Fetch Real Cases
        const casesRes = await API.get("/api/cases"); // Ensure route matches backend
        setCases(casesRes.data);
        
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // --- CALCULATE REAL STATS ---
  const stats = useMemo(() => {
    if (!cases.length) return { pending: 0, active: 0, completed: 0, total: 0 };
    return {
      pending: cases.filter(c => c.status === "pending").length,
      active: cases.filter(c => c.status === "active").length,
      completed: cases.filter(c => c.status === "completed").length,
      total: cases.length
    };
  }, [cases]);

  if (loading) return <div style={{ padding: "20px", textAlign: "center" }}>Loading Dashboard...</div>;

  return (
    <div className="lawyer-dashboard-wrapper">
      <LawyerSidebar />

      <div className="lawyer-dashboard-main">
        {/* Dashboard Header */}
        <DashboardHeader lawyerName={profile ? profile.name : "Lawyer"} />

        <LawyerNotifications />

        {/* Profile Details Section (Enhanced Look) */}
        {profile && (
          <div
            style={{
              background: "#0e254b",
              padding: "20px",
              marginBottom: "30px",
              borderRadius: "10px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              display: "flex",
              gap: "20px",
              alignItems: "flex-start",
              borderTop: "4px solid #f0c040" // Gold Top Border for Theme Match
            }}
          >
            {/* License Image */}
            <div style={{ width: "150px", height: "150px", border: "2px solid #ddd", borderRadius: "8px", overflow: "hidden", backgroundColor: "#f5f5f5", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              {profile.license ? (
                <img
                  src={`http://localhost:5000/${profile.license}`}
                  alt="License"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.parentElement.innerHTML = '<div style="padding: 20px; text-align: center; color: #888;">License Not Found</div>';
                  }}
                />
              ) : (
                <div style={{ padding: "20px", textAlign: "center", color: "#888" }}>No License</div>
              )}
            </div>

            {/* Profile Details */}
            <div style={{ flex: 1 }}>
              <h3 style={{ margin: "0 0 15px 0", color: "#f0c040", fontSize: "18px", fontWeight: "bold" }}>
                📌 Lawyer Profile Details
              </h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
                <div>
                  <p style={{ margin: "0 0 5px 0", color: "#a0aec0", fontSize: "12px" }}>Specialization</p>
                  <p style={{ margin: "0", color: "#E8ECF2", fontSize: "14px", fontWeight: "500" }}>{profile.specialization}</p>
                </div>
                <div>
                  <p style={{ margin: "0 0 5px 0", color: "#a0aec0", fontSize: "12px" }}>Experience</p>
                  <p style={{ margin: "0", color: "#E8ECF2", fontSize: "14px", fontWeight: "500" }}>{profile.experience} Years</p>
                </div>
                <div>
                  <p style={{ margin: "0 0 5px 0", color: "#a0aec0", fontSize: "12px" }}>City</p>
                  <p style={{ margin: "0", color: "#E8ECF2", fontSize: "14px", fontWeight: "500" }}>{profile.city}</p>
                </div>
                <div>
                  <p style={{ margin: "0 0 5px 0", color: "#a0aec0", fontSize: "12px" }}>CNIC</p>
                  <p style={{ margin: "0", color: "#E8ECF2", fontSize: "14px", fontWeight: "500" }}>{profile.cnic}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- BLUE STATS CARDS (Bottom Section Only - As requested) --- */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
            marginBottom: "30px",
          }}
        >
          {/* Using Real Stats now */}
          <LawyerDashboardCard
            title="Pending Requests"
            description={`${stats.pending} cases waiting`}
            icon="⏳"
            link="/lawyer/requests"
          />
          <LawyerDashboardCard
            title="Active Cases"
            description={`${stats.active} cases in progress`}
            icon="📂"
            link="/lawyer/assigned-cases"
          />
          <LawyerDashboardCard
            title="Completed Cases"
            description={`${stats.completed} cases finished`}
            icon="✅"
            link="/lawyer/completed-cases"
          />
          <LawyerDashboardCard
            title="Total Cases"
            description={`${stats.total} total cases`}
            icon="📊"
            link="/lawyer/all-cases"
          />
        </div>

        {/* Recent Cases Table (With Real Data & Blue Header) */}
        <RecentCasesTable cases={cases} />
      </div>
    </div>
  );
};

export default LawyerDashboard;