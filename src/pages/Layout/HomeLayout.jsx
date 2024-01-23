import React, { useEffect } from "react";
// Router
import { Outlet } from "react-router-dom";
// Components
import Header from "../../components/common/Header";
import ConfirmModal from "../../components/UI/ConfirmModal";
const HomeLayout = () => {
  return (
    <>
      <ConfirmModal />
      <Header />
      <Outlet />
    </>
  );
};

export default HomeLayout;
