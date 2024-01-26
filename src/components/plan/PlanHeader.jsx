import React, { useEffect } from "react";
// router
import { useLocation } from "react-router-dom";
// components
import Button from "../UI/Button";
import CalenderContainer from "../Calender/CalenderContainer";
// Icons
// import { BsCalendarDate } from "react-icons/bs";
const PlanHeader = () => {
  const location = useLocation();

  const region = location.state.region.slice(0, 2);

  return (
    <div className="flex h-[15%] w-[93%] items-start justify-between">
      <div className="flex h-3/5 w-1/2 items-end justify-start">
        <p className="mr-4 flex h-full items-end text-4xl">{region}</p>
        {/* <BsCalendarDate /> */}
        <p className="relative z-10 flex h-full items-end">
          날짜를 입력해주세요 <CalenderContainer />
        </p>
      </div>

      <div className="relative flex h-3/5 w-[14%] items-end justify-around">
        <button className="h-[55%] w-[44%] rounded-lg border-[1px] border-solid border-black">
          저장
        </button>
        <button className="h-[55%] w-[44%] rounded-lg border-[1px] border-solid border-black bg-[#ffcb16]">
          다음
        </button>
      </div>
    </div>
  );
};

export default PlanHeader;

// 88 40
