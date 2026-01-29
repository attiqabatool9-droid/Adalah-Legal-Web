import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../Components/Admin/AdminSidebar";
import { usersData } from "./adminData";
import "../../Styles/Admin/UserManagement.css";

const UserManagement = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState(usersData);
  const [editUser, setEditUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  // Check if admin is logged in
  React.useEffect(() => {
    if (!localStorage.getItem("isAdminLoggedIn")) {
      navigate("/admin/login");
    }
  }, [navigate]);

  // Delete User
  const deleteUser = (id) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  // Toggle Active / Inactive
  const toggleStatus = (id) => {
    setUsers(
      users.map((u) =>
        u.id === id
          ? { ...u, status: u.status === "Active" ? "Inactive" : "Active" }
          : u
      )
    );
  };

  // Save Edited User
  const saveEdit = () => {
    if (!editUser.name || !editUser.email) {
      alert("Please fill in all fields");
      return;
    }
    setUsers(users.map((u) => (u.id === editUser.id ? editUser : u)));
    setEditUser(null);
  };

  // Filter users
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "All" || user.status === filterStatus;
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
            <h1>👥 User Management</h1>
            <p>Manage and monitor all user accounts</p>
          </div>
          <div className="admin-page-stats">
            <div className="stat-badge">
              <span className="stat-label">Total Users</span>
              <span className="stat-value">{users.length}</span>
            </div>
            <div className="stat-badge active-badge">
              <span className="stat-label">Active</span>
              <span className="stat-value">{users.filter(u => u.status === "Active").length}</span>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="admin-filters-section">
          <div className="admin-search-box">
            <input
              type="text"
              placeholder="🔍 Search by name or email..."
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
              All ({users.length})
            </button>
            <button
              className={`filter-btn ${filterStatus === "Active" ? "active" : ""}`}
              onClick={() => setFilterStatus("Active")}
            >
              Active ({users.filter(u => u.status === "Active").length})
            </button>
            <button
              className={`filter-btn ${filterStatus === "Inactive" ? "active" : ""}`}
              onClick={() => setFilterStatus("Inactive")}
            >
              Inactive ({users.filter(u => u.status === "Inactive").length})
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="admin-table-container">
          {filteredUsers.length === 0 ? (
            <div className="admin-empty-state">
              <p>No users found matching your criteria</p>
            </div>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Join Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <div className="user-name-cell">
                        <div className="user-avatar">{user.name.charAt(0)}</div>
                        {user.name}
                      </div>
                    </td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{new Date(user.joinDate).toLocaleDateString()}</td>
                    <td>
                      <span className={`status-badge ${user.status.toLowerCase()}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="actions-cell">
                      <button 
                        className="action-btn edit-btn"
                        onClick={() => setEditUser(user)}
                        title="Edit user"
                      >
                        ✏️ Edit
                      </button>
                      <button 
                        className={`action-btn toggle-btn`}
                        onClick={() => toggleStatus(user.id)}
                        title={user.status === "Active" ? "Deactivate" : "Activate"}
                      >
                        {user.status === "Active" ? "⏸️ Deactivate" : "▶️ Activate"}
                      </button>
                      <button 
                        className="action-btn delete-btn"
                        onClick={() => deleteUser(user.id)}
                        title="Delete user"
                      >
                        🗑️ Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* EDIT MODAL */}
        {editUser && (
          <div className="admin-modal-overlay" onClick={() => setEditUser(null)}>
            <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
              <div className="admin-modal-header">
                <h3>Edit User</h3>
                <button 
                  className="modal-close-btn"
                  onClick={() => setEditUser(null)}
                >
                  ✕
                </button>
              </div>

              <div className="admin-modal-body">
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    value={editUser.name}
                    onChange={(e) =>
                      setEditUser({ ...editUser, name: e.target.value })
                    }
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={editUser.email}
                    onChange={(e) =>
                      setEditUser({ ...editUser, email: e.target.value })
                    }
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="text"
                    value={editUser.phone}
                    onChange={(e) =>
                      setEditUser({ ...editUser, phone: e.target.value })
                    }
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label>Status</label>
                  <select
                    value={editUser.status}
                    onChange={(e) =>
                      setEditUser({ ...editUser, status: e.target.value })
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
                <button className="btn-secondary" onClick={() => setEditUser(null)}>
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

export default UserManagement;
