import React from "react";
import { Reset } from "styled-reset";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Components
import HomePage from "./pages/HomePage";
import HomeLayout from "./pages/Layout/HomeLayout";
import LoginPage from "./pages/LoginPage";
import ErrorPage from "./pages/ErrorPage";
import PlanningPage from "./pages/PlanningPage";
import RegisterPage from "./pages/RegisterPage";
import PasswordResetPage from "./pages/PasswordResetPage";
import NewPasswordPage from "./pages/NewPasswordPage";

// Router
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <ErrorPage />,
    // loader: userDetailLoader,
    children: [
      { index: true, element: <HomePage /> },
      // auth(로그인) 관련
      {
        path: "auth",
        children: [
          { path: "login", element: <LoginPage /> },
          { path: "signup", element: <RegisterPage /> },
          { path: "reset", element: <PasswordResetPage /> },
          { path: "new-password/:token", element: <NewPasswordPage /> },
        ],
      },
      { path: "planning", element: <PlanningPage /> },
    ],
  },
]);
const App = () => {
  return (
    <>
      <Reset /> {/* CSS 초기화 (브라우저별 다른 특징) */}
      <RouterProvider router={router} />
    </>
  );
};

export default App;
