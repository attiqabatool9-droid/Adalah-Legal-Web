import React, { useState, useEffect, useMemo } from "react";
import "../../Styles/Lawyer/LawyerDashboard-Enhanced.css";
import LawyerSidebar from "../../Components/Lawyer/LawyerSidebar";
import API from "../../api";

const CaseRequestTable = ({ requests, searchTerm, filterStatus, onAccept, onReject, loading }) => {
  const filteredRequests = useMemo(() => {
    return requests.filter((r) => {
      const matchesSearch =
        (r.client?.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.caseType.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterStatus === "All" || r.status === filterStatus;
      return matchesSearch && matchesFilter;
    });
  }, [requests, searchTerm, filterStatus]);

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "#FFC107";
      case "active":
        return "#4CAF50";
      case "completed":
        return "#2196F3";
      case "rejected":
        return "#F44336";
      default:
        return "#999";
    }
  };

  const getStatusLabel = (status) => {
    const labels = {
      pending: "Pending",
      active: "Accepted",
      completed: "Completed",
      rejected: "Rejected"
    };
    return labels[status] || status;
  };

  return (
    <div className="case-request-table">
      {filteredRequests.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Client</th>
              <th>Case Type</th>
              <th>Status</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.map((r) => (
              <tr key={r._id}>
                <td>
                  <div className="client-info">
                    <span className="client-avatar">👤</span>
                    <span>{r.client?.name || "Unknown Client"}</span>
                  </div>
                </td>
                <td>{r.caseType}</td>
                <td>
                  <span
                    className="status-badge"
                    style={{ backgroundColor: getStatusColor(r.status) }}
                  >
                    {getStatusLabel(r.status)}
                  </span>
                </td>
                <td>{new Date(r.createdAt).toLocaleDateString()}</td>
                <td>
                  {r.status === "pending" ? (
                    <div style={{ display: "flex", gap: "5px" }}>
                      <button 
                        className="btn-accept" 
                        onClick={() => onAccept(r._id)}
                        disabled={loading}
                        style={{
                          padding: "6px 12px",
                          backgroundColor: "#4CAF50",
                          color: "white",
                          border: "none",
                          borderRadius: "4px",
                          cursor: loading ? "not-allowed" : "pointer",
                          opacity: loading ? 0.6 : 1,
                          fontSize: "12px"
                        }}
                      >
                        ✓ Accept
                      </button>
                      <button 
                        className="btn-reject" 
                        onClick={() => onReject(r._id)}
                        disabled={loading}
                        style={{
                          padding: "6px 12px",
                          backgroundColor: "#F44336",
                          color: "white",
                          border: "none",
                          borderRadius: "4px",
                          cursor: loading ? "not-allowed" : "pointer",
                          opacity: loading ? 0.6 : 1,
                          fontSize: "12px"
                        }}
                      >
                        ✕ Reject
                      </button>
                    </div>
                  ) : (
                    <button className="btn-action" title="View Details">👁️</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="empty-state">
          <p>📭 No case requests found</p>
          <small>Try adjusting your search or filters</small>
        </div>
      )}
    </div>
  );
};

const LawyerCaseRequestsPage = () => {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortBy, setSortBy] = useState("date");

  const statusOptions = ["All", "pending", "active", "completed", "rejected"];

  // Fetch cases from backend
  useEffect(() => {
    const fetchCases = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await API.get("/api/cases");
        // Filter to show only pending cases to the lawyer
        const filteredCases = response.data.filter(c => c.status === "pending" || c.lawyer === localStorage.getItem("lawyerId"));
        setCases(filteredCases);
      } catch (err) {
        console.error("Error fetching cases:", err);
        setError("Failed to load cases. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchCases();
  }, []);

  // Handle Accept Case
  const handleAcceptCase = async (caseId) => {
    try {
      setLoading(true);
      console.log("Accepting case:", caseId);
      const response = await API.put(`/api/cases/${caseId}`, { status: "active" });
      console.log("Response:", response.data);
      setCases(cases.map(c => c._id === caseId ? response.data : c));
      setError("");
      alert("✅ Case accepted successfully!");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (err) {
      console.error("Error updating case status:", err);
      console.error("Error response:", err.response?.data);
      const errorMsg = err.response?.data?.message || err.message || "Unknown error";
      setError(`Error updating case status: ${errorMsg}`);
      alert(`❌ Error accepting case: ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  // Handle Reject Case
  const handleRejectCase = async (caseId) => {
    if (window.confirm("Are you sure you want to reject this case?")) {
      try {
        setLoading(true);
        console.log("Rejecting case:", caseId);
        const response = await API.put(`/api/cases/${caseId}`, { status: "rejected" });
        console.log("Response:", response.data);
        setCases(cases.map(c => c._id === caseId ? response.data : c));
        setError("");
        alert("✅ Case rejected successfully!");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } catch (err) {
        console.error("Error rejecting case:", err);
        console.error("Error response:", err.response?.data);
        const errorMsg = err.response?.data?.message || err.message || "Unknown error";
        setError(`Error rejecting case: ${errorMsg}`);
        alert(`❌ Error rejecting case: ${errorMsg}`);
      } finally {
        setLoading(false);
      }
    }
  };

  const getSortedRequests = (requests) => {
    const sorted = [...requests];
    if (sortBy === "date") {
      sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === "name") {
      sorted.sort((a, b) => (a.client?.name || "").localeCompare(b.client?.name || ""));
    }
    return sorted;
  };

  const sortedRequests = getSortedRequests(cases);
  const filteredCount = sortedRequests.filter(
    (r) =>
      (searchTerm === "" ||
        (r.client?.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.caseType.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterStatus === "All" || r.status === filterStatus)
  ).length;

  return (
    <div className="lawyer-dashboard-wrapper">
      <LawyerSidebar />
      <div className="lawyer-dashboard-main">
        <div className="section-card">
          <h2>📋 Case Requests</h2>
          <p className="section-description">Review and manage all incoming case requests from clients.</p>

          {error && <div style={{ color: "#f44336", marginBottom: "10px" }}>{error}</div>}

          {/* Search and Filter Section */}
          <div className="search-filter-section">
            <div className="search-box">
              <input
                type="text"
                placeholder="🔍 Search by client name or case type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>

            <div className="filter-controls">
              <div className="filter-group">
                <label htmlFor="status-filter">Status:</label>
                <select
                  id="status-filter"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="filter-select"
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status === "All" ? "All" : status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label htmlFor="sort-by">Sort by:</label>
                <select
                  id="sort-by"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="filter-select"
                >
                  <option value="date">Latest First</option>
                  <option value="name">Client Name</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results Summary */}
          <div className="results-summary">
            <span>📊 Showing <strong>{filteredCount}</strong> of <strong>{cases.length}</strong> requests</span>
          </div>

          {/* Case Request Table */}
          <CaseRequestTable
            requests={sortedRequests}
            searchTerm={searchTerm}
            filterStatus={filterStatus}
            onAccept={handleAcceptCase}
            onReject={handleRejectCase}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default LawyerCaseRequestsPage;
