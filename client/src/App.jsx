import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import API from './api';
import { AuthProvider } from './context/AuthContext'; 

// Components
import Navbar from "./Components/Home/Navbar";
import ProtectedRoute from "./Components/ProtectedRoute";

// Pages
import Home from "./Pages/Home/Home";               
import LawFirm from "./Pages/User/LawFirm";        
import UserChat from "./Pages/User/UserChat";
import Login from "./Pages/User/Login";
import Signup from "./Pages/User/Signup";
import Dashboard from "./Pages/User/Dashboard";
import FindLawyers from "./Pages/User/FindLawyers"; 
import SuggestedLawyers from "./Pages/User/SuggestedLawyers";
import SuggestedFirms from "./Pages/User/SuggestedFirms";

import Request from "./Pages/User/Request";
import UserProfile from "./Pages/User/UserProfile";
import Logout from "./Pages/User/Logout";
import Join from "./Pages/User/Join/Join";
import UserJoinForm from "./Pages/User/Join/UserJoinForm";
import LawyerJoinForm from "./Pages/User/Join/LawyerJoinForm";
import LawFirmJoin from "./Pages/User/Join/LawFirmJoin";

import LawyerLogin from "./Pages/Lawyer/LawyerLogin";
import LawyerDashboard from "./Pages/Lawyer/LawyerDashboard";
import LawyerProfilePage from "./Pages/Lawyer/LawyerProfilePage";

// --- UPDATED IMPORT (Naya wala page) ---
import PendingRequests from "./Pages/Lawyer/PendingRequests"; 

import LawyerAssignedCasesPage from "./Pages/Lawyer/LawyerAssignedCasesPage";
import LawyerCompletedCasesPage from "./Pages/Lawyer/LawyerCompletedCasesPage";
import LawyerAllCasesPage from "./Pages/Lawyer/LawyerAllCasesPage";
import LawyerChatPage from "./Pages/Lawyer/LawyerChatPage";
import LawyerAvailabilityPage from "./Pages/Lawyer/LawyerAvailabilityPage";
import LawyerCaseDetailsPage from "./Pages/Lawyer/LawyerCaseDetailsPage";
import LawyerAppointmentsPage from "./Pages/Lawyer/LawyerAppointmentsPage";

import LawFirmLogin from "./Pages/LawFirm/LawFirmLogin";
import LawFirmDashboard from "./Pages/LawFirm/LawFirmDashboard";
import FirmCaseRequests from "./Pages/LawFirm/FirmCaseRequests";
import AssignCase from "./Pages/LawFirm/AssignCase";
import FirmProfile from "./Pages/LawFirm/FirmProfile";
import FirmNotifications from "./Pages/LawFirm/FirmNotifications";
import FirmLogout from "./Pages/LawFirm/FirmLogout";
import ManageLawyers from "./Pages/LawFirm/ManageLawyers";
import ChatbotPage from "./Pages/Chatbot/ChatbotPage";

import AdminLogin from "./Pages/Admin/AdminLogin";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import AdminJoinForm from "./Pages/User/Join/AdminJoinForm";
import UserManagement from "./Pages/Admin/UserManagement";
import LawyerManagement from "./Pages/Admin/LawyerManagement";
import LawFirmManagement from "./Pages/Admin/LawFirmManagement";
import CaseManagement from "./Pages/Admin/CaseManagement";

import TestAPI from "./Pages/TestAPI.jsx"; 

import './App.css';

