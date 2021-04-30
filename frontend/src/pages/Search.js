import { Tabs, List } from "antd";
import React, { useState, useEffect } from "react";

import "../css/search.scss";
import { getPosts, getRecipes, getTopCommentors } from "../utils/api";

const { TabPane } = Tabs;

const TABS = Object.freeze({
  ACCOUNT: 1,
  POST: 2,
  COMMENT: 3,
  RECIPE: 4,
  MISC: 5
});

export default ({ searchText }) => {
  const [tab, setTab] = useState();
  const [accounts, setAccounts] = useState();
  const [posts, setPosts] = useState();
  const [comments, setComments] = useState();
  const [recipes, setRecipes] = useState();
  const [activeDataSource, setActiveDataSource] = useState([]);

  const fetchAccounts = async () => {};

  const fetchPosts = async () => {
    setPosts(await getPosts());
  };

  const fetchComments = async () => {
    // setComments(await getTopCommentors());
  };

  const fetchRecipes = async () => {
    setRecipes(await getRecipes());
  };

  useEffect(() => {
    async function resolve() {
      let res = [];

      switch (tab) {
        case TABS.ACCOUNT:
          if (accounts) return;

          res = await fetchAccounts();
          break;
        case TABS.POST:
          if (posts) return;

          res = await fetchPosts();
          break;
        case TABS.COMMENT:
          if (comments) return;

          res = await fetchComments();
          break;
        case TABS.RECIPE:
          if (recipes) return;

          res = await fetchRecipes();
          break;
        default:
          break;
      }

      setActiveDataSource(res);
    }

    resolve();
  }, [tab]);

  useEffect(() => {
    // search according to tab, set all others to empty
  }, [searchText]);

  return (
    <div className="search">
      <Tabs
        defaultActiveKey={TABS.ACCOUNT}
        onChange={(newTab) => setTab(newTab)}
      >
        <TabPane tab="Account" key={TABS.ACCOUNT}></TabPane>
        <TabPane tab="Post" key={TABS.POST}></TabPane>
        <TabPane tab="Comment" key={TABS.COMMENT}></TabPane>
        <TabPane tab="Recipe" key={TABS.RECIPE}></TabPane>
        <TabPane tab="Misc" key={TABS.MISC}></TabPane>
      </Tabs>
      <List dataSource={activeDataSource || []} renderItem={(item) => null} />
    </div>
  );
};
