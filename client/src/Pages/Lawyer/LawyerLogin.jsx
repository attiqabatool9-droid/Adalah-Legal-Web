import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../../Styles/User/Login.css"; // Styles same use ho rahe hain
import { AuthContext } from "../../context/AuthContext"; // Context import kiya

const LawyerLogin = () => {
  const navigate = useNavigate();
  
  // 1. Global Store (Context) se login function nikala
  const { login } = useContext(AuthContext);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setError("Please enter email and password");
      return;
    }

    setError("");

    try {
      // 2. Backend API Call (Same endpoint use hoga users wala)
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // 3. IMPORTANT: Role Check Karenge
        // Agar banda login to ho gaya par wo 'Lawyer' nahi hai, to usay roko.
        if (data.role !== "lawyer") {
          setError("Access Denied. This account is not a Lawyer account.");
          return;
        }

        console.log("Lawyer Login Data:", data);

        // 4. Data ko Global Store mein daal diya
        login(data);

        alert("Lawyer login successful");
        // 5. Lawyer Dashboard par bhej diya
        navigate("/lawyer/dashboard");
      } else {
        setError(data.message || "Invalid Email or Password");
      }
    } catch (err) {
      console.error(err);
      setError("Server Error. Please try again later.");
    }
  };

  return (
    <div className="login-container">
      <h2>Lawyer Login</h2>

      {error && <div className="error">{error}</div>}

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Lawyer Email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />

        <button type="submit" className="button">
          Login as Lawyer
        </button>
      </form>
    </div>
  );
};

export default LawyerLogin;