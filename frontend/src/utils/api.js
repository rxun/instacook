import axios from "axios";

const API_URL = "http://localhost:5000/api";

const instance = axios.create({
  baseURL: API_URL,
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


export const feed = async (accountInfo) =>
  instance.get(`${API_URL}/post/feed`, accountInfo).catch(console.error);

export const createPost = async (title, picture, description, account_id) =>
  await post("/post/", {title, picture, description, account_id} );

export const getPosts = async () => 
  await get("/post/").then((res) => res.result.result);

export const getPostsOnKeyword = async (keyword) => 
  await get("/post", { keyword }).then(res => res.result.result);

export const getFewestStepsPosts = async () =>
  await get("/post/fewest").then((res) => res.result.result);

export const getPost = async (post_id) => 
  await get(`/post/${post_id}`).then((res) => res.result.result);

export const updatePost = async (post_id, title, picture, description) =>
  await put("/post/", { post_id, title, picture, description });

export const deletePost = async (post_id) =>
  await del("/post/", {post_id});

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
