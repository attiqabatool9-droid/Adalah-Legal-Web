import React from "react";

import "../../Styles/Home/Hero.css";


import heroImg from "../../assets/back.jpeg"; // Correct path

const Hero = () => {
  return (
    <section
      className="hero"
      style={{
        backgroundImage: `url(${heroImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "90vh",
      }}
    >
      <div className="hero-content">
        <h1>Find the Right Lawyer for Your Legal Needs</h1>
        <p>
          Get matched with trusted lawyers based on your case type, location,
          and legal needs — quickly and easily.
        </p>

        <div className="hero-actions">
          <input
            type="text"
            placeholder="Search by case type or lawyer name"
            className="hero-input"
          />

          <button className="hero-btn">Find a Lawyer</button>
        </div>
      </div>
    </section>
  );
};

export default Hero;