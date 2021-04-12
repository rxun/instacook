import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Card,
  Space,
  Radio,
  message,
} from "antd";

import "../css/login.scss";
import "../css/createrecipe.scss";
import {
  deleteRecipe,
  getRecipes,
  updateRecipe,
  getRecipe,
  createRecipe,
  getRecipesOnKeyword,
  getMostLikedIngredientsByRecipe,
} from "../utils/api";

const CRUD_OPTIONS = {
  CREATE: 1,
  READ: 2,
  UPDATE: 3,
  DELETE: 4,
};

const RecipeCard = ({ recipe, length }) => (
  <Card
    title={`Recipe ${recipe.recipe_id}`}
    style={{ width: 300, paddingLeft: "1em", paddingRight: "1em" }}
  >
    <p>{recipe.steps.substring(0, Math.min(recipe.steps.length, length))}</p>
  </Card>
);

const CreateRecipe = () => {
  let history = useHistory();
  const [steps, setSteps] = useState("");
  const [recipeId, setRecipeId] = useState("");
  const [crudOption, setCrudOption] = useState(CRUD_OPTIONS.CREATE);
  const [requestedRecipe, setRequestedRecipe] = useState();
  const [fetchMessage, setFetchMessage] = useState();
  const [success, setSuccess] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [keywordRecipes, setKeywordRecipes] = useState([]);
  
  const onCRUDSubmit = async () => {
    let res;

    switch (crudOption) {
      case CRUD_OPTIONS.CREATE:
        res = await createRecipe(steps);

        if (res && res.success)
          message.success(
            `Successfully created recipe ${res.result.recipe_id}`
          );
        else message.error("Failed to create recipe");

        break;
      case CRUD_OPTIONS.READ:
        res = await getRecipe(recipeId);

        if (res) setRequestedRecipe(res[0]);
        else message.error(`Failed to read recipe ${recipeId}`);

        break;
      case CRUD_OPTIONS.UPDATE:
        res = await updateRecipe(recipeId, steps);

        if (res && res.success)
          message.success(`Successfully updated recipe ${recipeId}`);
        else message.error(`Failed to update recipe ${recipeId}`);

        break;
      case CRUD_OPTIONS.DELETE:
        res = await deleteRecipe(recipeId);

        if (res && res.success)
          message.success(`Successfully deleted recipe ${recipeId}`);
        else message.error(`Failed to delete recipe ${recipeId}`);

        break;
      default:
        break;
    }
  };

  const onSearch = async () => {
    const res = await getRecipesOnKeyword(searchText);

    if (!res)
      message.error(`Failed to find any recipes that matched "${searchText}"`);

    setKeywordRecipes(res ? res : []);
  };

  return (
    <div className="create-account-container">
      <h1>InstaCook</h1>
      {fetchMessage && (
        <p style={{ color: success ? "green" : "red" }}>{fetchMessage}</p>
      )}
      <Form onFinish={onCRUDSubmit}>
        <Form.Item label="Recipe ID">
          <Input
            rows={12}
            placeholder="0"
            disabled={crudOption === CRUD_OPTIONS.CREATE}
            onChange={(e) => setRecipeId(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Steps">
          <Input.TextArea
            rows={12}
            disabled={
              crudOption === CRUD_OPTIONS.DELETE ||
              crudOption === CRUD_OPTIONS.READ
            }
            onChange={(e) => setSteps(e.target.value)}
          />
        </Form.Item>
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

      {requestedRecipe && (
        <div>
          <h2>Recipe {requestedRecipe.recipe_id}</h2>
          <RecipeCard recipe={requestedRecipe} length={300} />
        </div>
      )}

      <h2>Keyword Search</h2>
      <Form onFinish={onSearch}>
        <div style={{ display: "flex" }}>
          <Form.Item>
            <Input
              rows={12}
              placeholder="Search keyword"
              onChange={(e) => setSearchText(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <input type="submit" value="Search" />
          </Form.Item>
        </div>
      </Form>

      {keywordRecipes && keywordRecipes.length > 0 && (
        <div>
          <h2>Recipe List</h2>
          <div className="recipe-list">
            {keywordRecipes &&
              keywordRecipes.map((recipe) => (
                <RecipeCard recipe={recipe} length={100} />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateRecipe;
