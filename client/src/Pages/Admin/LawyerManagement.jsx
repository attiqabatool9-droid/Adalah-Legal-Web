import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../Components/Admin/AdminSidebar";
import { lawyersData } from "./adminData";
import "../../Styles/Admin/UserManagement.css";
import "../../Styles/Admin/LawyerManagement.css";

const LawyerManagement = () => {
  const navigate = useNavigate();
  const [lawyers, setLawyers] = useState(lawyersData);
  const [editLawyer, setEditLawyer] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  // Check if admin is logged in
  React.useEffect(() => {
    if (!localStorage.getItem("isAdminLoggedIn")) {
      navigate("/admin/login");
    }
  }, [navigate]);

  // Delete Lawyer
  const deleteLawyer = (id) => {
    setLawyers(lawyers.filter((l) => l.id !== id));
  };

  // Toggle Active / Inactive
  const toggleStatus = (id) => {
    setLawyers(
      lawyers.map((l) =>
        l.id === id
          ? { ...l, status: l.status === "Active" ? "Inactive" : "Active" }
          : l
      )
    );
  };

  // Toggle Verification
  const toggleVerification = (id) => {
    setLawyers(
      lawyers.map((l) =>
        l.id === id ? { ...l, verified: !l.verified } : l
      )
    );
  };

  // Save Edit
  const saveEdit = () => {
    if (!editLawyer.name || !editLawyer.email) {
      alert("Please fill in all required fields");
      return;
    }
    setLawyers(
      lawyers.map((l) => (l.id === editLawyer.id ? editLawyer : l))
    );
    setEditLawyer(null);
  };

  // Filter lawyers
  const filteredLawyers = lawyers.filter((lawyer) => {
    const matchesSearch =
      lawyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lawyer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lawyer.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "All" || lawyer.status === filterStatus;
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
            <h1>⚖️ Lawyer Management</h1>
            <p>Manage lawyer profiles and verification</p>
          </div>
          <div className="admin-page-stats">
            <div className="stat-badge">
              <span className="stat-label">Total Lawyers</span>
              <span className="stat-value">{lawyers.length}</span>
            </div>
            <div className="stat-badge active-badge">
              <span className="stat-label">Verified</span>
              <span className="stat-value">{lawyers.filter(l => l.verified).length}</span>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="admin-filters-section">
          <div className="admin-search-box">
            <input
              type="text"
              placeholder="🔍 Search by name, email, or specialization..."
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
              All ({lawyers.length})
            </button>
            <button
              className={`filter-btn ${filterStatus === "Active" ? "active" : ""}`}
              onClick={() => setFilterStatus("Active")}
            >
              Active ({lawyers.filter(l => l.status === "Active").length})
            </button>
            <button
              className={`filter-btn ${filterStatus === "Inactive" ? "active" : ""}`}
              onClick={() => setFilterStatus("Inactive")}
            >
              Inactive ({lawyers.filter(l => l.status === "Inactive").length})
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="admin-table-container">
          {filteredLawyers.length === 0 ? (
            <div className="admin-empty-state">
              <p>No lawyers found matching your criteria</p>
            </div>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Specialization</th>
                  <th>Experience</th>
                  <th>City</th>
                  <th>Status</th>
                  <th>Verified</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLawyers.map((lawyer) => (
                  <tr key={lawyer.id}>
                    <td>
                      <div className="user-name-cell">
                        <div className="user-avatar">{lawyer.name.charAt(0)}</div>
                        {lawyer.name}
                      </div>
                    </td>
                    <td>{lawyer.email}</td>
                    <td>
                      <span className="specialization-badge">{lawyer.specialization}</span>
                    </td>
                    <td>{lawyer.experience}</td>
                    <td>{lawyer.city}</td>
                    <td>
                      <span className={`status-badge ${lawyer.status.toLowerCase()}`}>
                        {lawyer.status}
                      </span>
                    </td>
                    <td>
                      <span className={`verification-badge ${lawyer.verified ? "verified" : "unverified"}`}>
                        {lawyer.verified ? "✅ Verified" : "❌ Unverified"}
                      </span>
                    </td>
                    <td className="actions-cell">
                      <button 
                        className="action-btn edit-btn"
                        onClick={() => setEditLawyer(lawyer)}
                        title="Edit lawyer"
                      >
                        ✏️ Edit
                      </button>
                      <button 
                        className={`action-btn toggle-btn`}
                        onClick={() => toggleStatus(lawyer.id)}
                        title={lawyer.status === "Active" ? "Deactivate" : "Activate"}
                      >
                        {lawyer.status === "Active" ? "⏸️" : "▶️"}
                      </button>
                      <button 
                        className={`action-btn verify-btn ${lawyer.verified ? "unverify" : "verify"}`}
                        onClick={() => toggleVerification(lawyer.id)}
                        title={lawyer.verified ? "Unverify" : "Verify"}
                      >
                        {lawyer.verified ? "✕" : "✓"}
                      </button>
                      <button 
                        className="action-btn delete-btn"
                        onClick={() => deleteLawyer(lawyer.id)}
                        title="Delete lawyer"
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
        {editLawyer && (
          <div className="admin-modal-overlay" onClick={() => setEditLawyer(null)}>
            <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
              <div className="admin-modal-header">
                <h3>Edit Lawyer Profile</h3>
                <button 
                  className="modal-close-btn"
                  onClick={() => setEditLawyer(null)}
                >
                  ✕
                </button>
              </div>

              <div className="admin-modal-body">
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    value={editLawyer.name}
                    onChange={(e) =>
                      setEditLawyer({ ...editLawyer, name: e.target.value })
                    }
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={editLawyer.email}
                    onChange={(e) =>
                      setEditLawyer({ ...editLawyer, email: e.target.value })
                    }
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label>Specialization</label>
                  <input
                    type="text"
                    value={editLawyer.specialization}
                    onChange={(e) =>
                      setEditLawyer({
                        ...editLawyer,
                        specialization: e.target.value,
                      })
                    }
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label>Experience</label>
                  <input
                    type="text"
                    value={editLawyer.experience}
                    onChange={(e) =>
                      setEditLawyer({
                        ...editLawyer,
                        experience: e.target.value,
                      })
                    }
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label>City</label>
                  <input
                    type="text"
                    value={editLawyer.city}
                    onChange={(e) =>
                      setEditLawyer({
                        ...editLawyer,
                        city: e.target.value,
                      })
                    }
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label>Status</label>
                  <select
                    value={editLawyer.status}
                    onChange={(e) =>
                      setEditLawyer({ ...editLawyer, status: e.target.value })
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
                <button className="btn-secondary" onClick={() => setEditLawyer(null)}>
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

export default LawyerManagement;
