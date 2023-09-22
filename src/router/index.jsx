import * as React from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Error from "../pages/Error";
import Details from "../pages/Details";
import Layout from "../layout";
import SignIn from "../pages/Auth/SignIn";
import SignUp from "../pages/Auth/SignUp";
import EditPost from "../pages/Posts/Edit";
import CreatePost from "../pages/Posts/Create";
import Profile from "../pages/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "details/:id",
        element: <Details />,
      },
      {
        path: "edit/:id",
        element: <EditPost />,
      },
      {
        path: "create",
        element: <CreatePost />,
      },
      {
        path: "user/profile/:id",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
]);
export default router;
