import React from "react";
import Hero from "../../Components/Home/Hero";
import Services from "../../Components/Home/Services";
import HowItWorks from "../../Components/Home/HowItWorks";
import FeaturedLawyers from "../../Components/Home/FeaturedLawyers";
import Footer from "../../Components/Home/Footer";
//import "../../Styles/Home/Home.css"; // CSS import

const Home = () => {
  return (
    <div className="home">
      <Hero />
      <Services />
      <HowItWorks />
      <FeaturedLawyers />
      <Footer />
    </div>
  );
};

export default Home;
