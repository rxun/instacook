import axios from "axios";

const API_URL = "http://localhost:5000/api";

const instance = axios.create({
  baseURL: API_URL,
});

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

export const createComment = async (commentInfo) =>
  instance.post(`${API_URL}/comment/create`, commentInfo)
  .then(res => res.data)
  .catch(console.error);

export const getComment = async (comment_id) =>
  await instance
    .get(`${API_URL}/comment/get-comment?comment_id=${comment_id}`)
    .then(res => res.data.result)
    .catch(console.error);

export const searchComment = async (text) =>
  instance
    .get(`${API_URL}/comment/search-comment?text=${text}`)
    .catch(console.error);

export const updateComment = async (commentInfo) =>
  instance
    .post(`${API_URL}/comment/update-comment`, commentInfo)
    .then(res => res.data)
    .catch(console.error);

export const deleteComment = async (commentInfo) =>
  instance
    .post(`${API_URL}/comment/delete-comment`, commentInfo)
    .then(res => res.data)
    .catch(console.error);

export const getShortRecipes = async (count) =>
  instance
    .get(`${API_URL}/comment/get-short-recipes?count=${count}`)
    .then(res => res.data)
    .catch(console.error);
