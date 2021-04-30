import { Button, Image } from "antd";
import React, { useState, useEffect } from "react";
import {
  HeartOutlined,
  UserOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import { getRecipe } from "../utils/api";
import { useHistory } from "react-router";

import "../css/feedcard.scss";

const Details = ({ recipe, ingredients }) => {
  return (
    <div>
      <div className="ingredients-container">
        <div className="card-title">Ingredients</div>
        <div></div>
      </div>
      <div className="steps-container">
        <div className="card-title">Steps</div>
        <div className="steps"></div>
      </div>
    </div>
  );
};

/**
 * TODO: Fetch user, ingredients, and comments and display
 * in Details component
 */
export default ({ post, viewDetails }) => {
  let history = useHistory();
  const [expanded, setExpanded] = useState(false);
  const [user, setUser] = useState();
  const [recipe, setRecipe] = useState();
  const [ingredients, setIngredients] = useState();

  // useEffect(() => {
  //   async function fetchData() {
  //     setUser(await getUser())
  //   }

  //   fetchData();
  // }, [post])

  useEffect(() => {
    if (!expanded || recipe) return;

    async function fetchData() {
      setRecipe(await getRecipe(post.recipe_id));
    }

    fetchData();
  }, [expanded]);

  const handlePostClick = () => history.push(`/post/${post.post_id}`);

  return (
    <div className="card">
      <div className="header">
        <div className="user-info">
          <Button className="user-icon" icon={<UserOutlined />} />
          <div className="name">username</div>
        </div>
        {viewDetails && (
          <Button
            onClick={handlePostClick}
            className="like-btn"
            icon={<ArrowRightOutlined />}
          />
        )}
      </div>
      <Image className="card-img" src={post.description} />
      <div>
        <Button className="like-btn" icon={<HeartOutlined />} />
      </div>
      <Button className="details" onClick={() => setExpanded(!expanded)}>
        <div className="card-title-section">
          <div className="card-title">Title</div>
          <div>{post.title}</div>
        </div>
        {/* <div className="caption"></div> */}
      </Button>
      {expanded && <Details recipe={recipe} ingredients={ingredients} />}
    </div>
  );
};
