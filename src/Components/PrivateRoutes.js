import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  // const token = JSON.parse(localStorage.getItem("token"));
  const token = getTokenFromCookie();
  // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTYxYzhmYzAwOWMzNWU2N2YyMDE5MjQiLCJlbWFpbCI6InVzZXJAZ21haWwuY29tIiwibmFtZSI6IlVzZXIiLCJwYXNzd29yZCI6IiQyYSQxMCRyRzJSaU9SLktRUHNOT1pVVDludjdPbjZBRGd3LmlVWkE2LnVUZ0hlNHFkbW1OWXBGNzVrMiIsImRlbGV0ZWQiOmZhbHNlLCJjcmVhdGVkQXQiOiIyMDIzLTExLTI1VDEwOjE0OjIwLjk3M1oiLCJ1cGRhdGVkQXQiOiIyMDIzLTExLTI1VDEwOjE0OjIwLjk3M1oiLCJfX3YiOjAsImlhdCI6MTcwODg3NTg0NSwiZXhwIjoxNzA5MTM1MDQ1fQ.K6xcSXkabu6QhOj66mUUR_SKc0N1ZulnXOCK92_fvYU";
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
  // const token = "abcd";
  if (!token) return <Navigate to="/login" />;
  return children;
}

export default PrivateRoute;
