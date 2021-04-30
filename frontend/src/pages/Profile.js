import { Tabs, List, Button, Image } from "antd";
import React, { useState, useEffect } from "react";

import "../css/profile.scss";
import {
  getFollowing,
  getFollowers,
  getPostsByAccount,
  getRecipes,
  getTopCommentors,
  getAccountById,
  getFollow,
  follow,
} from "../utils/api";
import { UserOutlined } from "@ant-design/icons";
import {
  Switch,
  useHistory,
  useParams,
  useRouteMatch,
  Route,
} from "react-router";
import imagePlaceholder from "../img/image-placeholder.png";
import { useAuth } from "../utils/useAuth";
import { unfollow } from "./../utils/api";
import FeedCard from "../components/FeedCard";

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
        <Image width="300px" preview={false} src={post.description} />
      </Button>
    </div>
  );
};

const PersonalProfile = () => {
  // get account id from login
  const { user } = useAuth();

  return <DefaultProfile accountId={user && user.account_id} />;
};

const DefaultProfile = ({ accountId }) => {
  const { user } = useAuth();
  const params = useParams();

  accountId = accountId !== undefined ? accountId : params.account_id;

  const [posts, setPosts] = useState([]);
  const [numFollowers, setNumFollowers] = useState(0);
  const [numFollowing, setNumFollowing] = useState(0);
  const [numLikes, setNumLikes] = useState(0);
  const [isFollowing, setIsFollowing] = useState();
  const [account, setAccount] = useState();

  useEffect(() => {
    async function fetchData() {
      setAccount(await getAccountById(accountId));
      setPosts(await getPostsByAccount(accountId));

      const followRes = await getFollow(user.account_id, accountId);
      setIsFollowing(followRes.length === 1);

      let following = await getFollowing(accountId);
      setNumFollowing(following.length);

      let followers = await getFollowers(accountId);
      setNumFollowers(followers.length);

      // TODO: fetch # likes from other people
    }

    fetchData();
  }, []);

  const onFollowBtnClick = async () => {
    const newValue = !isFollowing;
    setIsFollowing((prev) => !prev);

    const user_id = user.account_id;

    if (newValue) {
      await follow(user_id, accountId);
    } else {
      await unfollow(user_id, accountId);
    }

    const followers = await getFollowers(accountId);
    setNumFollowers(followers.length);
  };

  return (
    <div className="profile">
      <div className="profile-user-info">
        <div className="info">
          <div className="profile-pic">
            <Image preview={false} src={account && account.profile_picture} />
          </div>
          <div className="username">{account && account.username}</div>
        </div>
        <div className="additional-info">
          <div className="name">{account && account.first_name}</div>
          <div className="bio">{account && (account.bio || "[no bio]")}</div>

          {user && user.account_id != accountId && isFollowing !== undefined && (
            <Button className="follow-btn" onClick={onFollowBtnClick}>
              {isFollowing ? "Following" : "Follow"}
            </Button>
          )}
        </div>
        <div className="user-stats">
          <div>{numFollowers} followers</div>
          <div>{numFollowing} following</div>
          <div>{numLikes} likes</div>
        </div>
      </div>
      <List
        grid={{ gutter: 32, column: 3 }}
        dataSource={posts || []}
        renderItem={(item) => {
          return (
            <List.Item>
              <FeedCard hideHeader post={item} />
            </List.Item>
          );
        }}
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
        <Route exact path={`${routeMatchUrl}/:account_id`}>
          <DefaultProfile />
        </Route>
        <Route exact path={routeMatchUrl} component={PersonalProfile} />
      </Switch>
    </div>
  );
};
