import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api"; // 1. API file import ki (Path check kar lena)
import "../../Styles/User/JoinForms.css";

const UserSignup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // 2. Loading state add kiya taaki double click na ho

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => { // 3. Function ko 'async' banaya
    e.preventDefault();

    // Validation
    if (!form.name || !form.email || !form.phone || !form.password || !form.confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");
    setLoading(true); // Process start

    try {
      // 4. Backend Call: User Register karne ke liye
      // Hum 'confirmPassword' nahi bhej rahe, sirf zaroori data bhej rahe hain
      const { data } = await API.post("/api/users", {
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
      });

      console.log("Signup Success:", data);

      // 5. Agar backend token bhej raha hai, toh use LocalStorage me save kar lo (Auto Login)
      // Isse user refresh karne par bhi login rahega
      localStorage.setItem("userInfo", JSON.stringify(data));

      alert("Signup successful! Welcome.");
      navigate("/user/dashboard"); // Dashboard par bhej diya

    } catch (err) {
      console.error(err);
      // Backend se jo error aayega (jaise "User already exists"), wo yahan show hoga
      setError(err.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false); // Process end
    }
  };

  return (
    <div className="join-container">
      <h2>User Sign Up</h2>

      {error && <div className="error">{error}</div>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Creating Account..." : "Create Account"}
        </button>
      </form>
    </div>
  );
};

export default UserSignup;