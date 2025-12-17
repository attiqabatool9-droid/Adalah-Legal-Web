import React from "react";
// import "../../Styles/User/SuggestedLawyers.css";

const SuggestedLawyers = () => {
  // 🔹 Dummy suggested lawyers (recommendation system demo)
  const suggestedLawyersData = [
    {
      id: 1,
      name: "Adv. Ahmed Raza",
      specialization: "Family Law",
      location: "Karachi",
      experience: "7 Years",
      reason: "Based on your recent family law search",
    },
    {
      id: 2,
      name: "Adv. Hina Sheikh",
      specialization: "Criminal Law",
      location: "Lahore",
      experience: "6 Years",
      reason: "Recommended for criminal case consultation",
    },
    {
      id: 3,
      name: "Adv. Bilal Hussain",
      specialization: "Corporate Law",
      location: "Islamabad",
      experience: "9 Years",
      reason: "Suggested based on your profile preferences",
    },
  ];

  return (
    <div className="suggested-lawyers-page">

      {/* 🔹 Page Header */}
      <div className="page-header">
        <h1>Suggested Lawyers</h1>
        <p>
          These lawyers are automatically recommended based on your legal
          interests, profile information, and previous searches.
        </p>
      </div>

      {/* 🔹 Suggested Lawyers List */}
      <div className="suggested-lawyers-list">
        {suggestedLawyersData.length > 0 ? (
          suggestedLawyersData.map((lawyer) => (
            <div className="lawyer-card" key={lawyer.id}>
              <h3>{lawyer.name}</h3>
              <p><strong>Specialization:</strong> {lawyer.specialization}</p>
              <p><strong>Location:</strong> {lawyer.location}</p>
              <p><strong>Experience:</strong> {lawyer.experience}</p>

              {/* 🔹 Why Suggested */}
              <p className="suggestion-reason">
                <strong>Why suggested:</strong> {lawyer.reason}
              </p>

              <button className="request-btn">
                Request Consultation
              </button>
            </div>
          ))
        ) : (
          <p>No lawyer suggestions available at the moment.</p>
        )}
      </div>

    </div>
  );
};

export default SuggestedLawyers;
