import React, { useState } from "react";
import "../../Styles/Lawyer/LawyerDashboard-Enhanced.css";
import LawyerSidebar from "../../Components/Lawyer/LawyerSidebar";

const LawyerAvailabilityComponent = () => {
  const [availability, setAvailability] = useState({
    monday: true,
    tuesday: true,
    wednesday: false,
    thursday: true,
    friday: false,
    saturday: false,
    sunday: false,
  });

  const [timeSlots, setTimeSlots] = useState({
    monday: { start: "09:00", end: "17:00" },
    tuesday: { start: "09:00", end: "17:00" },
    wednesday: { start: "09:00", end: "17:00" },
    thursday: { start: "09:00", end: "17:00" },
    friday: { start: "09:00", end: "17:00" },
    saturday: { start: "10:00", end: "14:00" },
    sunday: { start: "10:00", end: "14:00" },
  });

  const [rates, setRates] = useState({
    consultation: 5000,
    hourly: 3000,
    document_review: 2000,
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleToggle = (day) => {
    setAvailability((prev) => ({ ...prev, [day]: !prev[day] }));
  };

  const handleTimeChange = (day, period, value) => {
    setTimeSlots((prev) => ({
      ...prev,
      [day]: { ...prev[day], [period]: value },
    }));
  };

  const handleRateChange = (service, value) => {
    setRates((prev) => ({ ...prev, [service]: value }));
  };

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      alert("Availability and rates updated successfully!");
    }, 500);
  };

  const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
  const dayLabels = {
    monday: "Monday",
    tuesday: "Tuesday",
    wednesday: "Wednesday",
    thursday: "Thursday",
    friday: "Friday",
    saturday: "Saturday",
    sunday: "Sunday",
  };

  return (
    <div className="lawyer-availability-component">
      <div className="availability-section">
        <h3>📅 Set Your Weekly Availability</h3>
        <div className="availability-days">
          {days.map((day) => (
            <div key={day} className="availability-day">
              <div className="day-toggle">
                <label className="toggle-label">
                  <input
                    type="checkbox"
                    checked={availability[day]}
                    onChange={() => handleToggle(day)}
                  />
                  <span className="toggle-text">{dayLabels[day]}</span>
                </label>
              </div>

              {availability[day] && (
                <div className="time-slot">
                  <div className="time-inputs">
                    <div className="time-group">
                      <label htmlFor={`${day}-start`}>From</label>
                      <input
                        type="time"
                        id={`${day}-start`}
                        value={timeSlots[day].start}
                        onChange={(e) =>
                          handleTimeChange(day, "start", e.target.value)
                        }
                      />
                    </div>
                    <span className="time-separator">—</span>
                    <div className="time-group">
                      <label htmlFor={`${day}-end`}>To</label>
                      <input
                        type="time"
                        id={`${day}-end`}
                        value={timeSlots[day].end}
                        onChange={(e) =>
                          handleTimeChange(day, "end", e.target.value)
                        }
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="rates-section">
        <h3>💰 Consultation Rates</h3>
        <p className="section-hint">Set your service rates (in PKR)</p>
        <div className="rates-grid">
          <div className="rate-item">
            <label htmlFor="consultation">
              <span className="rate-icon">📞</span>
              <span className="rate-label">Initial Consultation</span>
            </label>
            <div className="rate-input-group">
              <span className="currency">₨</span>
              <input
                type="number"
                id="consultation"
                value={rates.consultation}
                onChange={(e) =>
                  handleRateChange("consultation", Number(e.target.value))
                }
                min="0"
                placeholder="0"
              />
            </div>
          </div>

          <div className="rate-item">
            <label htmlFor="hourly">
              <span className="rate-icon">⏱️</span>
              <span className="rate-label">Hourly Rate</span>
            </label>
            <div className="rate-input-group">
              <span className="currency">₨</span>
              <input
                type="number"
                id="hourly"
                value={rates.hourly}
                onChange={(e) =>
                  handleRateChange("hourly", Number(e.target.value))
                }
                min="0"
                placeholder="0"
              />
            </div>
          </div>

          <div className="rate-item">
            <label htmlFor="document">
              <span className="rate-icon">📄</span>
              <span className="rate-label">Document Review</span>
            </label>
            <div className="rate-input-group">
              <span className="currency">₨</span>
              <input
                type="number"
                id="document"
                value={rates.document_review}
                onChange={(e) =>
                  handleRateChange("document_review", Number(e.target.value))
                }
                min="0"
                placeholder="0"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="availability-summary">
        <h4>📊 Summary</h4>
        <div className="summary-items">
          <div className="summary-item">
            <span>Available Days:</span>
            <strong>{Object.values(availability).filter(v => v).length} days/week</strong>
          </div>
          <div className="summary-item">
            <span>Consultation Rate:</span>
            <strong>₨ {rates.consultation.toLocaleString()}</strong>
          </div>
        </div>
      </div>

      <button 
        className="btn-save-large" 
        onClick={handleSave}
        disabled={isSaving}
      >
        {isSaving ? "💾 Saving..." : "💾 Save Changes"}
      </button>
    </div>
  );
};

const LawyerAvailabilityPage = () => {
  return (
    <div className="lawyer-dashboard-wrapper">
      <LawyerSidebar />
      <div className="lawyer-dashboard-main">
        <div className="section-card">
          <h2>⏰ Availability & Rates</h2>
          <p className="section-description">
            Update your weekly availability, time slots, and consultation rates for clients.
          </p>
          <LawyerAvailabilityComponent />
        </div>
      </div>
    </div>
  );
};

export default LawyerAvailabilityPage;
