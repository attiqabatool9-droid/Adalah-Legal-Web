import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

import "../../Styles/Home/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* About Section */}
        <div className="footer-about">
          <h3>About Adalah</h3>
          <ul>
            <li>Helps you find the right lawyer easily</li>
            <li>Provides professional legal assistance within minutes</li>
            <li>Offers suggested lawyers and chatbot guidance</li>
            <li>Instant notifications and lawyer matching</li>
          </ul>
        </div>

        {/* Quick Links */}
        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li>Home</li>
            <li>Find Lawyer</li>
            <li>Law Firms</li>
            <li>Chatbot</li>
            <li>Login / Signup</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-contact">
          <h3>Contact Us</h3>
          <p>Email: contact@adalah.com</p>
          <p>Phone: +92 300 1234567</p>
          <p>Address: Karachi, Pakistan</p>
        </div>

        {/* Social Media */}
        <div className="footer-social">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <FaFacebookF size={20} />
            <FaTwitter size={20} />
            <FaLinkedinIn size={20} />
            <FaInstagram size={20} />
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <p>© 2025 Adalah Legal App. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;