function App() {

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const response = await API.get('/'); 
        console.log("Success:", response.data); 
      } catch (error) {
        console.error("Connection Error:", error);
      }
    };
    checkConnection();
  }, []);

  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        
        <Routes>
          {/* --- Public Routes --- */}
          <Route path="/" element={<Home />} />
          <Route path="/test" element={<TestAPI />} />
          
          <Route path="/law-firms" element={<LawFirm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/join" element={<Join />} />
          <Route path="/join-user" element={<UserJoinForm />} />
          <Route path="/join-lawyer" element={<LawyerJoinForm />} />
          <Route path="/join-law-firm" element={<LawFirmJoin />} />
          <Route path="/lawyer/login" element={<LawyerLogin />} />
          <Route path="/lawfirm/login" element={<LawFirmLogin />} />
          <Route path="/chatbot" element={<ChatbotPage />} />

          {/* --- User Routes (Most require auth, but Find Lawyers/Firms are public) --- */}
          <Route path="/user/chat" element={<ProtectedRoute element={<UserChat />} />} />
          <Route path="/user/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
          <Route path="/user/find-lawyers" element={<FindLawyers />} /> {/* PUBLIC - No auth required */}
          <Route path="/user/suggested-lawyers" element={<SuggestedLawyers />} /> {/* PUBLIC - No auth required */}
          <Route path="/user/suggested-firms" element={<SuggestedFirms />} /> {/* PUBLIC - No auth required */}
          <Route path="/user/requests" element={<ProtectedRoute element={<Request />} />} />
          <Route path="/user/profile" element={<ProtectedRoute element={<UserProfile />} />} />
          <Route path="/user/logout" element={<Logout />} />

          {/* --- Lawyer Protected Routes --- */}
          <Route path="/lawyer/dashboard" element={<ProtectedRoute element={<LawyerDashboard />} />} />
          <Route path="/lawyer/profile" element={<ProtectedRoute element={<LawyerProfilePage />} />} />
          
          {/* --- UPDATED ROUTE (Naya Page yahan connect hua) --- */}
          <Route path="/lawyer/requests" element={<ProtectedRoute element={<PendingRequests />} />} />
          
          <Route path="/lawyer/assigned-cases" element={<ProtectedRoute element={<LawyerAssignedCasesPage />} />} />
          <Route path="/lawyer/completed-cases" element={<ProtectedRoute element={<LawyerCompletedCasesPage />} />} />
          <Route path="/lawyer/all-cases" element={<ProtectedRoute element={<LawyerAllCasesPage />} />} />
          <Route path="/lawyer/chat" element={<ProtectedRoute element={<LawyerChatPage />} />} />
          <Route path="/lawyer/availability" element={<ProtectedRoute element={<LawyerAvailabilityPage />} />} />
          <Route path="/lawyer/case/:id" element={<ProtectedRoute element={<LawyerCaseDetailsPage />} />} />
          <Route path="/lawyer/appointments" element={<ProtectedRoute element={<LawyerAppointmentsPage />} />} />

          {/* --- Law Firm Protected Routes --- */}
          <Route path="/lawfirm/dashboard" element={<ProtectedRoute element={<LawFirmDashboard />} />} />
          <Route path="/lawfirm/case-requests" element={<ProtectedRoute element={<FirmCaseRequests />} />} />
          <Route path="/lawfirm/assign-case" element={<ProtectedRoute element={<AssignCase />} />} />
          <Route path="/lawfirm/profile" element={<ProtectedRoute element={<FirmProfile />} />} />
          <Route path="/lawfirm/notifications" element={<ProtectedRoute element={<FirmNotifications />} />} /> 
          <Route path="/lawfirm/manage-lawyers" element={<ProtectedRoute element={<ManageLawyers />} />} />
          <Route path="/lawfirm/logout" element={<FirmLogout />} />

          {/* --- Admin Routes --- */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<ProtectedRoute element={<AdminDashboard />} />} />
          <Route path="/admin/users" element={<ProtectedRoute element={<UserManagement />} />} />
          <Route path="/admin/lawyers" element={<ProtectedRoute element={<LawyerManagement />} />} />
          <Route path="/admin/lawfirms" element={<ProtectedRoute element={<LawFirmManagement />} />} />
          <Route path="/admin/cases" element={<ProtectedRoute element={<CaseManagement />} />} />
          <Route path="/admin/join" element={<AdminJoinForm />} />
        </Routes>

      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;