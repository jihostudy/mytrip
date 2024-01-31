import React, { useState } from "react";
// icons & images
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
// date-fns
import { format, addDays } from "date-fns";
import { ko } from "date-fns/locale";
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
  // -----------------------------------오늘 날짜 계산----------------------------
  let todayDate;
  if (data.date.start != null) {
    const startDate = new Date(data.date.start);

    todayDate = format(addDays(startDate, date.currDate - 1), "L.dd");
    todayDate += format(startDate, " (E)", { locale: ko });
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
      <div className="flex h-[10%] w-full items-center justify-evenly">
        {date.currDate != 1 && (
          <FaAngleLeft
            className="absolute left-[30%]"
            onClick={() => dateHandler("down", date.currDate)}
          />
        )}
        <p className="flex h-3/4 w-1/5 items-center justify-center rounded-lg bg-[#38C3FF]">
          {todayDate}
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
