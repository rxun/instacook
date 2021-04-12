import axios from "axios";

const API_URL = "http://127.0.0.1:5000/api";

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
