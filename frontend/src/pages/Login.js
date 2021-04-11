import React, { useState } from "react";
import "../css/login.scss";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e) => setUsername(e.target.value);

  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = (e) => {
    e.preventDefault();
    // TODO: Call login endpoint with username & password
    console.log("HERE: ", username, password);
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
        <button type="button">Create Account</button>
      </form>
    </div>
  );
};

export default Login;
