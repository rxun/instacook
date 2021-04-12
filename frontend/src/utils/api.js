import axios from "axios";

const API_URL = "http://localhost:5000/api";
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

export const getMostLikedIngredientsByRecipe = async () =>
  await get("/recipes/most-liked").then((res) => res.result.result)

export const getIngredients = async () =>
  await get("/ingredients/").then((res) => res.result.result);

export const getIngredientById = async (ingredient_id) =>
  await get(`/ingredients/${ingredient_id}`).then(
    (res) => res.result.result[0]
  );

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

export const login = async (accountInfo) =>
  instance.post(`${API_URL}/account/login`, accountInfo).catch(console.error);

export const createAccount = async (accountInfo) =>
  instance.post(`${API_URL}/account/create`, accountInfo).catch(console.error);

export const getUsername = async (username) =>
  instance
    .get(`${API_URL}/account/search-username?username=${username}`)
    .catch(console.error);

export const updateUsername = async (usernameInfo) =>
  instance
    .post(`${API_URL}/account/update-username`, usernameInfo)
    .catch(console.error);

export const deleteAccount = async (usernameInfo) =>
  instance
    .post(`${API_URL}/account/delete-account`, usernameInfo)
    .catch(console.error);

export const getTopLikers = async (count) =>
  instance
    .get(`${API_URL}/account/get-top-likers?count=${count}`)
    .catch(console.error);

export const getUser = async (username) =>
  instance
    .get(`${API_URL}/account/get-user?username=${username}`)
    .catch(console.error);
