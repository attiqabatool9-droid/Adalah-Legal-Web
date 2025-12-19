import React from "react";

function UserJoinForm() {
  return (
    <div>
      <h2>User Case Form</h2>

      <input type="text" placeholder="Full Name" /><br /><br />
      <input type="email" placeholder="Email" /><br /><br />
      <textarea placeholder="Describe your case"></textarea><br /><br />

      <button>Submit</button>
    </div>
  );
}

export default UserJoinForm;
