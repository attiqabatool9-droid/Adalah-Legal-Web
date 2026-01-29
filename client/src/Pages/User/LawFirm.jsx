import React, { useState } from "react";
import "../../Styles/User/LawFirm.css";

const LawFirm = () => {
  // 🔹 Dummy law firms data
  const lawFirmsData = [
    {
      id: 1,
      name: "Ahmed & Associates",
      location: "Karachi",
      practiceAreas: ["Family Law", "Criminal Law", "Corporate Law"],
    },
    {
      id: 2,
      name: "Khan Legal Solutions",
      location: "Lahore",
      practiceAreas: ["Corporate Law", "Intellectual Property", "Tax Law"],
    },
    {
      id: 3,
      name: "Justice Chambers",
      location: "Islamabad",
      practiceAreas: ["Criminal Law", "Civil Litigation", "Constitutional Law"],
    },
    {
      id: 4,
      name: "Heritage Law Firm",
      location: "Karachi",
      practiceAreas: ["Family Law", "Inheritance Law", "Property Law"],
    },
    {
      id: 5,
      name: "Corporate Legal Group",
      location: "Lahore",
      practiceAreas: ["Mergers & Acquisitions", "Corporate Law", "Contract Law"],
    },
    {
      id: 6,
      name: "Advocate's Partnership",
      location: "Islamabad",
      practiceAreas: ["Labor Law", "Employment Law", "Administrative Law"],
    },
    {
      id: 7,
      name: "Rights & Justice Firm",
      location: "Karachi",
      practiceAreas: ["Human Rights", "Criminal Law", "Civil Rights"],
    },
    {
      id: 8,
      name: "Business & Trade Associates",
      location: "Lahore",
      practiceAreas: ["Trade Law", "Banking Law", "Commercial Law"],
    },
  ];

  const [search, setSearch] = useState("");
  const [selectedPracticeArea, setSelectedPracticeArea] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  // Extract unique practice areas and locations
  const allPracticeAreas = [
    ...new Set(lawFirmsData.flatMap((firm) => firm.practiceAreas)),
  ].sort();
  const allLocations = [
    ...new Set(lawFirmsData.map((firm) => firm.location)),
  ].sort();

  // Filter firms based on search and filters
  const filteredFirms = lawFirmsData.filter((firm) => {
    const matchesSearch =
      firm.name.toLowerCase().includes(search.toLowerCase()) ||
      firm.practiceAreas.some((area) =>
        area.toLowerCase().includes(search.toLowerCase())
      );

    const matchesPracticeArea =
      !selectedPracticeArea ||
      firm.practiceAreas.includes(selectedPracticeArea);

    const matchesLocation =
      !selectedLocation || firm.location === selectedLocation;

    return matchesSearch && matchesPracticeArea && matchesLocation;
  });

  return (
    <div className="law-firms-page">
      {/* 🔹 Page Header */}
      <div className="page-header">
        <h1>Law Firms Directory</h1>
        <p>
          Browse and connect with top-rated law firms across the country. Find
          the right firm to handle your legal needs.
        </p>
      </div>

      {/* 🔹 Search & Filter Section */}
      <div className="search-filters">
        <input
          type="text"
          placeholder="Search by firm name or practice area"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={selectedPracticeArea}
          onChange={(e) => setSelectedPracticeArea(e.target.value)}
        >
          <option value="">All Practice Areas</option>
          {allPracticeAreas.map((area) => (
            <option key={area} value={area}>
              {area}
            </option>
          ))}
        </select>

        <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
        >
          <option value="">All Locations</option>
          {allLocations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
      </div>

      {/* 🔹 Law Firms Results Section */}
      <div className="law-firms-results">
        {filteredFirms.length > 0 ? (
          filteredFirms.map((firm) => (
            <div className="firm-card" key={firm.id}>
              <h3>{firm.name}</h3>

              <div className="firm-info">
                <div className="info-item">
                  <span className="info-label">📍 Location:</span>
                  <span className="info-value">{firm.location}</span>
                </div>

                <div className="info-item">
                  <span className="info-label">⚖️ Practice Areas:</span>
                  <div className="practice-areas">
                    {firm.practiceAreas.map((area, index) => (
                      <span key={index} className="practice-badge">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <button className="contact-btn">View Profile</button>
            </div>
          ))
        ) : (
          <p className="no-results">
            No law firms found matching your criteria. Try adjusting your
            filters.
          </p>
        )}
      </div>
    </div>
  );
};

export default LawFirm;
