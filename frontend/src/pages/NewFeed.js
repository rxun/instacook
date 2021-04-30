import { List } from "antd";
import React, { useState, useEffect } from "react";
import FeedCard from "../components/FeedCard";

import "../css/newfeed.scss";
import { getPosts } from "../utils/api";
import Feed from "./Feed";

export default ({}) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setPosts(await getPosts());
    }

    fetchData();
  }, []);

  return (
    <div>
      <div className="cards-container">
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
      </div>
    </div>
  );
};
