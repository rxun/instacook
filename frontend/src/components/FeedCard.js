import { Button, Image } from "antd";
import React, { useState, useEffect } from "react";
import { HeartOutlined, UserOutlined } from "@ant-design/icons";
import { getRecipe } from "../utils/api";

import "../css/feedcard.scss";
import { getIngredientsByRecipeId } from "./../utils/api";

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
export default ({ post }) => {
  const [expanded, setExpanded] = useState(false);
  const [user, setUser] = useState();
  const [recipe, setRecipe] = useState();
  const [ingredients, setIngredients] = useState([]);

  // useEffect(() => {
  //   async function fetchData() {
  //     setUser(await getUser())
  //   }

  //   fetchData();
  // }, [post])

  useEffect(() => {
    if (!expanded || (recipe && ingredients)) return;

    async function fetchData() {
      const recipe_id = post.recipe_id;

      setRecipe(await getRecipe(recipe_id));
      setIngredients(await getIngredientsByRecipeId(recipe_id) || []);
    }

    fetchData();
  }, [expanded]);

  return (
    <div className="card">
      <div className="header">
        {/* <div className="icon"></div> */}
        <Button className="user-icon" icon={<UserOutlined />} />
        <div className="name">username</div>
      </div>
      <Image className="card-img" src={post.description} preview={false} />
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
