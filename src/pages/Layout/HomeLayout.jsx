import React, { useEffect } from "react";
// Router
import { Outlet } from "react-router-dom";
// Components
import Header from "../../components/common/Header";
const HomeLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default HomeLayout;
