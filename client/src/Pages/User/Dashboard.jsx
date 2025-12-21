import React, { useState, useMemo } from "react";
import DashboardCard from "../../Components/User/DashboardCard";
import Notification from "../../Components/User/Notification";
import Sidebar from "../../Components/User/Sidebar";
import "../../Styles/User/Dashboard-Enhanced.css";

// Sample data for appointments and cases
const upcomingAppointments = [
  { id: 1, title: "Court Hearing", date: "May 5, 2025", time: "10:00 AM", lawyer: "Adv. Ahmed Raza", location: "District Court, Karachi", priority: "high" },
  { id: 2, title: "Client Meeting", date: "May 6, 2025", time: "2:00 PM", lawyer: "Adv. Hina Sheikh", location: "Law Office", priority: "medium" },
  { id: 3, title: "Case Review", date: "May 8, 2025", time: "4:30 PM", lawyer: "Adv. Bilal Hussain", location: "Virtual Meeting", priority: "low" },
];

const recentCases = [
  { id: 1, name: "Divorce Case", status: "ongoing", lastUpdate: "2 mins ago", caseNumber: "#2024-001", caseType: "Family Law", amount: "PKR 500,000" },
  { id: 2, name: "Property Dispute", status: "pending", lastUpdate: "1 hr ago", caseNumber: "#2024-002", caseType: "Civil Law", amount: "PKR 1,200,000" },
  { id: 3, name: "Contract Review", status: "closed", lastUpdate: "Yesterday", caseNumber: "#2024-003", caseType: "Corporate Law", amount: "PKR 300,000" },
  { id: 4, name: "Inheritance Matter", status: "ongoing", lastUpdate: "3 hrs ago", caseNumber: "#2024-004", caseType: "Family Law", amount: "PKR 750,000" },
  { id: 5, name: "Labour Dispute", status: "pending", lastUpdate: "2 days ago", caseNumber: "#2024-005", caseType: "Labour Law", amount: "PKR 450,000" },
];

const getStatusBadgeClass = (status) => {
  return `status-badge status-${status}`;
};

