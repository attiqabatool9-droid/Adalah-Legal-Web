import React, { useState } from "react";
import API from "../api"; // Tumhara banaya hua API config

const TestAPI = () => {
  const [response, setResponse] = useState("Result yahan aayega...");

  // 1. Case Create Test
  const createCaseTest = async () => {
    try {
      setResponse("Sending Request...");
      
      const caseData = {
        title: "Test Case for Divorce",
        description: "Mujhe divorce file karni hai, urgent help chahiye.",
        caseType: "Family Law",
        city: "Lahore"
      };

      const res = await API.post("/api/cases", caseData);
      setResponse("✅ SUCCESS! Case Created:\n" + JSON.stringify(res.data, null, 2));
    } catch (error) {
      console.error(error);
      setResponse("❌ ERROR: " + (error.response?.data?.message || error.message));
    }
  };

  // 2. Get Cases Test
  const getCasesTest = async () => {
    try {
      setResponse("Fetching Cases...");
      const res = await API.get("/api/cases");
      setResponse("✅ SUCCESS! Cases Found:\n" + JSON.stringify(res.data, null, 2));
    } catch (error) {
      console.error(error);
      setResponse("❌ ERROR: " + (error.response?.data?.message || error.message));
    }
  };

  // 3. Get Users Test
  const getUsersTest = async () => {
    try {
      setResponse("Fetching Users/Lawyers from /api/users...");
      console.log("About to call /api/users");
      const res = await API.get("/api/users");
      console.log("Response:", res);
      setResponse("✅ SUCCESS! Users Found:\n" + JSON.stringify(res.data, null, 2));
    } catch (error) {
      console.error("Full error object:", error);
      const errorMsg = error.response?.data?.message || error.message || JSON.stringify(error);
      console.log("Error message:", errorMsg);
      setResponse("❌ ERROR:\n" + errorMsg + "\n\nFull Error:\n" + JSON.stringify(error, null, 2));
    }
  };

  // 4. Test direct endpoint
  const testDirectEndpoint = async () => {
    try {
      setResponse("Testing /test-get-users endpoint directly...");
      const res = await API.get("/test-get-users");
      console.log("Test endpoint response:", res);
      setResponse("✅ SUCCESS! Test Endpoint:\n" + JSON.stringify(res.data, null, 2));
    } catch (error) {
      console.error("Test endpoint error:", error);
      setResponse("❌ ERROR:\n" + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div style={{ padding: "50px", textAlign: "center" }}>
      <h1>🛠 API Test Page</h1>
      <p>Make sure you are LOGGED IN before clicking buttons.</p>

      <div style={{ display: "flex", gap: "20px", justifyContent: "center", marginBottom: "30px" }}>
        <button 
          onClick={createCaseTest} 
          style={{ padding: "15px", background: "blue", color: "white", cursor: "pointer" }}
        >
          1. Test Create Case
        </button>

        <button 
          onClick={getCasesTest} 
          style={{ padding: "15px", background: "green", color: "white", cursor: "pointer" }}
        >
          2. Test Get Cases
        </button>

        <button 
          onClick={getUsersTest} 
          style={{ padding: "15px", background: "purple", color: "white", cursor: "pointer" }}
        >
          3. Test Get Users/Lawyers
        </button>

        <button 
          onClick={testDirectEndpoint} 
          style={{ padding: "15px", background: "orange", color: "white", cursor: "pointer" }}
        >
          4. Test Direct Endpoint
        </button>
      </div>

      <div style={{ background: "#f4f4f4", padding: "20px", borderRadius: "5px", textAlign: "left" }}>
        <pre>{response}</pre>
      </div>
    </div>
  );
};

export default TestAPI;