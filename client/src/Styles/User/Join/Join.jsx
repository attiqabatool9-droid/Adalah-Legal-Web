import React, { useState } from "react";
import UserJoinForm from "./UserJoinForm";
import LawyerJoinForm from "./LawyerJoinForm";

function Join() {
  const [role, setRole] = useState(""); // user | lawyer

  return (
    <div style={{ padding: "100px", textAlign: "center" }}>
      {!role && (
        <>
          <h2>Join As</h2>

          <button onClick={() => setRole("user")}>
            Join as User
          </button>

          <br /><br />

          <button onClick={() => setRole("lawyer")}>
            Join as Lawyer
          </button>
        </>
      )}

      {role === "user" && <UserJoinForm />}
      {role === "lawyer" && <LawyerJoinForm />}
    </div>
  );
}

export default Join;
