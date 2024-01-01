import React from "react";
import { Outlet } from "react-router-dom";
// Components
import Header from "../../constants/Header";
const HomeLayout = () => {
  return (
    <>
      <Header />

      <Outlet />
    </>
  );
};

export default HomeLayout;