// Statistics data
const getStatistics = (cases) => {
  const ongoing = cases.filter(c => c.status === "ongoing").length;
  const pending = cases.filter(c => c.status === "pending").length;
  const closed = cases.filter(c => c.status === "closed").length;
  const total = cases.length;
  
  return { ongoing, pending, closed, total };
};

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  
  const stats = useMemo(() => getStatistics(recentCases), []);
  
  const filteredCases = useMemo(() => {
    return recentCases.filter(caseItem => {
      const matchesSearch = caseItem.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           caseItem.caseNumber.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterStatus === "all" || caseItem.status === filterStatus;
      return matchesSearch && matchesFilter;
    });
  }, [searchTerm, filterStatus]);

  const winRate = Math.round((stats.closed / stats.total) * 100) || 0;

  return (
    <div className="dashboard-wrapper">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Dashboard Content */}
      <div className="dashboard-container">
        
        {/* Enhanced Header with Profile Widget */}
        <div className="dashboard-header">
          <div className="header-top">
            <div className="header-content">
              <h1>Welcome Back, Laiba! 👋</h1>
              <p>
                Your legal dashboard - manage cases, appointments, and stay connected with your legal team.
              </p>
            </div>
            <div className="header-profile-widget">
              <div className="profile-avatar">LM</div>
              <div className="profile-info">
                <p className="profile-name">Laiba Mubeen</p>
                <p className="profile-role">Premium Member</p>
              </div>
            </div>
          </div>

          {/* Statistics Cards with Icons */}
          <div className="dashboard-stats">
            <div className="stat-card">
              <div className="stat-icon ongoing">📁</div>
              <div className="stat-content">
                <p className="stat-label">Active Cases</p>
                <p className="stat-value">{stats.ongoing}</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon pending">⏳</div>
              <div className="stat-content">
                <p className="stat-label">Pending</p>
                <p className="stat-value">{stats.pending}</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon closed">✅</div>
              <div className="stat-content">
                <p className="stat-label">Completed</p>
                <p className="stat-value">{stats.closed}</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon success">📈</div>
              <div className="stat-content">
                <p className="stat-label">Success Rate</p>
                <p className="stat-value">{winRate}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Access Cards */}
        <div className="dashboard-cards">
          <DashboardCard
            title="Search Lawyers"
            description="Find lawyers based on your legal case and location."
            icon="⚖️"
            link="/user/find-lawyers"
          />
          <DashboardCard
            title="Suggested Lawyers"
            description="Get lawyer recommendations tailored to your needs."
            icon="⭐"
            link="/user/suggested-lawyers"
          />
          <DashboardCard
            title="My Case Requests"
            description="Track the status of your consultation requests."
            icon="📁"
            link="/user/requests"
          />
          <DashboardCard
            title="Profile Settings"
            description="Update your personal details and preferences."
            icon="👤"
            link="/user/profile"
          />
        </div>

        {/* Two-Column Layout for Appointments and Cases */}
        <div className="dashboard-grid-2col">
          {/* Upcoming Appointments */}
          <div className="dashboard-upcoming">
            <div className="section-header">
              <h2>📅 Upcoming Appointments</h2>
              <p className="section-subtitle">Your scheduled meetings and hearings</p>
            </div>
            <div className="appointments-list">
              {upcomingAppointments.length > 0 ? (
                upcomingAppointments.map((appointment) => (
                  <div 
                    key={appointment.id} 
                    className={`appointment-item ${appointment.priority}`}
                    onClick={() => setSelectedAppointment(appointment)}
                  >
                    <div className="appointment-time">
                      <div className="appointment-date">{appointment.date}</div>
                      <div className="appointment-clock">🕐 {appointment.time}</div>
                    </div>
                    <div className="appointment-details">
                      <h4>{appointment.title}</h4>
                      <p className="lawyer-name">with {appointment.lawyer}</p>
                      <p className="appointment-location">📍 {appointment.location}</p>
                    </div>
                    <button className="appointment-action" title="View details">→</button>
                  </div>
                ))
              ) : (
                <div className="no-data">
                  <p>📭 No upcoming appointments</p>
                  <small>Schedule your first consultation!</small>
                </div>
              )}
            </div>
          </div>

          {/* Recent Cases with Search and Filter */}
          <div className="dashboard-recent-cases">
            <div className="section-header">
              <h2>⚖️ Recent Cases</h2>
              <p className="section-subtitle">Track your active cases</p>
            </div>

            {/* Search and Filter Controls */}
            <div className="cases-controls">
              <input
                type="text"
                placeholder="🔍 Search by case name or ID..."
                className="cases-search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <select
                className="cases-filter"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="ongoing">Ongoing</option>
                <option value="pending">Pending</option>
                <option value="closed">Closed</option>
              </select>
            </div>

            {/* Cases Table */}
            <div className="cases-table-wrapper">
              {filteredCases.length > 0 ? (
                <table className="cases-table">
                  <thead>
                    <tr>
                      <th>Case ID</th>
                      <th>Case Name</th>
                      <th>Type</th>
                      <th>Status</th>
                      <th>Amount</th>
                      <th>Last Update</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCases.map((caseItem) => (
                      <tr key={caseItem.id} className="case-row">
                        <td className="case-id">{caseItem.caseNumber}</td>
                        <td className="case-name">{caseItem.name}</td>
                        <td className="case-type">{caseItem.caseType}</td>
                        <td>
                          <span className={getStatusBadgeClass(caseItem.status)}>
                            {caseItem.status.charAt(0).toUpperCase() + caseItem.status.slice(1)}
                          </span>
                        </td>
                        <td className="case-amount">{caseItem.amount}</td>
                        <td className="case-update">{caseItem.lastUpdate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="no-data">
                  <p>🔎 No cases found</p>
                  <small>Adjust your search or filter criteria</small>
                </div>
              )}
            </div>

            {/* Results Counter */}
            {filteredCases.length > 0 && (
              <div className="cases-footer">
                Showing {filteredCases.length} of {recentCases.length} cases
              </div>
            )}
          </div>
        </div>

        {/* Notifications Section */}
        <div className="dashboard-notifications">
          <h2>🔔 Recent Notifications</h2>
          <Notification />
        </div>

        {/* Action Buttons Footer */}
        <div className="dashboard-actions">
          <button className="action-btn primary">📥 Export Report</button>
          <button className="action-btn secondary">🖨️ Print Dashboard</button>
          <button className="action-btn secondary">🎤 Voice Assistant</button>
        </div>

        {/* Footer */}
        <div className="dashboard-footer">
          <p>© 2025 Adalah Legal App. Last updated: Just now</p>
          <p>Need help? <a href="#help">Contact Support</a> | <a href="#settings">View Settings</a></p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
