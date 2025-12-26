import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Navbar from "./Components/Home/Navbar";
import ProtectedRoute from "./Components/ProtectedRoute";

// Pages
import Home from "./Pages/Home/Home";               
import LawFirm from "./Pages/User/LawFirm";        
import Chat from "./Pages/User/Chat";
import Login from "./Pages/User/Login";
import Signup from "./Pages/User/Signup";
import Dashboard from "./Pages/User/Dashboard";
import FindLawyers from "./Pages/User/FindLawyers"; 
import SuggestedLawyers from "./Pages/User/SuggestedLawyers";
import Request from "./Pages/User/Request";
import UserProfile from "./Pages/User/UserProfile";
import Logout from "./Pages/User/Logout";
import Join from "./Pages/User/Join/Join";
import UserJoinForm from "./Pages/User/Join/UserJoinForm";
import LawyerJoinForm from "./Pages/User/Join/LawyerJoinForm";




import LawyerLogin from "./Pages/Lawyer/LawyerLogin";
import LawyerDashboard from "./Pages/Lawyer/LawyerDashboard";
import LawyerProfilePage from "./Pages/Lawyer/LawyerProfilePage";
import LawyerCaseRequestsPage from "./Pages/Lawyer/LawyerCaseRequestsPage";
import LawyerAssignedCasesPage from "./Pages/Lawyer/LawyerAssignedCasesPage";
import LawyerChatPage from "./Pages/Lawyer/LawyerChatPage";
import LawyerAvailabilityPage from "./Pages/Lawyer/LawyerAvailabilityPage";
import LawyerCaseDetailsPage from "./Pages/Lawyer/LawyerCaseDetailsPage";
import LawyerAppointmentsPage from "./Pages/Lawyer/LawyerAppointmentsPage";


import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/law-firms" element={<LawFirm />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/user/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />

        {/* DashboardCard routes */}
        <Route path="/user/find-lawyers" element={<ProtectedRoute element={<FindLawyers />} />} />
        <Route path="/user/suggested-lawyers" element={<ProtectedRoute element={<SuggestedLawyers />} />} />
        <Route path="/user/requests" element={<ProtectedRoute element={<Request />} />} />
        <Route path="/user/profile" element={<ProtectedRoute element={<UserProfile />} />} />
        <Route path="/user/logout" element={<Logout />} />

        <Route path="/join" element={<Join />} />
        <Route path="/join-user" element={<UserJoinForm />} />
        <Route path="/join-lawyer" element={<LawyerJoinForm />} />
         
  
        <Route path="/lawyer/login" element={<LawyerLogin />} />
        <Route path="/lawyer/dashboard" element={<LawyerDashboard />} />
        <Route path="/lawyer/profile" element={<LawyerProfilePage />} />
        <Route path="/lawyer/requests" element={<LawyerCaseRequestsPage />} />
        <Route path="/lawyer/assigned-cases" element={<LawyerAssignedCasesPage />} />
        <Route path="/lawyer/chat" element={<LawyerChatPage />} />
        <Route path="/lawyer/availability" element={<LawyerAvailabilityPage />} />
        <Route path="/lawyer/case/:id" element={<LawyerCaseDetailsPage />}
/>
        <Route path="/lawyer/appointments" element={<LawyerAppointmentsPage />}/>
      </Routes>
    </Router>
  );
}

export default App;
