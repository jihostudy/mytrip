import React, { useEffect } from "react";
// Router
import { Outlet } from "react-router-dom";
// Components
import Header from "../../components/Header";
// axios
import { API } from "../../lib/API";
const HomeLayout = () => {
  useEffect(() => {
    const refresher = async () => {
      try {
        const res = await API.get("/refresh");
        console.log("로그인 성공");
        // console.log(res);
        // console.log(res.data.username);
        return res;
      } catch (error) {
        // console.log(error.response);
        const statusCode = error.response.status;
        // console.log(statusCode);
        // 로그인해야하는 경우
        if (statusCode === 403) {
          if (error.response.data.message === "Renewed expired access token") {
            // localStorage.setItem("accessToken",error.)
            // console.log("Refresh Token으로 Access Token 재발급");
          } else if (
            error.response.data.message === "Authentication required"
          ) {
            // console.log("access token, refresh token 없음");
          }
        } else if (statusCode === 404) {
          // console.log("User not found");
        }
        return "error occured";
      }
    };
    const refreshResult = refresher();
    console.log(refreshResult);
  }, []);
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default HomeLayout;

export const loader = async () => {
  try {
    const res = await API.get("/refresh");
    console.log("로그인 성공");
    // console.log(res);
    // console.log(res.data.username);
    return res;
  } catch (error) {
    // console.log(error.response);
    const statusCode = error.response.status;
    // console.log(statusCode);
    // 로그인해야하는 경우
    if (statusCode === 403) {
      if (error.response.data.message === "Renewed expired access token") {
        // localStorage.setItem("accessToken",error.)
        // console.log("Refresh Token으로 Access Token 재발급");
      } else if (error.response.data.message === "Authentication required") {
        // console.log("access token, refresh token 없음");
      }
    } else if (statusCode === 404) {
      // console.log("User not found");
    }
    return "error occured";
  }
};
