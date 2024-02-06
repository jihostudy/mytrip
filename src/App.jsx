import React from "react";
import { Reset } from "styled-reset";
// router
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Common
import TokenRender from "./components/common/TokenRender";
import HomeLayout from "./pages/Layout/HomeLayout";
import PlanningLayout from "./pages/Layout/PlanningLayout";
import RegisterLayout from "./pages/Layout/RegisterLayout";
// pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ErrorPage from "./pages/ErrorPage";
import PlanningPage from "./pages/PlanningPage";
import RegisterPage from "./pages/RegisterPage";
import NewPasswordPage from "./pages/NewPasswordPage";
import PasswordResetPage from "./pages/PasswordResetPage";
import StartPage from "./pages/StartPage";
import PlanResultPage from "./pages/PlanResultPage";
import UserInfoPage from "./pages/UserInfoPage";
// social-login
import KakaoRedirect from "./components/Redirect/KakaoRedirect";
import GoogleRedirect from "./components/Redirect/GoogleRedirect";
import NaverRedirect from "./components/Redirect/NaverRedirect";
import NewUserNamePage from "./pages/NewUserNamePage";
import Mypage from "./pages/Mypage";
import ChangePasswordPage from "./pages/ChangePasswordPage";

// Router
const router = createBrowserRouter([
  {
    path: "/",
    // AT, RT 검사 및 재발급 or 재로그인
    element: <TokenRender />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/start",
        element: <StartPage />,
      },
      {
        path: "/home",
        element: <HomeLayout />,
        children: [
          { index: true, element: <HomePage /> },
          {
            path: "/home/auth",
            element: <RegisterLayout />,
            children: [
              { path: "/home/auth/login", element: <LoginPage /> },
              { path: "/home/auth/signup", element: <RegisterPage /> },
              { path: "/home/auth/new-username", element: <NewUserNamePage /> },
              { path: "/home/auth/reset", element: <PasswordResetPage /> },
              { path: "/home/auth/userInfo", element: <UserInfoPage /> },
              {
                path: "/home/auth/changePassword",
                element: <ChangePasswordPage />,
              },
            ],
          },
          {
            path: "/home/posts",
            children: [{ index: true, element: <Mypage /> }],
          },
        ],
      },
      {
        path: "/planning",
        element: <PlanningLayout />,
        children: [
          { index: true, element: <PlanningPage /> },
          { path: "/planning/result", element: <PlanResultPage /> },
        ],
      },
      {
        path: "/auth",
        children: [
          { path: "/auth/kakao", element: <KakaoRedirect /> },
          { path: "/auth/google", element: <GoogleRedirect /> },
          { path: "/auth/naver", element: <NaverRedirect /> },
        ],
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
