import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { Form, Input, Button, Checkbox, Card, Space, Radio } from "antd";

import "../css/login.scss";
import "../css/createrecipe.scss";
import { getRecipes } from "../utils/api";

const CRUD_OPTIONS = {
  CREATE: 1,
  READ: 2,
  UPDATE: 3,
  DELETE: 4,
};

const CreateRecipe = () => {
  let history = useHistory();
  const [steps, setSteps] = useState("");
  const [recipeId, setRecipeId] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [crudOption, setCrudOption] = useState(CRUD_OPTIONS.CREATE);

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
        {crudOption !== CRUD_OPTIONS.CREATE && (
          <Form.Item label="Recipe ID">
            <Input
              rows={12}
              placeholder="0"
              onChange={(e) => setRecipeId(e.target.value)}
            />
          </Form.Item>
        )}
        {crudOption !== CRUD_OPTIONS.DELETE &&
          crudOption !== CRUD_OPTIONS.READ && (
            <Form.Item label="Steps">
              <Input.TextArea
                rows={12}
                onChange={(e) => setSteps(e.target.value)}
              />
            </Form.Item>
          )}
        <Radio.Group
          defaultValue={CRUD_OPTIONS.CREATE}
          onChange={(e) => setCrudOption(e.target.value)}
        >
          <Radio value={CRUD_OPTIONS.CREATE}>Create</Radio>
          <Radio value={CRUD_OPTIONS.READ}>Read</Radio>
          <Radio value={CRUD_OPTIONS.UPDATE}>Update</Radio>
          <Radio value={CRUD_OPTIONS.DELETE}>Delete</Radio>
        </Radio.Group>
        <Form.Item>
          <input type="submit" value="Run Action" />
        </Form.Item>
      </Form>

      <h2>Recipe List</h2>
      <div className="recipe-list">
        {recipes &&
          recipes.map((recipe) => (
            <Card
              title={`Recipe ${recipe.recipe_id}`}
              style={{ width: 300, paddingLeft: "1em", paddingRight: "1em" }}
            >
              <p>{recipe.steps.substring(0, 100)}</p>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default CreateRecipe;
