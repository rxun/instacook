import React, { useState } from "react";
import { useHistory } from "react-router";
import { createAccount } from "../utils/api";

import "../css/login.scss";

const CreateAccount = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  let history = useHistory();

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    const res = await createAccount({
      firstName,
      lastName,
      email,
      username,
      password,
    });

    if (res) {
      alert("Successfully created account!");
      history.push("/login");
    } else {
      alert("Failed to create account! Please try again.");
    }
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
