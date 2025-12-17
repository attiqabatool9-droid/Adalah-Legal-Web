import React from "react";
import { FaUserPlus, FaSearch, FaComments } from "react-icons/fa";

import "../../Styles/Home/HowItWorks.css";

const stepsData = [
  {
    icon: <FaUserPlus size={35} />, // Signup
    title: "Signup",
    description: "Create your account quickly by providing your basic details. This allows you to securely access all features and track your legal requests easily."
  },
  {
    icon: <FaSearch size={35} />, // Search Lawyer
    title: "Search Lawyer",
    description: "Browse and filter lawyers based on case type, location, specialization, and ratings. Compare profiles to choose the best fit for your legal needs."
  },
  {
    icon: <FaComments size={35} />, // Get Help / Chat
    title: "Get Help / Chat",
    description: "Connect instantly with selected lawyers via chat or request consultations. Receive guidance, schedule meetings, and stay updated on your case progress."
  }
];

const HowItWorks = () => {
  return (
    <section className="how-it-works">
      <h2>How It Works</h2>
      <div className="steps-container">
        {stepsData.map((step, index) => (
          <div className="step-card" key={index}>
            <div className="step-icon">{step.icon}</div>
            <h3 className="step-title">{step.title}</h3>
            <p className="step-description">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;