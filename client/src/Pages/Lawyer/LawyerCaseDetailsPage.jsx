import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "../../Styles/Lawyer/LawyerDashboard-Enhanced.css";
import LawyerSidebar from "../../Components/Lawyer/LawyerSidebar";

const LawyerCaseDetailsPage = () => {
  const { id } = useParams();

  // ================= CASE DATA =================
  const caseDetails = {
    id,
    caseType: "Family Law",
    status: "Ongoing",
    createdAt: "10 Sep 2025",
    description:
      "Client is seeking legal advice regarding a family dispute and custody matter.",
    client: {
      name: "Laiba Mubeen",
      email: "laiba@email.com",
      city: "Karachi",
    },
    hearings: {
      filingDate: "05 Sep 2025",
      nextHearing: "20 Sep 2025",
    },
  };

  // ================= NOTES STATE =================
  const [notes, setNotes] = useState(
    localStorage.getItem(`case_notes_${id}`) || ""
  );

  // ================= DOCUMENTS STATE =================
  const [documents, setDocuments] = useState(
    JSON.parse(localStorage.getItem(`case_docs_${id}`)) || []
  );

  // ================= FILE UPLOAD =================
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const newDoc = {
      name: file.name,
      date: new Date().toLocaleDateString(),
    };

    const updatedDocs = [...documents, newDoc];
    setDocuments(updatedDocs);
    localStorage.setItem(`case_docs_${id}`, JSON.stringify(updatedDocs));
  };

  return (
    <div className="lawyer-dashboard-wrapper">
      <LawyerSidebar />

      <div className="lawyer-dashboard-main">
        <div className="section-card">
          <h2>Case Details</h2>
          <p className="section-description">
            Detailed information about the selected case.
          </p>

          {/* Case Info */}
          <div className="case-details-grid">
            <div className="case-box">
              <h4>Case Information</h4>
              <p><strong>Case ID:</strong> {caseDetails.id}</p>
              <p><strong>Type:</strong> {caseDetails.caseType}</p>
              <p><strong>Status:</strong> {caseDetails.status}</p>
              <p><strong>Created:</strong> {caseDetails.createdAt}</p>
            </div>

            <div className="case-box">
              <h4>Client Information</h4>
              <p><strong>Name:</strong> {caseDetails.client.name}</p>
              <p><strong>Email:</strong> {caseDetails.client.email}</p>
              <p><strong>City:</strong> {caseDetails.client.city}</p>
            </div>
          </div>

          {/* Description */}
          <div className="case-box">
            <h4>Case Description</h4>
            <p>{caseDetails.description}</p>
          </div>

          {/* Dates */}
          <div className="case-box">
            <h4>Important Dates</h4>
            <p><strong>Filing Date:</strong> {caseDetails.hearings.filingDate}</p>
            <p><strong>Next Hearing:</strong> {caseDetails.hearings.nextHearing}</p>
          </div>

          {/* NOTES */}
          <div className="case-box">
            <h4>Lawyer Notes</h4>
            <textarea
              className="case-notes-textarea"
              placeholder="Write your private notes here..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
            <button
              className="btn-save-notes"
              onClick={() =>
                localStorage.setItem(`case_notes_${id}`, notes)
              }
            >
              Save Notes
            </button>
          </div>

          {/* DOCUMENTS */}
          <div className="case-box">
            <h4>Case Documents</h4>
            <input type="file" onChange={handleFileUpload} />

            {documents.length > 0 ? (
              <ul className="case-doc-list">
                {documents.map((doc, index) => (
                  <li key={index}>
                    📄 {doc.name} <span className="doc-date">({doc.date})</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No documents uploaded yet.</p>
            )}
          </div>

          {/* ACTIONS */}
          <div className="case-actions">
            <button className="btn-accept">Accept</button>
            <button className="btn-reject">Reject</button>
            <button className="btn-complete">Mark Completed</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LawyerCaseDetailsPage;
