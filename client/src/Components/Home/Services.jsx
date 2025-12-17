import React from "react";
import { FaBell, FaRobot, FaUserPlus , FaSearch } from "react-icons/fa";
// Data for cards

import "../../Styles/Home/Services.css";


const servicesData = [
  {
    icon: <FaSearch size={35} />,
    title: "Search Lawyers",
    description: "Find lawyers based on your case type and location quickly."
  },
  {
        icon: <FaUserPlus size={35} />,
    title: "Suggested Lawyers",
    description: "System recommends top lawyers based on your needs."
  },
  {
        icon: <FaRobot size={35} />,
    title: "Chatbot Guidance",
    description: "Ask LegalBot for instant help and guidance."
  },
  {
        
        icon: <FaBell size={35} />,
    title: "Instant Matching & Notifications",
    description: "Get notifications and instant lawyer matches."
  }
];

const Services = () => {
  return (
    <section className="services">
      <h2>Our Services</h2>
      <div className="services-container">
        {servicesData.map((service, index) => (
          <div className="service-card" key={index}>
            <div className="service-icon">{service.icon}</div>
            <h3 className="service-title">{service.title}</h3>
            <p className="service-description">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;