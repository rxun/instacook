import React from "react";
import { Link } from "react-router-dom";

const Home = (props) => {
  const username = props.history.location.state?.username;

  return (
    <div>
      <h1>InstaCook Home Page</h1>
      <Link to={{ pathname: "/settings", username }}>Account Settings</Link>
    </div>
  );
};

export default Home;
