import React, { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import PrivateRoute from "./PrivateRoutes";
import Login from "../Pages/Auth/Login/Login";
import Tasks from "../Pages/Tasks/Tasks";
import Completed from "../Pages/Completed/Completed";
import Addtasks from "../Pages/Addtasks/Addtasks";
import Dashboard from "../Pages/Dashboard/Dashboard";
import EditTasks from "../Pages/EditTasks/EditTasks";
import AddExpanse from "../Pages/AddExpanse/AddExpanse";
import Players from "../Pages/Player/Players";


const Router = () => {
  const token = getTokenFromCookie();
  // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTYxYzhmYzAwOWMzNWU2N2YyMDE5MjQiLCJlbWFpbCI6InVzZXJAZ21haWwuY29tIiwibmFtZSI6IlVzZXIiLCJwYXNzd29yZCI6IiQyYSQxMCRyRzJSaU9SLktRUHNOT1pVVDludjdPbjZBRGd3LmlVWkE2LnVUZ0hlNHFkbW1OWXBGNzVrMiIsImRlbGV0ZWQiOmZhbHNlLCJjcmVhdGVkQXQiOiIyMDIzLTExLTI1VDEwOjE0OjIwLjk3M1oiLCJ1cGRhdGVkQXQiOiIyMDIzLTExLTI1VDEwOjE0OjIwLjk3M1oiLCJfX3YiOjAsImlhdCI6MTcwODg3NTg0NSwiZXhwIjoxNzA5MTM1MDQ1fQ.K6xcSXkabu6QhOj66mUUR_SKc0N1ZulnXOCK92_fvYU";
  const navigate = useNavigate()
  const location = useLocation();


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
  useEffect(() => {
    // Check if token exists
    if (token && location.pathname === "/login") {
      // Redirect user to the desired route
      navigate("/");
    }
  }, [location.pathname, token, navigate])

  const routes = [
    { path: "/", element: <PrivateRoute> <Dashboard /></PrivateRoute> },
    { path: "/tasks", element: <PrivateRoute> <Tasks /></PrivateRoute> },
    { path: "/completed", element: <PrivateRoute> <Completed /></PrivateRoute> },
    { path: "/expense", element: <PrivateRoute> <Players /></PrivateRoute> },
    { path: "/addTasks", element: <PrivateRoute> <Addtasks /></PrivateRoute> },
    { path: "/addExpanse", element: <PrivateRoute> <AddExpanse /></PrivateRoute> },
    { path: "/editTasks/:id", element: <PrivateRoute> <EditTasks /></PrivateRoute> },

    { path: "/login", element: <Login /> },
  ];

  return (
    <Routes>
      {routes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
};

export default Router;
