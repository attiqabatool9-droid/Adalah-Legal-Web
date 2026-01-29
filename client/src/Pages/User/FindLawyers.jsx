import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api";
import "../../Styles/User/FindLawyers.css";

const FindLawyers = () => {
  const navigate = useNavigate();

  const [lawyers, setLawyers] = useState([]);
  const [filteredLawyers, setFilteredLawyers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔹 Filter states
  const [search, setSearch] = useState("");
  const [caseType, setCaseType] = useState("");
  const [city, setCity] = useState("");

  // 🔹 Case types
  const caseTypes = [
    "Family Law",
    "Criminal Law",
    "Corporate Law",
    "Property Law",
    "Labour Law",
    "Immigration Law",
  ];

  // 🔹 Fetch lawyers on mount
  useEffect(() => {
    const fetchLawyers = async () => {
      try {
        setLoading(true);
        const response = await API.get("/api/users");
        
        // Filter only lawyers
        const lawyersData = response.data.filter((u) => u.role === "lawyer");
        setLawyers(lawyersData);
        setFilteredLawyers(lawyersData);
        setError(null);
      } catch (err) {
        console.error("Error fetching lawyers:", err);
        setError("Failed to load lawyers");
      } finally {
        setLoading(false);
      }
    };

    fetchLawyers();
  }, []);

  // 🔹 Filter lawyers based on search and filters
  useEffect(() => {
    let filtered = lawyers;

    if (search.trim()) {
      filtered = filtered.filter(
        (lawyer) =>
          lawyer.name?.toLowerCase().includes(search.toLowerCase()) ||
          lawyer.specialization?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (caseType) {
      filtered = filtered.filter(
        (lawyer) =>
          lawyer.specialization?.toLowerCase() === caseType.toLowerCase()
      );
    }

    if (city) {
      filtered = filtered.filter(
        (lawyer) => lawyer.city?.toLowerCase() === city.toLowerCase()
      );
    }

    setFilteredLawyers(filtered);
  }, [search, caseType, city, lawyers]);

  // 🔹 View lawyer profile
  const handleViewProfile = (lawyerId) => {
    navigate(`/user/lawyer-profile/${lawyerId}`);
  };

  // 🔹 Get unique cities from lawyers
  const uniqueCities = [...new Set(lawyers.map((l) => l.city).filter(Boolean))];

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

      {/* 🔹 Error message */}
      {error && <div className="error-message">{error}</div>}

      {/* 🔹 Search & Filter Section */}
      <div className="search-filters">
        <input
          type="text"
          placeholder="Search by lawyer name or specialization"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={caseType} onChange={(e) => setCaseType(e.target.value)}>
          <option value="">Select Specialization</option>
          {caseTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <select value={city} onChange={(e) => setCity(e.target.value)}>
          <option value="">Select City</option>
          {uniqueCities.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* 🔹 Lawyers Result Section */}
      <div className="lawyer-results">
        {loading ? (
          <div className="loading">Loading lawyers...</div>
        ) : filteredLawyers.length > 0 ? (
          filteredLawyers.map((lawyer) => (
            <div className="lawyer-card" key={lawyer._id}>
              <h3>{lawyer.name}</h3>
              <p>
                <strong>Specialization:</strong> {lawyer.specialization || "N/A"}
              </p>
              <p>
                <strong>Location:</strong> {lawyer.city || "N/A"}
              </p>
              <p>
                <strong>Experience:</strong> {lawyer.experience || "0"} Years
              </p>
              <p className="rating">
                <strong>Rating:</strong> ⭐ {lawyer.rating || "4.5"}/5
              </p>

              <button
                className="view-profile-btn"
                onClick={() => handleViewProfile(lawyer._id)}
              >
                View Profile
              </button>
            </div>
          ))
        ) : (
          <p className="no-data">
            No lawyers found matching your criteria. Try adjusting your filters.
          </p>
        )}
      </div>
    </div>
  );
};

export default FindLawyers;
