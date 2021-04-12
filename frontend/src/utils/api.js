import axios from "axios";

const API_URL = "http://127.0.0.1:5000/api";

const instance = axios.create({
  baseURL: API_URL,
});

export const login = async (accountInfo) =>
  instance.post(`${API_URL}/account/login`, accountInfo).catch(console.error);

export const createAccount = async (accountInfo) =>
  instance.post(`${API_URL}/account/create`, accountInfo).catch(console.error);
