import React, { useState } from "react";
import { useHistory } from "react-router";

import "../css/login.scss";

const CreateAccount = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  let history = useHistory();

  const handleCreateAccount = () => {
    // TODO: Call create account endpoint with form entries
    console.log("HERE: ", firstName, lastName, email, username, password);
    history.push("/login");
  };

  return (
    <div className="create-account-container">
      <h1>InstaCook</h1>
      <form onSubmit={handleCreateAccount}>
        <label>
          First Name:
          <input type="text" onChange={(e) => setFirstName(e.target.value)} />
        </label>
        <label>
          Last Name:
          <input type="text" onChange={(e) => setLastName(e.target.value)} />
        </label>
        <label>
          Email:
          <input type="text" onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Username:
          <input type="text" onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Password:
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <input type="submit" value="Create Account" />
        <button type="button" onClick={() => history.push("/login")}>
          Back to Login
        </button>
      </form>
    </div>
  );
};

export default CreateAccount;
