import React, { useState, useMemo } from "react";
import "../../Styles/Lawyer/LawyerDashboard-Enhanced.css";
import LawyerSidebar from "../../Components/Lawyer/LawyerSidebar";

const CaseRequestTable = ({ requests, searchTerm, filterStatus }) => {
  const filteredRequests = useMemo(() => {
    return requests.filter((r) => {
      const matchesSearch =
        r.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.caseType.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterStatus === "All" || r.status === filterStatus;
      return matchesSearch && matchesFilter;
    });
  }, [requests, searchTerm, filterStatus]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "#FFC107";
      case "Accepted":
        return "#4CAF50";
      case "Completed":
        return "#2196F3";
      case "Rejected":
        return "#F44336";
      default:
        return "#999";
    }
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
              <tr key={r.id}>
                <td>
                  <div className="client-info">
                    <span className="client-avatar">👤</span>
                    <span>{r.userName}</span>
                  </div>
                </td>
                <td>{r.caseType}</td>
                <td>
                  <span
                    className="status-badge"
                    style={{ backgroundColor: getStatusColor(r.status) }}
                  >
                    {r.status}
                  </span>
                </td>
                <td>{r.date}</td>
                <td>
                  <button className="btn-action" title="View Details">👁️</button>
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
  // Example case requests
  const caseRequests = [
    { id: 1, userName: "Laiba Mubeen", caseType: "Family Law", status: "Pending", date: "10 Sep 2025" },
    { id: 2, userName: "Ali Khan", caseType: "Criminal Case", status: "Accepted", date: "02 Sep 2025" },
    { id: 3, userName: "Sara Ahmed", caseType: "Corporate Agreement", status: "Completed", date: "20 Aug 2025" },
    { id: 4, userName: "Hassan Raza", caseType: "Property Dispute", status: "Pending", date: "15 Sep 2025" },
    { id: 5, userName: "Fatima Khan", caseType: "Divorce Case", status: "Rejected", date: "05 Sep 2025" },
    { id: 6, userName: "Ahmed Abdullah", caseType: "Contract Review", status: "Accepted", date: "12 Sep 2025" },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortBy, setSortBy] = useState("date");

  const statusOptions = ["All", "Pending", "Accepted", "Completed", "Rejected"];

  const getSortedRequests = (requests) => {
    const sorted = [...requests];
    if (sortBy === "date") {
      sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortBy === "name") {
      sorted.sort((a, b) => a.userName.localeCompare(b.userName));
    }
    return sorted;
  };

  const sortedRequests = getSortedRequests(caseRequests);
  const filteredCount = sortedRequests.filter(
    (r) =>
      (searchTerm === "" ||
        r.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
                      {status}
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
            <span>📊 Showing <strong>{filteredCount}</strong> of <strong>{caseRequests.length}</strong> requests</span>
          </div>

          {/* Case Request Table */}
          <CaseRequestTable
            requests={sortedRequests}
            searchTerm={searchTerm}
            filterStatus={filterStatus}
          />
        </div>
      </div>
    </div>
  );
};

export default LawyerCaseRequestsPage;
