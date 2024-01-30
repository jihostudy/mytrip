import React from "react";
// router
import { Outlet } from "react-router-dom";

// Header
import Header from "../../components/common/Header";

//Modal
import ConfirmModal from "../../components/UI/ConfirmModal";

// recoil
import { planState } from "../../lib/constants/plandata";
import { useResetRecoilState } from "recoil";

const PlanningLayout = () => {
  return (
    <>
      <ConfirmModal />
      <Header />
      <Outlet />
    </>
  );
};

export default PlanningLayout;
