import axios from "axios";
const user = getTokenFromCookie();
function getTokenFromCookie() {
  const cookieString = document.cookie;
  const cookies = cookieString.split(";");

  for (const cookie of cookies) {
    const [name, value] = cookie.split("=").map((c) => c.trim());
    if (name === "token") {
      return value;
    }
  }

  return null; // Return null if the token cookie is not found
}

// const BASE_URL = "https://todo-pzct.onrender.com";
const BASE_URL = "http://localhost:9000";
export const publicRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: "Basic VE9ETzpUT0RPUVdFUlRZVUlPUA==",
  },
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + user,
  },
});
