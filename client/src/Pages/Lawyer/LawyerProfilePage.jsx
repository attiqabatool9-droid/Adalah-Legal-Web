import React, { useState, useEffect } from "react";
import "../../Styles/Lawyer/LawyerDashboard-Enhanced.css";
import LawyerSidebar from "../../Components/Lawyer/LawyerSidebar";
import API from "../../api";

const LawyerProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch profile on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await API.get("/api/users/me");
        setProfile(response.data);
        setEditForm(response.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Failed to load profile. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // Calculate profile completeness
  const calculateCompleteness = () => {
    if (!profile) return 0;
    const fields = [
      profile.name,
      profile.email,
      profile.specialization,
      profile.experience,
      profile.city,
      profile.cnic,
      profile.phone,
    ];
    const filledFields = fields.filter(field => field && field.toString().trim().length > 0).length;
    return Math.round((filledFields / fields.length) * 100);
  };

  const completeness = calculateCompleteness();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      setError("");
      
      // Prepare data to send (exclude _id and timestamps)
      const updateData = {
        name: editForm.name,
        email: editForm.email,
        phone: editForm.phone,
        specialization: editForm.specialization,
        experience: editForm.experience,
        cnic: editForm.cnic,
        city: editForm.city,
      };

      const response = await API.put("/api/users/me", updateData);
      setProfile(response.data);
      setEditForm(response.data);
      setIsEditing(false);
      alert("✅ Profile updated successfully!");
    } catch (err) {
      console.error("Error updating profile:", err);
      setError("Failed to update profile. Please try again.");
      alert("❌ Error updating profile: " + (err.response?.data?.message || err.message));
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setEditForm(profile);
    setIsEditing(false);
    setError("");
  };

  const handleEdit = () => {
    setEditForm(profile);
    setIsEditing(true);
  };

  if (loading) {
    return (
      <div className="lawyer-dashboard-wrapper">
        <LawyerSidebar />
        <div className="lawyer-dashboard-main">
          <div className="section-card">
            <p>Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="lawyer-dashboard-wrapper">
        <LawyerSidebar />
        <div className="lawyer-dashboard-main">
          <div className="section-card">
            <p>Failed to load profile.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="lawyer-dashboard-wrapper">
      <LawyerSidebar />
      <div className="lawyer-dashboard-main">
        <div className="section-card">
          <div className="section-header">
            <div>
              <h2>My Profile</h2>
              <p className="section-description">View and manage your professional profile information.</p>
            </div>
            {!isEditing && (
              <button className="btn-edit" onClick={handleEdit}>✏️ Edit Profile</button>
            )}
          </div>

          {/* Profile Completeness Indicator */}
          <div className="profile-completeness">
            <div className="completeness-header">
              <span>Profile Completeness</span>
              <span className="completeness-percentage">{completeness}%</span>
            </div>
            <div className="completeness-bar">
              <div 
                className="completeness-fill" 
                style={{
                  width: `${completeness}%`,
                  backgroundColor: completeness >= 80 ? '#4CAF50' : completeness >= 50 ? '#FFC107' : '#FF6B6B'
                }}
              ></div>
            </div>
            {completeness < 100 && (
              <p className="completeness-hint">
                {100 - completeness}% of your profile remains to be completed
              </p>
            )}
          </div>

          {isEditing ? (
            // Edit Mode
            <form className="profile-edit-form">
              <div className="form-section">
                <h3>📋 Basic Information</h3>
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={editForm.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={editForm.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={editForm.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              <div className="form-section">
                <h3>⚖️ Professional Information</h3>
                <div className="form-group">
                  <label htmlFor="specialization">Specialization</label>
                  <select
                    id="specialization"
                    name="specialization"
                    value={editForm.specialization}
                    onChange={handleInputChange}
                  >
                    <option>Family Law</option>
                    <option>Criminal Law</option>
                    <option>Corporate Law</option>
                    <option>Constitutional Law</option>
                    <option>Property Law</option>
                    <option>Labor Law</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="experience">Years of Experience</label>
                  <input
                    type="text"
                    id="experience"
                    name="experience"
                    value={editForm.experience}
                    onChange={handleInputChange}
                    placeholder="e.g., 5 years"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="cnic">CNIC Number</label>
                  <input
                    type="text"
                    id="cnic"
                    name="cnic"
                    value={editForm.cnic}
                    onChange={handleInputChange}
                    placeholder="Enter your CNIC"
                  />
                </div>
              </div>

              <div className="form-section">
                <h3>📍 Location & Bio</h3>
                <div className="form-group">
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={editForm.city}
                    onChange={handleInputChange}
                    placeholder="Enter your city"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="bio">Professional Bio</label>
                  <textarea
                    id="bio"
                    name="bio"
                    value={editForm.bio}
                    onChange={handleInputChange}
                    placeholder="Tell clients about your expertise and experience..."
                    rows="4"
                  ></textarea>
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="btn-save"
                  onClick={handleSave}
                  disabled={isSaving}
                >
                  {isSaving ? "💾 Saving..." : "💾 Save Changes"}
                </button>
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={handleCancel}
                  disabled={isSaving}
                >
                  ❌ Cancel
                </button>
              </div>
            </form>
          ) : (
            // View Mode
            <div className="profile-details-view">
              <div className="profile-card">
                <div className="profile-avatar">
                  <span role="img" aria-label="avatar" style={{ fontSize: 64 }}>👨‍⚖️</span>
                </div>
                <div className="profile-details">
                  <h3>{profile.name}</h3>
                  <p><strong>Email:</strong> {profile.email}</p>
                  <p><strong>Phone:</strong> {profile.phone}</p>
                </div>
              </div>

              <div className="details-section">
                <h4>⚖️ Professional Information</h4>
                <div className="details-grid">
                  <div className="detail-item">
                    <span className="detail-label">Specialization:</span>
                    <span className="detail-value">{profile.specialization}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Experience:</span>
                    <span className="detail-value">{profile.experience}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">CNIC:</span>
                    <span className="detail-value">{profile.cnic}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">City:</span>
                    <span className="detail-value">{profile.city}</span>
                  </div>
                </div>
              </div>

              {profile.bio && (
                <div className="details-section">
                  <h4>📝 Professional Bio</h4>
                  <p className="bio-text">{profile.bio}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LawyerProfilePage;
