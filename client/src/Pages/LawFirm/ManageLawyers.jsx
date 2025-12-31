import React, { useState } from "react";
import "../../Styles/LawFirm/ManageLawyers.css";

// Components
import Sidebar from "../../Components/LawFirm/Sidebar";

const ManageLawyers = () => {
  // Dummy lawyers data (backend later)
  const [lawyers, setLawyers] = useState([
    {
      id: 1,
      name: "Ali Raza",
      email: "ali@gmail.com",
      specialization: "Criminal Law",
      status: "Active",
    },
    {
      id: 2,
      name: "Sara Khan",
      email: "sara@gmail.com",
      specialization: "Family Law",
      status: "Inactive",
    },
  ]);

  // Add new lawyer states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [specialization, setSpecialization] = useState("");

  // Add Lawyer Function
  const handleAddLawyer = () => {
    if (!name || !email || !specialization) {
      alert("Please fill all fields");
      return;
    }

    const newLawyer = {
      id: lawyers.length + 1,
      name,
      email,
      specialization,
      status: "Active",
    };

    setLawyers([...lawyers, newLawyer]);

    // clear form
    setName("");
    setEmail("");
    setSpecialization("");
  };

  // Toggle Lawyer Status
  const toggleStatus = (id) => {
    const updatedLawyers = lawyers.map((lawyer) =>
      lawyer.id === id
        ? {
            ...lawyer,
            status: lawyer.status === "Active" ? "Inactive" : "Active",
          }
        : lawyer
    );

    setLawyers(updatedLawyers);
  };

  return (
    <div className="manage-lawyers-wrapper">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="manage-lawyers-container">
        {/* Header */}
        <div className="manage-lawyers-header">
          <h2>👨‍⚖️ Manage Lawyers</h2>
          <p>Add, view and manage lawyers of your law firm.</p>
        </div>

        {/* Add Lawyer Form */}
        <div className="add-lawyer-section">
          <h3>➕ Add New Lawyer</h3>

          <div className="form-inputs-grid">
            <div className="form-group">
              <label className="form-label">Lawyer Name</label>
              <input
                type="text"
                className="form-input"
                placeholder="Enter lawyer name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-input"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Specialization</label>
              <input
                type="text"
                className="form-input"
                placeholder="Enter specialization"
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
              />
            </div>
          </div>

          <button className="add-lawyer-button" onClick={handleAddLawyer}>
            ➕ Add Lawyer
          </button>
        </div>

        {/* Lawyers Table */}
        <div className="lawyers-table-section">
          <h3>📋 Lawyers List</h3>

          {lawyers.length === 0 ? (
            <div className="empty-state">
              <p>No lawyers found</p>
            </div>
          ) : (
            <div className="lawyers-table-wrapper">
              <table className="lawyers-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Specialization</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {lawyers.map((lawyer, index) => (
                    <tr key={lawyer.id}>
                      <td>{index + 1}</td>
                      <td className="lawyer-name">{lawyer.name}</td>
                      <td className="lawyer-email">{lawyer.email}</td>
                      <td className="lawyer-specialization">
                        {lawyer.specialization}
                      </td>
                      <td>
                        <span
                          className={`status-badge ${
                            lawyer.status === "Active"
                              ? "status-active"
                              : "status-inactive"
                          }`}
                        >
                          {lawyer.status}
                        </span>
                      </td>
                      <td>
                        <button
                          className="lawyer-action-button btn-toggle-status"
                          onClick={() => toggleStatus(lawyer.id)}
                        >
                          {lawyer.status === "Active"
                            ? "Deactivate"
                            : "Activate"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageLawyers;
