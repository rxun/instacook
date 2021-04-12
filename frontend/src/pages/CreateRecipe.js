import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { Form, Input, Button, Checkbox, Card, Space } from "antd";

import "../css/login.scss";
import "../css/createrecipe.scss";
import { getRecipes } from "../utils/api";

const CreateRecipe = () => {
  let history = useHistory();
  const [steps, setSteps] = useState("");
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    async function fetchRecipes() {
      setRecipes(await getRecipes());
    }

    fetchRecipes();
  }, []);

  const onSubmit = () => {
    // TODO: Call create account endpoint with form entries
    history.push("/login");
  };

  return (
    <div className="create-account-container">
      <h1>InstaCook</h1>
      <Form onFinish={onSubmit}>
        <Form.Item label="Steps">
          <Input.TextArea
            rows={12}
            onChange={(e) => setSteps(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <input type="submit" value="Create Recipe" />
        </Form.Item>
      </Form>

      <h2>Recipe List</h2>
      <div className="recipe-list">
        {recipes &&
          recipes.map((recipe) => (
            <Card title={`Recipe ${recipe.recipe_id}`} style={{ width: 300, paddingLeft: '1em', paddingRight: '1em' }}>
              <p>{recipe.steps.substring(0, 100)}</p>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default CreateRecipe;
