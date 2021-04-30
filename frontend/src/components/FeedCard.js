import { Button, Image } from "antd";
import React, { useState, useEffect } from "react";
import {
  HeartOutlined,
  MessageOutlined,
  UserOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import {
  getNumOfCommentsByPostId,
  getNumOfLikesByPostId,
  getRecipe,
  getUserById,
  likePost,
  unlikePost,
} from "../utils/api";

import "../css/feedcard.scss";
import { getIngredientsByRecipeId } from "./../utils/api";
import { useHistory } from "react-router";
import { useAuth } from "../utils/useAuth";

const Details = ({ recipe, ingredients }) => {
  return (
    <div>
      <div className="ingredients-container">
        <div className="card-title ingredients-title">Ingredients</div>
        <div>
          <li>
            {ingredients.map((item) => (
              <ul>{item.name}</ul>
            ))}
          </li>
        </div>
      </div>
      <div className="steps-container">
        <div className="card-title steps-title">Steps</div>
        <div className="steps">{recipe && recipe.steps}</div>
      </div>
    </div>
  );
};

/**
 * TODO: Fetch user, ingredients, and comments and display
 * in Details component
 */
export default ({ post, viewDetails, hideHeader }) => {
  const history = useHistory();
  const { user } = useAuth();

  const [expanded, setExpanded] = useState(false);
  const [userPosted, setUserPosted] = useState();
  const [recipe, setRecipe] = useState();
  const [ingredients, setIngredients] = useState([]);
  const [numOfLikes, setNumOfLikes] = useState();
  const [numOfComments, setNumOfComments] = useState();
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const post_id = post.post_id;

      setNumOfLikes(await getNumOfLikesByPostId(post_id));
      setNumOfComments(await getNumOfCommentsByPostId(post_id));
    }

    fetchData();
  }, [post.post_id]);

  useEffect(() => {
    async function fetchData() {
      setUserPosted(await getUserById(post.account_id));
    }

    fetchData();
  }, [post.account_id]);

  useEffect(() => {
    if (!expanded || (recipe && ingredients)) return;

    async function fetchData() {
      const recipe_id = post.recipe_id;

      setRecipe(await getRecipe(recipe_id));
      setIngredients((await getIngredientsByRecipeId(recipe_id)) || []);
    }

    fetchData();
  }, [expanded]);

  const onLikeBtnClicked = async () => {
    // TODO: use logged in account id
    if (!user) return;

    const user_id = user.account_id;
    const { post_id } = post;

    const newValue = !liked;
    setLiked((prev) => !prev);

    if (newValue) {
      setNumOfLikes((prev) => prev + 1);
      await likePost(user_id, post_id);
    } else {
      setNumOfLikes((prev) => prev - 1);
      await unlikePost(user_id, post_id);
    }
  };

  return (
    <div className="card">
      {userPosted && (
        <div>
          {!hideHeader && (
            <div className="header">
              <div className="user-info">
                <Button
                  className="user-icon"
                  onClick={() =>
                    history.push(`/profile/${userPosted.account_id}`)
                  }
                >
                  <Image
                    className="profile-pic"
                    preview={false}
                    src={userPosted.profile_picture}
                  />
                </Button>
                <div className="name">{userPosted.username}</div>
              </div>
              {viewDetails && (
                <Button
                  onClick={() => history.push(`/post/${post.post_id}`)}
                  className="like-btn"
                  icon={<ArrowRightOutlined />}
                />
              )}
            </div>
          )}
        </div>
      )}
      <Image className="card-img" src={post.description} preview={false} />
      <div>
        <div className="actions">
          <div className="action">
            <Button
              className="logo-btn"
              icon={<HeartOutlined />}
              onClick={onLikeBtnClicked}
            />
            <div className="likes">{numOfLikes} likes</div>
          </div>
          <div className="action">
            <Button className="logo-btn" icon={<MessageOutlined />} />
            <div className="comments">{numOfComments} comments</div>
          </div>
        </div>
      </div>
      <Button className="details" onClick={() => setExpanded(!expanded)}>
        <div className="card-title-section">
          <div className="card-title">Title</div>
          <div className="card-title-content">{post.title}</div>
        </div>
        {/* <div className="caption"></div> */}
      </Button>
      {expanded && <Details recipe={recipe} ingredients={ingredients} />}
    </div>
  );
};
