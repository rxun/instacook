import React, { useState } from "react";
import { useHistory } from "react-router";

import "../css/login.scss";
import { useAuth } from "../utils/useAuth";

const Login = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  let history = useHistory();

  const handleUsernameChange = (e) => setUsername(e.target.value);

  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await login(username, password);
    if (res) {
      alert(`Login Successful: Welcome Back ${username}!`);
      history.push({
        pathname: "/",
        state: {
          username,
        },
      });
    } else {
      alert(`Login Failed: Invalid Username or Password!`);
    }
  };

  return (
    <div className="login-container">
      <h1>InstaCook</h1>
      <form onSubmit={handleLogin}>
        <label>
          Username:
          <input type="text" onChange={handleUsernameChange} value={username} />
        </label>
        <label>
          Password:
          <input
            type="password"
            onChange={handlePasswordChange}
            value={password}
          />
        </label>
        <input type="submit" value="Login" />
        <button type="button" onClick={() => history.push("/createaccount")}>
          Create Account
        </button>
      </form>
    </div>
  );
};

export default Login;
