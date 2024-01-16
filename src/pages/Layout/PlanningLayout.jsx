import React from "react";
// router
import { Outlet } from "react-router-dom";
const PlanningLayout = () => {
  return (
    <div>
      여행계획 보면 왼쪽에 사이드바 같이 겹치는곳 놓을 자리
      <Outlet />
    </div>
  );
};

export default PlanningLayout;
