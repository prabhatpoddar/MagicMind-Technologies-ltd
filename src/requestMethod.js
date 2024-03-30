import axios from "axios";
const user = getTokenFromCookie();
// const user = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTYxYzhmYzAwOWMzNWU2N2YyMDE5MjQiLCJlbWFpbCI6InVzZXJAZ21haWwuY29tIiwibmFtZSI6IlVzZXIiLCJwYXNzd29yZCI6IiQyYSQxMCRyRzJSaU9SLktRUHNOT1pVVDludjdPbjZBRGd3LmlVWkE2LnVUZ0hlNHFkbW1OWXBGNzVrMiIsImRlbGV0ZWQiOmZhbHNlLCJjcmVhdGVkQXQiOiIyMDIzLTExLTI1VDEwOjE0OjIwLjk3M1oiLCJ1cGRhdGVkQXQiOiIyMDIzLTExLTI1VDEwOjE0OjIwLjk3M1oiLCJfX3YiOjAsImlhdCI6MTcwODg3NTg0NSwiZXhwIjoxNzA5MTM1MDQ1fQ.K6xcSXkabu6QhOj66mUUR_SKc0N1ZulnXOCK92_fvYU";
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

const BASE_URL = "https://todo-z5yz.onrender.com/";
// const BASE_URL = "http://localhost:9000";
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
