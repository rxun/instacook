import { Tabs, List, Button, Image } from "antd";
import React, { useState, useEffect } from "react";

import "../css/profile.scss";
import { getFollowing, getFollowers, getPosts, getRecipes, getTopCommentors } from "../utils/api";
import { UserOutlined } from "@ant-design/icons";
import {
  Switch,
  useHistory,
  useParams,
  useRouteMatch,
  Route,
} from "react-router";
import imagePlaceholder from "../img/image-placeholder.png";

const { TabPane } = Tabs;

const TABS = Object.freeze({
  ACCOUNT: 1,
  POST: 2,
  COMMENT: 3,
  RECIPE: 4,
});

/**
 * TODO: Remove this and just make FeedCard customizable for
 * profile page
 */
const ProfilePostPreviewCard = ({ post }) => {
  return (
    <div className="profile-post-preview-card">
      <Button className="btn">
        <Image width="300px" preview={false} src={imagePlaceholder} />
      </Button>
    </div>
  );
};

const PersonalProfile = () => {
  // get account id from login
  return <DefaultProfile accountId={0} />;
};

const DefaultProfile = ({ accountId }) => {
  const params = useParams();

  accountId = accountId !== undefined ? accountId : params.accountId;

  const [post, setPosts] = useState([]);
  const [numFollowers, setNumFollowers] = useState(0);
  const [numFollowing, setNumFollowing] = useState(0);
  const [numLikes, setNumLikes] = useState(0);

  useEffect(() => {
    async function fetchData() {
      // TODO: fetch posts by account id
      // TODO: fetch # follows/followers
      let following = await getFollowing(100);
      setNumFollowing(following.length);

      let followers = await getFollowers(100);
      setNumFollowers(followers.length);

      // TODO: fetch # likes from other people
    }

    fetchData();
  }, []);

  return (
    <div className="profile">
      <div className="user-info">
        <div className="info">
          <UserOutlined />
          <div className="username">username</div>
        </div>
        <div className="additional-info">
          <div className="bio"></div>
          <Button className="follow-btn">Follow</Button>
        </div>
        <div className="user-stats">
          <div>{numFollowers} followers</div>
          <div>{numFollowing} following</div>
          <div>{numLikes} likes</div>
        </div>
      </div>
      <List
        grid={{ gutter: 32, column: 3 }}
        dataSource={[{ a: 1 }, { a: 1 }, { a: 1 }, { a: 1 }]}
        renderItem={(item) => <ProfilePostPreviewCard />}
      />
    </div>
  );
};

export default ({ username }) => {
  const history = useHistory();
  const routeMatchUrl = useRouteMatch().url;

  return (
    <div>
      <Switch>
        <Route
          exact
          path={`${routeMatchUrl}/:accountId`}
          component={DefaultProfile}
        />
        <Route exact path={routeMatchUrl} component={PersonalProfile} />
      </Switch>
    </div>
  );
};
