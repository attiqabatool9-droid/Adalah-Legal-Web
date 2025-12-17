import React from "react";

import "../../Styles/Home/FeaturedLawyers.css";

const lawyersData = [
  {
    id: 1,
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    name: "Ayesha Khan",
    experience: "5 Years Experience",
    rating: 4.5,
    specialization: "Family Law"
  },
  {
    id: 2,
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    name: "Ahmed Ali",
    experience: "8 Years Experience",
    rating: 5,
    specialization: "Criminal Law"
  },
  {
    id: 3,
    photo: "https://randomuser.me/api/portraits/women/68.jpg",
    name: "Sana Malik",
    experience: "6 Years Experience",
    rating: 4.8,
    specialization: "Corporate Law"
  },
  {
    id: 4,
    photo: "https://randomuser.me/api/portraits/men/45.jpg",
    name: "Bilal Ahmed",
    experience: "7 Years Experience",
    rating: 4.7,
    specialization: "Tax Law"
  }
];

const FeaturedLawyers = () => {
  return (
    <section className="featured-lawyers">
      <h2>Featured Lawyers</h2>
      <div className="lawyers-container">
        {lawyersData.map((lawyer) => (
          <div className="lawyer-card" key={lawyer.id}>
            <img src={lawyer.photo} alt={lawyer.name} className="lawyer-photo" />
            <h3 className="lawyer-name">{lawyer.name}</h3>
            <p className="lawyer-experience">{lawyer.experience}</p>
            <p className="lawyer-rating">{"⭐".repeat(Math.floor(lawyer.rating))}</p>
            <p className="lawyer-specialization">{lawyer.specialization}</p>
            <button className="view-profile-btn">View Profile</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedLawyers;