import React, { useEffect } from "react";
// router
import { useLocation } from "react-router-dom";
// components
import Button from "../UI/Button";
const PlanHeader = () => {
  const location = useLocation();

  const region = location.state.region.slice(0, 2);

  return (
    <div className="flex h-[15%] w-[93%] items-start justify-between ">
      <div className="flex h-3/5 items-end">
        <p className="mr-4 text-4xl">{region}</p>
        <p>날짜를 입력해주세요</p>
      </div>
      <div className="relative flex h-3/5 w-[14%] items-end justify-around">
        <Button text="저장" width="44%" height="55%" />
        <Button text="다음" width="44%" height="55%" bg="#FFCB16" />
      </div>
    </div>
  );
};

export default PlanHeader;

// 88 40
