import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Components
import HomePage from "./pages/HomePage";
import HomeLayout from "./pages/Layout/HomeLayout";
import LoginPage from "./pages/LoginPage";
// Router
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
    ],
  },
]);
const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
