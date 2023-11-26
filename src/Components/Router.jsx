import React, { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import PrivateRoute from "./PrivateRoutes";
import Login from "../Pages/Auth/Login/Login";
import Tasks from "../Pages/Tasks/Tasks";
import Completed from "../Pages/Completed/Completed";
import Addtasks from "../Pages/Addtasks/Addtasks";
import Dashboard from "../Pages/Dashboard/Dashboard";
import EditTasks from "../Pages/EditTasks/EditTasks";


const Router = () => {
  const token = getTokenFromCookie();
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
    { path: "/addTasks", element: <PrivateRoute> <Addtasks /></PrivateRoute> },
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
