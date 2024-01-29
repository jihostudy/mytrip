import React, { useState } from "react";
// icons & images
import { FaAngleLeft, FaPlaneCircleExclamation } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
// date-fns
import { format } from "date-fns";
// Components
import TimeLine from "./TimeLine";

const PlanTimeTable = ({ schedul }) => {
  // -----------------------------------planComponents----------------------------
  let hourArr = [];
  let time = new Date();
  for (let i = 0; i < 24; i++) {
    time.setHours(i + 5, 0, 0, 0);
    hourArr.push(format(time, "HH:mm"));
  }
  const planComponents = hourArr.map((hour) => (
    <TimeLine key={hour} hour={hour} />
  ));
  return (
    <div className="relative h-full w-[31%]">
      <p className="flex h-[10%] w-full items-center justify-center text-xl">
        여행 시간표
      </p>
      <div className="flex h-[10%] w-full items-center justify-evenly border-1 border-solid border-black">
        <FaAngleLeft />
        <p className="flex h-3/4 w-1/5 items-center justify-center rounded-lg bg-[#FFCB16]">
          2일차
        </p>
        <FaAngleRight />
      </div>
      <ul className="relative flex h-4/5 w-full flex-col items-start justify-start overflow-hidden overflow-y-auto">
        {planComponents}
      </ul>
    </div>
  );
};

export default PlanTimeTable;
