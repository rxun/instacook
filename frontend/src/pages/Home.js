import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getTopLikers } from "../utils/api";

const Home = (props) => {
  const currentUsername = props.history.location.state?.username;
  const [topLikersCount, setTopLikersCount] = useState(0);
  const [topLikersData, setTopLikersData] = useState(null);

  const handleTopLikersSubmit = async (e) => {
    e.preventDefault();
    const res = await getTopLikers(topLikersCount);
    const accounts = res.data.result;
    let data = [];
    for (const key in accounts) {
      data.push(accounts[key]);
    }
    setTopLikersData(data);
  };

  return (
    <div>
      <h1>InstaCook Home Page</h1>
      <Link to={{ pathname: "/settings", username: currentUsername }}>
        Account Settings
      </Link>
      <br />
      <br />
      <form onSubmit={handleTopLikersSubmit}>
        <label>
          View Top Likers (Enter Count):
          <input
            type="number"
            onChange={(e) => setTopLikersCount(e.target.value)}
          />
        </label>
        <input type="submit" value="View Top Likers" />
      </form>
      <br />
      {topLikersData && <p>Rank | Username | Email</p>}
      {topLikersData &&
        topLikersData.map((u, index) => (
          <div>
            {index + 1} | {u.username} | {u.email}
          </div>
        ))}
    </div>
  );
};

export default Home;
