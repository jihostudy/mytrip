import React, { useCallback, useEffect, useState } from "react";
// recoil
import { useRecoilState } from "recoil";
import { planState } from "../../lib/constants/plandata";
// date-fns
import { format, getMinutes, getHours } from "date-fns";
// react-dnd
import { useDrop } from "react-dnd";
// Components
import TimeFraction from "./TimeFraction";
const TimeLine = ({ hour }) => {
  const minuteArr = [0, 30];
  // ["04:00","04:30"] 형식으로 들어있음
  const formattedTime = minuteArr.map((minute) => {
    let time = new Date();
    time.setHours(hour, minute, 0, 0);
    return time;
  });
  return (
    <li className="relative flex min-h-[16.66%] w-full flex-col items-center justify-evenly border-b-1 border-solid border-[#CBC8C8]">
      <div className="absolute left-[2%] w-[16%]">
        {format(formattedTime[0], "hh:mm")}
      </div>
      {formattedTime.map((time) => {
        return (
          <TimeFraction
            key={time}
            hour={getHours(time)} // 숫자
            minute={getMinutes(time)} // 숫자
          />
        );
      })}
    </li>
  );
};

export default TimeLine;
