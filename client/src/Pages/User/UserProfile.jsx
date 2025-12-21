import React, { useState } from "react";
import "../../Styles/User/UserProfile.css";

const UserProfile = () => {
  // 🔹 Dummy user data (baad me backend se aayega)
  const [user, setUser] = useState({
    name: "Laiba Mubeen",
    email: "laiba@email.com",
    phone: "0300-1234567",
  });

  // 🔹 Input change handler
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  // 🔹 Fake update handler
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profile updated successfully!");
  };

  return (
    <div className="user-profile-page">
      <h1>My Profile</h1>
      <p>View and update your personal information.</p>

      <form className="profile-form" onSubmit={handleSubmit}>
        
        <label>Full Name</label>
        <input
          type="text"
          name="name"
          value={user.name}
          onChange={handleChange}
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
        />

        <label>Phone</label>
        <input
          type="text"
          name="phone"
          value={user.phone}
          onChange={handleChange}
        />

        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default UserProfile;
