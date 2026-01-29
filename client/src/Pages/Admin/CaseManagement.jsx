import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../Components/Admin/AdminSidebar";
import { casesData } from "./adminData";
import "../../Styles/Admin/UserManagement.css";
import "../../Styles/Admin/CaseManagement.css";

const CaseManagement = () => {
  const navigate = useNavigate();
  const [cases, setCases] = useState(casesData);
  const [selectedCase, setSelectedCase] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterPriority, setFilterPriority] = useState("All");

  // Check if admin is logged in
  React.useEffect(() => {
    if (!localStorage.getItem("isAdminLoggedIn")) {
      navigate("/admin/login");
    }
  }, [navigate]);

  // Delete Case
  const deleteCase = (id) => {
    setCases(cases.filter((c) => c.id !== id));
  };

  // Update Status
  const updateStatus = (id, newStatus) => {
    setCases(
      cases.map((c) =>
        c.id === id ? { ...c, status: newStatus } : c
      )
    );
  };

  // Filter cases
  const filteredCases = cases.filter((caseItem) => {
    const matchesSearch =
      caseItem.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseItem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseItem.user.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus =
      filterStatus === "All" || caseItem.status === filterStatus;
    
    const matchesPriority =
      filterPriority === "All" || caseItem.priority === filterPriority;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("adminEmail");
    localStorage.removeItem("adminName");
    localStorage.removeItem("isAdminLoggedIn");
    navigate("/admin/login");
  };

  // Get status stats
  const statusStats = {
    Open: cases.filter(c => c.status === "Open").length,
    "In Progress": cases.filter(c => c.status === "In Progress").length,
    Resolved: cases.filter(c => c.status === "Resolved").length,
    Pending: cases.filter(c => c.status === "Pending").length,
  };

  return (
    <div className="admin-wrapper">
      <AdminSidebar onLogout={handleLogout} />
      
      <div className="admin-page-content">
        {/* Header */}
        <div className="admin-page-header">
          <div className="admin-page-header-left">
            <h1>📁 Case Management</h1>
            <p>Monitor and manage all legal cases</p>
          </div>
          <div className="admin-page-stats">
            <div className="stat-badge">
              <span className="stat-label">Total Cases</span>
              <span className="stat-value">{cases.length}</span>
            </div>
            <div className="stat-badge active-badge">
              <span className="stat-label">In Progress</span>
              <span className="stat-value">{statusStats["In Progress"]}</span>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="admin-filters-section">
          <div className="admin-search-box">
            <input
              type="text"
              placeholder="🔍 Search by case ID, title, or user..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="admin-search-input"
            />
          </div>
          <div className="admin-filter-buttons">
            <select 
              className="filter-select"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option>All Status</option>
              <option>Open</option>
              <option>Pending</option>
              <option>In Progress</option>
              <option>Resolved</option>
            </select>
            <select 
              className="filter-select"
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
            >
              <option>All Priority</option>
              <option>Critical</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="admin-table-container">
          {filteredCases.length === 0 ? (
            <div className="admin-empty-state">
              <p>No cases found matching your criteria</p>
            </div>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Case ID</th>
                  <th>Title</th>
                  <th>Type</th>
                  <th>User</th>
                  <th>Lawyer</th>
                  <th>City</th>
                  <th>Status</th>
                  <th>Priority</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCases.map((caseItem) => (
                  <tr key={caseItem.id}>
                    <td>
                      <span className="case-id-badge">{caseItem.id}</span>
                    </td>
                    <td>
                      <div className="case-title-cell">
                        <strong>{caseItem.title}</strong>
                      </div>
                    </td>
                    <td>
                      <span className="case-type-badge">{caseItem.type}</span>
                    </td>
                    <td>{caseItem.user}</td>
                    <td>{caseItem.lawyer}</td>
                    <td>{caseItem.city}</td>
                    <td>
                      <select
                        className="status-select"
                        value={caseItem.status}
                        onChange={(e) => updateStatus(caseItem.id, e.target.value)}
                      >
                        <option>Open</option>
                        <option>Pending</option>
                        <option>In Progress</option>
                        <option>Resolved</option>
                      </select>
                    </td>
                    <td>
                      <span className={`priority-badge ${caseItem.priority.toLowerCase()}`}>
                        {caseItem.priority}
                      </span>
                    </td>
                    <td>{new Date(caseItem.date).toLocaleDateString()}</td>
                    <td className="actions-cell">
                      <button 
                        className="action-btn edit-btn"
                        onClick={() => setSelectedCase(caseItem)}
                        title="View details"
                      >
                        👁️ View
                      </button>
                      <button 
                        className="action-btn delete-btn"
                        onClick={() => deleteCase(caseItem.id)}
                        title="Delete case"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* CASE DETAILS MODAL */}
        {selectedCase && (
          <div className="admin-modal-overlay" onClick={() => setSelectedCase(null)}>
            <div className="admin-modal case-modal" onClick={(e) => e.stopPropagation()}>
              <div className="admin-modal-header">
                <h3>Case Details</h3>
                <button 
                  className="modal-close-btn"
                  onClick={() => setSelectedCase(null)}
                >
                  ✕
                </button>
              </div>

              <div className="admin-modal-body">
                <div className="case-details-grid">
                  <div className="detail-group">
                    <label>Case ID</label>
                    <p className="detail-value">{selectedCase.id}</p>
                  </div>

                  <div className="detail-group">
                    <label>Title</label>
                    <p className="detail-value">{selectedCase.title}</p>
                  </div>

                  <div className="detail-group">
                    <label>Type</label>
                    <p className="detail-value">{selectedCase.type}</p>
                  </div>

                  <div className="detail-group">
                    <label>User</label>
                    <p className="detail-value">{selectedCase.user}</p>
                  </div>

                  <div className="detail-group">
                    <label>Assigned Lawyer</label>
                    <p className="detail-value">{selectedCase.lawyer || "Not Assigned"}</p>
                  </div>

                  <div className="detail-group">
                    <label>Law Firm</label>
                    <p className="detail-value">{selectedCase.firm || "Not Assigned"}</p>
                  </div>

                  <div className="detail-group">
                    <label>City</label>
                    <p className="detail-value">{selectedCase.city}</p>
                  </div>

                  <div className="detail-group">
                    <label>Status</label>
                    <p className="detail-value">
                      <span className={`status-badge ${selectedCase.status.toLowerCase()}`}>
                        {selectedCase.status}
                      </span>
                    </p>
                  </div>

                  <div className="detail-group">
                    <label>Priority</label>
                    <p className="detail-value">
                      <span className={`priority-badge ${selectedCase.priority.toLowerCase()}`}>
                        {selectedCase.priority}
                      </span>
                    </p>
                  </div>

                  <div className="detail-group">
                    <label>Created On</label>
                    <p className="detail-value">{new Date(selectedCase.date).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              <div className="admin-modal-footer">
                <button className="btn-secondary" onClick={() => setSelectedCase(null)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CaseManagement;
