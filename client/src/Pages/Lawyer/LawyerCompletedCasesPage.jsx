import React, { useState, useEffect } from "react";
import "../../Styles/Lawyer/LawyerDashboard-Enhanced.css";
import LawyerSidebar from "../../Components/Lawyer/LawyerSidebar";
import API from "../../api";

const CompletedCasesTable = ({ completedCases, loading }) => {
  return (
    <div className="assigned-cases-table">
      <h3>Completed Cases</h3>
      {loading ? (
        <p>Loading cases...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Client</th>
              <th>Case Type</th>
              <th>Title</th>
              <th>Completed Date</th>
            </tr>
          </thead>
          <tbody>
            {completedCases && completedCases.length > 0 ? (
              completedCases.map((c) => (
                <tr key={c._id}>
                  <td>{c.client?.name || "Unknown Client"}</td>
                  <td>{c.caseType}</td>
                  <td>{c.title}</td>
                  <td>{new Date(c.updatedAt).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No completed cases found.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

const LawyerCompletedCasesPage = () => {
  const [completedCases, setCompletedCases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompletedCases = async () => {
      try {
        setLoading(true);
        const response = await API.get("/api/cases");
        // Filter cases with completed status
        const completed = response.data.filter(c => c.status === "completed");
        setCompletedCases(completed);
      } catch (error) {
        console.error("Error fetching completed cases:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCompletedCases();
  }, []);

  return (
    <div className="lawyer-dashboard-wrapper">
      <LawyerSidebar />
      <div className="lawyer-dashboard-main">
        <div className="section-card">
          <h2>✅ Completed Cases</h2>
          <p className="section-description">View all cases you have successfully completed.</p>
          <CompletedCasesTable completedCases={completedCases} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default LawyerCompletedCasesPage;
