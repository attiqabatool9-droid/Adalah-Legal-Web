import React, { useState } from "react";
import UserJoinForm from "./UserJoinForm";
import LawyerJoinForm from "./LawyerJoinForm";

function Join() {
  console.log("JOIN PAGE RENDERED");

  const [role, setRole] = useState("");

  return (
    <div style={{ padding: "100px", textAlign: "center" }}>
      {!role && (
        <>
          <h2>Join As</h2>

          <button
            type="button"
            onClick={() => setRole("user")}
          >
            Join as User
          </button>

          <br /><br />

          <button
            type="button"
            onClick={() => setRole("lawyer")}
          >
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
