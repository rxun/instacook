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
  createIngredient,
  deleteIngredient,
  getIngredientById,
  getIngredientByName,
  updateIngredient,
} from "../utils/api";

const CRUD_OPTIONS = {
  CREATE: 1,
  READ: 2,
  UPDATE: 3,
  DELETE: 4,
};

const IngredientCard = ({ ingredient }) => (
  <Card
    title={`Ingredient ${ingredient.ingredient_id}`}
    style={{ width: 300, paddingLeft: "1em", paddingRight: "1em" }}
  >
    <p>{ingredient.name}</p>
    <p>{ingredient.type}</p>
  </Card>
);

const CreateIngredient = () => {
  let history = useHistory();
  const [steps, setSteps] = useState("");
  const [ingredientId, setIngredientId] = useState("");
  const [ingredientName, setIngredientName] = useState("");
  const [ingredientType, setIngredientType] = useState("");
  const [crudOption, setCrudOption] = useState(CRUD_OPTIONS.CREATE);
  const [requestedIngredient, setRequestedIngredient] = useState();
  const [fetchMessage, setFetchMessage] = useState();
  const [success, setSuccess] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [keywordIngredients, setKeywordIngredients] = useState([]);

  const onCRUDSubmit = async () => {
    let res;

    switch (crudOption) {
      case CRUD_OPTIONS.CREATE:
        res = await createIngredient(ingredientName, ingredientType);

        if (res && res.success)
          message.success(
            `Successfully created ingredient ${res.result.ingredient_id}`
          );
        else message.error("Failed to create ingredient");

        break;
      case CRUD_OPTIONS.READ:
        res = await getIngredientById(ingredientId);

        setRequestedIngredient(res);

        if (!res) message.error(`Failed to read ingredient ${ingredientId}`);

        break;
      case CRUD_OPTIONS.UPDATE:
        res = await updateIngredient(
          ingredientId,
          ingredientName,
          ingredientType
        );

        if (res && res.success)
          message.success(`Successfully updated ingredient ${ingredientId}`);
        else message.error(`Failed to update ingredient ${ingredientId}`);

        break;
      case CRUD_OPTIONS.DELETE:
        res = await deleteIngredient(ingredientId);

        if (res && res.success)
          message.success(`Successfully deleted ingredient ${ingredientId}`);
        else message.error(`Failed to delete ingredient ${ingredientId}`);

        break;
      default:
        break;
    }
  };

  const onSearch = async () => {
    const res = await getIngredientByName(searchText);

    if (!res)
      message.error(
        `Failed to find any ingredients that matched "${searchText}"`
      );

    setKeywordIngredients(res ? res : []);
  };

  return (
    <div className="create-account-container">
      <h1>InstaCook</h1>
      {fetchMessage && (
        <p style={{ color: success ? "green" : "red" }}>{fetchMessage}</p>
      )}
      <Form onFinish={onCRUDSubmit}>
        <Form.Item label="Ingredient ID">
          <Input
            rows={12}
            placeholder="0"
            disabled={crudOption === CRUD_OPTIONS.CREATE}
            onChange={(e) => setIngredientId(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Ingredient Name">
          <Input
            rows={12}
            placeholder="0"
            disabled={
              crudOption === CRUD_OPTIONS.READ ||
              crudOption === CRUD_OPTIONS.DELETE
            }
            onChange={(e) => setIngredientName(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Ingredient Type">
          <Input
            rows={12}
            placeholder="0"
            disabled={
              crudOption === CRUD_OPTIONS.READ ||
              crudOption === CRUD_OPTIONS.DELETE
            }
            onChange={(e) => setIngredientType(e.target.value)}
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

      {requestedIngredient && (
        <div>
          <h2>Recipe {requestedIngredient.ingredient_id}</h2>
          <IngredientCard ingredient={requestedIngredient} />
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

      {keywordIngredients && keywordIngredients.length > 0 && (
        <div>
          <h2>Ingreident List</h2>
          <div className="recipe-list">
            {keywordIngredients &&
              keywordIngredients.map((ingredient) => (
                <IngredientCard ingredient={ingredient} />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateIngredient;
