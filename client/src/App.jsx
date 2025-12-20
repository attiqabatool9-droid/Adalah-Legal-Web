import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Navbar from "./Components/Home/Navbar";

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
        <Route path="/user/dashboard" element={<Dashboard />} />

        {/* DashboardCard routes */}
        <Route path="/user/find-lawyers" element={<FindLawyers />} />
        <Route path="/user/suggested-lawyers" element={<SuggestedLawyers />} />
        <Route path="/user/requests" element={<Request />} />
        <Route path="/user/profile" element={<UserProfile />} />
        <Route path="/user/logout" element={<Logout />} />

        <Route path="/join" element={<Join />} />
        <Route path="/join-user" element={<UserJoinForm />} />
        <Route path="/join-lawyer" element={<LawyerJoinForm />} />



      </Routes>
    </Router>
  );
}

export default App; 
