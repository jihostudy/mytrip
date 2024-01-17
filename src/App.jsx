import React from "react";
import { Reset } from "styled-reset";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Common
import TokenRender from "./components/common/TokenRender";
import HomeLayout from "./pages/Layout/HomeLayout";
import PlanningLayout from "./pages/Layout/PlanningLayout";
// pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ErrorPage from "./pages/ErrorPage";
import PlanningPage from "./pages/PlanningPage";
import RegisterPage from "./pages/RegisterPage";
import NewUserNamePage from "./pages/NewUserNamePage";
import PasswordResetPage from "./pages/PasswordResetPage";
import NewPasswordPage from "./pages/NewPasswordPage";
import GoogleRedirectPage from "./pages/GoogleRedirectPage";

// Router
const router = createBrowserRouter([
  {
    path: "/",
    // AT, RT 검사 및 재발급 or 재로그인
    element: <TokenRender />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/home",
        element: <HomeLayout />,
        children: [
          { index: true, element: <HomePage /> },
          {
            path: "/home/auth",
            children: [
              { path: "/home/auth/login", element: <LoginPage /> },
              { path: "/home/auth/signup", element: <RegisterPage /> },
              { path: "/home/auth/new-username", element: <NewUserNamePage /> },
              { path: "/home/auth/reset", element: <PasswordResetPage /> },
              // {
              //   path: "/home/auth/new-password/:token",
              //   element: <NewPasswordPage />,
              // },
            ],
          },
        ],
      },
      {
        path: "/planning",
        element: <PlanningLayout />,
        children: [{ index: true, element: <PlanningPage /> }],
      },
      {
        path: "/auth",
        children: [{ path: "/auth/google", element: <GoogleRedirectPage /> }],
      },
    ],
  },
  {
    path: "/auth/new-password/:token",
    element: <NewPasswordPage />,
    errorElement: <ErrorPage />,
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
