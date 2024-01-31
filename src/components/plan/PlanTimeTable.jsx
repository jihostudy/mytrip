import React, { useState } from "react";
// icons & images
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
// date-fns
import { format } from "date-fns";
// Components
import TimeLine from "./TimeLine";
// recoil
import { useRecoilState, useRecoilValue } from "recoil";
import { planState, currDate } from "../../lib/constants/plandata";

const PlanTimeTable = () => {
  const data = useRecoilValue(planState);
  const [date, setDate] = useRecoilState(currDate);
  function dateHandler(verify, value) {
    if (verify === "down" && value != 1) {
      // console.log("down");
      setDate((prev) => ({
        currDate: prev.currDate - 1,
      }));
    } else if (verify === "up" && value < data.period) {
      // console.log("up");

      setDate((prev) => ({
        currDate: prev.currDate + 1,
      }));
    }
  }
  // -----------------------------------planComponents----------------------------
  let hourArr = [];
  let time = new Date();
  for (let i = 0; i < 24; i++) {
    time.setHours(i + 5, 0, 0, 0);
    hourArr.push((i + 5) % 24);
  }
  // console.log(hourArr);
  const planComponents = hourArr.map((hour) => (
    <TimeLine key={hour} hour={hour} />
  ));
  return (
    <div className="relative h-full w-[31%]">
      <p className="flex h-[10%] w-full items-center justify-center text-xl">
        여행 시간표
      </p>
      <div className="flex h-[10%] w-full items-center justify-evenly border-1 border-solid border-black">
        {date.currDate != 1 && (
          <FaAngleLeft
            className="absolute left-[30%]"
            onClick={() => dateHandler("down", date.currDate)}
          />
        )}
        <p className="flex h-3/4 w-1/5 items-center justify-center rounded-lg bg-[#FFCB16]">
          {date.currDate}일차
        </p>
        {date.currDate != data.period && (
          <FaAngleRight
            className="absolute right-[30%]"
            onClick={() => dateHandler("up", date.currDate)}
          />
        )}
      </div>
      <ul
        id="dropContainer"
        className="relative flex h-4/5 w-full flex-col items-start justify-start overflow-hidden overflow-y-auto"
      >
        {planComponents}
      </ul>
    </div>
  );
};

export default PlanTimeTable;
