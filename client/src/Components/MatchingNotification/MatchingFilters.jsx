import React from "react";
import "../../Styles/Matching/MatchingFilters.css";

const MatchingFilters = ({ filters, setFilters }) => {

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="matching-filters">
      <select name="caseType" value={filters.caseType} onChange={handleChange}>
        <option value="">All Case Types</option>
        <option value="Family Law">Family Law</option>
        <option value="Criminal Law">Criminal Law</option>
        <option value="Corporate Law">Corporate Law</option>
        <option value="Civil Law">Civil Law</option>
      </select>

      <select name="city" value={filters.city} onChange={handleChange}>
        <option value="">All Cities</option>
        <option value="Karachi">Karachi</option>
        <option value="Lahore">Lahore</option>
        <option value="Islamabad">Islamabad</option>
        <option value="Rawalpindi">Rawalpindi</option>
      </select>

      <select name="specialization" value={filters.specialization} onChange={handleChange}>
        <option value="">All Specializations</option>
        <option value="Family Law">Family Law</option>
        <option value="Criminal Law">Criminal Law</option>
        <option value="Corporate Law">Corporate Law</option>
      </select>
    </div>
  );
};

export default MatchingFilters;
