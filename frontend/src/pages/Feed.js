import React, { useState } from "react";
import { useHistory } from "react-router";
import { feed } from "../utils/api";

import "../css/feed.scss";

const Feed = () => {
  const [accountId, setAccountId] = useState("");

  let history = useHistory();

  const handleAccountIdChange = (e) => setAccountId(e.target.value);

  const handleFeed = (e) => {
    const res = feed({ accountId });
    if (res) {
      alert(`Feed Successful: Welcome Back ${res.data}!`);
    } else {
      alert(`Login Failed: Invalid Account Id!`);
    }
  };

  return (
    <div className="feed-container">
      <h1>InstaCook</h1>
      <form onSubmit={handleFeed}>
        <label>
          Account ID:
          <input type="text" onChange={handleAccountIdChange} value={accountId} />
        </label>
        <input type="submit" value="Feed" />
        <button type="button" onClick={() => history.push("/createpost")}>
          Create Post
        </button>
      </form>
      <div>

      </div>
    </div>
  );
};

export default Feed;
