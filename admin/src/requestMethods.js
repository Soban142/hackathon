import axios from "axios";

const BASE_URL = "http://localhost:8000/api/v1/";
const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root"))?.user)
  ?.currentUser?.accessToken;
console.log(
  JSON.parse(JSON.parse(localStorage.getItem("persist:root"))?.user)
    ?.currentUser
);
// console.log(TOKEN);

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});
