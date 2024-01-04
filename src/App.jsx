import React from "react";
import { Reset } from "styled-reset";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Components
import HomePage from "./pages/HomePage";
import HomeLayout from "./pages/Layout/HomeLayout";
import LoginPage from "./pages/LoginPage";
import ErrorPage from "./pages/ErrorPage";
// Router
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
    ],
  },
]);
const App = () => {
  return (
    <>
      <Reset />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
