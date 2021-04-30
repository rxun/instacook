import { Tabs, List, Input, Button } from "antd";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { UserOutlined } from "@ant-design/icons";
import FeedCard from "../components/FeedCard";

import "../css/search.scss";
import {
  getUser,
  getPostsOnKeyword,
  searchComment,
  getRecipesOnKeyword,
} from "../utils/api";

const { TabPane } = Tabs;

const TABS = Object.freeze({
  ACCOUNT: 1,
  POST: 2,
  COMMENT: 3,
  RECIPE: 4,
  // MISC: 5,
});

export default ({ searchText }) => {
  let history = useHistory();
  const [tab, setTab] = useState(1);
  const [activeDataSource, setActiveDataSource] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const fetchAccounts = async () => {
    const res = await getUser(searchInput);
    let data = [];
    if (res) {
    const users = res.data.result;
    for (const key in users) {
      const username = users[key].username;
      const account_id = users[key].account_id;
      data.push(
        <div className="user-info">
          <Button
            className="user-icon"
            onClick={() => history.push(`/profile/${account_id}`)}
          >
            <UserOutlined />
          </Button>
          {username}
        </div>
      );
    }
  }
    setActiveDataSource(data);
  };

  const fetchPosts = async () => {
    const posts = await getPostsOnKeyword(searchInput);
    let data = [];
    posts.map((p) =>
      data.push(
        <div className="search-post-container">
          <FeedCard post={p} viewDetails />
        </div>
      )
    );
    setActiveDataSource(data);
  };

  const fetchComments = async () => {
    const comments = await searchComment(searchInput);
    let data = [];
    comments.map((c) => data.push(<p>{c.text}</p>));
    setActiveDataSource(data);
  };

  const fetchRecipes = async () => {
    const recipes = await getRecipesOnKeyword(searchInput);
    console.log(recipes);
    let data = [];
    recipes.map((r) => data.push(<p>{r.steps}</p>));
    setActiveDataSource(data);
  };

  const handleSearch = async () => {
    switch (tab) {
      case TABS.ACCOUNT:
        await fetchAccounts();
        return;
      case TABS.POST:
        await fetchPosts();
        return;
      case TABS.COMMENT:
        await fetchComments();
        return;
      case TABS.RECIPE:
        await fetchRecipes();
        return;
    }
  };

  return (
    <div className="search">
      <Input
        className="search-bar"
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <Button onClick={handleSearch}>Search</Button>
      <Tabs
        defaultActiveKey={TABS.ACCOUNT}
        onChange={(newTab) => {
          setTab(parseInt(newTab));
          setActiveDataSource([]);
        }}
      >
        <TabPane tab="Account" key={TABS.ACCOUNT}></TabPane>
        <TabPane tab="Post" key={TABS.POST}></TabPane>
        <TabPane tab="Comment" key={TABS.COMMENT}></TabPane>
        <TabPane tab="Recipe" key={TABS.RECIPE}></TabPane>
        {/* <TabPane tab="Misc" key={TABS.MISC}></TabPane> */}
      </Tabs>
      <List dataSource={activeDataSource || []} renderItem={(item) => item} />
    </div>
  );
};
