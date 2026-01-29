import React, { useState, useEffect, useMemo } from "react";
import "../../Styles/Lawyer/LawyerDashboard-Enhanced.css";
import LawyerSidebar from "../../Components/Lawyer/LawyerSidebar";
import API from "../../api";

const AllCasesTable = ({ cases, searchTerm, filterStatus, loading }) => {
  const filteredCases = useMemo(() => {
    return cases.filter((c) => {
      const matchesSearch =
        (c.client?.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.caseType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterStatus === "All" || c.status === filterStatus;
      return matchesSearch && matchesFilter;
    });
  }, [cases, searchTerm, filterStatus]);

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
      active: "Active",
      completed: "Completed",
      rejected: "Rejected"
    };
    return labels[status] || status;
  };

  return (
    <div className="case-request-table">
      {loading ? (
        <p>Loading cases...</p>
      ) : filteredCases.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Client</th>
              <th>Case Title</th>
              <th>Case Type</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredCases.map((c) => (
              <tr key={c._id}>
                <td>
                  <div className="client-info">
                    <span className="client-avatar">👤</span>
                    <span>{c.client?.name || "Unknown Client"}</span>
                  </div>
                </td>
                <td>{c.title}</td>
                <td>{c.caseType}</td>
                <td>
                  <span
                    className="status-badge"
                    style={{ backgroundColor: getStatusColor(c.status) }}
                  >
                    {getStatusLabel(c.status)}
                  </span>
                </td>
                <td>{new Date(c.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="empty-state">
          <p>📭 No cases found</p>
          <small>Try adjusting your search or filters</small>
        </div>
      )}
    </div>
  );
};

const LawyerAllCasesPage = () => {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortBy, setSortBy] = useState("date");

  const statusOptions = ["All", "pending", "active", "completed", "rejected"];

  useEffect(() => {
    const fetchAllCases = async () => {
      try {
        setLoading(true);
        const response = await API.get("/api/cases");
        setCases(response.data);
      } catch (error) {
        console.error("Error fetching all cases:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllCases();
  }, []);

  const getSortedCases = (caseList) => {
    const sorted = [...caseList];
    if (sortBy === "date") {
      sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === "name") {
      sorted.sort((a, b) => (a.client?.name || "").localeCompare(b.client?.name || ""));
    }
    return sorted;
  };

  const sortedCases = getSortedCases(cases);
  const filteredCount = sortedCases.filter(
    (c) =>
      (searchTerm === "" ||
        (c.client?.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.caseType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.title.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterStatus === "All" || c.status === filterStatus)
  ).length;

  return (
    <div className="lawyer-dashboard-wrapper">
      <LawyerSidebar />
      <div className="lawyer-dashboard-main">
        <div className="section-card">
          <h2>📊 All Cases</h2>
          <p className="section-description">View all cases with their current status.</p>

          {/* Search and Filter Section */}
          <div className="search-filter-section">
            <div className="search-box">
              <input
                type="text"
                placeholder="🔍 Search by client, title or case type..."
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
            <span>📊 Showing <strong>{filteredCount}</strong> of <strong>{cases.length}</strong> cases</span>
          </div>

          {/* All Cases Table */}
          <AllCasesTable
            cases={sortedCases}
            searchTerm={searchTerm}
            filterStatus={filterStatus}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default LawyerAllCasesPage;
