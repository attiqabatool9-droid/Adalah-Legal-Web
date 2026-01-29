import React, { useState, useMemo, useContext, useEffect } from "react"; // 1. useContext add kiya
import DashboardCard from "../../Components/User/DashboardCard";
import Notification from "../../Components/User/Notification";
import Sidebar from "../../Components/User/Sidebar";
import "../../Styles/User/Dashboard-Enhanced.css";
import { AuthContext } from "../../context/AuthContext"; // 2. Context Import kiya
import API from "../../api";

const Dashboard = () => {
  // 3. Yahan se User ka Data nikala
  const { user } = useContext(AuthContext);
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  // Fetch user's cases
  useEffect(() => {
    const fetchUserCases = async () => {
      try {
        setLoading(true);
        const response = await API.get("/api/cases");
        // Filter cases where user is the client
        const userCases = response.data.filter(c => c.client === user?._id || c.client?.toString() === user?._id);
        setCases(userCases);
      } catch (error) {
        console.error("Error fetching cases:", error);
      } finally {
        setLoading(false);
      }
    };
    
    if (user?._id) {
      fetchUserCases();
    }
  }, [user?._id]);

  const getStatistics = (caseList) => {
    const active = caseList.filter(c => c.status === "active").length;
    const pending = caseList.filter(c => c.status === "pending").length;
    const completed = caseList.filter(c => c.status === "completed").length;
    const rejected = caseList.filter(c => c.status === "rejected").length;
    const total = caseList.length;
    
    return { active, pending, completed, rejected, total };
  };

  // Sample data for appointments (will integrate later)
  const upcomingAppointments = [
    { id: 1, title: "Court Hearing", date: "May 5, 2025", time: "10:00 AM", lawyer: "Adv. Ahmed Raza", location: "District Court, Karachi", priority: "high" },
    { id: 2, title: "Client Meeting", date: "May 6, 2025", time: "2:00 PM", lawyer: "Adv. Hina Sheikh", location: "Law Office", priority: "medium" },
    { id: 3, title: "Case Review", date: "May 8, 2025", time: "4:30 PM", lawyer: "Adv. Bilal Hussain", location: "Virtual Meeting", priority: "low" },
  ];
  
  const stats = useMemo(() => getStatistics(cases), [cases]);
  
  const filteredCases = useMemo(() => {
    return cases.filter(caseItem => {
      const matchesSearch = caseItem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            caseItem.caseType.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterStatus === "all" || caseItem.status === filterStatus;
      return matchesSearch && matchesFilter;
    });
  }, [searchTerm, filterStatus, cases]);

  const successRate = stats.completed > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

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
              {/* 4. Yahan Naam Dynamic kar diya */}
              <h1>Welcome Back, {user ? user.name : "User"} 👋</h1>
              <p>
                Your legal dashboard - manage cases, appointments, and stay connected with your legal team.
              </p>
            </div>
            <div className="header-profile-widget">
              {/* Avatar bhi dynamic: Naam ka pehla letter */}
              <div className="profile-avatar">
                {user && user.name ? user.name.charAt(0).toUpperCase() : "U"}
              </div>
              <div className="profile-info">
                {/* Profile Name Dynamic */}
                <p className="profile-name">{user ? user.name : "Guest User"}</p>
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
                <p className="stat-value">{loading ? "..." : stats.active}</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon pending">⏳</div>
              <div className="stat-content">
                <p className="stat-label">Pending</p>
                <p className="stat-value">{loading ? "..." : stats.pending}</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon closed">✅</div>
              <div className="stat-content">
                <p className="stat-label">Completed</p>
                <p className="stat-value">{loading ? "..." : stats.completed}</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon success">📈</div>
              <div className="stat-content">
                <p className="stat-label">Success Rate</p>
                <p className="stat-value">{loading ? "..." : successRate}%</p>
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
            title="Suggested Firms"
            description="Get law firm recommendations based on your case type and location."
            icon="🏢"
            link="/user/suggested-firms"  // click pe SuggestedFirms page
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
                placeholder="🔍 Search by case title or type..."
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
                <option value="pending">Pending</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            {/* Cases Table */}
            <div className="cases-table-wrapper">
              {loading ? (
                <p style={{ textAlign: "center", padding: "20px" }}>Loading your cases...</p>
              ) : filteredCases.length > 0 ? (
                <table className="cases-table">
                  <thead>
                    <tr>
                      <th>Case Title</th>
                      <th>Case Type</th>
                      <th>Status</th>
                      <th>Lawyer</th>
                      <th>City</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCases.map((caseItem) => (
                      <tr key={caseItem._id} className="case-row">
                        <td className="case-name">{caseItem.title}</td>
                        <td className="case-type">{caseItem.caseType}</td>
                        <td>
                          <span style={{
                            padding: "4px 12px",
                            borderRadius: "4px",
                            fontSize: "12px",
                            fontWeight: "600",
                            backgroundColor: 
                              caseItem.status === "pending" ? "#fff3cd" :
                              caseItem.status === "active" ? "#d4edda" :
                              caseItem.status === "completed" ? "#d1ecf1" : "#f8d7da",
                            color:
                              caseItem.status === "pending" ? "#856404" :
                              caseItem.status === "active" ? "#155724" :
                              caseItem.status === "completed" ? "#0c5460" : "#721c24",
                            textTransform: "capitalize"
                          }}>
                            {caseItem.status}
                          </span>
                        </td>
                        <td className="case-lawyer">{caseItem.lawyer?.name || "Not Assigned"}</td>
                        <td className="case-city">{caseItem.city}</td>
                        <td className="case-date">{new Date(caseItem.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="no-data">
                  <p>🔎 No cases found</p>
                  <small>Adjust your search or filter criteria or create a new case request</small>
                </div>
              )}
            </div>

            {/* Results Counter */}
            {filteredCases.length > 0 && (
              <div className="cases-footer">
                Showing {filteredCases.length} of {cases.length} cases
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

        {/* Appointment Details Modal */}
{selectedAppointment && (
  <div className="appointment-modal">
    <div className="modal-content">
      <h3>{selectedAppointment.title}</h3>
      <p><b>Date:</b> {selectedAppointment.date}</p>
      <p><b>Time:</b> {selectedAppointment.time}</p>
      <p><b>Lawyer:</b> {selectedAppointment.lawyer}</p>
      <p><b>Location:</b> {selectedAppointment.location}</p>

      <button onClick={() => setSelectedAppointment(null)}>
        Close
      </button>
    </div>
  </div>
)}

      </div>
    </div>
  );
};

export default Dashboard;