import { Button, Card, List, Tabs, Image } from "antd";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import FeedCard from "../components/FeedCard";

import "../css/likedposts.scss";
import { getBestRecsByUser, getLikedPostsByUser, getPosts } from "../utils/api";
import { useAuth } from "../utils/useAuth";

const { TabPane } = Tabs;

const TABS = Object.freeze({
  LIKES: 1,
  RECOMMENDATIONS: 2,
  FUN: 3,
});

const PostList = ({ posts }) => (
  <List
    grid={{ gutter: 16, column: 3 }}
    dataSource={posts || []}
    renderItem={(item) => {
      return (
        <List.Item>
          <FeedCard post={item} viewDetails />
        </List.Item>
      );
    }}
  />
);

const FollowCard = ({ user }) => {
  const history = useHistory();

  return (
    <div className="card">
      <div className="header">
        {/* <div className="icon"></div> */}
        <Button
          className="user-icon"
          icon={
            <Image
              preview={false}
              src={user.profile_picture}
              object-fit="cover"
              height="30px"
              width="30px"
            />
          }
          onClick={() => history.push(`/profile/${user.account_id}`)}
        />
        <div className="name">{user.username}</div>
      </div>
    </div>
  );
};

const Recommendations = ({ followedPopPosts, popPosts, popUsers }) => {
  console.log(followedPopPosts);
  return (
    <div className="rec">
      <Card
        className="rec-card"
        title="Most Popular Posts by People You Follow"
      >
        <List
          itemLayout="vertical"
          grid={{ gutter: 16, column: 1 }}
          dataSource={followedPopPosts || []}
          renderItem={(item) => {
            return (
              <List.Item>
                <FeedCard post={item} viewDetails />
              </List.Item>
            );
          }}
        />
      </Card>
      <Card className="rec-card" title="Most Popular Posts">
        <List
          itemLayout="vertical"
          grid={{ gutter: 16, column: 1 }}
          dataSource={popPosts || []}
          renderItem={(item) => {
            return (
              <List.Item>
                <FeedCard post={item} viewDetails />
              </List.Item>
            );
          }}
        />
      </Card>
      <Card className="rec-card" title="Most Popular Users">
        <List
          itemLayout="vertical"
          grid={{ gutter: 16, column: 1 }}
          dataSource={popUsers || []}
          renderItem={(item) => {
            return (
              <List.Item>
                <FollowCard user={item} />
              </List.Item>
            );
          }}
        />
      </Card>
    </div>
  );
};

export default ({}) => {
  const { user } = useAuth();
  const [tab, setTab] = useState(1);
  const [likedPosts, setLikedPosts] = useState([]);
  const [bestRecs, setBestRecs] = useState();

  useEffect(() => {
    async function fetchData() {
      setLikedPosts(await getLikedPostsByUser(user && user.account_id));
      setBestRecs(await getBestRecsByUser(user && user.account_id));
    }

    fetchData();
  }, [user]);

  console.log(bestRecs);

  return (
    <div className="liked-posts">
      <Tabs
        defaultActiveKey={TABS.LIKES}
        onChange={(newTab) => setTab(parseInt(newTab))}
      >
        <TabPane tab="Likes" key={TABS.LIKES}></TabPane>
        <TabPane tab="Recommendations" key={TABS.RECOMMENDATIONS}></TabPane>
        <TabPane tab="Fun" key={TABS.FUN}></TabPane>
      </Tabs>
      {tab === TABS.LIKES && <PostList posts={likedPosts} />}
      {tab === TABS.RECOMMENDATIONS && (
        <Recommendations
          followedPopPosts={bestRecs ? bestRecs.followed_pop_posts : []}
          popPosts={bestRecs ? bestRecs.pop_posts : []}
          popUsers={bestRecs ? bestRecs.pop_users : []}
        />
      )}
      {/* <div className="cards-container">
        <List
          grid={{ gutter: 16, column: 3 }}
          dataSource={posts || []}
          renderItem={(item) => {
            return (
              <List.Item>
                <FeedCard post={item} viewDetails />
              </List.Item>
            );
          }}
        />
      </div> */}
    </div>
  );
};
