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

/**
 * API START
 * */

export const getRecipes = async () =>
  await get("/recipes/").then((res) => res.result.result);
