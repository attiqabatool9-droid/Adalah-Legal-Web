import React, { useState } from "react";
import "../../Styles/Lawyer/LawyerDashboard-Enhanced.css";
import LawyerSidebar from "../../Components/Lawyer/LawyerSidebar";

const LawyerAppointmentsPage = () => {
  const [filter, setFilter] = useState("All");

  // Dummy appointments
  const [appointments] = useState([
    {
      id: 1,
      clientName: "Ahmed Raza",
      caseType: "Criminal Law",
      date: "18 Sep 2025",
      time: "11:00 AM",
      mode: "Online",
      status: "Upcoming",
    },
    {
      id: 2,
      clientName: "Hina Noor",
      caseType: "Family Law",
      date: "20 Sep 2025",
      time: "02:00 PM",
      mode: "In-Person",
      status: "Upcoming",
    },
    {
      id: 3,
      clientName: "Usman Ali",
      caseType: "Corporate Law",
      date: "10 Sep 2025",
      time: "04:30 PM",
      mode: "Online",
      status: "Completed",
    },
  ]);

  const filteredAppointments = appointments.filter(app => 
    filter === "All" ? true : app.status === filter
  );

  return (
    <div className="lawyer-dashboard-wrapper">
      <LawyerSidebar />

      <div className="lawyer-dashboard-main">
        <div className="section-card">
          <h2>Appointments</h2>
          <p className="section-description">
            Manage your client meetings and consultations.
          </p>

          {/* Filter Buttons */}
          <div className="appointments-filter">
            <button 
              className={filter === "All" ? "active-filter" : ""}
              onClick={() => setFilter("All")}>All</button>
            <button 
              className={filter === "Upcoming" ? "active-filter" : ""}
              onClick={() => setFilter("Upcoming")}>Upcoming</button>
            <button 
              className={filter === "Completed" ? "active-filter" : ""}
              onClick={() => setFilter("Completed")}>Completed</button>
          </div>

          <div className="appointments-table">
            <table>
              <thead>
                <tr>
                  <th>Client</th>
                  <th>Case Type</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Mode</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {filteredAppointments.length > 0 ? filteredAppointments.map((app) => (
                  <tr key={app.id}>
                    <td>{app.clientName}</td>
                    <td>{app.caseType}</td>
                    <td>{app.date}</td>
                    <td>{app.time}</td>
                    <td>{app.mode}</td>
                    <td>
                      <span
                        className={`status-badge ${
                          app.status === "Upcoming" ? "upcoming" : "completed"
                        }`}
                        title={app.status === "Upcoming" ? "Client meeting pending" : "Meeting done"}
                      >
                        {app.status === "Upcoming" ? "⏳ Upcoming" : "✅ Completed"}
                      </span>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="6" style={{ textAlign: "center" }}>No appointments found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LawyerAppointmentsPage;
