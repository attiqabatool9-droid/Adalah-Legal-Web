import React from "react";
import "../../Styles/Lawyer/LawyerDashboard-Enhanced.css";
import LawyerSidebar from "../../Components/Lawyer/LawyerSidebar";

const AssignedCasesTable = ({ assignedCases }) => {
  return (
    <div className="assigned-cases-table">
      <h3>Assigned Cases</h3>
      <table>
        <thead>
          <tr>
            <th>Client</th>
            <th>Case Type</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {assignedCases && assignedCases.length > 0 ? (
            assignedCases.map((c) => (
              <tr key={c.id}>
                <td>{c.userName}</td>
                <td>{c.caseType}</td>
                <td>{c.status}</td>
                <td>{c.date}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No assigned cases found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

const LawyerAssignedCasesPage = () => {
  // Example assigned cases
  const assignedCases = [
    { id: 1, userName: "Laiba Mubeen", caseType: "Family Law", status: "Ongoing", date: "11 Sep 2025" },
    { id: 2, userName: "Ali Khan", caseType: "Criminal Case", status: "Ongoing", date: "03 Sep 2025" },
  ];

  return (
    <div className="lawyer-dashboard-wrapper">
      <LawyerSidebar />
      <div className="lawyer-dashboard-main">
        <div className="section-card">
          <h2>Assigned Cases</h2>
          <p className="section-description">View all cases currently assigned to you and track their progress.</p>
          <AssignedCasesTable assignedCases={assignedCases} />
        </div>
      </div>
    </div>
  );
};

export default LawyerAssignedCasesPage;
