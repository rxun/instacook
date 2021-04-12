import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api",
});

const get = async (url, params) =>
  await instance
    .get(url, { params })
    .then((res) => res && res.data)
    .catch((err) => console.error(err));

const post = (url, data, config) =>
  instance
    .post(url, data, config)
    .then((res) => res && res.data)
    .catch((err) => console.error(err));

const put = (url, data, config) =>
  instance
    .put(url, data, config)
    .then((res) => res && res.data)
    .catch((err) => console.error(err));

const del = async (url, params) =>
  await instance
    .delete(url, { params })
    .then((res) => res && res.data)
    .catch((err) => console.error(err));

/**
 * API START
 * */

export const getRecipes = async () =>
  await get("/recipes/").then((res) => res.result.result);

export const getRecipe = async (recipe_id) =>
  await get(`/recipes/${recipe_id}`).then((res) => res.result.result);

export const createRecipe = async (steps) => await post("/recipes/", { steps });

export const updateRecipe = async (recipe_id, steps) =>
  await put("/recipes/", { recipe_id, steps });

export const deleteRecipe = async (recipe_id) =>
  await del("/recipes/", { recipe_id });

export const getRecipesOnKeyword = async (keyword) =>
  await get("/recipes", { keyword });

export const getIngredients = async () =>
  await get("/ingredients/").then((res) => res.result.result);

export const getIngredientById = async (ingredient_id) =>
  await get(`/ingredients/${ingredient_id}`).then(res => res.result.result[0])

export const createIngredient = async (name, type) =>
  await post("/ingredients/", { name, type });

export const updateIngredient = async (ingredient_id, name, type) =>
  await put("/ingredients/", { ingredient_id, name, type });

export const deleteIngredient = async (ingredient_id) =>
  await del("/ingredients/", { ingredient_id });

export const getIngredientByName = async (name) =>
  await get("/ingredients/", { name }).then((res) => res.result.result);

export const getIngredientByType = async (type) =>
  await get("/ingredients/", { type }).then((res) => res.result.result);
