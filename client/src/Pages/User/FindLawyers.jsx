import React, { useState } from "react";
// import "../../Styles/User/SearchLawyers.css";
const FindLawyers = () => {
  // 🔹 Dummy lawyers data (backend ke baghair)
  const lawyersData = [
    {
      id: 1,
      name: "Adv. Ali Khan",
      specialization: "Family Law",
      location: "Karachi",
      experience: "8 Years",
    },
    {
      id: 2,
      name: "Adv. Sara Ahmed",
      specialization: "Criminal Law",
      location: "Lahore",
      experience: "5 Years",
    },
    {
      id: 3,
      name: "Adv. Usman Malik",
      specialization: "Corporate Law",
      location: "Islamabad",
      experience: "10 Years",
    },
  ];

  const [search, setSearch] = useState("");

  return (
    <div className="search-lawyers-page">
      
      {/* 🔹 Page Header */}
      <div className="page-header">
        <h1>Find Lawyers</h1>
        <p>
          Search and connect with verified lawyers based on your legal needs,
          location, and case type.
        </p>
      </div>

      {/* 🔹 Search & Filter Section */}
      <div className="search-filters">
        <input
          type="text"
          placeholder="Search by lawyer name or case type"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select>
          <option value="">Select Case Type</option>
          <option value="family">Family Law</option>
          <option value="criminal">Criminal Law</option>
          <option value="corporate">Corporate Law</option>
        </select>

        <select>
          <option value="">Select City</option>
          <option value="karachi">Karachi</option>
          <option value="lahore">Lahore</option>
          <option value="islamabad">Islamabad</option>
        </select>
      </div>

      {/* 🔹 Lawyers Result Section */}
      <div className="lawyer-results">
        {lawyersData.length > 0 ? (
          lawyersData.map((lawyer) => (
            <div className="lawyer-card" key={lawyer.id}>
              <h3>{lawyer.name}</h3>
              <p><strong>Specialization:</strong> {lawyer.specialization}</p>
              <p><strong>Location:</strong> {lawyer.location}</p>
              <p><strong>Experience:</strong> {lawyer.experience}</p>

              <button className="view-profile-btn">
                View Profile
              </button>
            </div>
          ))
        ) : (
          <p>No lawyers found.</p>
        )}
      </div>

    </div>
  );
};

export default FindLawyers;
