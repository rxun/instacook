import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getTopLikers, getUser, getTopCommentors } from "../utils/api";

const Home = (props) => {
  const currentUsername = props.history.location.state?.username;
  const [topLikersCount, setTopLikersCount] = useState(0);
  const [topLikersData, setTopLikersData] = useState(null);
  const [searchUsername, setSearchUsername] = useState("");
  const [searchUsernameData, setSearchUsernameData] = useState(null);
  const [topCommentors, setTopCommentors] = useState();

  useEffect(() => {
    async function fetchData() {
      setTopCommentors(await getTopCommentors());
    }

    fetchData();
  }, []);

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

  const handleUserSearch = async (e) => {
    e.preventDefault();
    const res = await getUser(searchUsername);
    const user = res.data.result;
    setSearchUsernameData(user);
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
      {topLikersData && (
        <div>
          <h3>Top {topLikersCount} Likers:</h3>
          <p>Rank | Username | Email</p>
        </div>
      )}
      {topLikersData &&
        topLikersData.map((u, index) => (
          <div>
            {index + 1} | {u.username} | {u.email}
          </div>
        ))}
      <br />
      <br />
      <form onSubmit={handleUserSearch}>
        <label>
          Search By Username:
          <input
            type="text"
            onChange={(e) => setSearchUsername(e.target.value)}
          />
        </label>
        <input type="submit" value="View User" />
      </form>
      {searchUsernameData && (
        <div>
          <h3>Username Search Result:</h3>
          <p>Username: {searchUsernameData.username}</p>
          <p>Email: {searchUsernameData.email}</p>
        </div>
      )}
      <br />
      <br />
      <div style={{ paddingLeft: "1em", overflowY: 'scroll', height: '20em' }}>
        <h3>Top commentors</h3>
        {topCommentors &&
          topCommentors.map((user) => (
            <div style={{ paddingBottom: "0.5em" }}>
              <p>Email: {user.email}</p>
              <p>Username: {user.username}</p>
              <p>Number of comments: {user.nComments}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;
