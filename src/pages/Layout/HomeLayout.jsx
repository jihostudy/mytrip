import React from "react";
// Router
import { Outlet } from "react-router-dom";
// Components
import Header from "../../components/Header";
// Cookies
import { useCookies } from "react-cookie";
const HomeLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default HomeLayout;

// export const loader = async () => {
//   const [cookies, setCookie, removeCookie] = useCookies();
//   const accessToken = localStorage.getItem("accessToken");

//   console.log(cookies);
//   console.log("accessToken: " + accessToken);
//   // console.log("refreshToken: " + refreshToken);
//   // const res = await API.
// };
