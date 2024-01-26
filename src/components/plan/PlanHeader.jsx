import React, { useEffect } from "react";
// router
import { useLocation } from "react-router-dom";
// components
import Button from "../UI/Button";
const PlanHeader = () => {
  const location = useLocation();

  const region = location.state.region.slice(0, 2);

  return (
    <div className="flex h-[15%] w-[93%] items-center justify-between bg-red-400">
      <div className="flex h-3/5 items-end border-2 border-solid border-black">
        <p className="mx-4 text-4xl">{region}</p>
        <p>날짜를 입력해주세요</p>
      </div>
      <div className="flex h-3/5 items-end border-2 border-solid border-black">
        <Button text="저장" />
        <Button text="완료" />
      </div>
    </div>
  );
};

export default PlanHeader;

// 88 40