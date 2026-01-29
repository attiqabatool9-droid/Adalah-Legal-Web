import React, { useState, useContext } from "react"; 
import { useNavigate } from "react-router-dom";
import API from "../../../api"; 
import { AuthContext } from "../../../context/AuthContext"; 
//import "../../../Styles/User/JoinForm.css"; 

function LawyerSignup() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); 

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    cnic: "",
    experience: "",
    specialization: "",
    city: "",
    licenseFile: null,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false); 

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({
      ...form,
      [name]: files ? files[0] : value,
    });
  };

  // --- UPDATED SUBMIT LOGIC ---
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.email ||
      !form.phone ||
      !form.password ||
      !form.confirmPassword ||
      !form.cnic ||
      !form.experience ||
      !form.specialization ||
      !form.city
    ) {
      setError("Please fill all required fields");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");
    setLoading(true);

    try {
      // Data ko FormData mein convert kiya
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("phone", form.phone);
      formData.append("password", form.password);
      formData.append("cnic", form.cnic);
      formData.append("experience", form.experience);
      formData.append("specialization", form.specialization);
      formData.append("city", form.city);
      formData.append("role", "lawyer"); 

      // File check karke append ki
      if (form.licenseFile) {
        formData.append("license", form.licenseFile);
      }

      // API Call - FIXED: Removed manual headers
      // Ab axios khud 'multipart/form-data' aur boundary detect karega
      const response = await API.post("/api/users", formData);

      console.log("Lawyer Signup Success:", response.data);
      setSuccess("Account Created Successfully! Redirecting...");

      // Auto Login - Save token separately too
      login(response.data);
      // Also save token directly to localStorage for redundancy
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }

      setTimeout(() => {
        navigate("/lawyer/dashboard");
      }, 1500);

    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="join-form-wrapper">
      <button
        className="back-button"
        onClick={() => navigate("/")}
        title="Go back"
      >
        ← Back
      </button>

      <div className="join-container">
        <h2>Join as Lawyer</h2>
        <p className="form-subtitle">
          Register as a lawyer to receive and manage legal cases
        </p>

        {error && <div className="error"><span>⚠️</span> {error}</div>}
        {success && <div className="success"><span>✓</span> {success}</div>}

        <form onSubmit={handleSubmit} encType="multipart/form-data">
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
            type="text"
            name="cnic"
            placeholder="CNIC Number"
            value={form.cnic}
            onChange={handleChange}
          />

          <input
            type="number"
            name="experience"
            placeholder="Experience (Years)"
            value={form.experience}
            onChange={handleChange}
          />

          <select
            name="specialization"
            value={form.specialization}
            onChange={handleChange}
          >
            <option value="">Select Specialization</option>
            <option value="Family Law">Family Law</option>
            <option value="Criminal Law">Criminal Law</option>
            <option value="Corporate Law">Corporate Law</option>
            <option value="Property Law">Property Law</option>
            <option value="Cyber Law">Cyber Law</option>
          </select>

          <input
            type="text"
            name="city"
            placeholder="City / Office Location"
            value={form.city}
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

          <label className="file-upload">
            Upload License / Certificate
            <input
              type="file"
              name="licenseFile"
              onChange={handleChange}
            />
          </label>

          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? "Creating Account..." : "Register as Lawyer"}
          </button>

          <p className="form-footer">
            Already registered?{" "}
            <span
              className="link-text"
              onClick={() => navigate("/lawyer/login")}
            >
              Login here
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LawyerSignup;