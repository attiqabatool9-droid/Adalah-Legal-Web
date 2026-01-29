import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import API from "../../api";
import "../../Styles/User/Request.css";

const Request = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");

  // 🔹 Fetch user's cases on mount
  useEffect(() => {
    const fetchUserCases = async () => {
      try {
        setLoading(true);
        const response = await API.get("/api/cases");
        
        // Filter cases by current user (client)
        const userCases = response.data.filter(
          (c) => c.client === user?._id || c.client?._id === user?._id
        );
        
        setCases(userCases);
        setError(null);
      } catch (err) {
        console.error("Error fetching cases:", err);
        setError("Failed to load your case requests");
      } finally {
        setLoading(false);
      }
    };

    if (user?._id) {
      fetchUserCases();
    }
  }, [user?._id]);

  // 🔹 Filter cases based on selected filter
  const getFilteredCases = () => {
    if (filter === "all") return cases;
    return cases.filter((c) => c.status === filter);
  };

  // 🔹 Cancel case handler
  const handleCancelCase = async (caseId) => {
    if (!window.confirm("Are you sure you want to cancel this request?")) {
      return;
    }

    try {
      await API.put(`/api/cases/${caseId}`, { status: "cancelled" });
      setCases(cases.map((c) => c._id === caseId ? { ...c, status: "cancelled" } : c));
    } catch (err) {
      console.error("Error cancelling case:", err);
      setError("Failed to cancel request");
    }
  };

  // 🔹 View case handler
  const handleViewCase = (caseId) => {
    navigate(`/user/case/${caseId}`);
  };

  const filteredCases = getFilteredCases();

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

      {/* 🔹 Filter options */}
      <div className="filter-section">
        <label>Filter by Status:</label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All Cases</option>
          <option value="pending">Pending</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* 🔹 Error message */}
      {error && <div className="error-message">{error}</div>}

      {/* 🔹 Loading state */}
      {loading ? (
        <div className="loading">Loading your case requests...</div>
      ) : filteredCases.length > 0 ? (
        <>
          {/* 🔹 Case Requests Table */}
          <div className="case-requests-list">
            <table className="case-requests-table">
              <thead>
                <tr>
                  <th>Case Title</th>
                  <th>Case Type</th>
                  <th>Assigned Lawyer</th>
                  <th>City</th>
                  <th>Request Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredCases.map((caseItem) => (
                  <tr key={caseItem._id}>
                    <td>{caseItem.title}</td>
                    <td>{caseItem.caseType}</td>
                    <td>
                      {caseItem.lawyer ? (
                        <span>{caseItem.lawyer.name || "Pending"}</span>
                      ) : (
                        <span className="pending-text">Pending Assignment</span>
                      )}
                    </td>
                    <td>{caseItem.city}</td>
                    <td>{new Date(caseItem.createdAt).toLocaleDateString()}</td>

                    <td>
                      <span
                        className={`status-badge status-${caseItem.status}`}
                      >
                        {caseItem.status.charAt(0).toUpperCase() +
                          caseItem.status.slice(1)}
                      </span>
                    </td>

                    <td>
                      {caseItem.status === "completed" ? (
                        <button
                          className="view-btn"
                          onClick={() => handleViewCase(caseItem._id)}
                        >
                          View Summary
                        </button>
                      ) : caseItem.status !== "rejected" &&
                        caseItem.status !== "cancelled" ? (
                        <button
                          className="cancel-btn"
                          onClick={() => handleCancelCase(caseItem._id)}
                        >
                          Cancel Request
                        </button>
                      ) : (
                        <span className="no-action">No action</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <p className="no-data">
          {filter === "all"
            ? "No case requests found. Create a new case request to get started."
            : `No ${filter} case requests found.`}
        </p>
      )}
    </div>
  );
};

export default Request;
