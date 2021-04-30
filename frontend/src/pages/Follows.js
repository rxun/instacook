import { List, Button, Image } from "antd";
import React, { useState, useEffect } from "react";
import { HeartOutlined, UserOutlined } from "@ant-design/icons";
import FeedCard from "../components/FeedCard";

import "../css/newfeed.scss";
import { getFollowers, getFollowing } from "../utils/api";

const FollowCard = ({ user }) => {
    return (
    <div className="card">
        <div className="header">
          {/* <div className="icon"></div> */}
          <Button className="user-icon" background-size="75px" width="75px" height="75px" icon={<Image preview={false} src={user.profile_picture} />} />
          <div className="name">{user.username}</div>
        </div>
      </div>
    );
  };

export default ({}) => {
  const [following, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [followView, setFollowView] = useState("following");

  useEffect(() => {
    async function fetchData() {
      setFollowing(await getFollowing(100));
    //   console.log(following);
      setFollowers(await getFollowers(100));
      console.log(followers);

    //   TODO: fix the bug with followers page icon
    }

    fetchData();
  }, []);

  return (
    <div>
      <button onClick={() => setFollowView("following")}>
        Following
      </button>
      <button onClick={() => setFollowView("followers")}>
        Followers
      </button>
      <div className="cards-container">
        <List
          grid={{ gutter: 16, column: 1 }}
          dataSource={(followView === 'following' ? following : followers) || []}
          renderItem={(item) => {
            return (
              <List.Item>
                <FollowCard user={item}/>
              </List.Item>
            );
          }}
        />
      </div>
    </div>
  );
};