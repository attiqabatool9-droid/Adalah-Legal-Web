import React, { useState, useEffect } from "react";
import "../../Styles/Lawyer/LawyerDashboard-Enhanced.css";
import LawyerSidebar from "../../Components/Lawyer/LawyerSidebar";
import API from "../../api";

const AssignedCasesTable = ({ assignedCases, loading }) => {
  return (
    <div className="assigned-cases-table">
      <h3>Assigned Cases</h3>
      {loading ? (
        <p>Loading cases...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Client</th>
              <th>Case Type</th>
              <th>Title</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {assignedCases && assignedCases.length > 0 ? (
              assignedCases.map((c) => (
                <tr key={c._id}>
                  <td>{c.client?.name || "Unknown Client"}</td>
                  <td>{c.caseType}</td>
                  <td>{c.title}</td>
                  <td>
                    <span style={{
                      backgroundColor: "#d4edda",
                      color: "#155724",
                      padding: "4px 8px",
                      borderRadius: "4px",
                      fontSize: "12px",
                      fontWeight: "500"
                    }}>
                      Active
                    </span>
                  </td>
                  <td>{new Date(c.createdAt).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No assigned cases found.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

const LawyerAssignedCasesPage = () => {
  const [assignedCases, setAssignedCases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssignedCases = async () => {
      try {
        setLoading(true);
        const response = await API.get("/api/cases");
        // Filter cases with active status
        const activeCases = response.data.filter(c => c.status === "active");
        setAssignedCases(activeCases);
      } catch (error) {
        console.error("Error fetching assigned cases:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAssignedCases();
  }, []);

  return (
    <div className="lawyer-dashboard-wrapper">
      <LawyerSidebar />
      <div className="lawyer-dashboard-main">
        <div className="section-card">
          <h2>📂 Assigned Cases</h2>
          <p className="section-description">View all cases currently assigned to you and track their progress.</p>
          <AssignedCasesTable assignedCases={assignedCases} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default LawyerAssignedCasesPage;
