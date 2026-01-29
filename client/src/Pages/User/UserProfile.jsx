import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import API from "../../api";
import "../../Styles/User/UserProfile.css";

const UserProfile = () => {
  const { user: currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  
  // 🔹 Profile form state
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    caseDescription: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // 🔹 Fetch user profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await API.get("/api/users/me");
        setUser(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError(err.response?.data?.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    if (currentUser?._id) {
      fetchProfile();
    }
  }, [currentUser?._id]);

  // 🔹 Input change handler
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  // 🔹 Update profile handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setError(null);
      const response = await API.put("/api/users/me", user);
      setUser(response.data);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error("Error updating profile:", err);
      setError(err.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="user-profile-page">
      <h1>My Profile</h1>
      <p>View and update your personal information.</p>

      {/* 🔹 Loading state */}
      {loading ? (
        <div className="loading">Loading profile...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <>
          {/* 🔹 Success message */}
          {success && (
            <div className="success-message">Profile updated successfully!</div>
          )}

          <form className="profile-form" onSubmit={handleSubmit}>
            <label>Full Name *</label>
            <input
              type="text"
              name="name"
              value={user.name || ""}
              onChange={handleChange}
              required
            />

            <label>Email *</label>
            <input
              type="email"
              name="email"
              value={user.email || ""}
              onChange={handleChange}
              required
            />

            <label>Phone</label>
            <input
              type="text"
              name="phone"
              value={user.phone || ""}
              onChange={handleChange}
            />

            <label>Address</label>
            <input
              type="text"
              name="address"
              value={user.address || ""}
              onChange={handleChange}
              placeholder="Your residential address"
            />

            <label>City</label>
            <input
              type="text"
              name="city"
              value={user.city || ""}
              onChange={handleChange}
              placeholder="Your city"
            />

            <label>Case Description</label>
            <textarea
              name="caseDescription"
              value={user.caseDescription || ""}
              onChange={handleChange}
              placeholder="Describe your legal issue"
              rows="4"
            />

            <button type="submit" disabled={saving}>
              {saving ? "Saving..." : "Update Profile"}
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default UserProfile;
