import React, { useState } from "react";
import "../../Styles/LawFirm/FirmProfile.css";

// Components
import Sidebar from "../../Components/LawFirm/Sidebar";

function FirmProfile() {
  // Sample dummy data for demonstration
  const [firm] = useState({
    id: 1,
    name: "Elite Legal Firm",
    address: "45 Justice Avenue, Lahore",
    contact: "+92 300 9876543",
    email: "contact@elitelegal.com",
    type: "Corporate & Family Law",
    experience: "20 years",
    rating: 4.7,
    description:
      "Elite Legal Firm is known for providing professional legal services in corporate, family, and civil matters. Our experienced team ensures timely resolutions.",
    lawyers: [
      { id: 1, name: "Advocate Ahmed", specialization: "Corporate Law", experience: "10 years" },
      { id: 2, name: "Advocate Sara", specialization: "Family Law", experience: "8 years" },
      { id: 3, name: "Advocate Bilal", specialization: "Civil Law", experience: "7 years" },
    ],
    reviews: [
      { id: 1, user: "Ali Khan", comment: "Very professional and efficient!" },
      { id: 2, user: "Sara Ahmed", comment: "Highly recommend this firm for corporate cases." },
    ],
  });

  return (
    <div className="profile-wrapper">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="profile-container">
        {/* Header */}
        <div className="profile-header">
          <h2>🏢 Firm Profile</h2>
        </div>

        {/* Firm Basic Info Section */}
        <div className="profile-section">
          <h3>ℹ️ Firm Information</h3>
          <div className="firm-info-grid">
            <div className="info-item">
              <span className="info-label">Firm Name</span>
              <span className="info-value highlight">{firm.name}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Contact Number</span>
              <span className="info-value">{firm.contact}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Email</span>
              <span className="info-value">{firm.email}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Address</span>
              <span className="info-value">{firm.address}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Practice Type</span>
              <span className="info-value">{firm.type}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Experience</span>
              <span className="info-value highlight">{firm.experience}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Rating</span>
              <div className="rating-display">
                <span className="rating-stars">⭐</span>
                <span className="rating-value">{firm.rating}</span>
              </div>
            </div>
          </div>
          <div className="firm-description">
            {firm.description}
          </div>
        </div>

        {/* Team Members Section */}
        <div className="profile-section">
          <h3>👨‍⚖️ Our Lawyers</h3>
          <div className="lawyers-table-wrapper">
            <table className="lawyers-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Specialization</th>
                  <th>Experience</th>
                </tr>
              </thead>
              <tbody>
                {firm.lawyers.map((lawyer) => (
                  <tr key={lawyer.id}>
                    <td className="lawyer-name">{lawyer.name}</td>
                    <td className="lawyer-specialization">{lawyer.specialization}</td>
                    <td className="lawyer-experience">{lawyer.experience}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* User Reviews Section */}
        <div className="profile-section">
          <h3>⭐ User Reviews</h3>
          {firm.reviews.length === 0 ? (
            <div className="empty-state">
              <p>No reviews yet.</p>
            </div>
          ) : (
            <div className="reviews-list">
              {firm.reviews.map((review) => (
                <div key={review.id} className="review-item">
                  <div className="review-author">
                    <div className="review-avatar">
                      {review.user.charAt(0).toUpperCase()}
                    </div>
                    <span>{review.user}</span>
                  </div>
                  <p className="review-text">{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Additional Info Section */}
        <div className="profile-section">
          <h3>🚀 Additional Information</h3>
          <div className="coming-soon">
            <p>📈 Upcoming features: Case history, Performance metrics, Firm achievements, and more...</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FirmProfile;
