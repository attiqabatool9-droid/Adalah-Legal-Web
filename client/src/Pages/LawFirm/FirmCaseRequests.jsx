import React, { useState } from "react";
import "../../Styles/LawFirm/FirmCaseRequests.css";

// Components
import Sidebar from "../../Components/LawFirm/Sidebar";

function FirmCaseRequests() {
  // Sample / Dummy data for case requests
  const [caseRequests, setCaseRequests] = useState([
    {
      id: 1,
      userName: "Ali Khan",
      caseTitle: "Property Dispute",
      description: "Land ownership issue with neighbor",
      documents: ["document1.pdf", "document2.pdf"],
      date: "2025-12-20",
    },
    {
      id: 2,
      userName: "Sara Ahmed",
      caseTitle: "Family Law Case",
      description: "Divorce and custody issue",
      documents: [],
      date: "2025-12-21",
    },
    {
      id: 3,
      userName: "Bilal Shah",
      caseTitle: "Corporate Contract",
      description: "Contract dispute with supplier",
      documents: ["contract.pdf"],
      date: "2025-12-22",
    },
  ]);

  // Accept / Reject handlers
  const handleAccept = (id) => {
    alert(`Case ID ${id} accepted!`);
    setCaseRequests(caseRequests.filter(req => req.id !== id));
  };

  const handleReject = (id) => {
    alert(`Case ID ${id} rejected!`);
    setCaseRequests(caseRequests.filter(req => req.id !== id));
  };

  return (
    <div className="case-requests-wrapper">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="case-requests-container">
        {/* Header */}
        <div className="case-requests-header">
          <h2>📂 New Case Requests</h2>
          <p>View and manage case requests from users</p>
        </div>

        {/* Case Requests Section */}
        <div className="case-requests-section">
          {caseRequests.length === 0 ? (
            <div className="empty-state">
              <p>No new case requests.</p>
            </div>
          ) : (
            <div className="case-requests-table-wrapper">
              <table className="case-requests-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>User Name</th>
                    <th>Case Title</th>
                    <th>Description</th>
                    <th>Documents</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {caseRequests.map((request) => (
                    <tr key={request.id}>
                      <td className="case-id">{request.id}</td>
                      <td>{request.userName}</td>
                      <td className="case-title">{request.caseTitle}</td>
                      <td className="case-description">{request.description}</td>
                      <td className="case-documents">
                        {request.documents.length > 0
                          ? request.documents.join(", ")
                          : "No documents"}
                      </td>
                      <td className="case-date">{request.date}</td>
                      <td>
                        <div className="case-action-buttons">
                          <button
                            className="case-action-button btn-accept"
                            onClick={() => handleAccept(request.id)}
                          >
                            ✅ Accept
                          </button>
                          <button
                            className="case-action-button btn-reject"
                            onClick={() => handleReject(request.id)}
                          >
                            ❌ Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FirmCaseRequests;