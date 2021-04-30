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

const post = async (url, data, config) =>
  await instance
    .post(url, data, config)
    .then((res) => res && res.data)
    .catch((err) => console.error(err));

const put = async (url, data, config) =>
  await instance
    .put(url, data, config)
    .then((res) => res && res.data)
    .catch((err) => console.error(err));

const del = async (url, params) =>
  await instance
    .delete(url, { params })
    .then((res) => res && res.data)
    .catch((err) => console.error(err));

export const feed = async (accountInfo) =>
  instance.get(`${API_URL}/post/feed`, accountInfo).catch(console.error);

export const createPost = async (
  title,
  picture,
  description,
  recipe_id,
  account_id
) =>
  await post("/post/", { title, picture, description, recipe_id, account_id });

export const getPostsByAccount = async (account_id) =>
  await get(`/post/by/${account_id}`).then((res) => res.result.result);

export const getPosts = async () =>
  await get("/post/").then((res) => res.result.result);

export const getPostsOnKeyword = async (keyword) =>
  await get("/post", { keyword }).then((res) => res.result.result);

export const getFewestStepsPosts = async () =>
  await get("/post/fewest").then((res) => res.result.result);

export const getPost = async (post_id) =>
  await get(`/post/${post_id}`).then((res) => res.result.result);

export const updatePost = async (post_id, title, picture, description) =>
  await put("/post/", { post_id, title, picture, description });

export const deletePost = async (post_id) => await del("/post/", { post_id });

export const getFollowing = async (account_id) =>
  await get(`/follows/following/${account_id}`).then(
    (res) => res.result.result
  );

export const getFollowers = async (account_id) =>
  await get(`/follows/followers/${account_id}`).then(
    (res) => res.result.result
  );

export const getRecipes = async () =>
  await get("/recipes/").then((res) => res.result.result);

export const getRecipe = async (recipe_id) =>
  await get(`/recipes/${recipe_id}`).then((res) => res.result.result[0]);

export const createRecipe = async (steps) => await post("/recipes/", { steps });

export const updateRecipe = async (recipe_id, steps) =>
  await put("/recipes/", { recipe_id, steps });

export const deleteRecipe = async (recipe_id) =>
  await del("/recipes/", { recipe_id });

export const getRecipesOnKeyword = async (keyword) =>
  await get("/recipes", { keyword }).then((res) => res.result.result);

export const getIngredients = async () =>
  await get("/ingredients/").then((res) => res.result.result);

export const getIngredientById = async (ingredient_id) =>
  await get(`/ingredients/${ingredient_id}`).then(
    (res) => res.result.result[0]
  );

export const getIngredientsByRecipeId = async (recipe_id) =>
  await get(`/ingredients/recipe/${recipe_id}`).then(
    (res) => res.result.result
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

export const getMostLikedIngredientsByRecipe = async () =>
  await get("/ingredients/most-liked").then((res) => res.result.result);

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

export const getUserById = async (id) =>
  get(`/account/${id}`).then((res) => res.result.result[0]);

export const createComment = async (commentInfo) =>
  instance
    .post(`${API_URL}/comment/create`, commentInfo)
    .then((res) => res.data)
    .catch(console.error);

export const getComment = async (comment_id) =>
  await instance
    .get(`${API_URL}/comment/get-comment?comment_id=${comment_id}`)
    .then((res) => res.data.result)
    .catch(console.error);

export const searchComment = async (text) =>
  instance
    .get(`${API_URL}/comment/search-comment?text=${text}`)
    .then((res) => res.data.result.result)
    .catch(console.error);

export const updateComment = async (commentInfo) =>
  instance
    .post(`${API_URL}/comment/update-comment`, commentInfo)
    .then((res) => res.data)
    .catch(console.error);

export const deleteComment = async (commentInfo) =>
  instance
    .post(`${API_URL}/comment/delete-comment`, commentInfo)
    .then((res) => res.data)
    .catch(console.error);

export const getShortRecipes = async (count) =>
  instance
    .get(`${API_URL}/comment/get-short-recipes?count=${count}`)
    .then((res) => res.data)
    .catch(console.error);

export const getTopCommentors = async () =>
  await get("/account/top-commentors").then((res) => res.result.result);

export const getCommentsByPostId = async (id) =>
  await get("/post/comments", { id }).then((res) => res.result.result);

export const getNumOfLikesByPostId = async (id) =>
  await get(`/post/likes/${id}`, { numeric: true }).then(
    (res) => res.result.result[0].count
  );

export const getNumOfCommentsByPostId = async (id) =>
  await get(`/post/comments/${id}`, { numeric: true }).then(
    (res) => res.result.result[0].count
  );

export const likePost = async (account_id, post_id) =>
  await post(`/likes/`, { account_id, post_id });

export const unlikePost = async (account_id, post_id) =>
  await del(`/likes/`, { account_id, post_id });

export const getAccountById = async (account_id) =>
  get(`/account/${account_id}`).then((res) => res.result.result[0]);

export const follow = async (account1_id, account2_id) =>
  await post("/follows/", { account1_id, account2_id });

export const unfollow = async (account1_id, account2_id) =>
  await del("/follows/", { account1_id, account2_id });

export const getFollow = async (account1_id, account2_id) =>
  await get("/follows/", { account1_id, account2_id }).then(
    (res) => res.result.result
  );

export const getLikedPostsByUser = async (account_id) =>
  await get(`/post/likedby/${account_id}`).then((res) => res.result.result);

  export const getBestRecsByUser = async (account_id) => await get(`/account/getbestrecs`, {account_id}).then(res => res.result)