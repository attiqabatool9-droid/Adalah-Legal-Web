import React, { useState, useContext } from "react"; // 1. useContext add kiya
import { useNavigate } from "react-router-dom";
import "../../Styles/User/Login.css"; 
import { AuthContext } from "../../context/AuthContext"; // 2. Context file import ki

const Login = () => {
  const navigate = useNavigate();
  
  // 3. Context se 'login' function nikala (Data store karne ke liye)
  const { login } = useContext(AuthContext);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => { // 4. 'async' lagaya kyunki backend call time leti hai
    e.preventDefault();

    if (!form.email || !form.password) {
      setError("Please enter email and password");
      return;
    }

    setError("");

    // --- YAHAN SE CHANGES SHURU ---
    try {
      // 5. Backend ko data bheja (API Call)
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
        // 6. Agar Login Successful hua:
        console.log("Login Data:", data);
        
        // Data ko Global Store (Context) mein daal diya
        // (Iske andar localStorage wala kaam khud ho jayega)
        login(data); 

        alert("Login successful");
        navigate("/user/dashboard");
      } else {
        // Agar password galat hua
        setError(data.message || "Invalid Email or Password");
      }
    } catch (err) {
      console.error(err);
      setError("Server Error. Please try again later.");
    }
    // --- YAHAN CHANGES KHATAM ---
  };

  return (
    <div className="login-container">
      <h2>User Login</h2>

      {error && <div className="error">{error}</div>}

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
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

        <button type="submit" className="button">Login</button>
      </form>
    </div>
  );
};

export default Login;