import React from "react";

const CaseRequestTable = ({ requests }) => {
  return (
    <div className="case-request-table">
      <h3>Case Requests</h3>
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
          {requests && requests.length > 0 ? (
            requests.map((r) => (
              <tr key={r.id}>
                <td>{r.userName}</td>
                <td>{r.caseType}</td>
                <td>{r.status}</td>
                <td>{r.date}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No case requests found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CaseRequestTable;
