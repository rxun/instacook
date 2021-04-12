import React, { useState } from "react";
import { useHistory } from "react-router";
import { getUsername, updateUsername, deleteAccount } from "../utils/api";

const Settings = (props) => {
  const [username, setUsername] = useState("");
  const [isUsernameTaken, setIsUsernameTaken] = useState(false);
  const currentUsername = props.location.username;

  let history = useHistory();

  const handleUsernameChange = async (e) => {
    const res = await getUsername(e.target.value);
    if (res.data.message === "Username available") {
      setIsUsernameTaken(false);
    } else {
      setIsUsernameTaken(true);
    }
    setUsername(e.target.value);
  };

  const handleUpdateUsername = async (e) => {
    e.preventDefault();

    if (isUsernameTaken) {
      alert("Username is taken!");
    } else {
      const res = await updateUsername({
        oldUsername: currentUsername,
        newUsername: username,
      });
      if (res) {
        alert("Successfully updated username! Please login again.");
        history.push("/login");
      }
    }
  };

  const handleDeleteAccount = async () => {
    await deleteAccount({ username: currentUsername });
    alert("Successfully deleted account!");
    history.push("/login");
  };

  return (
    <div>
      <h1>Account Settings</h1>
      <form onSubmit={handleUpdateUsername}>
        <label>
          Update username:
          <input type="text" onChange={handleUsernameChange} />
        </label>
        <input type="submit" value="Update Username" />
      </form>
      {username.length > 0 &&
        (isUsernameTaken ? (
          <p>Username is taken!</p>
        ) : (
          <p>Username is available!</p>
        ))}
      <br />
      <br />
      <button onClick={handleDeleteAccount}>Delete Account</button>
    </div>
  );
};

export default Settings;
