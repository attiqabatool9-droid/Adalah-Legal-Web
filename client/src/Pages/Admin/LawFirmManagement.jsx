import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../Components/Admin/AdminSidebar";
import { lawFirmsData } from "./adminData";
import "../../Styles/Admin/UserManagement.css";
import "../../Styles/Admin/LawFirmManagement.css";

const LawFirmManagement = () => {
  const navigate = useNavigate();
  const [firms, setFirms] = useState(lawFirmsData);
  const [editFirm, setEditFirm] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  // Check if admin is logged in
  React.useEffect(() => {
    if (!localStorage.getItem("isAdminLoggedIn")) {
      navigate("/admin/login");
    }
  }, [navigate]);

  // Delete Firm
  const deleteFirm = (id) => {
    setFirms(firms.filter((f) => f.id !== id));
  };

  // Toggle Status
  const toggleStatus = (id) => {
    setFirms(
      firms.map((f) =>
        f.id === id
          ? { ...f, status: f.status === "Active" ? "Inactive" : "Active" }
          : f
      )
    );
  };

  // Toggle Verification
  const toggleVerification = (id) => {
    setFirms(
      firms.map((f) =>
        f.id === id ? { ...f, verified: !f.verified } : f
      )
    );
  };

  // Save Edit
  const saveEdit = () => {
    if (!editFirm.name || !editFirm.email) {
      alert("Please fill in all required fields");
      return;
    }
    setFirms(
      firms.map((f) => (f.id === editFirm.id ? editFirm : f))
    );
    setEditFirm(null);
  };

  // Filter firms
  const filteredFirms = firms.filter((firm) => {
    const matchesSearch =
      firm.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      firm.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      firm.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "All" || firm.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("adminEmail");
    localStorage.removeItem("adminName");
    localStorage.removeItem("isAdminLoggedIn");
    navigate("/admin/login");
  };

  return (
    <div className="admin-wrapper">
      <AdminSidebar onLogout={handleLogout} />
      
      <div className="admin-page-content">
        {/* Header */}
        <div className="admin-page-header">
          <div className="admin-page-header-left">
            <h1>🏢 Law Firm Management</h1>
            <p>Manage registered law firms and verify profiles</p>
          </div>
          <div className="admin-page-stats">
            <div className="stat-badge">
              <span className="stat-label">Total Firms</span>
              <span className="stat-value">{firms.length}</span>
            </div>
            <div className="stat-badge active-badge">
              <span className="stat-label">Verified</span>
              <span className="stat-value">{firms.filter(f => f.verified).length}</span>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="admin-filters-section">
          <div className="admin-search-box">
            <input
              type="text"
              placeholder="🔍 Search by firm name, email, or city..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="admin-search-input"
            />
          </div>
          <div className="admin-filter-buttons">
            <button
              className={`filter-btn ${filterStatus === "All" ? "active" : ""}`}
              onClick={() => setFilterStatus("All")}
            >
              All ({firms.length})
            </button>
            <button
              className={`filter-btn ${filterStatus === "Active" ? "active" : ""}`}
              onClick={() => setFilterStatus("Active")}
            >
              Active ({firms.filter(f => f.status === "Active").length})
            </button>
            <button
              className={`filter-btn ${filterStatus === "Inactive" ? "active" : ""}`}
              onClick={() => setFilterStatus("Inactive")}
            >
              Inactive ({firms.filter(f => f.status === "Inactive").length})
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="admin-table-container">
          {filteredFirms.length === 0 ? (
            <div className="admin-empty-state">
              <p>No law firms found matching your criteria</p>
            </div>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Firm Name</th>
                  <th>Email</th>
                  <th>City</th>
                  <th>Lawyers</th>
                  <th>Est. Year</th>
                  <th>Status</th>
                  <th>Verified</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredFirms.map((firm) => (
                  <tr key={firm.id}>
                    <td>
                      <div className="user-name-cell">
                        <div className="firm-avatar">{firm.name.charAt(0)}</div>
                        <div>
                          <div className="firm-name">{firm.name}</div>
                          <div className="firm-website">{firm.website}</div>
                        </div>
                      </div>
                    </td>
                    <td>{firm.email}</td>
                    <td>{firm.city}</td>
                    <td>
                      <span className="lawyers-badge">{firm.lawyersCount} Lawyers</span>
                    </td>
                    <td>{firm.established}</td>
                    <td>
                      <span className={`status-badge ${firm.status.toLowerCase()}`}>
                        {firm.status}
                      </span>
                    </td>
                    <td>
                      <span className={`verification-badge ${firm.verified ? "verified" : "unverified"}`}>
                        {firm.verified ? "✅" : "❌"}
                      </span>
                    </td>
                    <td className="actions-cell">
                      <button 
                        className="action-btn edit-btn"
                        onClick={() => setEditFirm(firm)}
                        title="Edit firm"
                      >
                        ✏️ Edit
                      </button>
                      <button 
                        className={`action-btn toggle-btn`}
                        onClick={() => toggleStatus(firm.id)}
                        title={firm.status === "Active" ? "Deactivate" : "Activate"}
                      >
                        {firm.status === "Active" ? "⏸️" : "▶️"}
                      </button>
                      <button 
                        className={`action-btn verify-btn ${firm.verified ? "unverify" : "verify"}`}
                        onClick={() => toggleVerification(firm.id)}
                        title={firm.verified ? "Unverify" : "Verify"}
                      >
                        {firm.verified ? "✕" : "✓"}
                      </button>
                      <button 
                        className="action-btn delete-btn"
                        onClick={() => deleteFirm(firm.id)}
                        title="Delete firm"
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

        {/* EDIT MODAL */}
        {editFirm && (
          <div className="admin-modal-overlay" onClick={() => setEditFirm(null)}>
            <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
              <div className="admin-modal-header">
                <h3>Edit Law Firm Profile</h3>
                <button 
                  className="modal-close-btn"
                  onClick={() => setEditFirm(null)}
                >
                  ✕
                </button>
              </div>

              <div className="admin-modal-body">
                <div className="form-group">
                  <label>Firm Name</label>
                  <input
                    type="text"
                    value={editFirm.name}
                    onChange={(e) =>
                      setEditFirm({ ...editFirm, name: e.target.value })
                    }
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={editFirm.email}
                    onChange={(e) =>
                      setEditFirm({ ...editFirm, email: e.target.value })
                    }
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="text"
                    value={editFirm.phone}
                    onChange={(e) =>
                      setEditFirm({
                        ...editFirm,
                        phone: e.target.value,
                      })
                    }
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label>City</label>
                  <input
                    type="text"
                    value={editFirm.city}
                    onChange={(e) =>
                      setEditFirm({ ...editFirm, city: e.target.value })
                    }
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label>Number of Lawyers</label>
                  <input
                    type="number"
                    value={editFirm.lawyersCount}
                    onChange={(e) =>
                      setEditFirm({
                        ...editFirm,
                        lawyersCount: parseInt(e.target.value),
                      })
                    }
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label>Status</label>
                  <select
                    value={editFirm.status}
                    onChange={(e) =>
                      setEditFirm({ ...editFirm, status: e.target.value })
                    }
                    className="form-input"
                  >
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </div>
              </div>

              <div className="admin-modal-footer">
                <button className="btn-primary" onClick={saveEdit}>
                  💾 Save Changes
                </button>
                <button className="btn-secondary" onClick={() => setEditFirm(null)}>
                  ✕ Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LawFirmManagement;
