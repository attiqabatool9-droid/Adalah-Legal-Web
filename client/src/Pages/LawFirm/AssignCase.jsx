import React, { useState } from "react";
import "../../Styles/LawFirm/AssignCase.css";

// Components
import Sidebar from "../../Components/LawFirm/Sidebar";

// Dummy data for lawyers
const lawyersList = [
  { id: 1, name: "Advocate Ahmed", specialization: "Corporate Law" },
  { id: 2, name: "Advocate Sara", specialization: "Family Law" },
  { id: 3, name: "Advocate Bilal", specialization: "Civil Law" },
];

// Dummy case data (normally fetched from backend)
const sampleCase = {
  id: 101,
  userName: "Ali Khan",
  caseTitle: "Property Dispute",
  description: "Land ownership issue with neighbor",
  documents: ["document1.pdf", "document2.pdf"],
  date: "2025-12-20",
  status: "New",
};

function AssignCase() {
  const [selectedLawyer, setSelectedLawyer] = useState("");
  const [assigned, setAssigned] = useState(false);

  const handleAssign = () => {
    if (!selectedLawyer) {
      alert("⚠️ Please select a lawyer to assign.");
      return;
    }
    setAssigned(true);
    alert(`✅ Case "${sampleCase.caseTitle}" assigned to ${selectedLawyer}!`);
  };

  return (
    <div className="assign-case-wrapper">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="assign-case-container">
        {/* Header */}
        <div className="assign-case-header">
          <h2>⚖️ Assign Case to Lawyer</h2>
          <p>Select and assign cases to qualified lawyers</p>
        </div>

        {/* Case Details Section */}
        <div className="assign-case-section">
          <h3>📋 Case Details</h3>
          <div className="case-details-grid">
            <div className="detail-item">
              <span className="detail-label">Case ID</span>
              <span className="detail-value highlight">{sampleCase.id}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">User Name</span>
              <span className="detail-value">{sampleCase.userName}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Case Title</span>
              <span className="detail-value">{sampleCase.caseTitle}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Date</span>
              <span className="detail-value">{sampleCase.date}</span>
            </div>
          </div>

          <div className="detail-item" style={{ marginTop: "20px" }}>
            <span className="detail-label">Description</span>
            <span className="detail-value">{sampleCase.description}</span>
          </div>

          <div className="detail-item" style={{ marginTop: "15px" }}>
            <span className="detail-label">Documents</span>
            {sampleCase.documents && sampleCase.documents.length > 0 ? (
              <ul className="documents-list">
                {sampleCase.documents.map((doc, i) => (
                  <li key={i}>{doc}</li>
                ))}
              </ul>
            ) : (
              <span className="detail-value no-documents">No documents</span>
            )}
          </div>

          <div className="detail-item" style={{ marginTop: "15px" }}>
            <span className="detail-label">Status</span>
            <span className={`status-badge ${assigned ? "status-assigned" : "status-new"}`}>
              {assigned ? "Assigned" : sampleCase.status}
            </span>
          </div>
        </div>

        {/* Lawyer Selection Section */}
        <div className="assign-case-section">
          <h3>👨‍⚖️ Assign Lawyer</h3>

          <div className="form-group">
            <label className="form-label">Select a Lawyer</label>
            <select
              className="form-select"
              value={selectedLawyer}
              onChange={(e) => setSelectedLawyer(e.target.value)}
              disabled={assigned}
            >
              <option value="">-- Choose a Lawyer --</option>
              {lawyersList.map((lawyer) => (
                <option key={lawyer.id} value={lawyer.name}>
                  {lawyer.name} ({lawyer.specialization})
                </option>
              ))}
            </select>
          </div>

          <div className="button-group">
            <button
              className="assign-button btn-assign"
              onClick={handleAssign}
              disabled={assigned}
            >
              {assigned ? "✅ Assigned" : "⚖️ Assign Case"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AssignCase;
