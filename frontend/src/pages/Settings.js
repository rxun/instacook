import React, { useState } from "react";
import { useHistory } from "react-router";
import { getUsername, updateUsername, deleteAccount } from "../utils/api";
import { Input, Form, Button } from "antd";

import '../css/settings.scss';

const Settings = (props) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
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
    <div className="settings">
      <h1>Account Settings</h1>
      <Form layout="vertical" onFinish={handleUpdateUsername}>
        <Form.Item label="Update Username">
          <Input onChange={handleUsernameChange} />
        </Form.Item>
        {username.length > 0 &&
          (isUsernameTaken ? (
            <p>Username is taken!</p>
          ) : (
            <p>Username is available!</p>
          ))}
        <Form.Item label="Email">
          <Input onChange={(e) => setEmail(e)} />
        </Form.Item>
        <Form.Item label="Bio">
          <Input onChange={(e) => setEmail(e)} />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Update
        </Button>
      </Form>

      <br />
      <br />
      <Button danger onClick={handleDeleteAccount}>
        Delete Account
      </Button>
    </div>
  );
};

export default Settings;
