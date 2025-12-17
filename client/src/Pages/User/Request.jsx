import React from "react";
// import "../../Styles/User/RequestConsultation.css";

const Request = () => {
  // 🔹 Dummy case request data (for FYP demo)
  const caseRequests = [
    {
      id: 1,
      lawyerName: "Adv. Ahmed Raza",
      caseType: "Family Law",
      status: "Pending",
      date: "10 Sep 2025",
    },
    {
      id: 2,
      lawyerName: "Adv. Hina Sheikh",
      caseType: "Criminal Case",
      status: "Accepted",
      date: "02 Sep 2025",
    },
    {
      id: 3,
      lawyerName: "Adv. Bilal Hussain",
      caseType: "Corporate Agreement",
      status: "Completed",
      date: "20 Aug 2025",
    },
  ];

  return (
    <div className="request-consultation-page">

      {/* 🔹 Page Header */}
      <div className="page-header">
        <h1>My Case Requests</h1>
        <p>
          View and track the status of your legal consultation requests
          submitted to lawyers.
        </p>
      </div>

      {/* 🔹 Case Requests Table */}
      <div className="case-requests-list">
        {caseRequests.length > 0 ? (
          <table className="case-requests-table">
            <thead>
              <tr>
                <th>Lawyer Name</th>
                <th>Case Type</th>
                <th>Request Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {caseRequests.map((request) => (
                <tr key={request.id}>
                  <td>{request.lawyerName}</td>
                  <td>{request.caseType}</td>
                  <td>{request.date}</td>

                  <td>
                    <span
                      className={`status-badge ${
                        request.status === "Pending"
                          ? "status-pending"
                          : request.status === "Accepted"
                          ? "status-accepted"
                          : "status-completed"
                      }`}
                    >
                      {request.status}
                    </span>
                  </td>

                  <td>
                    {request.status === "Completed" ? (
                      <button className="view-btn">View Summary</button>
                    ) : (
                      <button className="cancel-btn">Cancel Request</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No consultation requests found.</p>
        )}
      </div>

    </div>
  );
};

export default Request;
