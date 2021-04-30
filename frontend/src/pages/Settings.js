import React, { useState } from "react";
import { useHistory } from "react-router";
import { getUsername, updateUsername, deleteAccount } from "../utils/api";
import { Input, Form, Button } from "antd";
import { useAuth } from "../utils/useAuth";

import "../css/settings.scss";

const Settings = () => {
  const { user } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [isUsernameTaken, setIsUsernameTaken] = useState(false);

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

  const handleUpdateUsername = async () => {
    if (isUsernameTaken) {
      alert("Username is taken!");
    } else {
      const res = await updateUsername({
        oldUsername: user.username,
        newUsername: username,
      });
      if (res) {
        alert("Successfully updated username! Please login again.");
        history.push("/login");
      }
    }
  };

  const handleDeleteAccount = async () => {
    await deleteAccount({ username: user.username });
    alert("Successfully deleted account!");
    history.push("/login");
  };

  return (
    <div className="settings">
      <h1>Account Settings</h1>
      <Form layout="vertical" onFinish={handleUpdateUsername}>
        <Form.Item label="Update Username">
          <Input
            defaultValue={user && user.username}
            onChange={handleUsernameChange}
          />
        </Form.Item>
        {username.length > 0 &&
          (isUsernameTaken ? (
            <p>Username is taken!</p>
          ) : (
            <p>Username is available!</p>
          ))}
        <Form.Item label="Email">
          <Input
            defaultValue={user && user.email}
            onChange={(e) => setEmail(e)}
          />
        </Form.Item>
        <Form.Item label="First Name">
          <Input
            defaultValue={user && user.first_name}
            onChange={(e) => setEmail(e)}
          />
        </Form.Item>
        <Form.Item label="Last Name">
          <Input
            defaultValue={user && user.last_name}
            onChange={(e) => setEmail(e)}
          />
        </Form.Item>
        <Form.Item label="Profile Picture">
          <Input
            defaultValue={user && user.profile_picture}
            onChange={(e) => setEmail(e)}
          />
        </Form.Item>
        <Form.Item label="Bio">
          <Input.TextArea
            autoSize={{ minRows: 3, maxRows: 5 }}
            defaultValue={user && user.bio}
            onChange={(e) => setBio(e)}
          />
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
