import React, { useMemo } from "react";
import "../../Styles/Lawyer/LawyerDashboard-Enhanced.css"; 

// Components
import LawyerSidebar from "../../Components/Lawyer/LawyerSidebar";
import LawyerDashboardCard from "../../Components/Lawyer/LawyerDashboardCard";
import DashboardHeader from "../../Components/Lawyer/DashboardHeader";

import LawyerNotifications from "../../Components/Lawyer/LawyerNotifications";
import CaseRequestTable from "../../Components/Lawyer/CaseRequestTable";

// AssignedCasesTable Component
const AssignedCasesTable = ({ assignedCases }) => {
  return (
    <div className="assigned-cases-table">
      <h3>Assigned Cases</h3>
      <table>
        <thead>
          <tr>
            <th>Client</th>
            <th>Case Type</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {assignedCases && assignedCases.length > 0 ? (
            assignedCases.map((c) => (
              <tr key={c.id}>
                <td>{c.userName}</td>
                <td>{c.caseType}</td>
                <td>{c.status}</td>
                <td>{c.date}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No assigned cases found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

// Sample data
const caseRequests = [
  { id: 1, userName: "Laiba Mubeen", caseType: "Family Law", status: "Pending", date: "10 Sep 2025" },
  { id: 2, userName: "Ali Khan", caseType: "Criminal Case", status: "Accepted", date: "02 Sep 2025" },
  { id: 3, userName: "Sara Ahmed", caseType: "Corporate Agreement", status: "Completed", date: "20 Aug 2025" },
];

const assignedCasesData = [
  { id: 1, userName: "Laiba Mubeen", caseType: "Family Law", status: "Ongoing", date: "11 Sep 2025" },
  { id: 2, userName: "Ali Khan", caseType: "Criminal Case", status: "Ongoing", date: "03 Sep 2025" },
];

// Stats helper
const getStats = (cases) => {
  const pending = cases.filter(c => c.status === "Pending").length;
  const accepted = cases.filter(c => c.status === "Accepted").length;
  const completed = cases.filter(c => c.status === "Completed").length;
  const total = cases.length;
  return { pending, accepted, completed, total };
};

const LawyerDashboard = () => {
  console.log("LAWYER DASHBOARD RENDERED");

  const stats = useMemo(() => getStats(caseRequests), []);

  return (
    <div className="lawyer-dashboard-wrapper">
      <LawyerSidebar />

      <div className="lawyer-dashboard-main">
        <DashboardHeader lawyerName={"Adv. John Doe"} />
        <LawyerNotifications />

        <div className="lawyer-dashboard-cards">
          <LawyerDashboardCard
            title="Pending Requests"
            description="Cases waiting for your approval"
            icon="⏳"
            link="/lawyer/requests"
          />
          <LawyerDashboardCard
            title="Accepted Cases"
            description="Ongoing cases assigned to you"
            icon="📂"
            link="/lawyer/assigned-cases"
          />
          <LawyerDashboardCard
            title="Completed Cases"
            description="Cases you have completed"
            icon="✅"
            link="/lawyer/completed-cases"
          />
          <LawyerDashboardCard
            title="Total Cases"
            description={`Total: ${stats.total}`}
            icon="📊"
            link="/lawyer/all-cases"
          />
        </div>

        <CaseRequestTable requests={caseRequests} />
        <AssignedCasesTable assignedCases={assignedCasesData} />
      </div>
    </div>
  );
};

export default LawyerDashboard;
