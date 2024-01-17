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
import GoogleRedirectPage from "./pages/GoogleRedirectPage";

// Router
// const _router = createBrowserRouter([
//   {
//     path: "/",
//     element: <HomeLayout />,
//     errorElement: <ErrorPage />,
//     // loader: refreshLoader,
//     children: [
//       { index: true, element: <HomePage /> },
//       // auth(로그인) 관련
//       {
//         path: "auth",
//         children: [
//           { path: "login", element: <LoginPage /> },
//           { path: "signup", element: <RegisterPage /> },
//         ],
//       },
//       { path: "planning", element: <PlanningPage /> },
//     ],
//   },
// ]);

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
