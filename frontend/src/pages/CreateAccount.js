import React, { useState } from "react";
import { useHistory } from "react-router";
import { createAccount, getUsername } from "../utils/api";

import "../css/login.scss";

const CreateAccount = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isUsernameTaken, setIsUsernameTaken] = useState(null);

  let history = useHistory();

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    if (isUsernameTaken) {
      alert("Failed to create account! Username is taken.");
    } else {
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
    }
  };

  const handleUsernameChange = async (e) => {
    const res = await getUsername(e.target.value);
    if (res.data.message === "Username available") {
      setIsUsernameTaken(false);
    } else {
      setIsUsernameTaken(true);
    }
    setUsername(e.target.value);
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
          <input type="text" onChange={handleUsernameChange} />
        </label>
        {username.length > 0 &&
          (isUsernameTaken ? (
            <p>Username is taken!</p>
          ) : (
            <p>Username is available!</p>
          ))}
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
