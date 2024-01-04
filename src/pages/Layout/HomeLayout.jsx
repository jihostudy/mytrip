import React from "react";
import { Outlet } from "react-router-dom";
// Components
import Header from "../../components/Header";
const HomeLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default HomeLayout;
